import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import {
    ArrowRight,
    BarChart3,
    Bot,
    Brain,
    CheckCircle2,
    Code2,
    Cpu,
    Database,
    FileText,
    Layers,
    Mail,
    Megaphone,
    Monitor,
    PenTool,
    Search,
    Shield,
    Sparkles,
    Target,
    Wand2,
    Zap,
} from 'lucide-react';
import { fadeInUp, scrollReveal, staggerContainer, viewportConfig } from '../lib/animations';

const EASE = [0.22, 1, 0.36, 1];

const SERVICES = {
    brand: {
        icon: PenTool,
        accent: '#f472b6',
        accentSoft: 'rgba(244, 114, 182, 0.12)',
        accentLine: 'rgba(244, 114, 182, 0.32)',
        title: 'Brand Identity',
        eyebrow: 'Signal system',
        headline: 'A brand system people can recognize fast.',
        subtitle: 'Identity, image direction, typography, motion rules, and launch assets built as one usable system.',
        promise: 'I turn scattered taste, references, and business goals into a visual language your site, social, decks, and campaigns can keep using.',
        heroImage: '/portfolio/DesignPortfolio9.png',
        visualAlt: 'Premium graphic design identity system artwork',
        gallery: ['/portfolio/DesignPortfolio11.png', '/portfolio/DesignPortfolio12.png', '/portfolio/example_Flyer.png'],
        proof: ['Logo + visual language', 'Launch-ready assets', 'Rules your team can reuse'],
        methodTitle: 'Branding without loose parts.',
        method: [
            { label: 'Read', text: 'Audience, offer, references, competitors, and the visual codes that fit the business.' },
            { label: 'Shape', text: 'Fast concept exploration, then hand-edited direction for hierarchy, type, color, and image style.' },
            { label: 'Package', text: 'A working identity kit with enough rules to keep every new asset consistent.' },
        ],
        stack: ['Illustrator', 'Photoshop', 'After Effects', 'Canva Pro', 'AI image exploration', 'Motion references'],
        outcomes: [
            { icon: Target, title: 'Positioning', text: 'A clearer signal for who you are, what you sell, and why it should be trusted.' },
            { icon: Layers, title: 'Asset system', text: 'Reusable logo, type, color, layout, image, and social directions.' },
            { icon: Sparkles, title: 'Fast variation', text: 'AI speeds exploration without making the final brand look generated.' },
        ],
        timeline: '1-3 weeks',
        bestFor: 'New brands, rebrands, founder-led brands, content systems',
    },
    web: {
        icon: Code2,
        accent: '#60a5fa',
        accentSoft: 'rgba(96, 165, 250, 0.12)',
        accentLine: 'rgba(96, 165, 250, 0.32)',
        title: 'Web Development',
        eyebrow: 'Fast custom builds',
        headline: 'Websites that feel custom and load fast.',
        subtitle: 'Responsive React builds with clean SEO, compressed assets, polished motion, and clear conversion paths.',
        promise: 'I use AI-assisted coding to move faster, then inspect the code, layout, metadata, assets, and responsive behavior by hand.',
        heroImage: '/web_design.png',
        visualAlt: 'Custom website design and development preview',
        gallery: ['/website_image2.png', '/homepage_whatido.png', '/portfolio/DesignPortfolio7.png'],
        proof: ['Route-level loading', 'Responsive layouts', 'SEO-ready structure'],
        methodTitle: 'Build the useful path first.',
        method: [
            { label: 'Map', text: 'Routes, sections, CTAs, search intent, and the job each page has to do.' },
            { label: 'Build', text: 'Custom components, motion, media, and content structure without page-builder drag.' },
            { label: 'Tune', text: 'Images, chunks, spacing, mobile fit, metadata, and final browser checks.' },
        ],
        stack: ['React', 'Vite', 'Next.js patterns', 'Tailwind CSS', 'Framer Motion', 'Vercel / Netlify'],
        outcomes: [
            { icon: Zap, title: 'Speed', text: 'Lazy routes, compressed assets, and fewer dependencies where they are not needed.' },
            { icon: Monitor, title: 'Responsive UI', text: 'Text, cards, media, and CTAs shaped for desktop, tablet, and mobile.' },
            { icon: Search, title: 'SEO base', text: 'Titles, descriptions, canonical URLs, schema, and clean heading structure.' },
        ],
        timeline: '3 days - 4 weeks',
        bestFor: 'Landing pages, portfolios, service sites, dashboards, web apps',
    },
    marketing: {
        icon: Megaphone,
        accent: '#fb923c',
        accentSoft: 'rgba(251, 146, 60, 0.12)',
        accentLine: 'rgba(251, 146, 60, 0.32)',
        title: 'Strategic Marketing',
        eyebrow: 'Demand engine',
        headline: 'Marketing that makes the offer easier to believe.',
        subtitle: 'Positioning, SEO, content, landing pages, email, and campaign creative connected into one practical system.',
        promise: 'I simplify the offer, build the asset path, and create repeatable content workflows that support traffic, leads, and follow-up.',
        heroImage: '/homepage_info.png',
        visualAlt: 'Marketing strategy and content system preview',
        gallery: ['/portfolio/example_Flyer.png', '/URBAN SURVIVAL_flyer.png', '/portfolio/DesignPortfolio12.png'],
        proof: ['Search intent mapped', 'Campaign assets', 'Follow-up flow'],
        methodTitle: 'Make the message easier to move.',
        method: [
            { label: 'Find', text: 'Search intent, objections, competitor language, market gaps, and offer clarity.' },
            { label: 'Frame', text: 'Landing copy, content angles, visuals, and channel priorities built around the buyer.' },
            { label: 'Repeat', text: 'A workflow for publishing, measuring, learning, and improving the next pass.' },
        ],
        stack: ['SEO mapping', 'Content calendars', 'Google Analytics', 'Email sequences', 'Social creative', 'Landing pages'],
        outcomes: [
            { icon: Search, title: 'Visibility', text: 'Keyword-informed pages and content themes that support organic traffic.' },
            { icon: BarChart3, title: 'Campaign logic', text: 'Each campaign gets a goal, channel, message, and way to measure it.' },
            { icon: Mail, title: 'Lead flow', text: 'Landing pages, email, and follow-up copy aligned around the same offer.' },
        ],
        timeline: '1-4 weeks',
        bestFor: 'Launches, service offers, content engines, SEO refreshes',
    },
    ai: {
        icon: Cpu,
        accent: '#8b5cf6',
        accentSoft: 'rgba(139, 92, 246, 0.12)',
        accentLine: 'rgba(139, 92, 246, 0.32)',
        title: 'A.I. Solutions',
        eyebrow: 'Workflow intelligence',
        headline: 'AI systems that remove drag from real work.',
        subtitle: 'Copilots, automations, content systems, and private knowledge bases built around how your business already operates.',
        promise: 'The work starts with the process, not the model. I map the workflow, decide what should be automated, and keep human approval where it matters.',
        heroImage: '/aiservices_image.png',
        visualAlt: 'AI workflow and automation system preview',
        gallery: ['/portfolio/DesignPortfolio17.png', '/homepage_whatido.png', '/portfolio/DesignPortfolio14.png'],
        proof: ['Model routing', 'Private knowledge base', 'Human approval gates'],
        methodTitle: 'Use AI where it actually saves time.',
        method: [
            { label: 'Audit', text: 'Repetitive work, knowledge bottlenecks, handoff gaps, and high-value AI opportunities.' },
            { label: 'Route', text: 'Online models, local models, databases, automations, and approvals matched to the task.' },
            { label: 'Install', text: 'Prompts, tools, docs, and a workflow your team can keep running after launch.' },
        ],
        stack: ['OpenAI APIs', 'Claude / Gemini workflows', 'Hermes-style agents', 'Notion', 'Obsidian', 'Make / Zapier'],
        outcomes: [
            { icon: Bot, title: 'Copilots', text: 'Assistants for intake, support, research, drafting, and internal retrieval.' },
            { icon: Database, title: 'Memory', text: 'Client context organized into databases, vaults, SOPs, and references.' },
            { icon: Brain, title: 'Routing', text: 'Use the right model for the job instead of overspending on every request.' },
        ],
        timeline: '1-6 weeks',
        bestFor: 'Operations, content pipelines, internal copilots, client knowledge systems',
    },
};

