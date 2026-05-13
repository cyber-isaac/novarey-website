import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Brain,
    CheckCircle2,
    Cpu,
    Database,
    Film,
    Image as ImageIcon,
    Layers,
    Lock,
    Network,
    PenTool,
    ShieldCheck,
    Sparkles,
    Zap,
} from 'lucide-react';
import { fadeInUp, scrollReveal, staggerContainer, viewportConfig } from '../lib/animations';

const HERO_IMAGES = [
    { src: '/aiservices_image.png', alt: 'AI service design dashboard and creative workflow interface', className: 'col-span-6 row-span-3 md:col-span-7' },
    { src: '/portfolio/DesignPortfolio11.png', alt: 'Graphic design portfolio artwork', className: 'col-span-3 row-span-2 md:col-span-3' },
    { src: '/portfolio/DesignPortfolio17.png', alt: 'AI-assisted cinematic design artwork', className: 'col-span-3 row-span-2 md:col-span-2' },
    { src: '/portfolio/DesignPortfolio12.png', alt: 'Brand and campaign visual system sample', className: 'col-span-6 row-span-2 md:col-span-5' },
];

const MODEL_STACK = [
    { name: 'Higgsfield', role: 'camera motion', icon: Film },
    { name: 'Seedance 2.0', role: 'video variants', icon: Sparkles },
    { name: 'Veo 3.1', role: 'cinematic scenes', icon: Film },
    { name: 'Grok Imagine', role: 'fast image boards', icon: ImageIcon },
    { name: 'Hermes Agent', role: 'routing + tasks', icon: Brain },
    { name: 'Qwen local lane', role: 'private drafting', icon: Lock },
];

const SYSTEM_LAYERS = [
    {
        title: 'Graphic Design Work',
        label: 'Taste layer',
        icon: PenTool,
        image: '/portfolio/DesignPortfolio9.png',
        copy: 'AI explores directions. I edit for hierarchy, taste, brand fit, composition, and client-ready polish.',
    },
    {
        title: 'AI Integration',
        label: 'Speed layer',
        icon: Cpu,
        image: '/aiservices_image.png',
        copy: 'Models are routed by task, not trend. Video, image, copy, research, and automation each get the right lane.',
    },
    {
        title: 'Closed Client Memory',
        label: 'Control layer',
        icon: Database,
        image: '/portfolio/DesignPortfolio14.png',
        copy: 'Obsidian and Notion keep briefs, assets, approvals, prompts, and decisions usable after delivery.',
    },
];

const FLOW = [
    { step: '01', title: 'Brief', copy: 'Offer, audience, taste, constraints.' },
    { step: '02', title: 'Route', copy: 'Hermes selects model lanes.' },
    { step: '03', title: 'Create', copy: 'Video, image, copy, and UI directions.' },
    { step: '04', title: 'Refine', copy: 'Human editing before anything ships.' },
];

const DELIVERABLES = [
    'AI model routing map',
    'Creative prompt library',
    'Obsidian client vault',
    'Notion asset database',
    'Image and video direction boards',
    'Approval and governance flow',
];

const EASE = [0.22, 1, 0.36, 1];

