import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const ParallaxHero = ({
    title = 'Portfolio',
    subtitle = 'Design Systems & Creative Work',
    tagline = 'Generalist Designer',
    backgroundImage = 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2400&auto=format&fit=crop',
    showCTA = true,
    ctaText = 'View Work',
    ctaLink = '#portfolio-operations',
    height = '82vh',
}) => {
    const reduceMotion = useReducedMotion();

    return (
        <section
            className="relative overflow-hidden min-h-[620px] max-h-[900px]"
            style={{ height }}
        >
            <motion.div
                className="absolute inset-0"
                initial={reduceMotion ? false : { scale: 1.04, opacity: 0.88 }}
                animate={reduceMotion ? false : { scale: 1, opacity: 1 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
                <div
                    className="absolute inset-0 bg-contain bg-no-repeat bg-right-bottom md:bg-right"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0D0C12] via-[#0D0C12]/78 to-[#0D0C12]/10" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-[#0D0C12]" />
            </motion.div>

            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0D0C12] to-transparent" />

            <motion.div
                className="relative z-10 flex h-full items-end p-6 pb-12 sm:p-8 md:p-14 lg:p-20"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={reduceMotion ? false : { opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="max-w-4xl">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">
                        <Sparkles className="h-4 w-4 text-orange-400" />
                        <span className="hero-chip-text text-white/80">
                            {tagline}
                        </span>
                    </div>

                    <h1 className="hero-title text-white">
                        {title}
                    </h1>

                    <p className="hero-copy mt-6 max-w-2xl text-white/70">
                        {subtitle}
                    </p>

                    {showCTA && (
                        <div className="mt-8">
                            <Button
                                as={ctaLink.startsWith('/') ? Link : 'a'}
                                to={ctaLink.startsWith('/') ? ctaLink : undefined}
                                href={!ctaLink.startsWith('/') ? ctaLink : undefined}
                                icon={ArrowRight}
                                className="uppercase italic font-black tracking-widest text-xs"
                            >
                                {ctaText}
                            </Button>
                        </div>
                    )}
                </div>
            </motion.div>
        </section>
    );
};

export default ParallaxHero;
