export class GenerativeAudio {
    constructor() {
        this.ctx = null;
        this.analyser = null;
        this.gainNode = null;
        this.compressor = null;
        this.nodes = []; // all stoppable nodes
        this.timers = []; // scheduled timeouts
        this.playing = false;
        this.audioEl = null; // <audio> element for URL-based tracks
        this.mediaSource = null; // MediaElementSourceNode
    }

    init() {
        if (this.ctx) return;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 512;
        this.analyser.smoothingTimeConstant = 0.86;
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.value = 0;
        this.compressor = this.ctx.createDynamicsCompressor();
        this.compressor.threshold.value = -26;
        this.compressor.knee.value = 24;
        this.compressor.ratio.value = 5;
        this.compressor.attack.value = 0.018;
        this.compressor.release.value = 0.32;
        this.gainNode.connect(this.compressor);
        this.compressor.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
    }

    async resume() {
        this.init();
        if (this.ctx.state === 'suspended') {
            await this.ctx.resume();
        }
    }

    _fadeMaster(target, duration = 0.45) {
        if (!this.gainNode || !this.ctx) return;
        const now = this.ctx.currentTime;
        const current = this.gainNode.gain.value;
        this.gainNode.gain.cancelScheduledValues(now);
        this.gainNode.gain.setValueAtTime(current, now);
        this.gainNode.gain.linearRampToValueAtTime(target, now + duration);
    }

    stopAll() {
        this.nodes.forEach(n => { try { n.stop(); } catch (e) { } });
        this.nodes = [];
        this.timers.forEach(t => clearTimeout(t));
        this.timers = [];
        this.playing = false;
        if (this.gainNode && this.ctx) {
            this._fadeMaster(0, 0.45);
        }
        // Stop any playing audio element
        if (this.audioEl) {
            this.audioEl.pause();
            this.audioEl.currentTime = 0;
        }
    }

    // Helper: play a single note with attack/release envelope
    _note(freq, type, startTime, duration, vol = 0.08, destination = null) {
        const dest = destination || this.gainNode;
        const osc = this.ctx.createOscillator();
        osc.type = type;
        osc.frequency.value = freq;

        const env = this.ctx.createGain();
        env.gain.setValueAtTime(0, startTime);
        env.gain.linearRampToValueAtTime(vol, startTime + Math.min(0.3, duration * 0.3));
        env.gain.linearRampToValueAtTime(vol * 0.6, startTime + duration * 0.7);
        env.gain.linearRampToValueAtTime(0, startTime + duration);

        osc.connect(env);
        env.connect(dest);
        osc.start(startTime);
        osc.stop(startTime + duration + 0.1);
        this.nodes.push(osc);
        return osc;
    }

    // Helper: schedule a looping note sequence
    _sequence(notes, type, loopDuration, vol, filterFreq = null) {
        const dest = filterFreq ? this._makeFilter(filterFreq) : this.gainNode;
        const scheduleLoop = () => {
            if (!this.playing) return;
            const now = this.ctx.currentTime;
            notes.forEach(([freq, start, dur]) => {
                this._note(freq, type, now + start, dur, vol, dest);
            });
            const tid = setTimeout(() => scheduleLoop(), loopDuration * 1000);
            this.timers.push(tid);
        };
        scheduleLoop();
    }

    // Helper: create a filtered destination
    _makeFilter(freq, q = 3) {
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = freq;
        filter.Q.value = q;
        filter.connect(this.gainNode);
        // Sweep the filter slowly
        const lfo = this.ctx.createOscillator();
        lfo.frequency.value = 0.08;
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.value = freq * 0.4;
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();
        this.nodes.push(lfo);
        return filter;
    }

