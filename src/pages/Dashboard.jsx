import React, { useRef } from 'react';
import { ArrowRight, Brain, Boxes, PenTool, Target, Monitor, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import VideoHero from '../components/sections/VideoHero';
import Button from '../components/ui/Button';
import { staggerContainer, fadeInUp, scrollReveal, viewportConfig } from '../lib/animations';

import AIStudioBrief from '../components/features/AIStudioBrief';
import SpecialOpsTheater from '../components/sections/SpecialOpsTheater';



const PROCESS_STEPS = [
    {
        title: 'Strategy & Scope',
        desc: 'Clarify the audience, goals, constraints, and a practical plan for the project.',
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



const Dashboard = () => {
    const containerRef = useRef(null);

    return (
        <div
            ref={containerRef}
            data-scroll-container
            className="home-editorial flex-1 min-w-0 surface-panel relative"
        >
            <div className="relative z-10">
                <VideoHero />

                <motion.section variants={scrollReveal} initial={false} whileInView="visible" viewport={viewportConfig} className="home-intro px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-2">
                    <div className="responsive-split max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10 items-start">
                        <div className="relative">
                            <h2 className="mt-6 max-w-3xl font-display text-[2.15rem] font-bold leading-[1.04] tracking-normal text-[var(--text-1)] md:text-[3.25rem]">
                                Design for your website and brand.
                            </h2>
                            <p className="home-intro-secondary">
                                Business tools for the work you repeat.
                            </p>
                            <p className="mt-4 text-sm sm:text-base md:text-lg text-[var(--text-2)] max-w-3xl leading-relaxed">
                                I design websites, brand assets, and tools for everyday business tasks.
                            </p>
                            <p className="mt-3 text-sm sm:text-base md:text-lg text-[var(--text-3)] max-w-3xl leading-relaxed">
                                Explore the work below, from website layouts and industrial marketing materials to heritage illustration.
                            </p>

                            <div className="mt-7 flex flex-wrap items-center gap-4 sm:gap-6">
                                <Button
                                    as={Link}
                                    to="/about"
                                    className="home-action-label"
                                >
                                    Discover Isaac
                                </Button>

                            </div>
                        </div>

                        <div className="home-portrait flex justify-start lg:justify-end">
                            <div className="relative max-w-[240px] sm:max-w-[280px] lg:max-w-[320px] w-full">
                                <div className="absolute -inset-4 rounded-[32px] bg-emerald-500/15 blur-3xl"></div>
                                <div className="absolute -inset-0.5 rounded-[28px] border border-white/10"></div>
                                <div className="relative rounded-[28px] border border-[var(--border-1)] bg-[var(--surface-2)] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl motion-safe:animate-float">
                                    <video
                                        src="/meanimated.mp4"
                                        poster="/me.png"
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



                <div className="home-content mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-12 sm:space-y-16">
                    <motion.section variants={scrollReveal} initial={false} whileInView="visible" viewport={viewportConfig}>
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-lg font-semibold text-[var(--text-1)] tracking-tight">
                                What the studio makes
                            </h2>
                            <div className="h-px bg-[var(--border-1)] flex-1 ml-4"></div>
                        </div>
                        <motion.div
                            variants={staggerContainer(0.1, 0.2)}
                            initial={false}
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="home-capabilities"
                        >
                            <motion.div variants={fadeInUp} className="home-card info-card info-card--body group relative">
                                <div className="flex items-center gap-3 mb-4 text-blue-400">
                                    <Brain className="w-5 h-5" />
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-3)]">AI Apps</span>
                                </div>
                                <h3 className="text-xl font-bold text-[var(--text-1)] mb-2">Business tools</h3>
                                <p className="text-sm text-[var(--text-3)]">Custom AI tools, copilots, and interfaces designed for real workflows.</p>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="home-card info-card info-card--body group relative">
                                <div className="flex items-center gap-3 mb-4 text-rose-400">
                                    <Boxes className="w-5 h-5" />
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-3)]">Systems</span>
                                </div>
                                <h3 className="text-xl font-bold text-[var(--text-1)] mb-2">Workflow design</h3>
                                <p className="text-sm text-[var(--text-3)]">Automation pipelines, data routing, and operational dashboards.</p>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="home-card info-card info-card--body group relative">
                                <div className="flex items-center gap-3 mb-4 text-emerald-400">
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-3)]">Generative</span>
                                </div>
                                <h3 className="text-xl font-bold text-[var(--text-1)] mb-2">Visual studies</h3>
                                <p className="text-sm text-[var(--text-3)]">Visual experiments, motion systems, and generative brand assets.</p>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="home-card info-card info-card--body group relative">
                                <div className="flex items-center gap-3 mb-4 text-[var(--text-1)]">
                                    <PenTool className="w-5 h-5" />
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-3)]">Craft</span>
                                </div>
                                <h3 className="text-xl font-bold text-[var(--text-1)] mb-2">Websites and interfaces</h3>
                                <p className="text-sm text-[var(--text-3)]">Websites, components, and product UI built for speed and clarity.</p>
                            </motion.div>
                        </motion.div>
                    </motion.section>
                    <AIStudioBrief />

                    <SpecialOpsTheater />





                    <motion.section variants={scrollReveal} initial={false} whileInView="visible" viewport={viewportConfig}>
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-lg font-semibold text-[var(--text-1)] tracking-tight">Studio Process</h2>
                            <div className="h-px bg-white/10 flex-1 ml-4"></div>
                        </div>
                        <div className="home-process">
                            {PROCESS_STEPS.map((step, idx) => (
                                <div key={step.title} className="home-card info-card info-card--body">
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


                    <motion.section variants={scrollReveal} initial={false} whileInView="visible" viewport={viewportConfig}>
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-lg font-semibold text-[var(--text-1)] tracking-tight">Heritage Artwork</h2>
                            <div className="h-px bg-white/10 flex-1 ml-4"></div>
                        </div>
                        <div className="home-artwork-grid">
                            <div className="home-artwork-card group relative overflow-hidden rounded-2xl border border-[var(--border-1)] bg-[var(--surface-2)]">
                                <img src="https://i.etsystatic.com/45034429/r/il/847430/7235012828/il_1140xN.7235012828_o0tj.jpg" alt="Heritage black mug design" loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="flex flex-1 flex-col items-start p-5 sm:p-6">
                                    <div className="text-[10px] font-mono text-[var(--text-3)] uppercase tracking-widest">Merch Drop</div>
                                    <h3 className="text-xl font-bold text-[var(--text-1)] mt-2">Heritage Mark Mug</h3>
                                    <p className="text-sm text-[var(--text-3)] mt-2">Black mug with a bold emblem treatment for everyday studio use.</p>
                                    <Button
                                        as="a"
                                        href="https://www.etsy.com/listing/4376935562/1st-special-forces-group-black-mug-green?click_key=40c75940ce7415a7f13e448387128724b162a1a7%3A4376935562&click_sum=22d6ef53&sr_prefetch=1&pf_from=shop_home&ref=shop_home_active_5"
                                        target="_blank"
                                        rel="noreferrer"
                                        icon={ArrowRight}
                                        className="home-action-label mt-auto pt-4"
                                    >
                                        View on Etsy
                                    </Button>
                                </div>
                            </div>
                            <div className="home-artwork-card group relative overflow-hidden rounded-2xl border border-[var(--border-1)] bg-[var(--surface-2)]">
                                <img src="https://i.etsystatic.com/45034429/r/il/b48618/5907143193/il_1140xN.5907143193_4z4k.jpg" alt="1st Special Service Force Black Devils Mug" loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="flex flex-1 flex-col items-start p-5 sm:p-6">
                                    <div className="text-[10px] font-mono text-[var(--text-3)] uppercase tracking-widest">Black Devils Series</div>
                                    <h3 className="text-xl font-bold text-[var(--text-1)] mt-2">1st Special Service Force Mug</h3>
                                    <p className="text-sm text-[var(--text-3)] mt-2">WWII heritage design for 1st SSF and 1st SFG supporters.</p>
                                    <Button
                                        as="a"
                                        href="https://www.etsy.com/listing/1686064626/fssf-black-devil-legacy-mug-morphing?sr_prefetch=1&pf_from=shop_home&ref=shop_home_active_10&logging_key=16c360fcc6d446f8f0f633da59835a65a47c836a%3A1686064626"
                                        target="_blank"
                                        rel="noreferrer"
                                        icon={ArrowRight}
                                        className="home-action-label mt-auto pt-4"
                                    >
                                        Shop on Etsy
                                    </Button>
                                </div>
                            </div>
                            <div className="home-artwork-card group relative overflow-hidden rounded-2xl border border-[var(--border-1)] bg-[var(--surface-2)]">
                                <img src="https://i.etsystatic.com/45034429/r/il/0c7a68/5306378755/il_794xN.5306378755_6wpa.jpg" alt="Devils Brigade Legacy Logo" loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="flex flex-1 flex-col items-start p-5 sm:p-6">
                                    <div className="text-[10px] font-mono text-[var(--text-3)] uppercase tracking-widest">Legacy Poster</div>
                                    <h3 className="text-xl font-bold text-[var(--text-1)] mt-2">Devils Brigade Legacy</h3>
                                    <p className="text-sm text-[var(--text-3)] mt-2">Digital recreation of the 1st Special Service Force logo, built in Illustrator + Photoshop.</p>
                                    <Button
                                        as="a"
                                        href="https://www.etsy.com/listing/1559753481/devils-brigade-legacy-a-tribute-poster?sr_prefetch=1&pf_from=shop_home&ref=shop_home_active_4&dd=1&logging_key=6a6f73aa77ff969ca1bc478a13e960813ea2a6ac%3A1559753481"
                                        target="_blank"
                                        rel="noreferrer"
                                        icon={ArrowRight}
                                        className="home-action-label mt-auto pt-4"
                                    >
                                        View on Etsy
                                    </Button>
                                </div>
                            </div>
                            <div className="home-artwork-card group relative overflow-hidden rounded-2xl border border-[var(--border-1)] bg-[var(--surface-2)]">
                                <img src="https://i.etsystatic.com/45034429/r/il/0816ab/5859092760/il_1140xN.5859092760_hrxf.jpg" alt="Vector patch sticker design" loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="flex flex-1 flex-col items-start p-5 sm:p-6">
                                    <div className="text-[10px] font-mono text-[var(--text-3)] uppercase tracking-widest">Patch Archive</div>
                                    <h3 className="text-xl font-bold text-[var(--text-1)] mt-2">Patch Sticker Study</h3>
                                    <p className="text-sm text-[var(--text-3)] mt-2">Sticker design derived from an original unit patch layout.</p>
                                    <Button
                                        as="a"
                                        href="https://www.etsy.com/listing/1700255907/kiss-cut-stickers?sr_prefetch=1&pf_from=shop_home&ref=shop_home_active_5&logging_key=44fedaf28dd4278e565b681c0a62614da7f1d8a1%3A1700255907"
                                        target="_blank"
                                        rel="noreferrer"
                                        icon={ArrowRight}
                                        className="home-action-label mt-auto pt-4"
                                    >
                                        View on Etsy
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section variants={scrollReveal} initial={false} whileInView="visible" viewport={viewportConfig}>
                        <div className="rounded-3xl border border-[var(--border-1)] bg-[var(--surface-2)] p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <div className="text-[10px] font-mono text-orange-400 uppercase tracking-widest">Writing and research</div>
                                <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-1)] mt-2">Essays, research, and system breakdowns.</h3>
                                <p className="text-sm text-[var(--text-3)] mt-2 max-w-xl">A living archive of experiments, frameworks, and deep dives across AI, design, and product.</p>
                            </div>
                            <Button
                                as={Link}
                                to="/idrive"
                                icon={ArrowRight}
                                className="home-action-label"
                            >
                                Enter the Archive
                            </Button>
                        </div>
                    </motion.section>


                    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-10">
                        <h2 className="text-3xl font-bold text-[var(--text-1)]">Have a project in mind?</h2>
                        <p className="mt-3 mb-6 max-w-xl text-[var(--text-2)]">Share what you want to build, your timeline, and your budget. I’ll help you find the right starting point.</p>
                        <Button as={Link} to="/contact" icon={ArrowRight}>Start a Project</Button>
                    </section>


                </div>
            </div>
        </div>
    );
};

export default Dashboard;