const AIStrategy = () => {
    return (
        <main className="relative h-full flex-1 overflow-y-auto bg-[#030609] text-white selection:bg-cyan-300/25" data-scroll-container>
            <div className="ai-strategy-ambient-overlay pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_4%,rgba(143,211,255,0.16),transparent_30%),radial-gradient(circle_at_76%_20%,rgba(255,255,255,0.08),transparent_26%),linear-gradient(180deg,rgba(3,6,9,0)_0%,#030609_78%)]" />
            <div className="ai-strategy-grid-overlay pointer-events-none fixed inset-0 opacity-[0.055] bg-[linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:64px_64px]" />

            <section className="relative px-4 pb-10 pt-8 sm:px-6 md:px-10 md:pb-16 md:pt-12">
                <div className="mx-auto grid min-h-[76vh] max-w-7xl items-center gap-8 xl:grid-cols-[0.82fr_1.18fr]">
                    <motion.div variants={staggerContainer(0.08)} initial="hidden" animate="visible" className="max-w-3xl">
                        <motion.div variants={fadeInUp} className="hero-chip-text mb-5 inline-flex items-center gap-2 border border-cyan-200/20 bg-cyan-200/10 px-3 py-2 text-cyan-50 shadow-[0_0_34px_rgba(143,211,255,0.10)]">
                            <Zap className="h-3.5 w-3.5" />
                            AI integrated intelligent design
                        </motion.div>
                        <motion.h1 variants={fadeInUp} className="max-w-4xl text-[2.55rem] font-black leading-[0.98] tracking-tight text-white sm:text-5xl md:text-[3.55rem] xl:text-[4.1rem]">
                            AI systems with a designer's eye.
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                            AI accelerates research, exploration, production, and handoff. The final graphic design stays custom, controlled, and polished.
                        </motion.p>
                        <motion.div variants={fadeInUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <PremiumLink to="/contact">Build my AI system</PremiumLink>
                            <Link to="/portfolio" className="inline-flex min-h-[48px] items-center justify-center border border-white/10 bg-white/[0.04] px-5 text-sm font-bold uppercase tracking-[0.12em] text-slate-200 transition hover:border-white/25 hover:bg-white/[0.08]">
                                View design work
                            </Link>
                        </motion.div>
                    </motion.div>

                    <HeroBoard />
                </div>
            </section>

            <section className="relative px-4 py-10 sm:px-6 md:px-10 md:py-16">
                <div className="mx-auto max-w-7xl">
                    <SectionIntro
                        eyebrow="Model routing"
                        title="A premium creative stack, edited with taste."
                        copy="The model list is not the product. The product is the system that turns models into approved brand assets, web visuals, campaign graphics, and client-owned workflows."
                    />
                    <motion.div variants={staggerContainer(0.055)} initial="hidden" whileInView="visible" viewport={viewportConfig} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                        {MODEL_STACK.map((model) => (
                            <motion.article key={model.name} variants={fadeInUp} className="group min-h-[154px] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-200/35 hover:bg-white/[0.065]">
                                <div className="mb-5 flex h-10 w-10 items-center justify-center border border-cyan-200/15 bg-cyan-200/10 text-cyan-100">
                                    <model.icon className="h-5 w-5" />
                                </div>
                                <h3 className="text-lg font-black tracking-tight text-white">{model.name}</h3>
                                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{model.role}</p>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="relative px-4 py-10 sm:px-6 md:px-10 md:py-16">
                <div className="mx-auto max-w-7xl">
                    <SectionIntro
                        eyebrow="Studio system"
                        title="Less AI aesthetic. More expensive output."
                        copy="The workflow is designed to avoid generic AI-looking work. AI accelerates exploration. Human direction controls the final image, typography, pacing, and brand logic."
                    />
                    <div className="grid gap-5 lg:grid-cols-3">
                        {SYSTEM_LAYERS.map((layer, index) => (
                            <LayerCard key={layer.title} layer={layer} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative px-4 py-10 sm:px-6 md:px-10 md:py-16">
                <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                    <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                        <div className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-cyan-100">
                            <Network className="h-4 w-4" />
                            Production flow
                        </div>
                        <h2 className="max-w-2xl text-4xl font-black leading-[0.98] tracking-tight text-white md:text-6xl">Turnaround gets faster. Quality stays expensive.</h2>
                        <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
                            The process is built for speed without letting raw AI output become the brand. Every stage has a human review gate.
                        </p>
                    </motion.div>

                    <motion.div variants={staggerContainer(0.08)} initial="hidden" whileInView="visible" viewport={viewportConfig} className="grid gap-3 sm:grid-cols-2">
                        {FLOW.map((item) => (
                            <motion.div key={item.step} variants={fadeInUp} className="group min-h-[170px] border border-white/10 bg-[#071017]/80 p-5 backdrop-blur-xl transition hover:border-cyan-200/35">
                                <div className="mb-8 flex items-center justify-between">
                                    <span className="font-mono text-xs text-cyan-200">{item.step}</span>
                                    <span className="h-px w-16 bg-gradient-to-r from-cyan-200/60 to-transparent" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight text-white">{item.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-400">{item.copy}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="relative px-4 py-10 sm:px-6 md:px-10 md:py-16">
                <div className="mx-auto max-w-7xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-xl">
                    <div className="grid lg:grid-cols-[1fr_0.72fr]">
                        <div className="p-5 sm:p-8 md:p-10">
                            <div className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-cyan-100">
                                <Database className="h-4 w-4" />
                                Closed client system
                            </div>
                            <h2 className="max-w-3xl text-4xl font-black leading-[0.98] tracking-tight text-white md:text-6xl">
                                Not a prompt folder. A client-owned creative operating system.
                            </h2>
                            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                                Obsidian stores the thinking. Notion manages assets, approvals, and tasks. Hermes Agent connects the work so clients keep the system after launch.
                            </p>
                            <motion.div variants={staggerContainer(0.045)} initial="hidden" whileInView="visible" viewport={viewportConfig} className="mt-8 grid gap-3 sm:grid-cols-2">
                                {DELIVERABLES.map((item) => (
                                    <motion.div key={item} variants={fadeInUp} className="flex items-center gap-3 border border-white/10 bg-black/25 px-4 py-3">
                                        <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-200" />
                                        <span className="text-sm font-semibold text-slate-200">{item}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                        <div className="relative min-h-[360px] border-t border-white/10 lg:border-l lg:border-t-0">
                            <img src="/portfolio/DesignPortfolio7.png" alt="AI-assisted visual design system reference" className="absolute inset-0 h-full w-full object-cover opacity-70" loading="lazy" decoding="async" />
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,6,9,0.88),rgba(3,6,9,0.42)),radial-gradient(circle_at_70%_28%,rgba(143,211,255,0.22),transparent_34%)]" />
                            <div className="absolute bottom-5 left-5 right-5 border border-white/10 bg-black/45 p-4 backdrop-blur-xl">
                                <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-100">
                                    <ShieldCheck className="h-4 w-4" />
                                    Human approved
                                </div>
                                <p className="text-sm leading-6 text-slate-200">Every generated direction gets edited, selected, and locked before it becomes brand material.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative px-4 pb-16 pt-8 sm:px-6 md:px-10 md:pb-24">
                <div className="mx-auto max-w-7xl border border-cyan-200/18 bg-cyan-200/[0.055] p-5 shadow-[0_30px_90px_rgba(143,211,255,0.08)] backdrop-blur-xl sm:p-8">
                    <div className="grid items-center gap-5 lg:grid-cols-[1fr_auto]">
                        <div>
                            <div className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-cyan-100">
                                <Layers className="h-4 w-4" />
                                Senior design direction + AI integration
                            </div>
                            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">Build a faster creative system without cheapening the brand.</h2>
                        </div>
                        <PremiumLink to="/contact">Request the strategy build</PremiumLink>
                    </div>
                </div>
            </section>
        </main>
    );
};

const PremiumLink = ({ to, children }) => (
    <Link to={to} className="inline-flex min-h-[48px] items-center justify-center gap-2 border border-cyan-200/35 bg-cyan-200/12 px-5 text-sm font-black uppercase tracking-[0.12em] text-white shadow-[0_18px_45px_rgba(143,211,255,0.10)] transition hover:border-cyan-100/65 hover:bg-cyan-200/18">
        <span>{children}</span>
        <ArrowRight className="h-4 w-4" />
    </Link>
);

const SectionIntro = ({ eyebrow, title, copy }) => (
    <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="mb-8 max-w-3xl">
        <div className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-cyan-100">
            <span className="h-px w-8 bg-cyan-200/70" />
            {eyebrow}
        </div>
        <h2 className="text-3xl font-black leading-[1.02] tracking-tight text-white md:text-5xl">{title}</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">{copy}</p>
    </motion.div>
);

const HeroBoard = () => (
    <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="relative">
        <div className="absolute -inset-6 rounded-[2rem] bg-cyan-200/10 blur-3xl" />
        <div className="relative overflow-hidden border border-white/10 bg-white/[0.045] p-3 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-4">
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/80 to-transparent"
                animate={{ x: ['-50%', '50%'] }}
                transition={{ duration: 5.8, repeat: Infinity, ease: 'linear' }}
            />
            <div className="grid h-[360px] grid-cols-6 grid-rows-5 gap-3 md:h-[500px] md:grid-cols-12">
                {HERO_IMAGES.map((image, index) => (
                    <motion.div
                        key={image.src}
                        className={`relative overflow-hidden border border-white/10 bg-black/40 ${image.className}`}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.08, duration: 0.7, ease: EASE }}
                    >
                        <img src={image.src} alt={image.alt} className="h-full w-full object-cover opacity-75 transition duration-700 hover:scale-[1.03] hover:opacity-100" loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    </motion.div>
                ))}
            </div>
            <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-3">
                {['taste check', 'model route', 'client memory'].map((item, index) => (
                    <div key={item} className="border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-xl">
                        <div className="text-[9px] font-black uppercase tracking-[0.18em] text-cyan-100">0{index + 1}</div>
                        <div className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-white">{item}</div>
                    </div>
                ))}
            </div>
        </div>
    </motion.div>
);

const LayerCard = ({ layer, index }) => (
    <motion.article variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="group overflow-hidden border border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-cyan-200/35">
        <div className="relative aspect-[4/3] overflow-hidden">
            <img src={layer.image} alt={`${layer.title} visual example`} className="h-full w-full object-cover opacity-72 transition duration-700 group-hover:scale-[1.035] group-hover:opacity-100" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030609] via-[#030609]/20 to-transparent" />
            <div className="absolute left-4 top-4 flex items-center gap-2 border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-xl">
                <layer.icon className="h-4 w-4 text-cyan-100" />
                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100">{layer.label}</span>
            </div>
            <span className="absolute bottom-4 right-4 font-mono text-xs text-white/45">0{index + 1}</span>
        </div>
        <div className="p-5">
            <h3 className="text-2xl font-black tracking-tight text-white">{layer.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{layer.copy}</p>
        </div>
    </motion.article>
);

export default AIStrategy;