const SERVICE_ORDER = ['brand', 'web', 'marketing', 'ai'];

const ServicePage = () => {
    const { slug = 'web' } = useParams();
    const data = SERVICES[slug];

    if (!data) {
        return (
            <main className="flex-1 overflow-y-auto bg-[#050506] h-full flex items-center justify-center px-5" data-scroll-container>
                <div className="max-w-md border border-white/10 bg-white/[0.035] p-8 text-center">
                    <h1 className="hero-title-compact text-white mb-3">Service not found</h1>
                    <p className="text-slate-400 mb-6">The service you are looking for does not exist.</p>
                    <Link to="/services/web" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-300 hover:text-blue-200">
                        View web services
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </main>
        );
    }

    const Icon = data.icon;
    const otherServices = SERVICE_ORDER.filter((key) => key !== slug).map((key) => [key, SERVICES[key]]);

    return (
        <main className="flex-1 h-full overflow-y-auto bg-[#050506] text-white selection:bg-white/20" data-scroll-container>
            <div className="service-grid-overlay pointer-events-none fixed inset-0 opacity-[0.055] bg-[linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[size:54px_54px]" />
            <div
                className="service-ambient-overlay pointer-events-none fixed inset-0"
                style={{
                    background: `radial-gradient(circle at 16% 10%, ${data.accentSoft}, transparent 30%), radial-gradient(circle at 84% 14%, rgba(20,184,166,0.1), transparent 26%), linear-gradient(180deg, rgba(5,5,6,0) 0%, #050506 86%)`,
                }}
            />

            <section className="relative px-5 pb-12 pt-8 md:px-10 md:pb-14 md:pt-10">
                <div className="mx-auto grid min-h-[76vh] max-w-7xl items-center gap-8 xl:grid-cols-[0.84fr_1.16fr]">
                    <motion.div variants={staggerContainer(0.08)} initial="hidden" animate="visible" className="max-w-3xl">
                        <motion.div
                            variants={fadeInUp}
                            className="hero-chip-text mb-5 inline-flex items-center gap-2 border px-3 py-2 font-black"
                            style={{ borderColor: data.accentLine, background: data.accentSoft, color: data.accent }}
                        >
                            <Icon className="h-3.5 w-3.5" />
                            {data.eyebrow}
                        </motion.div>
                        <motion.h1 variants={fadeInUp} className="max-w-4xl text-[2.55rem] font-black leading-[0.98] tracking-tight text-white sm:text-5xl md:text-[3.75rem]">
                            {data.headline}
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                            {data.subtitle}
                        </motion.p>
                        <motion.div variants={fadeInUp} className="mt-7 flex flex-col gap-3 sm:flex-row">
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
                                <Link
                                    to="/contact"
                                    className="inline-flex min-h-[48px] items-center justify-center gap-2 border px-5 text-sm font-black uppercase tracking-[0.12em] text-white"
                                    style={{ borderColor: data.accentLine, background: data.accentSoft }}
                                >
                                    Start this service
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </motion.div>
                            <Link to="/portfolio" className="inline-flex min-h-[48px] items-center justify-center border border-white/10 bg-white/[0.04] px-5 text-sm font-bold uppercase tracking-[0.12em] text-slate-200 transition hover:border-white/25 hover:bg-white/[0.08]">
                                See work
                            </Link>
                        </motion.div>
                        <motion.div variants={staggerContainer(0.055)} className="mt-8 hidden gap-3 sm:grid sm:grid-cols-3">
                            {data.proof.map((item) => (
                                <motion.div key={item} variants={fadeInUp} className="min-h-[82px] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl">
                                    <CheckCircle2 className="mb-3 h-4 w-4" style={{ color: data.accent }} />
                                    <div className="text-xs font-black leading-5 text-white">{item}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <ServiceVisual data={data} />
                </div>
            </section>

            <ServiceStory data={data} />

            <section className="relative px-5 py-10 md:px-10 md:py-14">
                <div className="mx-auto max-w-7xl">
                    <SectionIntro eyebrow="Outputs" title="Useful deliverables, not extra clutter." copy={data.promise} accent={data.accent} />
                    <motion.div
                        variants={staggerContainer(0.07)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        className="mt-7 grid gap-4 md:grid-cols-3"
                    >
                        {data.outcomes.map((outcome) => (
                            <motion.article
                                key={outcome.title}
                                variants={fadeInUp}
                                whileHover={{ y: -6 }}
                                transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                                className="min-h-[210px] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/[0.06]"
                            >
                                <div className="mb-5 flex h-11 w-11 items-center justify-center" style={{ background: data.accentSoft, color: data.accent }}>
                                    <outcome.icon className="h-5 w-5" />
                                </div>
                                <h3 className="text-xl font-black tracking-tight text-white">{outcome.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-300">{outcome.text}</p>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="relative px-5 py-10 md:px-10 md:py-14">
                <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                    <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl md:p-6">
                        <div className="mb-4 text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: data.accent }}>Stack</div>
                        <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">Lean tools. Faster turnaround.</h2>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                            The stack is selected to shorten production, reduce rework, and keep the result editable after handoff.
                        </p>
                    </motion.div>
                    <motion.div variants={staggerContainer(0.04)} initial="hidden" whileInView="visible" viewport={viewportConfig} className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                        {data.stack.map((tool) => (
                            <motion.div
                                key={tool}
                                variants={fadeInUp}
                                whileHover={{ y: -4 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                className="flex min-h-[76px] items-center border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-xl"
                            >
                                <span className="mr-3 h-2 w-2 shrink-0 rounded-full" style={{ background: data.accent, boxShadow: `0 0 18px ${data.accent}` }} />
                                <span className="text-sm font-bold text-white">{tool}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="relative px-5 pb-16 pt-10 md:px-10 md:pb-24">
                <div className="mx-auto max-w-7xl">
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        className="grid gap-6 border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl md:p-8 lg:grid-cols-[1fr_auto] lg:items-center"
                    >
                        <div>
                            <div className="mb-3 text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: data.accent }}>Start with scope</div>
                            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">Tell me what needs to move.</h2>
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                                Send the goal, current links, timeline, and what a successful result looks like. I will turn it into a clear build plan.
                            </p>
                        </div>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
                            <Link
                                to="/contact"
                                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 border px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white lg:w-auto"
                                style={{ borderColor: data.accentLine, background: data.accentSoft }}
                            >
                                Start a project
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="mt-8">
                        <div className="mb-4 flex items-center gap-4">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Other services</h2>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                            {otherServices.map(([key, service]) => (
                                <Link
                                    key={key}
                                    to={`/services/${key}`}
                                    className="group flex min-h-[84px] items-center gap-3 border border-white/10 bg-white/[0.035] p-4 transition hover:border-white/20 hover:bg-white/[0.055]"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center" style={{ background: service.accentSoft, color: service.accent }}>
                                        <service.icon className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="truncate text-sm font-black text-white">{service.title}</div>
                                        <div className="mt-1 truncate text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">{service.eyebrow}</div>
                                    </div>
                                    <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-500 transition group-hover:translate-x-1" />
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

const ServiceVisual = ({ data }) => {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="relative min-h-[420px] overflow-hidden border border-white/10 bg-white/[0.035] p-3 shadow-2xl backdrop-blur-xl md:min-h-[540px]"
        >
            <motion.img
                src={data.heroImage}
                alt={data.visualAlt}
                loading="eager"
                decoding="async"
                className="h-[300px] w-full object-cover md:h-[420px]"
                initial={reduceMotion ? false : { scale: 1.08, opacity: 0 }}
                animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: EASE }}
            />
            <div className="pointer-events-none absolute inset-3 bg-[linear-gradient(180deg,transparent_34%,rgba(0,0,0,0.72)),radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.16),transparent_26%)]" />

            <div className="absolute bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-3">
                {data.gallery.map((image, index) => (
                    <motion.div
                        key={image}
                        initial={reduceMotion ? false : { opacity: 0, y: 28, rotate: index === 1 ? 1.6 : -1.4 }}
                        animate={reduceMotion ? undefined : { opacity: 1, y: 0, rotate: index === 1 ? 1.2 : -0.8 }}
                        transition={{ delay: 0.22 + index * 0.08, duration: 0.65, ease: EASE }}
                        className="relative hidden aspect-[4/3] overflow-hidden border border-white/15 bg-black/30 shadow-2xl sm:block"
                    >
                        <img src={image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/15" />
                    </motion.div>
                ))}
            </div>

            <motion.div
                animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute right-5 top-5 border border-white/15 bg-black/45 px-4 py-3 backdrop-blur-xl"
            >
                <div className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: data.accent }}>{data.title}</div>
                <div className="mt-1 text-sm font-black text-white">{data.timeline}</div>
            </motion.div>
        </motion.div>
    );
};

const ServiceStory = ({ data }) => {
    const ref = useRef(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [28, -42]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.98, 1.03, 0.99]);

    return (
        <section ref={ref} className="relative px-5 py-10 md:px-10 md:py-16">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.88fr_1.12fr]">
                <div className="lg:sticky lg:top-10 lg:h-[calc(100vh-6rem)]">
                    <motion.div style={{ y, scale }} className="relative h-[420px] overflow-hidden border border-white/10 bg-white/[0.035] backdrop-blur-xl lg:h-full">
                        <img src={data.gallery[0]} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover opacity-80" />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.10),rgba(0,0,0,0.72)),radial-gradient(circle_at_26%_22%,rgba(255,255,255,0.16),transparent_28%)]" />
                        <div className="absolute bottom-5 left-5 right-5">
                            <div className="mb-3 text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: data.accent }}>Operator method</div>
                            <h2 className="max-w-2xl text-3xl font-black tracking-tight text-white md:text-5xl">{data.methodTitle}</h2>
                        </div>
                    </motion.div>
                </div>

                <motion.div variants={staggerContainer(0.1)} initial="hidden" whileInView="visible" viewport={viewportConfig} className="grid gap-4">
                    {data.method.map((item, index) => (
                        <motion.article
                            key={item.label}
                            variants={fadeInUp}
                            whileHover={{ x: 6 }}
                            transition={{ type: 'spring', stiffness: 390, damping: 22 }}
                            className="grid min-h-[190px] gap-5 border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl md:grid-cols-[90px_1fr]"
                        >
                            <div>
                                <span className="font-mono text-xs" style={{ color: data.accent }}>0{index + 1}</span>
                                <div className="mt-4 h-px w-14" style={{ background: data.accentLine }} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black tracking-tight text-white">{item.label}</h3>
                                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">{item.text}</p>
                            </div>
                        </motion.article>
                    ))}
                    <motion.div variants={fadeInUp} className="grid gap-3 border border-white/10 bg-black/25 p-5 backdrop-blur-xl sm:grid-cols-2">
                        <Signal label="Timeline" value={data.timeline} accent={data.accent} />
                        <Signal label="Best for" value={data.bestFor} accent={data.accent} />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

const Signal = ({ label, value, accent }) => (
    <div>
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</div>
        <div className="mt-2 text-sm font-black leading-6 text-white" style={{ color: label === 'Timeline' ? accent : undefined }}>{value}</div>
    </div>
);

const SectionIntro = ({ eyebrow, title, copy, accent }) => (
    <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="max-w-3xl">
        <div className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: accent }}>
            <span className="h-px w-8" style={{ background: accent }} />
            {eyebrow}
        </div>
        <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h2>
        <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">{copy}</p>
    </motion.div>
);

export default ServicePage;
