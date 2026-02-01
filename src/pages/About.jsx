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
import ParticleBackground from '../components/ParticleBackground';
import AuraBackground from '../components/AuraBackground';
import Button from '../components/Button';
import GlobePins from '../components/GlobePins';
import GlitchReveal from '../components/GlitchReveal';

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
            <ParticleBackground />
            <AuraBackground />

            {/* Hero Media */}
            <section className="max-w-6xl mx-auto pt-6 md:pt-10 animate-on-scroll">
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
            </section>

            {/* Hero */}
            <section className="max-w-6xl mx-auto pt-8 md:pt-16 animate-on-scroll">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
                    <div className="lg:max-w-2xl">
                        <div className="inline-flex items-center gap-3 text-[11px] uppercase font-semibold text-white/70 font-mono px-4 py-2 rounded-full border border-white/10 bg-white/5">
                            <div className="bg-green-400 w-2 h-2 rounded-full"></div>
                            Available for missions
                        </div>
                        <p className="mt-6 text-base font-medium text-white/70 font-mono">
                            Hi, I'm Isaac Reyes
                        </p>
                        <h1 className="text-[42px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-black tracking-tight leading-[0.9] uppercase text-white italic mt-4">
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
            </section>

            {/* Globe Pins */}
            <section className="max-w-6xl mx-auto py-12 animate-on-scroll">
                <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
                    <div className="space-y-6">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                            Field Map
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic">
                            Places I have been
                        </h2>
                        <p className="text-slate-400 leading-relaxed max-w-2xl">
                            A living map of locations that shaped my perspective and field experience.
                            Pins highlight current known stops and will expand over time.
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs font-mono text-slate-400">
                            {['Boerne, TX', 'Lacey, WA'].map((place) => (
                                <span key={place} className="px-3 py-1 rounded-full border border-white/10 bg-white/5">
                                    {place}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="relative h-[360px] md:h-[420px] rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.2),transparent_55%)]"></div>
                        <div className="absolute inset-0">
                            <GlobePins />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="max-w-6xl mx-auto py-16 animate-on-scroll">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <Crosshair className="w-8 h-8 text-emerald-400 mb-4" />
                        <h3 className="text-3xl font-bold text-white mb-1">12+ yrs</h3>
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
            </section>

            {/* Military + Design */}
            <section className="max-w-6xl mx-auto py-8 animate-on-scroll">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-8">
                        <h2 className="text-3xl font-black text-white uppercase italic">Green Beret Foundations</h2>
                        <div className="space-y-6 text-slate-400 leading-relaxed">
                            <p>
                                My Special Forces background forged the way I approach design - with clarity, systems thinking,
                                and mission-level precision. Planning, execution, iteration, and adaptability are baked into every
                                project I lead.
                            </p>
                            <p>
                                From operational planning to visual communication, I learned how to build under pressure,
                                coordinate across teams, and deliver results that hold up in real-world conditions.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {['Leadership', 'Operational Design', 'Decision Speed', 'Precision'].map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                        <img
                            src="/meafghanSFguys.png"
                            alt="Isaac Reyes in Afghanistan"
                            className="w-full h-full object-cover opacity-90"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/65 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-xs font-mono text-white/70 uppercase tracking-widest">
                            Afghanistan // Special Forces
                        </div>
                    </div>
                </div>
            </section>

            {/* Professional Work */}
            <section className="max-w-6xl mx-auto py-16 animate-on-scroll">
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
            </section>

            {/* Toolstack */}
            <section className="max-w-6xl mx-auto py-8 animate-on-scroll">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
                    <div className="flex items-center gap-3 text-orange-500/60 font-mono text-[10px] mb-4 tracking-[0.3em] uppercase">
                        <PenTool className="w-4 h-4" />
                        TOOLS_AND_METHODS
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic">Tools, Methods, and Stack</h2>
                    <p className="text-slate-400 mt-4 max-w-3xl leading-relaxed">
                        From Adobe to AI, I blend technical execution with narrative design to build assets, systems, and
                        digital experiences that scale.
                    </p>
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {TOOLSTACK.map((tool) => (
                            <div key={tool} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                                {tool}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="max-w-6xl mx-auto py-16 animate-on-scroll">
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-medium text-white/50 uppercase tracking-widest font-mono">Services</span>
                    <div className="h-px flex-1 bg-white/10"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">Capabilities</h2>
                <p className="text-base text-slate-400 max-w-2xl font-mono">
                    Design, identity, development, and growth - crafted as polished, cohesive experiences.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                    {SERVICES.map((item) => (
                        <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                            <h3 className="text-base font-semibold text-white">{item}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Design Studio */}
            <DesignStudio />
        </div>
    );
};

export default About;
