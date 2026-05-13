import React, { Suspense, lazy } from 'react';
import {
    Crosshair,
    ArrowRight,
    Sparkles,
    Cpu,
    Wand2,
    Palette,
    Film,
    BadgeCheck,
    Briefcase,

    PenTool
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { DESTINATIONS } from '../data/militaryDestinations';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, scrollReveal, viewportConfig } from '../lib/animations';

const AuraBackground = lazy(() => import('../components/visuals/AuraBackground'));
const DesignStudio = lazy(() => import('../components/features/DesignStudio'));
const GlitchReveal = lazy(() => import('../components/ui/GlitchReveal'));
const MilitaryHistoryGlobe = lazy(() => import('../components/visuals/MilitaryHistoryGlobe'));

const SKILLS = {
    design: ['Visual Design', 'Brand Development', 'AI-Enhanced Design', 'Marketing Design', 'Cross Platform Design', 'Design Systems'],
    technical: ['Adobe Creative Suite', 'Visual Studio Code', 'ChatGPT', 'Claude AI', 'MidJourney', 'RunwayML', 'BotPress'],
    leadership: ['Project Management', 'Operations Leadership', 'Stakeholder Engagement', 'Team Leadership', 'Strategic Planning'],
    certifications: ['PMP Certified', 'Cybersecurity', 'Operations Strategy', 'Client Systems']
};

const TOOLSTACK = [
    'Adobe After Effects',
    'Adobe Illustrator',
    'Adobe Photoshop',
    'Figma',
    'Framer',
    'Notion',
    'Cursor',
    'ChatGPT / GPT-4o'
];

const SERVICES = [
    'Brand identity + logo systems',
    'Marketing design + campaign rollout',
    'AI workflow generation + enhancement',
    'Product UI + design systems',
    'Motion design + logo animation',
    'Custom web + component builds'
];

const HERO_PROOF = [
    { label: 'Career experience', value: '17.5 yrs' },
    { label: 'Design + AI builds', value: '100+' },
    { label: 'Response rhythm', value: '24h' }
];

const HERO_FOCUS = [
    'Sharper brands',
    'Smarter workflows',
    'Web experiences that move'
];

