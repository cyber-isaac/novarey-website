import React, { useState } from 'react';
import { ArrowRight, Play, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Logo from '../ui/Logo';
import Button from '../ui/Button';

const HERO_VIDEO_SRC = 'https://play.gumlet.io/embed/69795dc011ec7dfcb9832b4f?background=false&autoplay=true&loop=true&disableControls=false';

const VideoHero = () => {
    const reduceMotion = useReducedMotion();
    const [isVideoReady, setIsVideoReady] = useState(false);
    const [audioRequested, setAudioRequested] = useState(false);

    const handlePlayWithAudio = () => {
        setAudioRequested(true);
        setIsVideoReady(false);
    };

    return (
        <section className="home-video-hero relative flex h-[82vh] min-h-[620px] w-full items-end overflow-hidden p-5 sm:p-8 md:p-12">
            <div className="absolute inset-0 z-0">
                <div className={`absolute inset-0 bg-[radial-gradient(circle_at_70%_26%,rgba(34,197,94,0.22),transparent_32%),linear-gradient(135deg,#05070d,#111827_48%,#0d0c12)] transition-opacity duration-700 ${isVideoReady ? 'opacity-0' : 'opacity-100'}`}></div>
                <motion.iframe
                    key={audioRequested ? 'hero-video-audio' : 'hero-video-passive'}
                    title="NovaRey Hero Video"
                    src={HERO_VIDEO_SRC}
                    className="absolute inset-0 h-full w-full scale-105 border-0"
                    loading="eager"
                    referrerPolicy="origin"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    onLoad={() => setIsVideoReady(true)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVideoReady ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_32%,rgba(34,197,94,0.18),transparent_34%),linear-gradient(90deg,rgba(7,10,18,0.9),rgba(7,10,18,0.48)_45%,rgba(7,10,18,0.2))]"></div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0C12] via-[#0D0C12]/20 to-transparent"></div>
                {!reduceMotion && <div className="hero-scanline pointer-events-none absolute inset-0 opacity-30"></div>}
            </div>

            <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-20 max-w-4xl"
            >
                <div className="flex items-center gap-3 mb-5">
                    <span className="hero-chip-text px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        AI-integrated intelligent design
                    </span>
                </div>

                <div className="flex items-center gap-3 mb-5">
                    <Logo className="w-9 h-9" />
                    <span className="hero-kicker text-white/60">Design systems / websites / AI workflows</span>
                </div>

                <h1 className="home-hero-title text-white mb-4">
                    NOVAREY VENTURES
                </h1>

                <p className="hero-copy text-slate-200 max-w-xl mb-7">
                    I build intelligent websites, brand systems, and AI-connected workflows that look custom, human, and intentional. The AI is behind the process: faster research, sharper iteration, cleaner production, and shorter turnaround without making the final product look AI-generated.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                    <Button
                        as={Link}
                        to="/portfolio"
                        icon={ArrowRight}
                        className="uppercase italic font-black tracking-widest text-xs"
                    >
                        My Portfolio
                    </Button>
                    <Button
                        as={Link}
                        to="/about"
                        icon={Play}
                        className="uppercase italic font-black tracking-widest text-xs"
                    >
                        My Story
                    </Button>
                    <Button
                        as={Link}
                        to="/work"
                        icon={ArrowRight}
                        className="uppercase italic font-black tracking-widest text-xs"
                    >
                        My Work
                    </Button>
                    <Button
                        onClick={handlePlayWithAudio}
                        icon={Volume2}
                        className="uppercase italic font-black tracking-widest text-xs"
                        aria-pressed={audioRequested}
                    >
                        {audioRequested ? 'Film Audio Ready' : 'Play Film + Audio'}
                    </Button>
                </div>
            </motion.div>
        </section>
    );
};

export default VideoHero;
