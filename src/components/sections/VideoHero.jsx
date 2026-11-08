import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Logo from '../ui/Logo';
import { watchHeroFrames } from '../../lib/heroVideoFallback';

const HERO_VIDEO_SRC = 'https://video.gumlet.io/64b781e9fccf18bce9351dee/69795dc011ec7dfcb9832b4f/main.mp4';

const VideoHero = () => {
    const reduceMotion = useReducedMotion();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [softwareVideo, setSoftwareVideo] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);
    const [audioRequested, setAudioRequested] = useState(false);
    const [playbackError, setPlaybackError] = useState('');
    const [filmPaused, setFilmPaused] = useState(true);

    useEffect(() => {
        if (reduceMotion) { videoRef.current?.pause(); setFilmPaused(true); }
    }, [reduceMotion]);

    const toggleFilm = async () => {
        const video = videoRef.current;
        if (!video) return;
        if (!video.paused) video.pause();
        else {
            try { await video.play(); }
            catch { setPlaybackError('Playback could not start. Please try again.'); }
        }
    };

    useEffect(() => watchHeroFrames(videoRef.current, canvasRef.current, {
        onReady: () => setSoftwareVideo(true),
        onError: () => setPlaybackError('The film could not display. Please reload to retry.'),
    }), []);

    const handlePlayWithAudio = async () => {
        const video = videoRef.current;
        if (!video) return;
        setPlaybackError('');
        video.muted = !video.muted;
        try {
            await video.play();
        } catch {
            video.muted = true;
            setPlaybackError('Playback could not start. Tap Turn music on to retry.');
        }
    };

    return (
        <>
        <section className="home-video-hero relative flex w-full items-end overflow-hidden">
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    title="NovaRey Hero Video"
                    aria-label="NovaRey background film"
                    crossOrigin="anonymous"
                    src={HERO_VIDEO_SRC}
                    poster="/hero-film-poster.webp"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                    style={{ visibility: softwareVideo ? 'hidden' : 'visible' }}
                    autoPlay={!reduceMotion}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onVolumeChange={(event) => setAudioRequested(!event.currentTarget.muted)}
                    onPlaying={() => { setPlaybackError(''); setFilmPaused(false); }}
                    onPause={() => setFilmPaused(true)}
                    onLoadedData={(event) => { if (reduceMotion) event.currentTarget.pause(); }}
                    onError={() => setPlaybackError('The film could not load. Please try again.')}
                />
                <canvas
                    ref={canvasRef}
                    aria-hidden="true"
                    data-hero-software-video={softwareVideo ? 'active' : 'inactive'}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                    style={{ visibility: softwareVideo ? 'visible' : 'hidden' }}
                />
                <div className="home-film-shade pointer-events-none absolute inset-0" />
            </div>

            <motion.div
                initial={false}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="home-hero-content relative z-20"
            >
                <Logo className="home-hero-mark" />
                <h1 className="home-hero-title">NovaRey<br />Ventures.</h1>
                <p className="hero-copy home-hero-description">
                    Websites, brand systems, and AI workflows, built around your work.
                </p>
                <div className="home-hero-actions">
                    <Link to="/work" className="home-primary-action">My Portfolio <ArrowRight aria-hidden="true" size={18} /></Link>
                    <Link to="/about" className="home-text-action">My Story</Link>
                    <Link to="/work" className="home-text-action">My Work</Link>
                </div>
                <div className="home-film-controls">
                    <button type="button" onClick={toggleFilm} aria-pressed={filmPaused}>
                        {filmPaused ? <Play aria-hidden="true" size={15} /> : <Pause aria-hidden="true" size={15} />}
                        {filmPaused ? 'Play film' : 'Pause film'}
                    </button>
                    <button type="button" onClick={handlePlayWithAudio} aria-pressed={audioRequested}>
                        {audioRequested ? <Volume2 aria-hidden="true" size={15} /> : <VolumeX aria-hidden="true" size={15} />}
                        {audioRequested ? 'Mute music' : 'Turn music on'}
                    </button>
                </div>
                {playbackError && <p role="status" className="mt-3 text-sm text-white">{playbackError}</p>}
            </motion.div>
        </section>
        {mounted && createPortal(
            <button
                type="button"
                onClick={handlePlayWithAudio}
                aria-label={audioRequested ? 'Mute background music' : 'Turn on background music'}
                aria-pressed={audioRequested}
                className="home-floating-audio fixed right-4 z-[100] inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/25 bg-[#202127] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#34353d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                style={{ bottom: 'calc(6rem + env(safe-area-inset-bottom, 0px))' }}
            >
                {audioRequested ? <Volume2 aria-hidden="true" className="h-5 w-5" /> : <VolumeX aria-hidden="true" className="h-5 w-5" />}
                <span className="home-floating-audio-label">{audioRequested ? 'Mute music' : 'Music off'}</span>
            </button>,
            document.querySelector('.app-shell') || document.body
        )}
        </>
    );
};

export default VideoHero;
