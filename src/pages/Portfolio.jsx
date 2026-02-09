import React, { useEffect, useRef, useState } from 'react';
import DesignStudio from '../components/DesignStudio';
import { Link } from 'react-router-dom';
import PortfolioCarousel from '../components/PortfolioCarousel';
import PortfolioServices from '../components/PortfolioServices';
import PortfolioResults from '../components/PortfolioResults';
import { PortfolioFAQ } from '../components/PortfolioPricing';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { scrollReveal, viewportConfig } from '../lib/animations';
import { Play, Globe, X, ArrowUpRight, Radio, Shield, Sparkles, ArrowRight } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import Button from '../components/Button';
import ParallaxHero from '../components/ParallaxHero';
import StickyProjectTheater from '../components/StickyProjectTheater';
import StaggeredGrid from '../components/StaggeredGrid';
import HorizontalScrollGallery from '../components/HorizontalScrollGallery';


const AE_PROJECTS = [
    { id: 'ae-1', title: 'Cosmic Drift Showreel', year: '2024', tech: 'After Effects + Element 3D', src: 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4' },
    { id: 'ae-2', title: 'Neon Pulse Identity', year: '2023', tech: 'AE + Stardust', src: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-in-light-4841-large.mp4' },
    { id: 'ae-3', title: 'Future UI Glitch', year: '2024', tech: 'Motion Graphics', src: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-flow-of-particles-in-purple-and-blue-colors-4831-large.mp4' }
];

const WEB_PROJECTS = [
    { id: 'web-1', title: 'Lumiere Photography', type: 'Portfolio', url: 'lumiere.design' },
    { id: 'web-2', title: 'NovaRey V1', type: 'Agency', url: 'novarey.ventures' },
    { id: 'web-3', title: 'Skunkworks OS', type: 'SaaS', url: 'skunkworks.ai' }
];



// Featured projects for the immersive sticky theater section
const FEATURED_PROJECTS = [
    {
        id: 'fp-1',
        title: 'Industrial Branding & Marketing',
        description: 'Veteran-owned business marketing materials featuring dynamic product line cards, branding assets, and marketing collateral for industrial tool companies.',
        category: 'Branding',
        image: '/portfolio/DesignPortfolio6.png',
        tags: ['Adobe Suite', 'Marketing', 'Line Cards', 'Product Layouts'],
        metrics: [
            { label: 'Brands', value: '50+' },
            { label: 'Products', value: '200+' },
            { label: 'Deliverables', value: '15+' },
        ],
    },
    {
        id: 'fp-2',
        title: 'AI-Generated Visual Systems',
        description: 'Cutting-edge imagery created using advanced AI tools including MidJourney, DALL-E, Flux LoRA, and custom trained models for unique visual content.',
        category: 'AI Art',
        image: '/portfolio/DesignPortfolio11.png',
        tags: ['MidJourney', 'DALL-E 3', 'Flux LoRA', 'Stable Diffusion'],
        metrics: [
            { label: 'Generated', value: '500+' },
            { label: 'Tools', value: '7+' },
        ],
    },
    {
        id: 'fp-3',
        title: 'Custom AI Scene Integration',
        description: 'Face placement and character integration using Flux LoRA and RunwayML. Transform clients into any cinematic scene or movie universe.',
        category: 'AI Compositing',
        image: '/portfolio/DesignPortfolio17.png',
        tags: ['Flux LoRA', 'RunwayML', 'Face Swap', 'Scene Generation'],
        metrics: [
            { label: 'Scenes', value: '100+' },
            { label: 'Clients', value: '25+' },
        ],
    },
];

// Gallery items for horizontal scroll section
const GALLERY_ITEMS = [
    {
        id: 'g-1',
        title: 'Stock Image Generation',
        description: 'Custom AI-generated stock photography for any venue, attire, or style.',
        category: 'AI Photography',
        image: '/portfolio/DesignPortfolio12.png',
    },
    {
        id: 'g-2',
        title: 'Product Placement',
        description: 'Realistic AI imagery for coffee, food, and product marketing.',
        category: 'Commercial',
        image: '/portfolio/DesignPortfolio14.png',
    },
    {
        id: 'g-3',
        title: 'Website Design',
        description: 'Responsive websites built with Framer, Figma, and Adobe tools.',
        category: 'Web Design',
        image: '/portfolio/DesignPortfolio18.png',
    },
    {
        id: 'g-4',
        title: 'Business Branding',
        description: 'Official business branding, logo designs, and marketing themes.',
        category: 'Branding',
        image: '/portfolio/DesignPortfolio20.png',
    },
    {
        id: 'g-5',
        title: 'Logo & Line Cards',
        description: 'Dynamic industrial line cards and captivating logo branding.',
        category: 'Marketing',
        image: '/portfolio/DesignPortfolio7.png',
    },
    {
        id: 'g-6',
        title: 'Personal Branding',
        description: 'Custom logos and web design for influencers and content creators.',
        category: 'Branding',
        image: '/portfolio/DesignPortfolio15.png',
    },
];

const Portfolio = () => {
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [ypoHover, setYpoHover] = useState(false);
    const phoneScrollRef = useRef(null);
    const phoneImageRef = useRef(null);

    const ypoSrc = `https://play.gumlet.io/embed/6957d6f315b21a591c4e08cc?background=false&autoplay=${ypoHover ? 'true' : 'false'}&loop=true&disableControls=false`;
    const handleSpotlightMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        event.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        event.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };
    useEffect(() => {
        const updateScrollDistance = () => {
            const scrollEl = phoneScrollRef.current;
            const imgEl = phoneImageRef.current;
            if (!scrollEl || !imgEl) return;
            const screenEl = scrollEl.parentElement;
            if (!screenEl) return;

            const imgHeight = imgEl.getBoundingClientRect().height;
            const screenHeight = screenEl.getBoundingClientRect().height;
            const scrollDistance = Math.max(140, imgHeight - screenHeight);
            scrollEl.style.setProperty('--scroll-distance', `${scrollDistance}px`);

            const duration = Math.min(24, Math.max(12, scrollDistance / 40 + 10));
            scrollEl.style.setProperty('--scroll-duration', `${duration}s`);
        };

        updateScrollDistance();
        const imgEl = phoneImageRef.current;
        if (imgEl && !imgEl.complete) {
            imgEl.addEventListener('load', updateScrollDistance);
        }
        window.addEventListener('resize', updateScrollDistance);

        return () => {
            if (imgEl) {
                imgEl.removeEventListener('load', updateScrollDistance);
            }
            window.removeEventListener('resize', updateScrollDistance);
        };
    }, []);

    return (
        <div className="flex-1 overflow-y-auto h-full selection:bg-orange-500/30 font-sans" data-scroll-container>
            {/* Red Particle Background */}
            <ParticleBackground />

            {/* Cinematic Parallax Hero - Goonies Style */}
            <ParallaxHero
                title="Portfolio"
                subtitle="Design Systems, Motion Graphics & AI-Augmented Creative Work. From concept to completion."
                tagline="Generalist Designer"
                backgroundImage="/mebannerport.png"
                ctaText="Explore Work"
                ctaLink="#featured-projects"
                height="85vh"
            />

            {/* Navigation Bar with Links */}
            <motion.section variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="mx-6 md:mx-8 mt-6">
                <nav className="flex flex-wrap items-center justify-between gap-6 text-xs font-mono uppercase tracking-widest text-white/60 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                        <div className="inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded border border-white/10 text-white font-bold tracking-tight">
                            NV
                        </div>
                        <span className="hidden md:inline text-white/40">Novarey Ventures</span>
                        <div className="hidden md:flex items-center gap-6 ml-6 text-white/40">
                            <a href="#portfolio-operations" className="hover:text-white transition-colors">Operations</a>
                            <a href="#portfolio-about" className="hover:text-white transition-colors">Intel</a>
                            <a href="#portfolio-expertise" className="hover:text-white transition-colors">Capabilities</a>
                        </div>
                    </div>
                    <Button
                        as={Link}
                        to="/contact"
                        icon={Shield}
                        className="uppercase italic font-black tracking-widest text-[10px]"
                    >
                        Initiate Comms
                    </Button>
                </nav>
            </motion.section>

            <motion.section
                variants={scrollReveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                onMouseMove={handleSpotlightMove}
                onMouseLeave={(event) => {
                    event.currentTarget.style.setProperty('--mouse-x', '50%');
                    event.currentTarget.style.setProperty('--mouse-y', '50%');
                }}
                className="spotlight-group overflow-hidden bg-gradient-to-br from-white/10 via-white/0 to-white/10 rounded-[32px] ring-1 ring-white/10 mx-6 md:mx-8 mt-8"
            >
                <div className="spotlight-content px-8 md:px-12 py-12" id="portfolio-about">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-white leading-[0.95]">
                                Operator <span className="text-white/50 font-display italic">Designer</span>
                            </h2>
                            <div className="text-white/50 text-xs font-mono uppercase tracking-widest mt-4">
                                // From Kabul to Kernel
                            </div>
                        </div>
                        <div className="md:text-right">
                            <div className="text-emerald-400 text-xs font-mono uppercase tracking-widest">02</div>
                            <p className="text-white/70 text-lg max-w-sm ml-auto mt-3">
                                Special Operations Veteran. Design Generalist. Technologist.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                            <div className="text-3xl font-bold text-white">18+</div>
                            <div className="text-xs font-mono text-white/50 uppercase tracking-widest mt-2">Years Served</div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                            <div className="text-3xl font-bold text-white">Spec Ops</div>
                            <div className="text-xs font-mono text-white/50 uppercase tracking-widest mt-2">Background</div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                            <div className="text-3xl font-bold text-white">Full Stack</div>
                            <div className="text-xs font-mono text-white/50 uppercase tracking-widest mt-2">Design & Code</div>
                        </div>
                    </div>

                    <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 rounded-3xl overflow-hidden relative min-h-[360px] border border-white/10">
                            <div className="absolute inset-0 bg-emerald-900/20 mix-blend-overlay"></div>
                            <img
                                src="/me.png"
                                alt="Portrait"
                                className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
                            />
                            <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span className="text-xs text-white">Status: Active</span>
                                </div>
                                <p className="text-xs text-white/70 leading-relaxed">
                                    Operating globally via Novarey Ventures. Specializing in AI-augmented design workflows.
                                </p>
                            </div>
                        </div>
                        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
                            <h3 className="text-2xl md:text-4xl font-semibold text-white mb-6">
                                Discipline meets Design.
                            </h3>
                            <div className="space-y-5 text-white/70 text-base leading-relaxed">
                                <p>
                                    18 years in Special Operations (2005-2023) built a foundation of precision, speed, and adaptability.
                                    That discipline now powers my work across graphic design, motion, and AI automation.
                                </p>
                                <p>
                                    I operate as a Generalist Designer, bridging tactical execution with emerging creative technology,
                                    rapid iteration, and systems thinking.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            <section className="mx-6 md:mx-8 mt-8 space-y-6">
                <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                    <PortfolioCarousel />
                </motion.div>
                <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                    <PortfolioServices />
                </motion.div>
            </section>

            <motion.section variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="mx-6 md:mx-8 mt-10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-white/10 flex-1"></div>
                    <div className="text-xs font-mono uppercase tracking-[0.4em] text-white/60">Portfolio Categories</div>
                    <div className="h-px bg-white/10 flex-1"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/10">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <div className="text-[10px] font-mono uppercase tracking-widest text-white/50">Web + Mobile</div>
                                <h3 className="text-2xl md:text-3xl font-semibold text-white mt-3">Desktop & Mobile Web Design</h3>
                                <p className="text-sm text-slate-400 mt-3 max-w-md">
                                    Responsive web experiences, mobile-first flows, and product UI systems tuned for conversion.
                                </p>
                            </div>
                            <Button
                                as={Link}
                                to="/work"
                                className="uppercase italic font-black tracking-widest text-xs"
                            >
                                View Web Work
                            </Button>
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-6 items-center">
                            <div className="rounded-2xl border border-white/10 bg-[#12111A]/80 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/5">
                                <div className="aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/40 relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1600&auto=format&fit=crop"
                                        alt="Desktop interface preview"
                                        className="w-full h-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="mt-4 text-xs font-mono uppercase tracking-widest text-white/50">
                                    Desktop Experience
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <div className="phone-mockup transition-transform duration-300 hover:-translate-y-1">
                                    <div className="phone-screen">
                                        <div className="phone-scroll" ref={phoneScrollRef}>
                                            <img
                                                src="/homepage_info.png"
                                                alt="Mobile design preview"
                                                className="phone-scroll-image"
                                                ref={phoneImageRef}
                                            />
                                        </div>
                                    </div>
                                    <div className="phone-notch"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/10">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/80">A.I. Systems</div>
                        <h3 className="text-xl font-semibold text-white mt-3">A.I. Generated Imagery</h3>
                        <p className="text-sm text-slate-400 mt-3">
                            Photoreal imagery, concept art, and brand visuals generated with AI pipelines.
                        </p>
                        <div className="mt-4 rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/20 p-4 text-xs text-white/70">
                            Google Veo & Flow, MidJourney, Grok Imagine, Nano Banana, Stable Diffusion, Adobe Firefly
                        </div>
                        <h4 className="text-sm font-semibold text-white mt-5">A.I. Generated Video</h4>
                        <div className="mt-3 rounded-xl border border-white/10 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 p-4 text-xs text-white/70">
                            Grok Video, Veo 3, Filmora, Adobe Premiere, Adobe Suite (AI features + Firefly video)
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/10">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/80">Special Operations</div>
                        <h3 className="text-xl font-semibold text-white mt-3">Personal Heritage Art</h3>
                        <p className="text-sm text-slate-400 mt-3">
                            Unit-inspired artwork and legacy graphics rooted in Special Forces culture.
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <img
                                src="/ODA-3.png"
                                alt="Special operations art"
                                className="rounded-xl border border-white/10 bg-black/40 object-cover"
                            />
                            <img
                                src="/ODAbaby.jpg"
                                alt="Special operations art"
                                className="rounded-xl border border-white/10 bg-black/40 object-cover"
                            />
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/10">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/80">Pop Culture</div>
                        <h3 className="text-xl font-semibold text-white mt-3">Memes + Culture Drops</h3>
                        <p className="text-sm text-slate-400 mt-3">
                            Fast-turn visual culture pieces, meme design, and social-first graphics.
                        </p>
                        <div className="mt-4 rounded-xl border border-white/10 bg-gradient-to-br from-amber-500/20 via-transparent to-red-500/20 p-4 text-xs text-white/70">
                            Weekly culture drops and experimental series.
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/10">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/80">Marketing Collateral</div>
                        <h3 className="text-xl font-semibold text-white mt-3">Flyers + Campaigns</h3>
                        <p className="text-sm text-slate-400 mt-3">
                            Print + digital collateral, launch assets, and brand-ready templates.
                        </p>
                        <div className="mt-4 rounded-xl border border-white/10 bg-[#14121D]/70 p-4 text-xs text-white/70">
                            Event flyers, business promos, and sales collateral.
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/10">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/80">Marketing Video</div>
                        <h3 className="text-xl font-semibold text-white mt-3">Business Video Assets</h3>
                        <p className="text-sm text-slate-400 mt-3">
                            Promo videos, product reels, and motion systems built for business storytelling.
                        </p>
                        <div className="mt-4 rounded-xl border border-white/10 bg-gradient-to-br from-emerald-500/15 via-transparent to-sky-500/20 p-4 text-xs text-white/70">
                            Strategy-driven reels and motion stories.
                        </div>
                    </div>
                </div>
            </motion.section>



            {/* Design Studio Feature */}
            <div className="mb-20">
                <DesignStudio />
            </div>

            {/* Featured Projects - Immersive Theater Section */}
            <section id="featured-projects" className="py-10">
                <div className="px-6 md:px-12 lg:px-20 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-4"
                    >
                        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1" />
                        <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-white/50">
                            Featured Projects
                        </h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1" />
                    </motion.div>
                </div>
                <StickyProjectTheater projects={FEATURED_PROJECTS} />
            </section>

            {/* Horizontal Scroll Gallery */}
            <HorizontalScrollGallery items={GALLERY_ITEMS} title="Creative Gallery" />

            {/* Archive / Vault Section */}
            <div className="max-w-7xl mx-auto px-8 pb-32 pt-10 space-y-32" id="portfolio-operations">
                {/* Motion Studio Section */}
                <motion.section variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
                            <Play className="w-6 h-6 fill-current" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Marketing Video</h2>
                            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-1">Brand Stories // Promo & Campaign Reels</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            variants={scrollReveal}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportConfig}
                            whileHover={{ y: -8 }}
                            className="group cursor-pointer relative rounded-[2rem] overflow-hidden border border-white/5 bg-[#14121D]"
                        >
                            <div
                                className="aspect-video relative overflow-hidden"
                                onMouseEnter={() => setYpoHover(true)}
                                onMouseLeave={() => setYpoHover(false)}
                            >
                                <iframe
                                    title="YPO Marketing Video"
                                    src={ypoSrc}
                                    className="absolute inset-0 w-full h-full"
                                    style={{ border: 'none' }}
                                    loading="lazy"
                                    referrerPolicy="origin"
                                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                                ></iframe>
                                {!ypoHover && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-xs font-mono uppercase tracking-widest text-white">
                                        Hover to Play
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-1 uppercase italic tracking-tighter">YPO Marketing Film</h3>
                                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                                    <span>Brand Storytelling</span>
                                    <span>2024</span>
                                </div>
                            </div>
                        </motion.div>
                        {AE_PROJECTS.map(project => (
                            <motion.div
                                key={project.id}
                                variants={scrollReveal}
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewportConfig}
                                whileHover={{ y: -8 }}
                                className="group cursor-pointer relative rounded-[2rem] overflow-hidden border border-white/5 bg-[#14121D]"
                                onClick={() => setSelectedMedia(project)}
                            >
                                <div className="aspect-video relative overflow-hidden">
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                                    >
                                        <source src={project.src} type="video/mp4" />
                                    </video>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center">
                                            <Play className="w-5 h-5 fill-current" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-1 uppercase italic tracking-tighter">{project.title}</h3>
                                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                                        <span>{project.tech}</span>
                                        <span>{project.year}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Web Archive Section */}
                <motion.section variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                            <Globe className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Web Archive</h2>
                            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-1">Live Platforms // Design Systems</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {WEB_PROJECTS.map(site => (
                            <motion.div key={site.id} variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="group p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-all cursor-pointer flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] font-mono text-orange-500 uppercase tracking-widest block mb-1">{site.type}</span>
                                    <h3 className="text-lg font-bold text-white uppercase italic tracking-tighter">{site.title}</h3>
                                    <span className="text-sm text-slate-500 font-mono">{site.url}</span>
                                </div>
                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                    <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </div>

            {/* Remaining Reference Sections */}
            <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                <PortfolioResults />
            </motion.div>
            <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                <PortfolioFAQ />
            </motion.div>

            {/* Cinema Viewer Modal */}
            <AnimatePresence>
                {selectedMedia && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
                    >
                        <button
                            onClick={() => setSelectedMedia(null)}
                            className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(255,100,0,0.2)] border border-white/10 relative"
                        >
                            <video
                                autoPlay
                                controls
                                loop
                                className="w-full h-full object-cover"
                            >
                                <source src={selectedMedia.src} type="video/mp4" />
                            </video>

                            {/* Info Overlay */}
                            <div className="absolute bottom-0 inset-x-0 p-8 pt-20 bg-gradient-to-t from-black via-black/60 to-transparent">
                                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">{selectedMedia.title}</h2>
                                <p className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">
                                    {selectedMedia.tech} // RELEASE_YEAR_{selectedMedia.year}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Portfolio;

