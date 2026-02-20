import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, ChevronLeft, ChevronRight, PlayCircle, ArrowRight, X } from 'lucide-react';
import Button from './Button';

const CARDS = [
    {
        id: 1,
        title: 'Web Design',
        subtitle: 'Modern digital experiences',
        description: 'Full-stack website design from landing pages to complex web applications. Responsive, fast, and conversion-focused designs built with modern frameworks and best practices.',
        src: '/web_design.png',
        gallery: ['/web_design.png', '/website_image2.png']
    },
    {
        id: 2,
        title: 'Mobile App Design',
        subtitle: 'Native & responsive UI',
        description: 'Beautiful mobile app interfaces for iOS and Android. User-centered design with intuitive navigation, seamless flows, and pixel-perfect execution.',
        src: '/homepage_whatido.png',
        gallery: ['/homepage_whatido.png', '/homepage_info.png']
    },
    {
        id: 3,
        title: 'Marketing Flyer',
        subtitle: 'Print & digital collateral',
        description: 'Eye-catching marketing flyers that drive action. From event promotions to product launches, designed to capture attention and communicate your message clearly.',
        src: '/URBAN SURVIVAL_flyer.png',
        gallery: ['/URBAN SURVIVAL_flyer.png', '/URBAN SURVIVAL_flyer.png']
    },
    {
        id: 4,
        title: 'Industrial Flyer',
        subtitle: 'B2B & technical design',
        description: 'Professional industrial and B2B marketing materials. Line cards, product sheets, and technical documentation designed to showcase capabilities and drive sales.',
        src: '/portfolio/example_Flyer.png',
        gallery: ['/portfolio/example_Flyer.png', '/portfolio/example_Flyer.png']
    },
    {
        id: 5,
        title: 'Branding + Logo Design',
        subtitle: 'Complete visual identity',
        description: 'Strategic brand identity development from logo creation to full brand systems. Memorable marks, cohesive color palettes, and typography that tells your story.',
        type: 'video',
        videoSrc: 'https://play.gumlet.io/embed/6979b30a0c58139a84b3faf0?background=false&autoplay=true&loop=true&disableControls=false',
        src: '/og-novarey.svg',
        gallery: ['/og-novarey.svg', '/mebannerport.png'],
        landscape: true
    },
    {
        id: 6,
        title: 'Social Media Marketing',
        subtitle: 'Content that converts',
        description: 'Scroll-stopping social media content and campaign design. Templates, graphics, and visual strategies optimized for engagement across all platforms.',
        type: 'video',
        videoSrc: 'https://play.gumlet.io/embed/69802addffc582b7d2f7304c?background=false&autoplay=true&loop=true&disableControls=false',
        src: '/mebannerport.png',
        gallery: ['/mebannerport.png', '/homepage_whatido.png'],
        landscape: true
    },
    {
        id: 7,
        title: 'A.I. Advising',
        subtitle: 'Future-ready workflows',
        description: 'AI integration consulting and workflow optimization. From prompt engineering to automation pipelines, helping you leverage cutting-edge AI tools for maximum efficiency.',
        src: '/aiservices_image.png',
        gallery: ['/aiservices_image.png', '/homepage_info.png']
    }
];