    // Helper: ambient pad that slowly evolves between chords
    _evolvingPad(chords, cycleSec, vol = 0.04) {
        const numVoices = chords[0].length;
        const oscs = [];
        for (let v = 0; v < numVoices; v++) {
            const osc = this.ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = chords[0][v];
            const g = this.ctx.createGain();
            g.gain.value = vol / (v + 1);
            osc.connect(g);
            g.connect(this.gainNode);
            osc.start();
            this.nodes.push(osc);
            oscs.push(osc);
        }
        let chordIdx = 0;
        const shift = () => {
            if (!this.playing) return;
            chordIdx = (chordIdx + 1) % chords.length;
            const now = this.ctx.currentTime;
            oscs.forEach((osc, v) => {
                osc.frequency.linearRampToValueAtTime(chords[chordIdx][v], now + cycleSec * 0.8);
            });
            const tid = setTimeout(shift, cycleSec * 1000);
            this.timers.push(tid);
        };
        const tid = setTimeout(shift, cycleSec * 1000);
        this.timers.push(tid);
    }

    playTrack(trackId, volume = 0.3) {
        this.init();
        this.stopAll();
        this.playing = true;

        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        const now = this.ctx.currentTime;
        this.gainNode.gain.setValueAtTime(0, now);
        this.gainNode.gain.linearRampToValueAtTime(volume, now + 2.0);

        const presets = {
            'ethereal-drift': () => {
                // Evolving pad cycling through Cmaj7 → Am9 → Fmaj7 → G7sus4
                this._evolvingPad([
                    [130.81, 164.81, 196.00, 246.94], // Cmaj7
                    [110.00, 164.81, 196.00, 261.63], // Am9
                    [87.31, 130.81, 164.81, 220.00],  // Fmaj7
                    [98.00, 146.83, 196.00, 261.63],  // G7sus4
                ], 8, 0.06);

                // Slow arpeggio — ascending notes with reverb-like delays
                const arpNotes = [
                    [261.63, 0, 3], [329.63, 2, 3], [392.00, 4, 3],
                    [523.25, 6, 3], [392.00, 8, 3], [329.63, 10, 3],
                    [293.66, 12, 2.5], [349.23, 14, 3],
                ];
                this._sequence(arpNotes, 'sine', 16, 0.05);

                // High sparkle hits
                const sparkle = [
                    [1046.50, 1, 1.5], [1318.51, 5, 1.2], [1567.98, 9, 1.8],
                    [1174.66, 13, 1.5],
                ];
                this._sequence(sparkle, 'sine', 16, 0.015);
            },

            'deep-resonance': () => {
                // Sub-bass pulse that shifts between notes
                this._evolvingPad([
                    [41.20, 61.74, 82.41],   // E1-B1-E2
                    [36.71, 55.00, 73.42],   // D1-A1-D2
                    [32.70, 49.00, 65.41],   // C1-G1-C2
                    [38.89, 58.27, 77.78],   // Eb1-Bb1-Eb2
                ], 10, 0.08);

                // Rhythmic pulse — filtered triangle wave hits
                const pulse = [
                    [82.41, 0, 0.8], [82.41, 1.5, 0.6], [110.00, 3, 1.0],
                    [82.41, 5, 0.8], [73.42, 6.5, 0.6], [65.41, 8, 1.2],
                ];
                this._sequence(pulse, 'triangle', 10, 0.06, 200);

                // Distant harmonics
                const harmonics = [
                    [329.63, 2, 4], [293.66, 7, 3.5],
                ];
                this._sequence(harmonics, 'sine', 10, 0.02, 500);
            },

            'crystal-rain': () => {
                // Rapid descending arpeggios like raindrops
                const rain1 = [
                    [1567.98, 0, 0.4], [1318.51, 0.3, 0.4], [1046.50, 0.6, 0.5],
                    [783.99, 0.9, 0.5], [659.26, 1.3, 0.6],
                    [1396.91, 2, 0.4], [1174.66, 2.3, 0.4], [987.77, 2.6, 0.5],
                    [880.00, 3.0, 0.6], [783.99, 3.5, 0.8],
                ];
                this._sequence(rain1, 'sine', 5, 0.04);

                // Second voice — offset and different notes
                const rain2 = [
                    [2093.00, 0.5, 0.3], [1760.00, 0.9, 0.3], [1480.00, 1.2, 0.4],
                    [2349.32, 3, 0.3], [1975.53, 3.3, 0.3], [1661.22, 3.6, 0.5],
                ];
                this._sequence(rain2, 'sine', 5, 0.02);

                // Warm pad underneath
                this._evolvingPad([
                    [261.63, 329.63, 392.00, 523.25], // C
                    [220.00, 277.18, 329.63, 440.00], // A
                    [246.94, 311.13, 369.99, 493.88], // B → Eb
                    [293.66, 349.23, 440.00, 587.33], // D
                ], 10, 0.03);
            },

            'void-current': () => {
                // Dark filtered bass drone that shifts
                this._evolvingPad([
                    [32.70, 49.00, 98.00],  // C0-G0-G1
                    [30.87, 46.25, 92.50],  // B-1
                    [27.50, 41.20, 82.41],  // A-1
                    [29.14, 43.65, 87.31],  // Bb-1
                ], 12, 0.07);

                // Slow, sparse metallic hits
                const hits = [
                    [110.00, 0, 2.5], [146.83, 4, 2], [98.00, 8, 3],
                    [130.81, 14, 2],
                ];
                this._sequence(hits, 'sawtooth', 18, 0.03, 250);

                // Ghost whisper — high filtered noise-like tones
                const ghost = [
                    [2637.02, 3, 3], [2349.32, 9, 2.5], [1975.53, 15, 3],
                ];
                this._sequence(ghost, 'sine', 18, 0.008);

                // Rumble pulse
                const rumble = [
                    [36.71, 0, 1.5], [36.71, 6, 1], [32.70, 12, 2],
                ];
                this._sequence(rumble, 'triangle', 18, 0.05, 120);
            },
        };

        if (presets[trackId]) {
            presets[trackId]();
        }
    }

