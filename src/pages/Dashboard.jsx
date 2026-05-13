import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowRight, Brain, Boxes, PenTool, Wand2, Target, Monitor, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import VideoHero from '../components/sections/VideoHero';
import Button from '../components/ui/Button';
import { staggerContainer, fadeInUp, scrollReveal, viewportConfig } from '../lib/animations';

const AIStudioBrief = lazy(() => import('../components/features/AIStudioBrief'));
const SpecialOpsTheater = lazy(() => import('../components/sections/SpecialOpsTheater'));
const ProjectRequestForm = lazy(() => import('../components/features/ProjectRequestForm'));



const PROCESS_STEPS = [
    {
        title: 'Strategy & Scope',
        desc: 'Clarify the audience, goals, constraints, and the fastest path to a polished launch.',
        icon: Boxes
    },
    {
        title: 'Design & Build',
        desc: 'Create the brand, interface, content system, and AI-enabled workflow in one connected pass.',
        icon: Monitor
    },
    {
        title: 'Launch & Improve',
        desc: 'Ship the experience, tune performance, simplify handoff, and keep the system easy to expand.',
        icon: Target
    }
];



const LazyMount = ({ children, minHeight = 360 }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isVisible) return undefined;
        const node = ref.current;
        if (!node || !('IntersectionObserver' in window)) {
            setIsVisible(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '560px 0px' }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [isVisible]);

    return (
        <div ref={ref} style={{ minHeight: isVisible ? undefined : minHeight }}>
            {isVisible ? <Suspense fallback={null}>{children}</Suspense> : null}
        </div>
    );
};

