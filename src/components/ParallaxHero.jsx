import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';

const ParallaxHero = ({
    title = 'Portfolio',
    subtitle = 'Design Systems & Creative Work',
    tagline = 'Generalist Designer',
    backgroundImage = 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2400&auto=format&fit=crop',
    foregroundElements = true,
    showCTA = true,
    ctaText = 'View Work',
    ctaLink = '#portfolio-operations',
    height = '100vh',
}) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    // Parallax transforms for different layers
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const midY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
    const fgY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative overflow-hidden"
            style={{ height }}
        >
            {/* Background Layer - Slowest */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: bgY, scale: bgScale }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
            </motion.div>

            {/* Mid Layer - Atmospheric Fog */}
            <motion.div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{ y: midY }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C12] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#0D0C12] to-transparent" />
            </motion.div>

            {/* Foreground Elements - Fastest (decorative shapes/textures) */}
            {foregroundElements && (
                <motion.div
                    className="absolute inset-0 z-20 pointer-events-none"
                    style={{ y: fgY }}
                >
                    {/* Left decorative element */}
                    <div className="absolute left-0 bottom-0 w-[300px] h-[400px] opacity-40">
                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-transparent blur-3xl" />
                    </div>
                    {/* Right decorative element */}
                    <div className="absolute right-0 top-1/4 w-[250px] h-[350px] opacity-30">
                        <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/20 via-transparent to-transparent blur-3xl" />
                    </div>
                    {/* Floating particles */}
                    <div className="parallax-particles" />
                </motion.div>
            )}

            {/* Content Layer */}
            <motion.div
                className="absolute inset-0 z-30 flex items-end justify-start p-8 md:p-16 lg:p-20"
                style={{ y: textY, opacity: textOpacity }}
            >
                <div className="max-w-4xl">
                    {/* Tagline Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-orange-400" />
                        <span className="text-xs font-mono uppercase tracking-widest text-white/80">
                            {tagline}
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase italic tracking-tight leading-[0.9] mb-6"
                    >
                        {title}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="text-lg md:text-xl text-white/70 max-w-xl mb-8"
                    >
                        {subtitle}
                    </motion.p>

                    {/* CTA */}
                    {showCTA && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        >
                            <Button
                                as={ctaLink.startsWith('/') ? Link : 'a'}
                                to={ctaLink.startsWith('/') ? ctaLink : undefined}
                                href={!ctaLink.startsWith('/') ? ctaLink : undefined}
                                icon={ArrowRight}
                                className="uppercase italic font-black tracking-widest text-xs"
                            >
                                {ctaText}
                            </Button>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                <div className="flex flex-col items-center gap-2 text-white/50">
                    <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
                    <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
                </div>
            </motion.div>
        </section>
    );
};

export default ParallaxHero;
