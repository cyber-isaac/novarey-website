import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, ChevronLeft, ChevronRight, PlayCircle, ArrowRight } from 'lucide-react';
import Button from './Button';

const CARDS = [
    {
        id: 1,
        title: 'E-commerce Platform',
        subtitle: 'Complete online store design',
        src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa91f7af-c0ee-487e-9b71-34905a5f7414_1600w.webp'
    },
    {
        id: 2,
        title: 'SaaS Dashboard',
        subtitle: 'Modern analytics interface',
        src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5929dfb3-6ba0-482e-8054-7c6b716e45bc_1600w.jpg'
    },
    {
        id: 3,
        title: 'Landing Pages',
        subtitle: 'High-converting designs',
        src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/ce6d7146-78eb-4530-bc2a-2885666e1383_1600w.webp'
    },
    {
        id: 4,
        title: 'Mobile App UI',
        subtitle: 'Native & responsive experiences',
        src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c75a3e33-28d5-4996-97d3-cabbf3908ede_1600w.webp'
    },
    {
        id: 5,
        title: 'Brand Identity',
        subtitle: 'Complete visual systems',
        src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c4ba3f45-b7fb-47e5-a442-3c55bd9f9f1c_1600w.webp'
    }
];

const PortfolioCarousel = () => {
    const [current, setCurrent] = useState(2);
    const [saved, setSaved] = useState({});

    const next = () => setCurrent((prev) => (prev + 1) % CARDS.length);
    const prev = () => setCurrent((prev) => (prev - 1 + CARDS.length) % CARDS.length);

    const toggleSave = (id) => {
        setSaved(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <section className="relative pt-20 pb-20">
            <div className="sm:px-8 text-center max-w-3xl mx-auto px-6">
                <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter italic mb-8">
                    ONE GENERALIST DESIGNER.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-orange-900 leading-tight">
                        INFINITE OUTPUTS.
                    </span>
                </h1>
                <p className="text-slate-400 max-w-xl mx-auto font-medium leading-relaxed">
                    Beautiful websites that convert. Strategic design solutions backed by mission-critical precision.
                </p>
            </div>

            <div className="sm:px-8 sm:mt-16 max-w-5xl mt-16 mx-auto px-6 relative">
                <div className="sm:h-[600px] h-[500px] relative">
                    <div className="flex absolute inset-0 items-center justify-center">
                        {CARDS.map((card, i) => {
                            const offset = i - current;
                            const depth = Math.abs(offset);
                            const isCenter = offset === 0;

                            if (depth > 2) return null;

                            const baseX = typeof window !== 'undefined' && window.innerWidth < 640 ? 44 : 72;
                            const baseY = typeof window !== 'undefined' && window.innerWidth < 640 ? 10 : 14;
                            const baseR = 5;

                            const translateX = offset * baseX;
                            const translateY = depth * baseY + (isCenter ? 0 : 6);
                            const rotate = offset * -baseR;
                            const scale = isCenter ? 1 : (depth === 1 ? 0.965 : 0.93);

                            return (
                                <motion.article
                                    key={card.id}
                                    layout
                                    initial={false}
                                    animate={{
                                        x: translateX,
                                        y: translateY,
                                        rotate: rotate,
                                        scale: scale,
                                        opacity: 1,
                                        zIndex: 100 - depth,
                                        filter: isCenter ? 'drop-shadow(0 15px 25px rgba(0,0,0,0.5))' : 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))'
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    className="absolute sm:w-[420px] aspect-[4/5] w-[85%] rounded-3xl overflow-hidden bg-[#14121D] border border-white/10 group cursor-pointer shadow-2xl"
                                    style={{ pointerEvents: isCenter ? 'auto' : 'none' }}
                                >
                                    <img
                                        src={card.src}
                                        alt={card.title}
                                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    />

                                    <div className="absolute top-4 right-4 z-10">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleSave(card.id); }}
                                            className="p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-black/80 transition-all active:scale-95"
                                        >
                                            {saved[card.id] ? (
                                                <Check className="w-5 h-5 text-orange-500" />
                                            ) : (
                                                <Plus className="w-5 h-5 text-white" />
                                            )}
                                        </button>
                                    </div>

                                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
                                        <h3 className="text-2xl font-black text-white italic tracking-tighter">{card.title}</h3>
                                        <p className="text-sm font-mono text-slate-400 uppercase tracking-widest mt-1">{card.subtitle}</p>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>

                    {/* Controls */}
                    <div className="absolute inset-y-0 -left-4 sm:-left-12 flex items-center z-[110]">
                        <button
                            onClick={prev}
                            className="p-4 rounded-full bg-black/40 border border-white/10 text-white hover:bg-white/10 transition-all backdrop-blur-md"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="absolute inset-y-0 -right-4 sm:-right-12 flex items-center z-[110]">
                        <button
                            onClick={next}
                            className="p-4 rounded-full bg-black/40 border border-white/10 text-white hover:bg-white/10 transition-all backdrop-blur-md"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* CTAs */}
                <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
                    <Button
                        as="a"
                        href="#"
                        icon={PlayCircle}
                        className="uppercase italic font-black tracking-widest text-xs"
                    >
                        Watch Gen. Process
                    </Button>
                    <div className="hidden sm:block h-6 w-px bg-white/10"></div>
                    <Button
                        as="a"
                        href="#"
                        icon={ArrowRight}
                        className="uppercase italic font-black tracking-widest text-xs"
                    >
                        View Entire Database
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default PortfolioCarousel;
