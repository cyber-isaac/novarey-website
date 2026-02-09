import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Rocket, Activity, Zap, Shield, Microscope, Boxes, Gauge, ChevronRight, Binary } from 'lucide-react';
import { scrollReveal, viewportConfig } from '../lib/animations';
import IntegrationsShowcase from '../components/IntegrationsShowcase';
import ParticleBackground from '../components/ParticleBackground';
import Button from '../components/Button';
import PortfolioCarousel from '../components/PortfolioCarousel';

const PROJECTS = [
    {
        id: 'tars',
        name: 'PROJECT: TARS',
        subtitle: 'Autonomous Robotics & AI Interface',
        status: 'PROTOTYPING',
        progress: 35,
        type: 'ROBOTICS',
        desc: 'A 1:4 scale 3D printed replica of the Interstellar TARS unit. Integrated with custom LLM-based personality and voice synthesis via Whisper/GPT-4o.',
        tags: ['ROS', 'OpenAI', 'Arduino', '3D Print'],
        color: 'text-orange-400',
        bg: 'bg-orange-500/5',
        border: 'border-orange-500/20'
    },
    {
        id: 'jm-app',
        name: 'JM-APP',
        subtitle: 'Military Jumpmaster Tactical Calc',
        status: 'DEVELOPMENT',
        progress: 60,
        type: 'TACTICAL',
        desc: 'Specialized utility for Jumpmasters. Wind drift calculations, manifest management, and automated drop-zone assessment using real-time atmospheric data.',
        tags: ['React Native', 'Military Intelligence', 'Offline-First'],
        color: 'text-orange-400',
        bg: 'bg-orange-500/5',
        border: 'border-orange-500/20'
    },
    {
        id: 'enneavibe',
        name: 'Enneavibe',
        subtitle: 'Personality-Driven UX Engine',
        status: 'BETA',
        progress: 85,
        type: 'SOFTWARE',
        desc: 'An AI-powered application that leverages the Enneagram to tailor digital experiences and "vibes" based on individual user archetypes.',
        tags: ['Cursor', 'LLM', 'UX Design', 'Psychology'],
        color: 'text-orange-400',
        bg: 'bg-orange-500/5',
        border: 'border-orange-500/20'
    },
    {
        id: 'vibelife',
        name: 'VibeLife',
        subtitle: 'Social Resonance Platform',
        status: 'ALPHA',
        progress: 15,
        type: 'SOCIAL',
        desc: 'Next-gen lifestyle integration platform. Mapping real-world experiences through digital "vibe-traces" and AI-curated discovery.',
        tags: ['Cursor', 'Social Graph', 'Geolocation'],
        color: 'text-orange-400',
        bg: 'bg-orange-500/5',
        border: 'border-orange-500/20'
    }
];

const StatCard = ({ label, value, icon: Icon }) => (
    <div className="bg-[#14121D] border border-white/5 p-4 rounded-xl flex items-center justify-between">
        <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">{label}</span>
            <span className="text-xl font-bold text-white font-mono">{value}</span>
        </div>
        <div className="p-2 rounded-lg bg-white/5 text-slate-400">
            <Icon className="w-5 h-5" />
        </div>
    </div>
);

