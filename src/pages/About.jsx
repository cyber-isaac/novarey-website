import React, { useState } from 'react';
import {
    Shield,
    Crosshair,
    Award,
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
import DesignStudio from '../components/DesignStudio';
import AuraBackground from '../components/AuraBackground';
import Button from '../components/Button';
import GlitchReveal from '../components/GlitchReveal';
import MilitaryHistoryGlobe, { DESTINATIONS } from '../components/MilitaryHistoryGlobe';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, scrollReveal, viewportConfig } from '../lib/animations';

const SKILLS = {
    design: ['Visual Design', 'Brand Development', 'AI-Enhanced Design', 'Marketing Design', 'Cross Platform Design', 'Design Systems'],
    technical: ['Adobe Creative Suite', 'Visual Studio Code', 'ChatGPT', 'Claude AI', 'MidJourney', 'RunwayML', 'BotPress'],
    leadership: ['Project Management', 'Operations Leadership', 'Stakeholder Engagement', 'Team Leadership', 'Strategic Planning'],
    certifications: ['PMP Certified', 'Cybersecurity', 'Special Forces', 'TS/SCI Clearance']
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

const About = () => {
    return (
        <div className="flex-1 overflow-y-auto h-full p-8 pb-20 selection:bg-orange-500/30 font-sans relative" data-scroll-container>
            <AuraBackground />

            {/* Hero Media */}
            <motion.section className="max-w-6xl mx-auto pt-6 md:pt-10" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                <div className="space-y-4">
                    <GlitchReveal
                        leftSrc="/mestandingbw.png"
                        rightSrc="/meanimated.mp4"
                        rightType="video"
                        labelLeft="Afghanistan // Original"
                        labelRight="AI Motion Variant"
                        overlayText="Hey I'm Isaac"
                        className="h-[520px] md:h-[640px]"
                    />
                    <div className="text-center text-[11px] font-mono uppercase tracking-[0.4em] text-orange-400/90 drop-shadow-[0_0_12px_rgba(251,146,60,0.7)]">
                        Slide for A.I. Transformation
                    </div>
                </div>
            </motion.section>

            {/* Hero */}
            <motion.section className="max-w-6xl mx-auto pt-8 md:pt-16" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
                    <div className="lg:max-w-2xl">
                        <div className="inline-flex items-center gap-3 text-[11px] uppercase font-semibold text-white/70 font-mono px-4 py-2 rounded-full border border-white/10 bg-white/5">
                            <div className="bg-green-400 w-2 h-2 rounded-full"></div>
                            Available for missions
                        </div>
                        <p className="mt-6 text-base font-medium text-white/70 font-mono">
                            Hi, I'm Isaac Reyes
                        </p>
                        <h1 className="text-[42px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-display font-black tracking-tight leading-[0.9] uppercase text-white italic mt-4">
                            <span className="block">Green Beret</span>
                            <span className="block">Design Operator</span>
                            <span className="block">AI Studio Lead</span>
                        </h1>
                    </div>

                    <div className="lg:mt-8">
                        <div className="inline-flex items-center gap-3 text-[11px] uppercase font-semibold text-white/70 font-mono px-4 py-2 rounded-full border border-white/10 bg-white/5">
                            <Shield className="w-4 h-4" />
                            Mission-ready systems
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12">
                    <div className="lg:col-span-5 border border-white/10 bg-white/5">
                        <div className="relative overflow-hidden">
                            <img
                                src="/isaac-portrait.png"
                                alt="Isaac Reyes - Green Beret, Design Operator, AI Studio Lead"
                                className="lg:h-[520px] w-full h-[420px] object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-xs font-mono text-white/70 uppercase tracking-widest">
                                Afghanistan // In the field
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="h-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <BadgeCheck className="w-4 h-4 text-white/40" />
                                    <div className="h-px flex-1 bg-white/10"></div>
                                </div>
                                <p className="text-lg leading-relaxed text-slate-300 mb-8 font-mono">
                                    I'm a Green Beret turned design operator who builds AI-forward products, brand systems,
                                    and mission-critical creative work. My approach combines operational discipline with
                                    modern visual craft to deliver fast, durable outcomes.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                        <h4 className="text-sm font-medium text-white/90 mb-4 font-mono">Specialties</h4>
                                        <ul className="text-sm text-neutral-400 space-y-2">
                                            {['UI/UX Design', 'Design Systems', 'AI Integrations', 'Motion Design'].map((item) => (
                                                <li key={item} className="font-mono flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                        <h4 className="text-sm font-medium text-white/90 mb-4 font-mono">Industries</h4>
                                        <ul className="text-sm text-neutral-400 space-y-2">
                                            {['Defense + Tactical', 'AI & SaaS', 'Creative Ventures', 'Enterprise Ops'].map((item) => (
                                                <li key={item} className="font-mono flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
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
                                            <span className="font-mono">Special Forces methodologies applied</span>
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
                        <Crosshair className="w-8 h-8 text-emerald-400 mb-4" />
                        <h3 className="text-3xl font-bold text-white mb-1">17.5 yrs</h3>
                        <p className="text-slate-500 text-sm uppercase tracking-wider">Special Forces Experience</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <Award className="w-8 h-8 text-orange-400 mb-4" />
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
            {/* Military History: Interactive Globe Mission Context */}
            <section className="relative w-full">
                {/* Sticky Globe Background */}
                <div className="sticky top-0 h-screen w-full -z-10">
                    <MilitaryHistoryGlobe />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 -mt-[100vh] pt-[20vh] pb-32">
                    <div className="mb-24 md:mb-48 space-y-8 max-w-lg">
                        <div className="inline-flex items-center gap-3 text-orange-500/60 font-mono text-[10px] tracking-[0.3em] uppercase">
                            <Crosshair className="w-4 h-4" />
                            MISSION_RECORD
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic leading-tight">
                            Green Beret <br />Foundations
                        </h2>
                        <div className="space-y-6 text-slate-400 leading-relaxed">
                            <p>
                                My Special Forces background forged the way I approach design - with clarity, systems thinking,
                                and mission-level precision.
                            </p>
                            <p className="text-sm border-l border-orange-500/30 pl-6 italic">
                                Scroll down to target specific mission locations.
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
                                    <div className={`max-w-xl p-10 border-l ${isEven ? 'border-l-emerald-500/30 pl-10' : 'border-r border-r-emerald-500/30 pr-10 border-l-0'} bg-black/20 backdrop-blur-sm rounded-none transition-all duration-700 ${alignClass}`}>
                                        <span className={`text-emerald-500/60 font-mono text-[10px] mb-2 block tracking-[0.6em] uppercase ${textAlign}`}>
                                            MISSION_NODE // {dest.city}
                                        </span>
                                        <h3 className={`text-7xl md:text-9xl font-black text-white/[0.03] mb-[-0.4em] relative z-0 select-none ${textAlign}`}>
                                            {dest.year}
                                        </h3>
                                        <h4 className={`text-4xl md:text-5xl font-bold text-white mb-6 relative z-10 tracking-tight ${textAlign}`}>{dest.name}</h4>
                                        <p className={`text-base text-slate-400 leading-relaxed font-light ${textAlign} max-w-sm ${isEven ? '' : 'ml-auto'}`}>
                                            {dest.desc}
                                        </p>
                                        <div className={`mt-8 pt-6 border-t border-white/5 flex gap-8 text-[9px] font-mono text-white/30 uppercase tracking-widest ${isEven ? 'justify-start' : 'justify-end'}`}>
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

                {/* Awards Section */}
                <motion.div
                    className="mt-16 text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer(0.08)}
                >
                    <motion.h3 variants={fadeInUp} className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-6">Notable Awards</motion.h3>
                    <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3">
                        {['Bronze Star (2)', 'Purple Heart', 'Meritorious Service (3)', 'Army Commendation (5)', 'NATO Medal'].map((award) => (
                            <span
                                key={award}
                                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-[11px] font-mono hover:border-orange-500/50 hover:text-white transition-colors cursor-default"
                            >
                                {award}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* Professional Work (Old Section Updated with better spacing) */}
            <motion.section className="max-w-6xl mx-auto py-24" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                        <img
                            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2400&auto=format&fit=crop"
                            alt="Design studio placeholder"
                            className="w-full h-full object-cover opacity-80"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-xs font-mono text-white/70 uppercase tracking-widest">
                            Placeholder // Replace with design work photo
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-3xl font-black text-white uppercase italic">Creative + Professional Work</h2>
                        <div className="space-y-6 text-slate-400 leading-relaxed">
                            <p>
                                I design full-stack brand systems, product interfaces, and marketing ecosystems - from logo
                                creation and identity to digital platforms and campaign rollouts. My focus is clarity, conversion,
                                and performance.
                            </p>
                            <p>
                                Whether it's a new venture, a military-grade system, or a commercial brand, I translate
                                complex needs into visual and functional systems that are easy to deploy and scale.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Palette, label: 'Brand Identity' },
                                { icon: Wand2, label: 'UX/UI Systems' },
                                { icon: Film, label: 'Motion + After Effects' },
                                { icon: Cpu, label: 'AI Integrations' }
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <item.icon className="w-5 h-5 text-orange-400" />
                                    <span className="text-sm font-semibold text-white">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
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
            <DesignStudio />
        </div>
    );
};

export default About;
