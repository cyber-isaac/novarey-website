import React, { useRef, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    const bgRef = useRef(null);
    const midRef = useRef(null);
    const fgRef = useRef(null);
    const textRef = useRef(null);
    const scrollIndicatorRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial Animation
            gsap.fromTo(bgRef.current, { scale: 1 }, { scale: 1.05, duration: 2, ease: 'power2.out' });
            gsap.fromTo(textRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.2 });
            gsap.fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 1, delay: 1.2 });

            // ScrollTrigger Parallax
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                }
            });

            tl.to(bgRef.current, { yPercent: 30, scale: 1.2, ease: 'none' }, 0)
                .to(midRef.current, { yPercent: 15, ease: 'none' }, 0)
                .to(fgRef.current, { yPercent: -10, ease: 'none' }, 0)
                .to(textRef.current, { yPercent: 60, opacity: 0, ease: 'none' }, 0);
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative overflow-hidden"
            style={{ height }}
        >
            {/* Background Layer - Slowest */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0 origin-center"
            >
                <div
                    className="absolute inset-0 bg-contain bg-no-repeat bg-right-bottom md:bg-right"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0D0C12] via-[#0D0C12]/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
            </div>

            {/* Mid Layer - Atmospheric Fog */}
            <div
                ref={midRef}
                className="absolute inset-0 z-10 pointer-events-none"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C12] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#0D0C12] to-transparent" />
            </div>

            {/* Foreground Elements - Fastest (decorative shapes/textures) */}
            {foregroundElements && (
                <div
                    ref={fgRef}
                    className="absolute inset-0 z-20 pointer-events-none"
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
                </div>
            )}

            {/* Content Layer */}
            <div
                ref={textRef}
                className="absolute inset-0 z-30 flex items-end justify-start p-8 md:p-16 lg:p-20"
            >
                <div className="max-w-4xl">
                    {/* Tagline Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-6">
                        <Sparkles className="w-4 h-4 text-orange-400" />
                        <span className="text-xs font-mono uppercase tracking-widest text-white/80">
                            {tagline}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white uppercase italic tracking-tight leading-[0.9] mb-6">
                        {title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-white/70 max-w-xl mb-8">
                        {subtitle}
                    </p>

                    {/* CTA */}
                    {showCTA && (
                        <div>
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
            </div>

            {/* Scroll Indicator */}
            <div
                ref={scrollIndicatorRef}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 opacity-0"
            >
                <div className="flex flex-col items-center gap-2 text-white/50">
                    <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
                    <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
                </div>
            </div>
        </section>
    );
};

export default ParallaxHero;