const AIStrategy = () => {
    return (
        <div className="flex-1 overflow-y-auto h-full p-8 relative selection:bg-orange-500/30 font-sans" data-scroll-container>
            {/* Red Particle Background */}
            <ParticleBackground />

            {/* Background Grain/Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Generalist Showcase */}
            <motion.div className="mb-16 relative z-10" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                <PortfolioCarousel />
            </motion.div>

            {/* Header */}
            <motion.div className="mb-12 relative z-10" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                <div className="flex items-center gap-3 text-orange-500/60 font-mono text-[10px] mb-4 tracking-[0.3em]">
                    <Shield className="w-4 h-4" />
                    SKUNKWORKS_LABORATORY // ACCESS_GRANTED
                </div>
                <h1 className="text-6xl font-black text-white mb-2 tracking-tighter italic">
                    AI STRATEGY<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-orange-900">
                        & EXPERIMENTS
                    </span>
                </h1>
                <p className="text-slate-400 max-w-xl font-medium leading-relaxed mt-4">
                    Exploring the intersection of physical robotics, tactical utilities, and software-driven psychological resonance.
                </p>
            </motion.div>

            {/* Quick Stats HUD */}
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 relative z-10" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                <StatCard label="Active Projects" value="04" icon={Boxes} />
                <StatCard label="Compute Status" value="OPTIMAL" icon={Activity} />
                <StatCard label="Lab Uptime" value="99.9%" icon={Gauge} />
                <StatCard label="Clearance" value="LVL_7" icon={Shield} />
            </motion.div>

            {/* Projects Grid */}
            <motion.div className="grid grid-cols-1 xl:grid-cols-2 gap-8 relative z-10 mb-20" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                {PROJECTS.map((project, idx) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`group p-8 rounded-3xl border ${project.border} ${project.bg} hover:bg-white/[0.02] transition-all relative overflow-hidden`}
                    >
                        {/* Status HUD in card */}
                        <div className="absolute top-8 right-8 flex items-center gap-2">
                            <div className="flex h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                            <span className="text-[10px] font-mono text-orange-400 font-bold tracking-widest uppercase">
                                {project.status}
                            </span>
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`p-3 rounded-2xl bg-white/5 ${project.color}`}>
                                    {project.id === 'tars' ? <Cpu className="w-6 h-6" /> :
                                        project.id === 'jm-app' ? <Rocket className="w-6 h-6" /> :
                                            <Binary className="w-6 h-6" />}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white tracking-tight uppercase">
                                        {project.name}
                                    </h3>
                                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">
                                        {project.subtitle}
                                    </span>
                                </div>
                            </div>

                            <p className="text-slate-400 leading-relaxed mb-8 max-w-md">
                                {project.desc}
                            </p>

                            {/* Progress Indicator */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-mono text-slate-500">SYSTEM_STABILITY</span>
                                    <span className="text-[10px] font-mono text-slate-300">{project.progress}%</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${project.progress}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className={`h-full bg-gradient-to-r from-transparent via-white to-white opacity-40`}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 rounded text-[10px] font-mono text-slate-400 bg-white/5 border border-white/5">
                                        #{tag.replace(/\s+/g, '_').toUpperCase()}
                                    </span>
                                ))}
                            </div>

                            <Button
                                icon={ChevronRight}
                                className="uppercase italic font-black tracking-widest text-xs"
                                color="var(--mission-accent)"
                                soft="var(--mission-accent-soft)"
                                glow="var(--mission-accent-glow)"
                            >
                                Initialize protocol
                            </Button>
                        </div>

                        {/* Aesthetic background elements for the card */}
                        <div className="absolute -bottom-10 -right-10 opacity-[0.02] rotate-12 group-hover:rotate-0 transition-transform duration-700">
                            <Boxes className="w-64 h-64 text-white" />
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Integrations Showcase */}
            <motion.div className="relative z-10 mb-12" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                <div className="h-px bg-white/5 w-full mb-12"></div>
                <IntegrationsShowcase />
            </motion.div>

            {/* Experimental HUD Sidebar / Bottom Bar */}
            <motion.div className="mt-12 border-t border-white/5 pt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-500 font-mono text-[10px]" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < 3 ? 'bg-orange-500/40' : 'bg-white/5'}`}></div>
                        ))}
                    </div>
                    <span>NEURAL_ENGINE_LATENCY: 14ms (PROXIMAL)</span>
                </div>
                <div className="lg:text-right">
                    <span>// LAST_SYNC: {new Date().toLocaleTimeString()} // LOCATION: LAB_NODE_01</span>
                </div>
            </motion.div>
        </div>
    );
};

export default AIStrategy;

