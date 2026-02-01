import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Button from './Button';

const VideoHero = () => {
    return (
        <div className="relative w-full h-[85vh] md:h-[92vh] flex items-end p-8 md:p-12 overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C12]/35 via-transparent to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none"></div>

                <iframe
                    title="NovaRey Hero Video"
                    src="https://play.gumlet.io/embed/69795dc011ec7dfcb9832b4f?background=false&autoplay=true&loop=true&disableControls=false"
                    className="absolute inset-0 w-full h-full z-0"
                    style={{ border: 'none' }}
                    loading="lazy"
                    referrerPolicy="origin"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                ></iframe>

            </div>

            {/* Content */}
            <div className="relative z-20 max-w-4xl">
                <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Accepting New Ventures
                    </span>
                </div>

                <div className="flex items-center gap-3 mb-6">
                    <Logo className="w-9 h-9" />
                    <span className="text-xs font-mono text-white/60 uppercase tracking-[0.3em]">NovaRey Ventures</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-3 leading-[1.08]">
                    Isaac Reyes
                </h1>

                <p className="text-base md:text-lg text-slate-200 max-w-2xl mb-7 leading-relaxed">
                    The Digital Domain
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
                </div>
            </div>
        </div>
    );
};

export default VideoHero;
