import React, { useRef } from 'react';
import { ArrowRight, Brain, Boxes, PenTool, Wand2, Shield, Sparkles, Target, Monitor, Check, Zap, Layers, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import VideoHero from '../components/VideoHero';
import ParticleBackground from '../components/ParticleBackground';
import Logo from '../components/Logo';
import Button from '../components/Button';
import ProjectRequestForm from '../components/ProjectRequestForm';

const CASE_STUDIES = [
    {
        title: 'AI Command Console',
        desc: 'Multi-agent orchestration UI for ops teams with real-time telemetry and mission controls.',
        metric: '42% faster decision cycles',
        tag: 'AI Product',
        image: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=2400&auto=format&fit=crop'
    },
    {
        title: 'Industry Marketing Flyer',
        desc: 'Print + digital campaign kit with a production-ready style system and layout library.',
        metric: '3x campaign turnaround',
        tag: 'Marketing System',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2400&auto=format&fit=crop'
    },
    {
        title: 'Skunkworks OS',
        desc: 'Strategic design system with AI automation and rapid deployment tooling.',
        metric: '60% faster deployment',
        tag: 'System Design',
        image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=2400&auto=format&fit=crop'
    }
];

const PROCESS_STEPS = [
    {
        title: 'Recon & Strategy',
        desc: 'Discovery, constraints, objectives, and mission definition.',
        icon: Shield
    },
    {
        title: 'Design & Build',
        desc: 'UI, brand, systems, and AI-enabled product delivery.',
        icon: Monitor
    },
    {
        title: 'Deploy & Scale',
        desc: 'Handoff, automation, performance tuning, and growth.',
        icon: Target
    }
];



const WHAT_I_DO = [
    {
        title: 'AI-first Product Design',
        desc: 'UI systems, landing pages, and product flows built fast with design intelligence.',
        icon: Zap
    },
    {
        title: 'Automations + Workflow Design',
        desc: 'Custom AI pipelines for small business ops, content, and customer journeys.',
        icon: Layers
    },
    {
        title: 'Brand + Motion Systems',
        desc: 'Identity systems and motion assets that scale across web, video, and campaigns.',
        icon: Sparkles
    }
];

const WORKFLOW_STEPS = [
    {
        title: 'Idea and Inception',
        desc: 'Define the mission, audience, and outcome with a clear design brief.',
        tools: 'Strategy, discovery, creative direction',
        icon: Compass
    },
    {
        title: 'Tool Selection',
        desc: 'Choose the right stack: AI for speed, traditional tools for precision.',
        tools: 'Gemini 3.0 Pro, Veo 3, Google Flow, Canva Pro, Adobe Firefly',
        icon: Layers
    },
    {
        title: 'Prompt Generation (if warranted)',
        desc: 'Build prompts, variations, and style anchors to explore directions fast.',
        tools: 'Grok Video, ChatGPT Image, Sora',
        icon: Zap
    },
    {
        title: 'Production + Polish',
        desc: 'Finalize assets in Adobe Suite, align with the system, and deliver.',
        tools: 'Photoshop, Illustrator, After Effects, Figma',
        icon: Sparkles
    }
];

const Dashboard = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        container: containerRef,
        offset: ["start start", "end start"]
    });

    // Keep the background visible while still giving a subtle depth fade.
    const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

    return (
        <div
            ref={containerRef}
            data-scroll-container
            className="flex-1 overflow-y-auto surface-panel h-full relative"
        >
            <motion.div style={{ opacity: backgroundOpacity }} className="absolute inset-0 z-0 pointer-events-none">
                <ParticleBackground />
            </motion.div>

            <div className="relative z-10">
                <div className="animate-on-scroll">
                    <VideoHero />
                </div>

                <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-2 animate-on-scroll">
                    <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10 items-start">
                        <div className="relative">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-1)] bg-[var(--surface-2)] px-3 py-1 text-[10px] sm:text-[11px] uppercase tracking-widest text-[var(--text-2)] backdrop-blur">
                                General Designer
                            </span>
                            <h2 className="mt-6 text-[clamp(2rem,6vw,3.25rem)] font-semibold text-[var(--text-1)] tracking-tight leading-[1.05]">
                                A.I. Powered Designer
                            </h2>
                            <h3 className="text-[clamp(2rem,6vw,3.25rem)] font-semibold text-[var(--text-3)] tracking-tight leading-[1.05]">
                                A.I. Automations Developer
                            </h3>
                            <p className="mt-4 text-sm sm:text-base md:text-lg text-[var(--text-2)] max-w-3xl leading-relaxed">
                                Leveraging cutting-edge AI tools to enhance, not replace, original design.
                            </p>
                            <p className="mt-3 text-sm sm:text-base md:text-lg text-[var(--text-3)] max-w-3xl leading-relaxed">
                                A.I. Automations for small businesses to automate custom workflows.
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
                                    <div className="text-[11px] sm:text-sm tracking-[0.3em] text-[var(--text-1)] font-mono" aria-label="Five stars">
                                        *****
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
                                    <img
                                        src="/ODAbaby.jpg"
                                        alt="ODA Mascot"
                                        className="w-full rounded-[22px] bg-black/40"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <div className="animate-on-scroll">
                                <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-3)]">What I Do</div>
                                <h3 className="mt-3 text-2xl md:text-3xl font-bold text-[var(--text-1)]">
                                    AI design systems and human-grade execution.
                                </h3>
                                <p className="mt-3 text-[var(--text-3)] leading-relaxed">
                                    A hybrid workflow: rapid ideation with AI, then refine with traditional craft for accuracy and clarity.
                                </p>
                            </div>
                            <div className="space-y-4">
                                {WHAT_I_DO.map((item) => (
                                    <div key={item.title} className="storyline-step animate-on-scroll rounded-2xl border border-[var(--border-1)] bg-[var(--surface-2)] p-5 backdrop-blur-xl">
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 h-10 w-10 rounded-xl bg-[var(--surface-3)] border border-[var(--border-1)] flex items-center justify-center text-[var(--text-1)]">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-semibold text-[var(--text-1)]">{item.title}</h4>
                                                <p className="text-sm text-[var(--text-3)] mt-2">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute left-5 top-2 bottom-2 w-px bg-[var(--border-1)] storyline-line"></div>
                            <div className="space-y-6">
                                {WORKFLOW_STEPS.map((step, index) => (
                                    <div key={step.title} className="storyline-step animate-on-scroll relative pl-14">
                                        <div className="absolute left-0 top-1">
                                            <div className="h-10 w-10 rounded-full border border-[var(--border-1)] bg-[var(--surface-4)] flex items-center justify-center text-[var(--text-1)]">
                                                <step.icon className="w-5 h-5" />
                                            </div>
                                        </div>
                                        <div className="rounded-2xl border border-[var(--border-1)] bg-[var(--surface-2)] p-5 backdrop-blur-xl">
                                            <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-3)]">Step {index + 1}</div>
                                            <h4 className="text-lg font-semibold text-[var(--text-1)] mt-2">{step.title}</h4>
                                            <p className="text-sm text-[var(--text-3)] mt-2">{step.desc}</p>
                                            <div className="mt-3 text-xs font-mono text-[var(--text-3)]">{step.tools}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <div className="pt-8 pr-8 pb-8 pl-8 space-y-10">
                    <section className="animate-on-scroll">
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-lg font-semibold text-[var(--text-1)] tracking-tight">
                                Generalist Designer · A.I. Venture Studio
                            </h2>
                            <div className="h-px bg-[var(--border-1)] flex-1 ml-4"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="group relative rounded-2xl bg-blue-500/10 border border-blue-500/30 p-6 hover:border-blue-300/60 transition-all">
                                <div className="flex items-center gap-3 mb-4 text-blue-400">
                                    <Brain className="w-5 h-5" />
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-3)]">AI Apps</span>
                                </div>
                                <h3 className="text-xl font-bold text-[var(--text-1)] mb-2">Intelligent Products</h3>
                                <p className="text-sm text-[var(--text-3)]">Custom AI tools, copilots, and interfaces designed for real workflows.</p>
                            </div>
                            <div className="group relative rounded-2xl bg-rose-500/10 border border-rose-500/30 p-6 hover:border-rose-300/60 transition-all">
                                <div className="flex items-center gap-3 mb-4 text-rose-400">
                                    <Boxes className="w-5 h-5" />
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-3)]">Systems</span>
                                </div>
                                <h3 className="text-xl font-bold text-[var(--text-1)] mb-2">Workflow Engineering</h3>
                                <p className="text-sm text-[var(--text-3)]">Automation pipelines, data routing, and operational dashboards.</p>
                            </div>
                            <div className="group relative rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-6 hover:border-emerald-300/60 transition-all">
                                <div className="flex items-center gap-3 mb-4 text-emerald-400">
                                    <Wand2 className="w-5 h-5" />
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-3)]">Generative</span>
                                </div>
                                <h3 className="text-xl font-bold text-[var(--text-1)] mb-2">AI Artifacts</h3>
                                <p className="text-sm text-[var(--text-3)]">Visual experiments, motion systems, and generative brand assets.</p>
                            </div>
                            <div className="group relative rounded-2xl bg-[var(--surface-2)] border border-[var(--border-2)] p-6 hover:border-[var(--border-1)] transition-all">
                                <div className="flex items-center gap-3 mb-4 text-[var(--text-1)]">
                                    <PenTool className="w-5 h-5" />
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-3)]">Craft</span>
                                </div>
                                <h3 className="text-xl font-bold text-[var(--text-1)] mb-2">Coded Interfaces</h3>
                                <p className="text-sm text-[var(--text-3)]">Websites, components, and product UI built for speed and clarity.</p>
                            </div>
                        </div>
                    </section>

                    <section className="animate-on-scroll">
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-lg font-semibold text-[var(--text-1)] tracking-tight">Featured Systems & Builds</h2>
                            <div className="h-px bg-[var(--border-1)] flex-1 ml-4"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="group relative rounded-2xl overflow-hidden border border-[var(--border-1)] bg-[var(--surface-2)]">
                                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2400&auto=format&fit=crop" alt="AI Command Console" className="w-full h-56 object-cover opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />
                                <div className="p-6">
                                    <div className="text-[10px] font-mono text-[var(--text-3)] uppercase tracking-widest">AI Application</div>
                                    <h3 className="text-xl font-bold text-[var(--text-1)] mt-2">Command Console</h3>
                                    <p className="text-sm text-[var(--text-3)] mt-2">Multi-agent orchestration UI for ops and research teams.</p>
                                </div>
                            </div>
                            <div className="group relative rounded-2xl overflow-hidden border border-[var(--border-1)] bg-[var(--surface-2)]">
                                <img src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=2400&auto=format&fit=crop" alt="Industry Marketing Flyer" className="w-full h-56 object-cover opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />
                                <div className="p-6">
                                    <div className="text-[10px] font-mono text-[var(--text-3)] uppercase tracking-widest">Marketing Design</div>
                                    <h3 className="text-xl font-bold text-[var(--text-1)] mt-2">Industry Marketing Flyer</h3>
                                    <p className="text-sm text-[var(--text-3)] mt-2">Industrial brand flyer designed for web, print, and campaign rollouts.</p>
                                </div>
                            </div>
                            <div className="group relative rounded-2xl overflow-hidden border border-[var(--border-1)] bg-[var(--surface-2)]">
                                <img src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=2400&auto=format&fit=crop" alt="Generative Studio" className="w-full h-56 object-cover opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />
                                <div className="p-6">
                                    <div className="text-[10px] font-mono text-[var(--text-3)] uppercase tracking-widest">Generative Art</div>
                                    <h3 className="text-xl font-bold text-[var(--text-1)] mt-2">Lattice Series</h3>
                                    <p className="text-sm text-[var(--text-3)] mt-2">AI-designed visuals for identity, motion, and product UI.</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex">
                            <Button
                                as={Link}
                                to="/portfolio"
                                icon={ArrowRight}
                                className="uppercase italic font-black tracking-widest text-xs"
                            >
                                View the full portfolio
                            </Button>
                        </div>
                    </section>

                    <section className="animate-on-scroll">
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-lg font-semibold text-white tracking-tight">Flagship Case Studies</h2>
                            <div className="h-px bg-white/10 flex-1 ml-4"></div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {CASE_STUDIES.map((study) => (
                                <div key={study.title} className="group rounded-2xl border border-[var(--border-1)] bg-[var(--surface-2)] overflow-hidden">
                                    <div className="relative">
                                        <img src={study.image} alt={study.title} className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 text-[10px] font-mono text-white/70 uppercase tracking-widest">
                                            {study.tag}
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-[var(--text-1)]">{study.title}</h3>
                                            <p className="text-sm text-[var(--text-3)] mt-2">{study.desc}</p>
                                        </div>
                                        <div className="rounded-xl border border-[var(--border-1)] bg-[var(--surface-3)] px-4 py-3 text-sm text-[var(--text-1)]">
                                            {study.metric}
                                        </div>
                                        <Button className="uppercase italic font-black tracking-widest text-xs">
                                            View Case Study
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>


                    <section className="animate-on-scroll">
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-lg font-semibold text-white tracking-tight">Mission Process</h2>
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
                    </section>


                    <section className="animate-on-scroll">
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-lg font-semibold text-white tracking-tight">Special Operations Artwork</h2>
                            <div className="h-px bg-white/10 flex-1 ml-4"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="group relative rounded-2xl overflow-hidden border border-[var(--border-1)] bg-[var(--surface-2)]">
                                <img src="https://i.etsystatic.com/45034429/r/il/847430/7235012828/il_1140xN.7235012828_o0tj.jpg" alt="1st Special Forces Group Black Mug" className="w-full h-56 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="p-6">
                                    <div className="text-[10px] font-mono text-[var(--text-3)] uppercase tracking-widest">Merch Drop</div>
                                    <h3 className="text-xl font-bold text-[var(--text-1)] mt-2">1st Special Forces Group Mug</h3>
                                    <p className="text-sm text-[var(--text-3)] mt-2">Black mug with a green beret motif for daily fieldwork fuel.</p>
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
                                <img src="https://i.etsystatic.com/45034429/r/il/b48618/5907143193/il_1140xN.5907143193_4z4k.jpg" alt="1st Special Service Force Black Devils Mug" className="w-full h-56 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
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
                                <img src="https://i.etsystatic.com/45034429/r/il/0c7a68/5306378755/il_794xN.5306378755_6wpa.jpg" alt="Devils Brigade Legacy Logo" className="w-full h-56 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
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
                                <img src="https://i.etsystatic.com/45034429/r/il/0816ab/5859092760/il_1140xN.5859092760_hrxf.jpg" alt="Special Forces Patch Sticker" className="w-full h-56 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="p-6">
                                    <div className="text-[10px] font-mono text-[var(--text-3)] uppercase tracking-widest">Patch Archive</div>
                                    <h3 className="text-xl font-bold text-[var(--text-1)] mt-2">Special Forces Patch Sticker</h3>
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
                    </section>

                    <section className="animate-on-scroll">
                        <div className="rounded-3xl border border-[var(--border-1)] bg-[var(--surface-2)] p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <div className="text-[10px] font-mono text-orange-400 uppercase tracking-widest">Writing · Intel Hub</div>
                                <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-1)] mt-2">Field notes, research, and system breakdowns.</h3>
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
                    </section>


                    <section className="animate-on-scroll">
                        <ProjectRequestForm />
                    </section>


                </div>
            </div>
        </div>
    );
};

export default Dashboard;