const Dashboard = () => {
    const containerRef = useRef(null);

    return (
        <div
            ref={containerRef}
            data-scroll-container
            className="flex-1 overflow-y-auto surface-panel h-full relative"
        >
            <div className="relative z-10">
                <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                    <VideoHero />
                </motion.div>

                <motion.section variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="px-4 sm:px-6 lg:px-8 pt-6 pb-2">
                    <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10 items-start">
                        <div className="relative">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-1)] bg-[var(--surface-2)] px-3 py-1 text-[10px] sm:text-[11px] uppercase tracking-widest text-[var(--text-2)] backdrop-blur">
                                General Designer
                            </span>
                            <h2 className="mt-6 max-w-3xl font-display text-[2.15rem] font-bold leading-[1.04] tracking-normal text-[var(--text-1)] md:text-[3.25rem]">
                                Design direction for AI-forward brands.
                            </h2>
                            <h3 className="mt-2 max-w-3xl font-display text-[2.15rem] font-bold leading-[1.04] tracking-normal text-[var(--text-3)] md:text-[3.25rem]">
                                Automation systems for work that repeats.
                            </h3>
                            <p className="mt-4 text-sm sm:text-base md:text-lg text-[var(--text-2)] max-w-3xl leading-relaxed">
                                I combine visual systems, web builds, and AI tooling into clean production workflows.
                            </p>
                            <p className="mt-3 text-sm sm:text-base md:text-lg text-[var(--text-3)] max-w-3xl leading-relaxed">
                                The result is practical creative infrastructure: faster content, sharper launches, and fewer manual handoffs.
                            </p>

                            <div className="mt-6 space-y-3 text-xs sm:text-sm text-[var(--text-2)]">
                                <div className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-blue-400" />
                                    <span>Adobe Suite | Midjourney | Canva Pro | Filmora</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-blue-400" />
                                    <span>Codex | Cursor AI | GitHub Copilot</span>
                                </div>
                            </div>

                            <div className="mt-7 flex flex-wrap items-center gap-4 sm:gap-6">
                                <Button
                                    as={Link}
                                    to="/about"
                                    className="uppercase italic font-black tracking-widest text-[10px] sm:text-xs"
                                >
                                    Discover Isaac
                                </Button>
                                <div className="flex items-center gap-3 text-[var(--text-2)]">
                                    <div className="text-[11px] sm:text-sm tracking-[0.2em] text-[var(--text-1)] font-mono" aria-label="Five out of five rating">
                                        5/5
                                    </div>
                                    <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[var(--text-3)]">Top Rated</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-start lg:justify-end">
                            <div className="relative max-w-[240px] sm:max-w-[280px] lg:max-w-[320px] w-full">
                                <div className="absolute -inset-4 rounded-[32px] bg-emerald-500/15 blur-3xl"></div>
                                <div className="absolute -inset-0.5 rounded-[28px] border border-white/10"></div>
                                <div className="relative rounded-[28px] border border-[var(--border-1)] bg-[var(--surface-2)] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl animate-float">
                                    <video
                                        src="/meanimated.mp4"
                                        poster="/ODAbaby.jpg"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        aria-label="Animated NovaRey character video"
                                        className="aspect-square w-full rounded-[22px] bg-black/40 object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>



                <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-10">
                    <motion.section variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-lg font-semibold text-[var(--text-1)] tracking-tight">
                                Generalist Designer · A.I. Venture Studio
                            </h2>
                            <div className="h-px bg-[var(--border-1)] flex-1 ml-4"></div>
                        </div>
                        <motion.div
                            variants={staggerContainer(0.1, 0.2)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            <motion.div variants={fadeInUp} className="group relative rounded-2xl bg-blue-500/10 border border-blue-500/30 p-6 hover:border-blue-300/60 transition-all">
                                <div className="flex items-center gap-3 mb-4 text-blue-400">
                                    <Brain className="w-5 h-5" />
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-3)]">AI Apps</span>
                                </div>
                                <h3 className="text-xl font-bold text-[var(--text-1)] mb-2">Intelligent Products</h3>
                                <p className="text-sm text-[var(--text-3)]">Custom AI tools, copilots, and interfaces designed for real workflows.</p>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="group relative rounded-2xl bg-rose-500/10 border border-rose-500/30 p-6 hover:border-rose-300/60 transition-all">
                                <div className="flex items-center gap-3 mb-4 text-rose-400">
                                    <Boxes className="w-5 h-5" />
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-3)]">Systems</span>
                                </div>
                                <h3 className="text-xl font-bold text-[var(--text-1)] mb-2">Workflow Engineering</h3>
                                <p className="text-sm text-[var(--text-3)]">Automation pipelines, data routing, and operational dashboards.</p>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="group relative rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-6 hover:border-emerald-300/60 transition-all">
                                <div className="flex items-center gap-3 mb-4 text-emerald-400">
                                    <Wand2 className="w-5 h-5" />
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-3)]">Generative</span>
                                </div>
                                <h3 className="text-xl font-bold text-[var(--text-1)] mb-2">AI Artifacts</h3>
                                <p className="text-sm text-[var(--text-3)]">Visual experiments, motion systems, and generative brand assets.</p>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="group relative rounded-2xl bg-[var(--surface-2)] border border-[var(--border-2)] p-6 hover:border-[var(--border-1)] transition-all">
                                <div className="flex items-center gap-3 mb-4 text-[var(--text-1)]">
                                    <PenTool className="w-5 h-5" />
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-3)]">Craft</span>
                                </div>
                                <h3 className="text-xl font-bold text-[var(--text-1)] mb-2">Coded Interfaces</h3>
                                <p className="text-sm text-[var(--text-3)]">Websites, components, and product UI built for speed and clarity.</p>
                            </motion.div>
                        </motion.div>
                    </motion.section>

                    <LazyMount minHeight={520}>
                        <AIStudioBrief />
                    </LazyMount>

                    <LazyMount minHeight={480}>
                        <SpecialOpsTheater />
                    </LazyMount>




                    <motion.section variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-lg font-semibold text-[var(--text-1)] tracking-tight">Studio Process</h2>
                            <div className="h-px bg-white/10 flex-1 ml-4"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {PROCESS_STEPS.map((step, idx) => (
                                <div key={step.title} className="rounded-2xl border border-[var(--border-1)] bg-[var(--surface-2)] p-6">
                                    <div className="flex items-center gap-3 text-orange-400 mb-4">
                                        <step.icon className="w-5 h-5" />
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-3)]">Step {idx + 1}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--text-1)]">{step.title}</h3>
                                    <p className="text-sm text-[var(--text-3)] mt-2">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>


                    <motion.section variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-lg font-semibold text-[var(--text-1)] tracking-tight">Heritage Artwork</h2>
                            <div className="h-px bg-white/10 flex-1 ml-4"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="group relative rounded-2xl overflow-hidden border border-[var(--border-1)] bg-[var(--surface-2)]">
                                <img src="https://i.etsystatic.com/45034429/r/il/847430/7235012828/il_1140xN.7235012828_o0tj.jpg" alt="Heritage black mug design" loading="lazy" decoding="async" className="w-full h-56 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="p-6">
                                    <div className="text-[10px] font-mono text-[var(--text-3)] uppercase tracking-widest">Merch Drop</div>
                                    <h3 className="text-xl font-bold text-[var(--text-1)] mt-2">Heritage Mark Mug</h3>
                                    <p className="text-sm text-[var(--text-3)] mt-2">Black mug with a bold emblem treatment for everyday studio use.</p>
                                    <Button
                                        as="a"
                                        href="https://www.etsy.com/listing/4376935562/1st-special-forces-group-black-mug-green?click_key=40c75940ce7415a7f13e448387128724b162a1a7%3A4376935562&click_sum=22d6ef53&sr_prefetch=1&pf_from=shop_home&ref=shop_home_active_5"
                                        target="_blank"
                                        rel="noreferrer"
                                        icon={ArrowRight}
                                        className="uppercase italic font-black tracking-widest text-xs mt-4"
                                    >
                                        View on Etsy
                                    </Button>
                                </div>
                            </div>
                            <div className="group relative rounded-2xl overflow-hidden border border-[var(--border-1)] bg-[var(--surface-2)]">
                                <img src="https://i.etsystatic.com/45034429/r/il/b48618/5907143193/il_1140xN.5907143193_4z4k.jpg" alt="1st Special Service Force Black Devils Mug" loading="lazy" decoding="async" className="w-full h-56 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="p-6">
                                    <div className="text-[10px] font-mono text-[var(--text-3)] uppercase tracking-widest">Black Devils Series</div>
                                    <h3 className="text-xl font-bold text-[var(--text-1)] mt-2">1st Special Service Force Mug</h3>
                                    <p className="text-sm text-[var(--text-3)] mt-2">WWII heritage design for 1st SSF and 1st SFG supporters.</p>
                                    <Button
                                        as="a"
                                        href="https://www.etsy.com/listing/1686064626/fssf-black-devil-legacy-mug-morphing?sr_prefetch=1&pf_from=shop_home&ref=shop_home_active_10&logging_key=16c360fcc6d446f8f0f633da59835a65a47c836a%3A1686064626"
                                        target="_blank"
                                        rel="noreferrer"
                                        icon={ArrowRight}
                                        className="uppercase italic font-black tracking-widest text-xs mt-4"
                                    >
                                        Shop on Etsy
                                    </Button>
                                </div>
                            </div>
                            <div className="group relative rounded-2xl overflow-hidden border border-[var(--border-1)] bg-[var(--surface-2)]">
                                <img src="https://i.etsystatic.com/45034429/r/il/0c7a68/5306378755/il_794xN.5306378755_6wpa.jpg" alt="Devils Brigade Legacy Logo" loading="lazy" decoding="async" className="w-full h-56 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="p-6">
                                    <div className="text-[10px] font-mono text-[var(--text-3)] uppercase tracking-widest">Legacy Poster</div>
                                    <h3 className="text-xl font-bold text-[var(--text-1)] mt-2">Devils Brigade Legacy</h3>
                                    <p className="text-sm text-[var(--text-3)] mt-2">Digital recreation of the 1st Special Service Force logo, built in Illustrator + Photoshop.</p>
                                    <Button
                                        as="a"
                                        href="https://www.etsy.com/listing/1559753481/devils-brigade-legacy-a-tribute-poster?sr_prefetch=1&pf_from=shop_home&ref=shop_home_active_4&dd=1&logging_key=6a6f73aa77ff969ca1bc478a13e960813ea2a6ac%3A1559753481"
                                        target="_blank"
                                        rel="noreferrer"
                                        icon={ArrowRight}
                                        className="uppercase italic font-black tracking-widest text-xs mt-4"
                                    >
                                        View on Etsy
                                    </Button>
                                </div>
                            </div>
                            <div className="group relative rounded-2xl overflow-hidden border border-[var(--border-1)] bg-[var(--surface-2)]">
                                <img src="https://i.etsystatic.com/45034429/r/il/0816ab/5859092760/il_1140xN.5859092760_hrxf.jpg" alt="Vector patch sticker design" loading="lazy" decoding="async" className="w-full h-56 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="p-6">
                                    <div className="text-[10px] font-mono text-[var(--text-3)] uppercase tracking-widest">Patch Archive</div>
                                    <h3 className="text-xl font-bold text-[var(--text-1)] mt-2">Patch Sticker Study</h3>
                                    <p className="text-sm text-[var(--text-3)] mt-2">Sticker design derived from an original unit patch layout.</p>
                                    <Button
                                        as="a"
                                        href="https://www.etsy.com/listing/1700255907/kiss-cut-stickers?sr_prefetch=1&pf_from=shop_home&ref=shop_home_active_5&logging_key=44fedaf28dd4278e565b681c0a62614da7f1d8a1%3A1700255907"
                                        target="_blank"
                                        rel="noreferrer"
                                        icon={ArrowRight}
                                        className="uppercase italic font-black tracking-widest text-xs mt-4"
                                    >
                                        View on Etsy
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                        <div className="rounded-3xl border border-[var(--border-1)] bg-[var(--surface-2)] p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <div className="text-[10px] font-mono text-orange-400 uppercase tracking-widest">Writing · Research Hub</div>
                                <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-1)] mt-2">Essays, research, and system breakdowns.</h3>
                                <p className="text-sm text-[var(--text-3)] mt-2 max-w-xl">A living archive of experiments, frameworks, and deep dives across AI, design, and product.</p>
                            </div>
                            <Button
                                as={Link}
                                to="/idrive"
                                icon={ArrowRight}
                                className="uppercase italic font-black tracking-widest text-xs"
                            >
                                Enter the Archive
                            </Button>
                        </div>
                    </motion.section>


                    <LazyMount minHeight={360}>
                        <ProjectRequestForm />
                    </LazyMount>


                </div>
            </div>
        </div>
    );
};

export default Dashboard;