// Service Detail Modal
const ServiceModal = ({ card, isOpen, onClose }) => {
    if (!isOpen || !card) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

            {/* Modal Content */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25 }}
                className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0D0C12] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                    <X className="w-5 h-5 text-white" />
                </button>

                {/* Header */}
                <div className="p-8 md:p-10 border-b border-white/10">
                    <div className="text-xs font-mono text-orange-400 uppercase tracking-widest mb-2">
                        Service Overview
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tight">
                        {card.title}
                    </h2>
                    <p className="text-lg text-slate-400 mt-4 max-w-2xl leading-relaxed">
                        {card.description}
                    </p>
                </div>

                {/* Gallery - Side by Side */}
                <div className="p-8 md:p-10">
                    <div className="text-xs font-mono text-white/50 uppercase tracking-widest mb-6">
                        Sample Work
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {card.gallery.map((img, index) => (
                            <div
                                key={index}
                                className="min-h-[200px] max-h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0f] flex items-center justify-center p-4"
                            >
                                <img
                                    src={img}
                                    alt={`${card.title} sample ${index + 1}`}
                                    className="w-full h-auto max-h-[380px] object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = `
                                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-500/20 to-purple-500/20">
                                                <span class="text-white/40 text-sm font-mono">Image Coming Soon</span>
                                            </div>
                                        `;
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="p-8 md:p-10 border-t border-white/10 bg-white/5">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-slate-400">
                            Interested in this service? Let's discuss your project.
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
    const [isPaused, setIsPaused] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [expandedVideo, setExpandedVideo] = useState(null);
    const intervalRef = useRef(null);

    // Auto-rotation
    const AUTO_ROTATE_INTERVAL = 2200; // 2.2 seconds
    const SLOW_ROTATE_INTERVAL = 4000; // 4 seconds when hovering
    const VIDEO_PAUSE_INTERVAL = 10000; // 10 seconds for video cards

    const next = () => setCurrent((prev) => (prev + 1) % CARDS.length);
    const prev = () => setCurrent((prev) => (prev - 1 + CARDS.length) % CARDS.length);

    // Check if current card is a video
    const currentCard = CARDS[current];
    const isVideoCard = currentCard?.type === 'video';

    // Auto-rotate effect
    useEffect(() => {
        if (isPaused || selectedCard || expandedVideo) return;

        // Use longer interval for video cards
        const interval = isVideoCard
            ? VIDEO_PAUSE_INTERVAL
            : (isHovering ? SLOW_ROTATE_INTERVAL : AUTO_ROTATE_INTERVAL);

        intervalRef.current = setInterval(() => {
            next();
        }, interval);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPaused, isHovering, selectedCard, current, expandedVideo, isVideoCard]);

    const toggleSave = (id) => {
        setSaved(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const openModal = (card) => {
        setSelectedCard(card);
        setIsPaused(true);
    };

    const closeModal = () => {
        setSelectedCard(null);
        setIsPaused(false);
    };

    const openExpandedVideo = (card) => {
        setExpandedVideo(card);
        setIsPaused(true);
    };

    const closeExpandedVideo = () => {
        setExpandedVideo(null);
        setIsPaused(false);
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    return (
        <>
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

                <div
                    className="sm:px-8 sm:mt-16 max-w-5xl mt-16 mx-auto px-6 relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Progress indicators */}
                    <div className="flex justify-center gap-2 mb-8">
                        {CARDS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`h-1 rounded-full transition-all duration-500 ${i === current
                                    ? 'w-8 bg-orange-500'
                                    : 'w-2 bg-white/20 hover:bg-white/40'
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="sm:h-[600px] h-[500px] relative">
                        <div className="flex absolute inset-0 items-center justify-center">
                            {CARDS.map((card, i) => {
                                const offset = i - current;
                                // Handle wrap-around for smooth infinite loop feel
                                const adjustedOffset = offset > CARDS.length / 2
                                    ? offset - CARDS.length
                                    : offset < -CARDS.length / 2
                                        ? offset + CARDS.length
                                        : offset;
                                const depth = Math.abs(adjustedOffset);
                                const isCenter = adjustedOffset === 0;

                                if (depth > 3) return null;

                                const baseX = typeof window !== 'undefined' && window.innerWidth < 640 ? 50 : 80;
                                const baseY = typeof window !== 'undefined' && window.innerWidth < 640 ? 12 : 16;
                                const baseR = 6;

                                const translateX = adjustedOffset * baseX;
                                const translateY = depth * baseY + (isCenter ? 0 : 8);
                                const rotate = adjustedOffset * -baseR;
                                const scale = isCenter ? 1 : (depth === 1 ? 0.92 : depth === 2 ? 0.85 : 0.78);

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
                                            opacity: depth > 2 ? 0.4 : 1,
                                            zIndex: 100 - depth,
                                            filter: isCenter
                                                ? 'drop-shadow(0 20px 40px rgba(255,100,0,0.3))'
                                                : 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))'
                                        }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 120,
                                            damping: 20,
                                            mass: 1.2
                                        }}
                                        className={`absolute sm:w-[400px] ${card.landscape ? 'aspect-[16/9]' : 'aspect-[4/5]'} w-[80%] rounded-3xl overflow-hidden bg-[#14121D] border group cursor-pointer shadow-2xl transition-all duration-300 ${isCenter
                                            ? 'border-orange-500/50 hover:border-orange-400'
                                            : 'border-white/10'
                                            }`}
                                        style={{ pointerEvents: isCenter ? 'auto' : 'none' }}
                                        onClick={() => isCenter && openModal(card)}
                                        whileHover={isCenter ? { scale: 1.02, y: -5 } : {}}
                                    >
                                        {/* Video or Image content */}
                                        {card.type === 'video' && card.videoSrc ? (
                                            <div className="absolute inset-0">
                                                <iframe
                                                    title={card.title}
                                                    src={isCenter ? card.videoSrc : card.videoSrc.replace('autoplay=true', 'autoplay=false')}
                                                    className="w-full h-full border-none"
                                                    loading="lazy"
                                                    referrerPolicy="origin"
                                                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                                                />
                                                {!isCenter && (
                                                    <div className="absolute inset-0 bg-black/40" />
                                                )}
                                                {/* Expand button for video cards */}
                                                {isCenter && (
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); openExpandedVideo(card); }}
                                                        className="absolute top-4 left-4 z-20 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:bg-orange-500/30 hover:border-orange-400 transition-all group/expand"
                                                        title="Expand Video"
                                                    >
                                                        <svg className="w-5 h-5 text-white group-hover/expand:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        ) : (
                                            <img
                                                src={card.src}
                                                alt={card.title}
                                                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isCenter ? 'opacity-90 group-hover:opacity-100 group-hover:scale-105' : 'opacity-60'
                                                    }`}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        )}

                                        {/* Fallback gradient if no image */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-purple-500/20 to-blue-500/30 -z-10" />

                                        {/* Glow effect for center card */}
                                        {isCenter && (
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-transparent" />
                                            </div>
                                        )}

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

                                        {/* Click indicator for center card */}
                                        {isCenter && (
                                            <motion.div
                                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20"
                                                initial={{ opacity: 0 }}
                                                whileHover={{ opacity: 1 }}
                                            >
                                                <motion.span
                                                    className="text-xs font-mono uppercase tracking-widest text-white bg-orange-500/90 px-5 py-2.5 rounded-full border border-orange-400/50 shadow-lg"
                                                    initial={{ y: 10, opacity: 0 }}
                                                    whileInView={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.1 }}
                                                >
                                                    View Service
                                                </motion.span>
                                            </motion.div>
                                        )}

                                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/60 to-transparent">
                                            <h3 className={`text-2xl font-black italic tracking-tighter transition-colors ${isCenter ? 'text-white' : 'text-white/70'
                                                }`}>{card.title}</h3>
                                            <p className="text-sm font-mono text-slate-400 uppercase tracking-widest mt-1">{card.subtitle}</p>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </div>

                        {/* Controls */}
                        <div className="absolute inset-y-0 -left-4 sm:-left-12 flex items-center z-[110]">
                            <button
                                onClick={() => { prev(); setIsPaused(true); setTimeout(() => setIsPaused(false), 5000); }}
                                className="p-4 rounded-full bg-black/60 border border-white/10 text-white hover:bg-orange-500/20 hover:border-orange-500/50 transition-all backdrop-blur-md group"
                            >
                                <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                        <div className="absolute inset-y-0 -right-4 sm:-right-12 flex items-center z-[110]">
                            <button
                                onClick={() => { next(); setIsPaused(true); setTimeout(() => setIsPaused(false), 5000); }}
                                className="p-4 rounded-full bg-black/60 border border-white/10 text-white hover:bg-orange-500/20 hover:border-orange-500/50 transition-all backdrop-blur-md group"
                            >
                                <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Auto-rotate indicator */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => setIsPaused(!isPaused)}
                            className={`text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${isPaused
                                ? 'text-white/60 border-white/20 hover:border-white/40'
                                : 'text-orange-400 border-orange-500/30 bg-orange-500/10'
                                }`}
                        >
                            {isPaused ? '▶ Resume Auto-Play' : '⏸ Auto-Playing'}
                        </button>
                    </div>

                    {/* CTAs */}
                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
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

            {/* Service Modal */}
            <AnimatePresence>
                {selectedCard && (
                    <ServiceModal
                        card={selectedCard}
                        isOpen={!!selectedCard}
                        onClose={closeModal}
                    />
                )}
            </AnimatePresence>

            {/* Expanded Video Modal */}
            <AnimatePresence>
                {expandedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-8"
                        onClick={closeExpandedVideo}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

                        {/* Close Button */}
                        <button
                            onClick={closeExpandedVideo}
                            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        {/* Video Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden border border-orange-500/30 shadow-[0_0_100px_rgba(255,100,0,0.2)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                title={expandedVideo.title}
                                src={expandedVideo.videoSrc}
                                className="w-full h-full border-none"
                                loading="lazy"
                                referrerPolicy="origin"
                                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                            />
                        </motion.div>

                        {/* Video Title */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                            <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">
                                {expandedVideo.title}
                            </h3>
                            <p className="text-sm font-mono text-white/50 uppercase tracking-widest mt-1">
                                {expandedVideo.subtitle}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default PortfolioCarousel;
