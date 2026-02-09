import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import Button from './Button';

const CARDS = [
    { id: 0, src: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg", rotation: -8, y: 20, label: "designer", color: "bg-blue-600" },
    { id: 1, src: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg", rotation: -2, y: 28, label: "artist", color: "bg-orange-500" },
    { id: 2, src: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg", rotation: 3, y: 8, label: "creative", color: "bg-emerald-500" },
    { id: 3, src: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5bab247f-35d9-400d-a82b-fd87cfe913d2_1600w.webp", rotation: 0, y: -4, label: "visionary", color: "bg-purple-600" },
    { id: 4, src: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/30104e3c-5eea-4b93-93e9-5313698a7156_1600w.webp", rotation: -2, y: 12, label: "innovator", color: "bg-pink-500" },
    { id: 5, src: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg", rotation: 6, y: 24, label: "strategist", color: "bg-sky-500" },
];

const PortfolioHero = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const resetCards = () => setActiveIndex(null);

    return (
        <section className="sm:pb-28 sm:pt-36 max-w-7xl mx-auto pt-36 px-6 pb-28 relative overflow-hidden">
            <div className="relative">
                {/* Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="mx-auto max-w-3xl text-center mb-20"
                >
                    <h1 className="text-4xl sm:text-6xl lg:text-8xl leading-[0.95] tracking-tight font-display font-black text-white italic uppercase">
                        Showcase your work to
                        <span className="block bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent"> the world.</span>
                    </h1>
                </motion.div>

                {/* Card Rail */}
                <div className="flex justify-center relative min-h-[400px]">
                    {/* Creator Tags - Fixed positions based on prototype logic */}
                    <div className="absolute -top-12 left-[15%] z-50">
                        <div className="relative">
                            <span className="inline-flex items-center gap-2 text-sm font-bold text-white bg-blue-600 rounded-full px-4 py-2 shadow-xl ring-2 ring-blue-400/20">
                                designer <ArrowUpRight className="w-4 h-4" />
                            </span>
                            <span className="absolute -bottom-1 left-6 h-2 w-2 rotate-45 bg-blue-600"></span>
                        </div>
                    </div>

                    <div className="absolute -top-8 right-[15%] z-50">
                        <div className="relative">
                            <span className="inline-flex items-center gap-2 text-sm font-bold text-white bg-orange-500 rounded-full px-4 py-2 shadow-xl ring-2 ring-orange-400/20">
                                artist <ArrowUpRight className="w-4 h-4" />
                            </span>
                            <span className="absolute -bottom-1 left-6 h-2 w-2 rotate-45 bg-orange-500"></span>
                        </div>
                    </div>

                    <div className="grid grid-cols-6 gap-3 sm:gap-4 max-w-5xl items-end" onClick={(e) => { e.stopPropagation(); resetCards(); }}>
                        {CARDS.map((card, index) => {
                            const isActive = activeIndex === index;
                            const isBlurred = activeIndex !== null && activeIndex !== index;

                            return (
                                <motion.div
                                    key={card.id}
                                    onClick={(e) => { e.stopPropagation(); setActiveIndex(isActive ? null : index); }}
                                    animate={{
                                        rotate: isActive ? 0 : card.rotation,
                                        y: isActive ? -40 : card.y,
                                        scale: isActive ? 1.25 : 1,
                                        filter: isBlurred ? 'blur(8px)' : 'blur(0px)',
                                        opacity: isBlurred ? 0.4 : 1,
                                        zIndex: isActive ? 50 : 1
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    className="col-span-1 cursor-pointer"
                                >
                                    <div className="aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl transition-shadow group">
                                        <img
                                            src={card.src}
                                            alt="Portfolio card"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Subcopy */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mx-auto mt-16 max-w-xl text-center text-base text-neutral-400 font-medium leading-relaxed"
                >
                    Build your professional portfolio, connect with collectors, and share your creative journey with a global community.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-10 flex items-center justify-center gap-4"
                >
                    <Button
                        className="uppercase italic font-black tracking-widest text-xs"
                        color="var(--mission-accent)"
                        soft="var(--mission-accent-soft)"
                        glow="var(--mission-accent-glow)"
                    >
                        Get started today
                    </Button>
                    <Button
                        icon={ExternalLink}
                        className="uppercase italic font-black tracking-widest text-xs"
                        color="var(--mission-accent)"
                        soft="var(--mission-accent-soft)"
                        glow="var(--mission-accent-glow)"
                    >
                        View Examples
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default PortfolioHero;
