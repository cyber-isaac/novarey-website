import React, { useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import VideoDialog from '../ui/VideoDialog';

const HERO_VIDEO_SRC = 'https://play.gumlet.io/embed/69795dc011ec7dfcb9832b4f?background=false&autoplay=true&loop=true&disableControls=false';

const VideoHero = () => {
    const reduceMotion = useReducedMotion();
    const [filmOpen, setFilmOpen] = useState(false);

    return (
        <section className="home-video-hero relative flex h-[82vh] min-h-[620px] w-full items-end overflow-hidden p-5 sm:p-8 md:p-12">
            <div className="absolute inset-0 z-0">
                <img src="/me.png" alt="" width="960" height="960" fetchPriority="high" className="absolute right-0 top-0 h-full w-2/3 object-cover opacity-30" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_32%,rgba(34,197,94,0.18),transparent_34%),linear-gradient(90deg,rgba(7,10,18,0.9),rgba(7,10,18,0.48)_45%,rgba(7,10,18,0.2))]"></div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0C12] via-[#0D0C12]/20 to-transparent"></div>
                {!reduceMotion && <div className="hero-scanline pointer-events-none absolute inset-0 opacity-30"></div>}
            </div>

            <motion.div
                initial={false}
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
                    Custom websites, brand identities, and AI workflows for founders and small businesses. I help you launch a clear, distinctive online presence and spend less time on repetitive work.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                    <Button as={Link} to="/contact" icon={ArrowRight} style={{background: '#22c55e', color: '#041009', border: '1px solid #4ade80'}}>
                        Start a Project
                    </Button>
                    <Button as={Link} to="/work" icon={ArrowRight}>View Selected Work</Button>
                </div>
                <button type="button" onClick={() => setFilmOpen(true)} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-slate-300 underline underline-offset-4">
                    <Play className="h-4 w-4" /> Watch the studio film
                </button>
            </motion.div>
            <VideoDialog open={filmOpen} onClose={() => setFilmOpen(false)} src={HERO_VIDEO_SRC} title="NovaRey studio film" />
        </section>
    );
};

export default VideoHero;