    // Play audio from a local file URL (e.g. /audio/siren.mp3)
    playUrl(fileUrl, volume = 0.3) {
        this.init();
        // Stop generative nodes but don't touch audioEl yet
        this.nodes.forEach(n => { try { n.stop(); } catch (e) { } });
        this.nodes = [];
        this.timers.forEach(t => clearTimeout(t));
        this.timers = [];
        this.playing = true;

        this._fadeMaster(0, 0.12);

        // Resume AudioContext (required after user gesture)
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        // Reuse existing <audio> element or create a new one
        if (!this.audioEl) {
            this.audioEl = new Audio();
            this.audioEl.crossOrigin = 'anonymous';
            this.audioEl.loop = true;
            // Create MediaElementSource only once per element
            this.mediaSource = this.ctx.createMediaElementSource(this.audioEl);
            this.mediaSource.connect(this.gainNode);
        }

        this.audioEl.src = fileUrl;
        this.audioEl.volume = 1; // volume is controlled by gainNode
        this.audioEl.oncanplay = () => this._fadeMaster(volume, 0.8);
        this.audioEl.onerror = () => {
            this.playing = false;
            console.warn('Audio failed to load:', fileUrl);
        };
        this.audioEl.play().then(() => {
            this._fadeMaster(volume, 0.8);
        }).catch(err => {
            this.playing = false;
            console.warn('Audio playback failed:', err);
        });
    }

    // Used for iframe tracks where audio plays natively in the DOM
    playSilence() {
        this.init();
        this.stopAll();
        this.playing = true;
    }

    setVolume(v) {
        if (this.gainNode && this.ctx) {
            this._fadeMaster(v, 0.18);
        }
    }

    getAnalyser() {
        return this.analyser;
    }

    destroy() {
        this.stopAll();
        if (this.audioEl) {
            this.audioEl.pause();
            this.audioEl.src = '';
            this.audioEl = null;
            this.mediaSource = null;
        }
        if (this.ctx) {
            this.ctx.close().catch(() => { });
            this.ctx = null;
        }
    }
}
