import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { scrollReveal, viewportConfig } from '../../lib/animations';

const SpecialOpsTheater = () => {
    return (
        <motion.section
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="relative py-24 px-6 md:px-12 overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                    {/* Left Side: Content */}
                    <div className="lg:col-span-12 xl:col-span-5 space-y-8">
                        <div>
                            <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-[0.4em] text-white/40 mb-4">
                                <Sparkles className="w-3 h-3 text-orange-500" />
                                Career System // Design Method
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white uppercase leading-[0.98] tracking-tight">
                                Creative systems. <br />
                                <span className="text-orange-500/80">Clear execution.</span>
                            </h2>
                            <p className="mt-8 text-slate-400 max-w-lg leading-relaxed text-sm md:text-base">
                                My background taught me how to organize complex work, communicate clearly, and keep momentum through constraints. I bring that same practical rhythm into design systems, websites, AI workflows, and launch plans that need to move quickly without losing quality.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <Briefcase className="w-5 h-5 text-emerald-400 mb-3" />
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">17.5 Years</h3>
                                <p className="text-[10px] font-mono text-slate-500 uppercase">Career Experience</p>
                            </div>
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <Zap className="w-5 h-5 text-orange-400 mb-3" />
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Fast Turnaround</h3>
                                <p className="text-[10px] font-mono text-slate-500 uppercase">Creative Process and Build Discipline</p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                as={Link}
                                to="/about"
                                icon={ArrowRight}
                                className="uppercase italic font-black tracking-widest text-xs"
                            >
                                Read the Full Story
                            </Button>
                        </div>
                    </div>

                    {/* Right Side: Video Theater */}
                    <div className="lg:col-span-12 xl:col-span-7">
                        <div className="relative group">
                            {/* HUD Frame */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-emerald-500/20 rounded-[32px] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                            <div className="relative rounded-[30px] overflow-hidden bg-black border border-white/10 shadow-2xl aspect-video">
                                {/* The Video Embed */}
                                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                    <iframe
                                        loading="lazy"
                                        title="Career and Design Archive"
                                        src="https://play.gumlet.io/embed/698d57f0ea3f1b28841fb7d9?background=false&autoplay=false&loop=false&disable_player_controls=false"
                                        style={{ border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
                                        referrerPolicy="origin"
                                        allow="accelerometer; gyroscope; encrypted-media; picture-in-picture; fullscreen"
                                    ></iframe>
                                </div>

                                {/* HUD Overlays */}
                                <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <div className="text-[9px] font-mono text-white/60 tracking-widest bg-black/40 px-2 py-1 backdrop-blur-sm border border-white/10 rounded">FEED: STUDIO_ARCHIVE_01</div>
                                            <div className="text-[9px] font-mono text-emerald-400 tracking-widest bg-black/40 px-2 py-1 backdrop-blur-sm border border-emerald-500/20 rounded">STATUS: READY</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                                            <div className="text-[9px] font-mono text-red-500 uppercase tracking-[0.2em] font-bold">REC</div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div className="space-y-4 w-full">
                                            <div className="flex justify-between items-center text-[8px] font-mono text-white/40 uppercase tracking-widest px-4">
                                                <span>Signal: Clear</span>
                                                <span className="flex items-center gap-2">
                                                    Tempo: Fast
                                                    <div className="flex gap-1">
                                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                                            <div key={i} className={`w-1 h-3 ${i < 6 ? 'bg-orange-500' : 'bg-white/10'}`}></div>
                                                        ))}
                                                    </div>
                                                </span>
                                            </div>
                                            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tech Corner Brackets */}
                                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-orange-500/40 rounded-tl-xl pointer-events-none"></div>
                                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-orange-500/40 rounded-tr-xl pointer-events-none"></div>
                                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-orange-500/40 rounded-bl-xl pointer-events-none"></div>
                                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-orange-500/40 rounded-br-xl pointer-events-none"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </motion.section>
    );
};

export default SpecialOpsTheater;
