// This film has no black passages. Require repeated empty frames while its
// playback clock advances before using the software decoder.
export function isEmptyVideoFrame(pixels) {
    for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i] > 2 || pixels[i + 1] > 2 || pixels[i + 2] > 2) return false;
    }
    return true;
}

export function precedingKeyframe(samples, time) {
    let index = 0;
    for (let i = 0; i < samples.length && samples[i].cts / samples[i].timescale <= time; i++) {
        if (samples[i].is_sync) index = i;
    }
    return index;
}

export function watchHeroFrames(video, canvas, { onReady, onError }) {
    let cancelled = false;
    let emptyFrames = 0;
    let previousTime = -1;
    let stopDecoder;
    const abort = new AbortController();
    const probe = document.createElement('canvas');
    probe.width = 64;
    probe.height = 36;
    const context = probe.getContext('2d', { willReadFrequently: true });
    const interval = setInterval(() => {
        if (video.paused || video.readyState < 2 || video.currentTime === previousTime) return;
        previousTime = video.currentTime;
        try {
            context.drawImage(video, 0, 0, 64, 36);
            emptyFrames = isEmptyVideoFrame(context.getImageData(0, 0, 64, 36).data) ? emptyFrames + 1 : 0;
        } catch {
            // A CORS restriction is not evidence of a decoder failure.
            clearInterval(interval);
            return;
        }
        if (emptyFrames < 3 || typeof VideoDecoder === 'undefined') return;
        clearInterval(interval);
        startSoftwareVideo(video, canvas, abort.signal, () => {
            if (!cancelled) onReady();
        }, () => {
            if (!cancelled) onError();
        }).then(stop => {
            if (cancelled) stop();
            else stopDecoder = stop;
        }).catch(error => {
            if (!cancelled && error.name !== 'AbortError') onError();
        });
    }, 750);

    return () => {
        cancelled = true;
        clearInterval(interval);
        abort.abort();
        stopDecoder?.();
    };
}

async function startSoftwareVideo(video, canvas, signal, onReady, onError) {
    const { createFile, DataStream } = await import('mp4box');
    const response = await fetch('/hero-film-compat.mp4', { signal });
    if (!response.ok) throw new Error('Compatibility film could not load');
    const data = await response.arrayBuffer();
    signal.throwIfAborted();
    const file = createFile();
    const samples = [];
    let config;
    let parseError;
    file.onError = error => { parseError = error; };
    file.onReady = info => {
        const track = info.videoTracks[0];
        const description = file.getTrackById(track.id).mdia.minf.stbl.stsd.entries[0].avcC;
        const stream = new DataStream(undefined, 0, DataStream.BIG_ENDIAN);
        description.write(stream);
        config = {
            codec: track.codec,
            codedWidth: track.video.width,
            codedHeight: track.video.height,
            description: new Uint8Array(stream.buffer, 8),
            hardwareAcceleration: 'prefer-software',
        };
        file.setExtractionOptions(track.id, null, { nbSamples: 1000 });
        file.start();
    };
    file.onSamples = (_id, _user, batch) => samples.push(...batch);
    data.fileStart = 0;
    file.appendBuffer(data);
    file.flush();
    if (parseError || !config || !samples.length) throw new Error('Compatibility film is invalid');
    const support = await VideoDecoder.isConfigSupported(config);
    signal.throwIfAborted();
    if (!support.supported) throw new Error('Software video decoding is unavailable');

    canvas.width = config.codedWidth;
    canvas.height = config.codedHeight;
    const context = canvas.getContext('2d');
    const pending = [];
    let index = precedingKeyframe(samples, video.currentTime);
    let previousClock = video.currentTime;
    let firstFrame = true;
    let timer;
    let stopped = false;
    const closeFrames = () => { for (const frame of pending.splice(0)) frame.close(); };
    const decoder = new VideoDecoder({
        output: frame => {
            if (stopped) frame.close();
            else pending.push(frame);
        },
        error: () => { stop(); onError(); },
    });
    decoder.configure(config);

    function stop() {
        stopped = true;
        clearTimeout(timer);
        closeFrames();
        if (decoder.state !== 'closed') decoder.close();
        signal.removeEventListener('abort', stop);
    }
    signal.addEventListener('abort', stop, { once: true });

    function tick() {
        if (stopped) return;
        try {
            renderFrame();
        } catch {
            stop();
            onError();
        }
    }

    function renderFrame() {
        const time = video.currentTime;
        // The native media element remains the sole clock and audio source.
        // Reposition on seeks and on the natural loop boundary.
        if (time < previousClock - 0.25 || time > previousClock + 1) {
            decoder.reset();
            decoder.configure(config);
            closeFrames();
            index = precedingKeyframe(samples, time);
        }
        previousClock = time;
        while (index < samples.length && decoder.decodeQueueSize < 8) {
            const sample = samples[index];
            if (sample.cts / sample.timescale > time + 0.12) break;
            decoder.decode(new EncodedVideoChunk({
                type: sample.is_sync ? 'key' : 'delta',
                timestamp: Math.round(sample.cts / sample.timescale * 1e6),
                duration: Math.round(sample.duration / sample.timescale * 1e6),
                data: sample.data,
            }));
            index++;
        }
        let frame;
        while (pending.length && pending[0].timestamp <= (time + 0.025) * 1e6) {
            frame?.close();
            frame = pending.shift();
        }
        if (frame) {
            try {
                context.drawImage(frame, 0, 0, canvas.width, canvas.height);
            } finally {
                frame.close();
            }
            if (firstFrame) {
                firstFrame = false;
                onReady();
            }
        }
        timer = setTimeout(tick, 1000 / 30);
    }
    tick();
    return stop;
}
