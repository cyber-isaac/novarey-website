import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, ChevronLeft, ChevronRight, Maximize2, Plus, X } from 'lucide-react';
import Button from '../ui/Button';
import { CARDS } from '../../data/portfolioCards';

const AUTO_ROTATE_INTERVAL = 4800;

const ServiceModal = ({ card, onClose }) => {
    if (!card) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div
                initial={{ scale: 0.96, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 16 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0D0C12] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-white/10 p-3 transition-colors hover:bg-white/20"
                    aria-label="Close service details"
                >
                    <X className="h-5 w-5 text-white" />
                </button>

                <div className="border-b border-white/10 p-7 md:p-9">
                    <div className="mb-2 text-xs font-mono uppercase tracking-widest text-orange-400">
                        Service Overview
                    </div>
                    <h2 className="text-3xl font-black uppercase italic tracking-tight text-white md:text-4xl">
                        {card.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
                        {card.description}
                    </p>
                </div>

                <div className="p-7 md:p-9">
                    <div className="mb-5 text-xs font-mono uppercase tracking-widest text-white/50">
                        Sample Work
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {card.gallery.map((img, index) => (
                            <div
                                key={`${img}-${index}`}
                                className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0f] p-3"
                            >
                                <img
                                    src={img}
                                    alt={`${card.title} sample ${index + 1}`}
                                    className="h-full w-full object-contain"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-white/10 bg-white/5 p-7 md:p-9">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <p className="text-sm text-slate-400">
                            Ready to turn this into a working system?
                        </p>
                        <Button
                            as="a"
                            href="/contact"
                            icon={ArrowRight}
                            className="uppercase italic font-black tracking-widest text-xs"
                        >
                            Get Started
                        </Button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const PortfolioCarousel = () => {
    const [current, setCurrent] = useState(0);
    const [saved, setSaved] = useState({});
    const [selectedCard, setSelectedCard] = useState(null);
    const [expandedVideo, setExpandedVideo] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const reduceMotion = useReducedMotion();
    const intervalRef = useRef(null);

    const next = () => setCurrent((prev) => (prev + 1) % CARDS.length);
    const prev = () => setCurrent((prev) => (prev - 1 + CARDS.length) % CARDS.length);

    useEffect(() => {
        if (reduceMotion || isPaused || isHovering || selectedCard || expandedVideo) return;

        intervalRef.current = window.setInterval(next, AUTO_ROTATE_INTERVAL);
        return () => window.clearInterval(intervalRef.current);
    }, [reduceMotion, isPaused, isHovering, selectedCard, expandedVideo]);

    const pauseBriefly = () => {
        setIsPaused(true);
        window.setTimeout(() => setIsPaused(false), 5000);
    };

    return (
        <section className="relative py-14 md:py-20">
            <div className="mx-auto max-w-3xl px-6 text-center">
                <div className="mb-4 text-[10px] font-mono uppercase tracking-[0.45em] text-orange-400/80">
                    Service Stack
                </div>
                <h2 className="text-4xl font-black italic tracking-tight text-white sm:text-5xl md:text-6xl leading-[0.95]">
                    One Designer.
                    <span className="block text-white/55">Multiple Outputs.</span>
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
                    A focused overview of the portfolio services, with heavier media deferred until the user asks for it.
                </p>
            </div>

            <div
                className="relative mx-auto mt-12 max-w-6xl px-5 sm:px-8"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div className="mb-6 flex justify-center gap-2">
                    {CARDS.map((card, index) => (
                        <button
                            key={card.id}
                            onClick={() => {
                                setCurrent(index);
                                pauseBriefly();
                            }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${index === current ? 'w-9 bg-orange-500' : 'w-3 bg-white/20 hover:bg-white/45'}`}
                            aria-label={`Show ${card.title}`}
                        />
                    ))}
                </div>

                <div className="relative h-[500px] sm:h-[580px]">
                    <div className="absolute inset-0 flex items-center justify-center">
                        {CARDS.map((card, index) => {
                            const rawOffset = index - current;
                            const offset = rawOffset > CARDS.length / 2
                                ? rawOffset - CARDS.length
                                : rawOffset < -CARDS.length / 2
                                    ? rawOffset + CARDS.length
                                    : rawOffset;
                            const depth = Math.abs(offset);
                            const isCenter = offset === 0;
                            if (depth > 2) return null;

                            return (
                                <motion.article
                                    key={card.id}
                                    initial={false}
                                    animate={{
                                        x: offset * 120,
                                        y: depth * 20,
                                        rotate: offset * -4,
                                        scale: isCenter ? 1 : depth === 1 ? 0.9 : 0.82,
                                        opacity: isCenter ? 1 : depth === 1 ? 0.72 : 0.35,
                                        zIndex: 20 - depth,
                                    }}
                                    transition={reduceMotion ? { duration: 0 } : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                                    className={`absolute w-[min(84vw,420px)] overflow-hidden rounded-2xl border bg-[#14121D] shadow-2xl ${card.landscape ? 'aspect-[16/10]' : 'aspect-[4/5]'} ${isCenter ? 'border-orange-500/50' : 'border-white/10'}`}
                                    style={{ pointerEvents: isCenter ? 'auto' : 'none' }}
                                >
                                    <img
                                        src={card.src}
                                        alt={card.title}
                                        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ${isCenter ? 'opacity-90 hover:scale-[1.035]' : 'opacity-55'}`}
                                        loading={isCenter ? 'eager' : 'lazy'}
                                        decoding="async"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

                                    <div className="absolute right-4 top-4 z-10 flex gap-2">
                                        {card.type === 'video' && card.videoSrc && (
                                            <button
                                                onClick={() => setExpandedVideo(card)}
                                                className="rounded-full border border-white/10 bg-black/55 p-3 text-white backdrop-blur transition-colors hover:border-orange-400/60 hover:bg-orange-500/20"
                                                aria-label={`Open ${card.title} video`}
                                            >
                                                <Maximize2 className="h-4 w-4" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => setSaved((prev) => ({ ...prev, [card.id]: !prev[card.id] }))}
                                            className="rounded-full border border-white/10 bg-black/55 p-3 text-white backdrop-blur transition-colors hover:bg-black/75"
                                            aria-label={saved[card.id] ? `Unsave ${card.title}` : `Save ${card.title}`}
                                        >
                                            {saved[card.id] ? <Check className="h-4 w-4 text-orange-400" /> : <Plus className="h-4 w-4" />}
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setSelectedCard(card);
                                            setIsPaused(true);
                                        }}
                                        className="absolute inset-x-5 bottom-5 z-10 rounded-xl border border-white/10 bg-black/55 p-5 text-left backdrop-blur-md transition-colors hover:border-orange-400/50 hover:bg-black/70"
                                    >
                                        <span className="block text-2xl font-black italic tracking-tight text-white">
                                            {card.title}
                                        </span>
                                        <span className="mt-1 block text-xs font-mono uppercase tracking-widest text-slate-400">
                                            {card.subtitle}
                                        </span>
                                    </button>
                                </motion.article>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => {
                            prev();
                            pauseBriefly();
                        }}
                        className="absolute left-0 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-3 text-white backdrop-blur transition-colors hover:border-orange-500/50 hover:bg-orange-500/20 sm:-left-4"
                        aria-label="Previous portfolio service"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => {
                            next();
                            pauseBriefly();
                        }}
                        className="absolute right-0 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-3 text-white backdrop-blur transition-colors hover:border-orange-500/50 hover:bg-orange-500/20 sm:-right-4"
                        aria-label="Next portfolio service"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>

                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <button
                        onClick={() => setIsPaused(!isPaused)}
                        className={`rounded-full border px-4 py-2 text-xs font-mono uppercase tracking-widest transition-colors ${isPaused || reduceMotion ? 'border-white/20 text-white/60 hover:border-white/40' : 'border-orange-500/30 bg-orange-500/10 text-orange-400'}`}
                    >
                        {isPaused || reduceMotion ? 'Resume Rotation' : 'Auto Rotating'}
                    </button>
                    <Button
                        as="a"
                        href="#featured-projects"
                        icon={ArrowRight}
                        className="uppercase italic font-black tracking-widest text-xs"
                    >
                        View Featured Work
                    </Button>
                </div>
            </div>

            <AnimatePresence>
                {selectedCard && (
                    <ServiceModal
                        card={selectedCard}
                        onClose={() => {
                            setSelectedCard(null);
                            setIsPaused(false);
                        }}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {expandedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-8"
                        onClick={() => {
                            setExpandedVideo(null);
                            setIsPaused(false);
                        }}
                    >
                        <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
                        <button
                            onClick={() => setExpandedVideo(null)}
                            className="absolute right-6 top-6 z-10 rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20"
                            aria-label="Close video"
                        >
                            <X className="h-6 w-6 text-white" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.96, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.96, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="relative aspect-video w-full max-w-6xl overflow-hidden rounded-2xl border border-orange-500/30 shadow-[0_0_100px_rgba(255,100,0,0.2)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                title={expandedVideo.title}
                                src={expandedVideo.videoSrc}
                                className="h-full w-full border-0"
                                loading="lazy"
                                referrerPolicy="origin"
                                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PortfolioCarousel;