const About = () => {
    return (
        <div className="flex-1 overflow-y-auto h-full p-8 pb-20 selection:bg-orange-500/30 font-sans relative" data-scroll-container>
            <Suspense fallback={null}>
                <AuraBackground />
            </Suspense>

            {/* Hero Media */}
            <motion.section className="max-w-6xl mx-auto pt-6 md:pt-10" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                <div className="space-y-4">
                    <Suspense fallback={<div className="h-[520px] rounded-3xl border border-white/10 bg-white/[0.04] md:h-[640px]" />}>
                        <GlitchReveal
                            leftSrc="/mestandingbw.png"
                            rightSrc="/meanimated.mp4"
                            rightType="video"
                            labelLeft="Afghanistan // Original"
                            labelRight="AI Motion Variant"
                            overlayText="Hey I'm Isaac"
                            className="h-[520px] md:h-[640px]"
                        />
                    </Suspense>
                    <div className="text-center text-[11px] font-mono uppercase tracking-[0.4em] text-orange-400/90 drop-shadow-[0_0_12px_rgba(251,146,60,0.7)]">
                        Slide for A.I. Transformation
                    </div>
                </div>
            </motion.section>

            {/* Hero */}
            <motion.section className="max-w-6xl mx-auto pt-10 md:pt-[4.5rem]" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-8 lg:gap-14 xl:gap-16 items-start"
                    variants={staggerContainer(0.08)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                >
                    <motion.div variants={fadeInUp} className="min-w-0 max-w-[760px]">
                        <div className="inline-flex max-w-full items-center gap-3 text-[10px] sm:text-[11px] uppercase font-semibold text-white/75 font-mono px-4 py-2 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur">
                            <span className="relative flex h-2 w-2 shrink-0">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300"></span>
                            </span>
                            <span className="hero-chip-text">Open for selected projects</span>
                        </div>
                        <p className="hero-kicker mt-8 font-medium text-white/65">
                            Isaac Reyes / NovaRey Ventures
                        </p>
                        <h1 className="hero-title text-white mt-5 max-w-[720px] text-[clamp(2.45rem,3.6vw,3.45rem)] leading-[1.1]">
                            <span className="block">Clear creative systems.</span>
                            <span className="block">Built to move.</span>
                        </h1>
                        <p className="hero-copy mt-8 max-w-[620px] text-slate-300">
                            I help founders, teams, and growing brands turn rough ideas into sharp identity systems, useful AI workflows, and web experiences that feel polished from the first impression.
                        </p>
                    </motion.div>

                    <motion.aside
                        variants={fadeInUp}
                        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] p-5 sm:p-7 backdrop-blur-xl lg:mt-7"
                    >
                        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl"></div>
                        <div className="absolute -bottom-20 left-6 h-44 w-44 rounded-full bg-emerald-400/10 blur-3xl"></div>
                        <div className="relative">
                            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-orange-300/80 font-mono">
                                <Sparkles className="w-4 h-4" />
                                Design that works.
                            </div>
                            <p className="mt-6 text-2xl sm:text-[2rem] font-semibold tracking-tight text-white leading-[1.12]">
                                Premium visuals, practical systems, and faster creative turnaround.
                            </p>
                            <div className="mt-7 space-y-3.5">
                                {HERO_FOCUS.map((item, i) => (
                                    <motion.div
                                        key={item}
                                        variants={fadeInUp}
                                        className="flex min-h-[54px] items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5"
                                    >
                                        <span className="text-sm text-slate-300">{item}</span>
                                        <span className="text-[10px] font-mono text-white/35">0{i + 1}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.aside>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12">
                    <motion.div
                        className="lg:col-span-5 border border-white/10 bg-white/5"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewportConfig}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="relative overflow-hidden">
                            <img
                                src="/isaac-portrait.png"
                                alt="Isaac Reyes - designer, systems builder, and AI studio lead"
                                className="lg:h-[520px] w-full h-[420px] object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-xs font-mono text-white/70 uppercase tracking-widest">
                                Archive portrait // Field work
                            </div>
                        </div>
                    </motion.div>

                    <div className="lg:col-span-7">
                        <div className="h-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <BadgeCheck className="w-4 h-4 text-white/40" />
                                    <div className="h-px flex-1 bg-white/10"></div>
                                </div>
                                <motion.div
                                    className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewportConfig}
                                    variants={staggerContainer(0.08)}
                                >
                                    {HERO_PROOF.map((item) => (
                                        <motion.div
                                            key={item.label}
                                            variants={fadeInUp}
                                            whileHover={{ y: -4 }}
                                            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                                            className="rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-4"
                                        >
                                            <div className="text-2xl font-black italic text-white">{item.value}</div>
                                            <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/45 font-mono">{item.label}</div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                                <p className="text-base sm:text-lg leading-relaxed text-slate-300 mb-8">
                                    My edge is simple: I can read the room, build the system, and make the final thing feel
                                    clean, useful, and alive. Strategy, visuals, AI, and execution in one lane.
                                </p>
                                <div className="flex flex-wrap gap-3 mb-8">
                                    {['Brand systems', 'AI workflows', 'Product UI', 'Motion websites'].map((item) => (
                                        <motion.span
                                            key={item}
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                                            className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-xs sm:text-sm text-slate-300"
                                        >
                                            {item}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex flex-col sm:flex-row gap-4 items-start">
                                    <Button className="uppercase italic font-black tracking-widest text-xs">
                                        Schedule a Call
                                    </Button>
                                    <Button
                                        as={Link}
                                        to="/portfolio"
                                        icon={ArrowRight}
                                        className="uppercase italic font-black tracking-widest text-xs"
                                    >
                                        View full portfolio
                                    </Button>
                                </div>
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-white/60">
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-white/60" />
                                            <span className="font-mono">Response within 24h</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Crosshair className="w-4 h-4 text-white/60" />
                                            <span className="font-mono">Built for clear client handoff</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>





            {/* Stats */}
            <motion.section className="max-w-6xl mx-auto py-16" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <Briefcase className="w-8 h-8 text-emerald-400 mb-4" />
                        <h3 className="text-3xl font-bold text-white mb-1">17.5 yrs</h3>
                        <p className="text-slate-500 text-sm uppercase tracking-wider">Professional Experience</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <Palette className="w-8 h-8 text-orange-400 mb-4" />
                        <h3 className="text-3xl font-bold text-white mb-1">100+ builds</h3>
                        <p className="text-slate-500 text-sm uppercase tracking-wider">Design + Product Systems</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <Sparkles className="w-8 h-8 text-blue-400 mb-4" />
                        <h3 className="text-3xl font-bold text-white mb-1">AI-first</h3>
                        <p className="text-slate-500 text-sm uppercase tracking-wider">Workflow & Automation Focus</p>
                    </div>
                </div>
            </motion.section>

            {/* Military History: Interactive Globe Mission Context */}
            <section className="about-globe-story relative w-full">
                {/* Sticky Globe Background */}
                <div className="sticky top-0 h-screen w-full -z-10">
                    <Suspense fallback={null}>
                        <MilitaryHistoryGlobe />
                    </Suspense>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 -mt-[100vh] pt-[20vh] pb-32">
                    <div className="mb-24 md:mb-48 space-y-8 max-w-lg">
                        <div className="inline-flex items-center gap-3 text-orange-500/60 font-mono text-[10px] tracking-[0.3em] uppercase">
                            <Crosshair className="w-4 h-4" />
                            Global Experience
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic leading-tight">
                            Places That <br />Shaped the Work
                        </h2>
                        <div className="space-y-6 text-slate-400 leading-relaxed">
                            <p>
                                My background spans design, operations, language, travel, and problem solving in complex environments. That mix shapes how I build: clear, adaptable, and grounded in the real needs of the people using the work.
                            </p>
                            <p className="text-sm border-l border-orange-500/30 pl-6 italic">
                                Scroll down to move through the locations that influenced my perspective.
                            </p>
                        </div>
                    </div>

                    {/* Progressive Story Sections */}
                    <div className="space-y-0">
                        {DESTINATIONS.map((dest, i) => {
                            // Alternating Layout Logic
                            // Even Index (0, 2...) -> Text Left (mr-auto), Globe shifts Right
                            // Odd Index (1, 3...) -> Text Right (ml-auto), Globe shifts Left
                            const isEven = i % 2 === 0;
                            const alignClass = isEven ? 'mr-auto text-left items-start' : 'ml-auto text-right items-end';
                            const textAlign = isEven ? 'text-left' : 'text-right';

                            return (
                                <div key={i} className={`military-dest-section min-h-[70vh] flex items-center ${isEven ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`globe-location-card max-w-xl p-10 border-l ${isEven ? 'border-l-emerald-500/20 pl-10' : 'border-r border-r-emerald-500/20 pr-10 border-l-0'} bg-white/[0.03] backdrop-blur-[4px] rounded-none transition-all duration-700 ${alignClass}`}>
                                        <span className={`globe-location-label text-emerald-500/60 font-mono text-xs mb-3 block tracking-[0.5em] uppercase ${textAlign}`}>
                                            LOCATION // {dest.city}
                                        </span>
                                        <h3 className={`globe-location-year text-7xl md:text-9xl font-black text-white/[0.03] mb-[-0.4em] relative z-0 select-none ${textAlign}`}>
                                            {dest.year}
                                        </h3>
                                        <h4 className={`globe-location-title text-5xl md:text-6xl font-bold text-white mb-6 relative z-10 tracking-tight ${textAlign}`}>{dest.name}</h4>
                                        <p className={`globe-location-desc text-lg text-slate-300 leading-relaxed font-light ${textAlign} max-w-md ${isEven ? '' : 'ml-auto'}`}>
                                            {dest.desc}
                                        </p>
                                        <div className={`globe-location-meta mt-8 pt-6 border-t border-white/5 flex gap-8 text-[11px] font-mono text-white/40 uppercase tracking-widest ${isEven ? 'justify-start' : 'justify-end'}`}>
                                            <span className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-emerald-500/40 rounded-full"></div>
                                                MGRS: {dest.mgrs}
                                            </span>
                                            <span className="text-emerald-500/50">
                                                STATUS: {dest.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Experience & Skills Section (Merged from History) */}
            <motion.section className="max-w-6xl mx-auto py-24 border-t border-white/5" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                <div className="text-center mb-16">
                    <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 mb-4">
                        Capabilities // Skill Matrix
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tight mb-4">
                        Experience & Skills
                    </h2>
                    <p className="text-base text-slate-400 leading-relaxed max-w-3xl mx-auto font-mono">
                        20+ years of expertise in visual design, project management, strategic operations,
                        and renewable energy development.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Design */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/20">
                        <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-4">Design</h3>
                        <div className="space-y-2">
                            {SKILLS.design.map((skill) => (
                                <div key={skill} className="text-white/60 text-[13px] font-mono flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-orange-500"></div>
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Technical */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
                        <h3 className="text-blue-400 font-bold uppercase tracking-wider text-xs mb-4">Technical</h3>
                        <div className="space-y-2">
                            {SKILLS.technical.map((skill) => (
                                <div key={skill} className="text-white/60 text-[13px] font-mono flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Leadership */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/20">
                        <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-4">Leadership</h3>
                        <div className="space-y-2">
                            {SKILLS.leadership.map((skill) => (
                                <div key={skill} className="text-white/60 text-[13px] font-mono flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certs */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/20">
                        <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-4">Certs</h3>
                        <div className="space-y-2">
                            {SKILLS.certifications.map((skill) => (
                                <div key={skill} className="text-white/60 text-[13px] font-mono flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </motion.section>

            {/* Professional Work */}
            <motion.section
                className="professional-work-section relative -mx-8 bg-[#030303] px-8 py-16 text-white md:py-16"
                variants={scrollReveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
            >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(249,115,22,0.07),transparent_30%),linear-gradient(180deg,#030303,#000000)]" />
                <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1fr] lg:gap-16">
                    <motion.div
                        variants={fadeInUp}
                        className="relative min-h-[300px] overflow-hidden rounded-[26px] border border-white/10 bg-[#111111] shadow-[0_28px_80px_rgba(0,0,0,0.42)] md:min-h-[330px]"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2400&auto=format&fit=crop"
                            alt="Open studio workspace used as a reference for design, systems, and production work"
                            className="absolute inset-0 h-full w-full object-cover opacity-80"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.56)_100%),linear-gradient(90deg,rgba(0,0,0,0.18),transparent_58%)]" />
                        <div className="absolute bottom-6 left-6 right-6 text-[10px] font-mono uppercase tracking-[0.24em] text-white/70 md:text-xs">
                            Design systems // product interfaces // campaign assets
                        </div>
                    </motion.div>

                    <motion.div variants={staggerContainer(0.08)} className="min-w-0">
                        <motion.h2
                            variants={fadeInUp}
                            className="max-w-3xl text-[2rem] font-black uppercase italic leading-[1.02] tracking-tight text-white md:text-[2.32rem]"
                        >
                            Creative + Professional Work
                        </motion.h2>
                        <motion.div variants={fadeInUp} className="mt-5 max-w-2xl space-y-4 text-base leading-7 text-slate-400">
                            <p>
                                I design full-stack brand systems, product interfaces, and marketing ecosystems from identity and visual direction to digital platforms and campaign rollouts.
                            </p>
                            <p>
                                Whether it is a new venture, an AI-connected workflow, or a commercial brand, I translate complex needs into visual and functional systems that are easy to deploy and scale.
                            </p>
                        </motion.div>
                        <motion.div variants={staggerContainer(0.05)} className="mt-7 grid gap-4 sm:grid-cols-2">
                            {[
                                { icon: Palette, label: 'Brand Identity' },
                                { icon: Wand2, label: 'UX/UI Systems' },
                                { icon: Film, label: 'Motion + After Effects' },
                                { icon: Cpu, label: 'AI Integrations' }
                            ].map((item) => (
                                <motion.div
                                    key={item.label}
                                    variants={fadeInUp}
                                    whileHover={{ y: -4, scale: 1.015 }}
                                    whileTap={{ scale: 0.985 }}
                                    transition={{ type: 'spring', stiffness: 390, damping: 22 }}
                                    className="group flex min-h-[56px] items-center gap-4 rounded-2xl border border-white/10 bg-[#151515] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors hover:border-orange-400/40 hover:bg-[#191919] md:px-5"
                                >
                                    <item.icon className="h-5 w-5 shrink-0 text-orange-400 transition-transform group-hover:rotate-3 group-hover:scale-110" />
                                    <span className="text-sm font-bold text-white md:text-base">{item.label}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Toolstack */}
            <section className="max-w-6xl mx-auto py-8">
                <motion.div
                    className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer(0.1)}
                >
                    <motion.div variants={fadeInUp} className="flex items-center gap-3 text-orange-500/60 font-mono text-[10px] mb-4 tracking-[0.3em] uppercase">
                        <PenTool className="w-4 h-4" />
                        TOOLS_AND_METHODS
                    </motion.div>
                    <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-black text-white uppercase italic">Tools, Methods, and Stack</motion.h2>
                    <motion.p variants={fadeInUp} className="text-slate-400 mt-4 max-w-3xl leading-relaxed">
                        From Adobe to AI, I blend technical execution with narrative design to build assets, systems, and
                        digital experiences that scale.
                    </motion.p>
                    <motion.div variants={fadeInUp} className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {TOOLSTACK.map((tool) => (
                            <div key={tool} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 hover:border-[var(--page-accent)] transition-colors duration-500">
                                {tool}
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {/* Services */}
            <section className="max-w-6xl mx-auto py-16">
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-medium text-white/50 uppercase tracking-widest font-mono">Services</span>
                    <div className="h-px flex-1 bg-white/10"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">Capabilities</h2>
                <p className="text-base text-slate-400 max-w-2xl font-mono">
                    Design, identity, development, and growth - crafted as polished, cohesive experiences.
                </p>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer(0.08)}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
                >
                    {SERVICES.map((item) => (
                        <motion.div variants={fadeInUp} key={item} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-[var(--page-accent)] transition-colors duration-500">
                            <h3 className="text-base font-semibold text-white">{item}</h3>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Design Studio */}
            <Suspense fallback={null}>
                <DesignStudio />
            </Suspense>
        </div>
    );
};

export default About;
