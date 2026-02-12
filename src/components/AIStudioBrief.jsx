import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, PenTool, Megaphone, Cpu, Mic2, Target, Zap, Shield, MousePointer2 } from 'lucide-react';
import Button from './Button';

const STUDIO_SERVICES = [
    {
        id: 'web-development',
        title: 'Web Development',
        tag: 'Alpha Sector',
        desc: 'Every website is coded from scratch using AI coding agents like Antigravity and Cursor AI, powered by Claude Opus 4.6 and Google Gemini Pro 3.0. No templates, no page builders. Just clean, custom code built to spec.',
        icon: Code2,
        accent: 'blue',
        media: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2400&auto=format&fit=crop',
        metric: 'Zero Templates'
    },
    {
        id: 'branding-identity',
        title: 'Branding & Identity',
        tag: 'Bravo Sector',
        desc: 'Full identity systems designed with Adobe Creative Suite and Canva Pro. AI-powered motion logos and branded video using Google Veo 3.0 and Nano Banana. From concept to brand kit delivery.',
        icon: PenTool,
        accent: 'rose',
        media: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2400&auto=format&fit=crop',
        metric: 'Full Brand Kits'
    },
    {
        id: 'strategic-marketing',
        title: 'Strategic Marketing',
        tag: 'Charlie Sector',
        desc: 'SEO, social media, paid advertising, email funnels, and content strategy. Data-driven campaigns engineered to capture your target audience and convert leads into loyal customers.',
        icon: Megaphone,
        accent: 'amber',
        media: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2400&auto=format&fit=crop',
        metric: 'Growth Engine'
    },
    {
        id: 'ai-solutions',
        title: 'A.I. Solutions',
        tag: 'Delta Sector',
        desc: 'Custom AI tools built for your workflows. Chatbots, automation pipelines, content generation systems, and intelligent integrations using Claude, Gemini, GPT-4o, and LangChain.',
        icon: Cpu,
        accent: 'emerald',
        media: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2400&auto=format&fit=crop',
        metric: 'Custom Pipelines'
    }
];

const AIStudioBrief = () => {
    const [activeId, setActiveId] = useState(STUDIO_SERVICES[0].id);

    const activeService = STUDIO_SERVICES.find(s => s.id === activeId);

    return (
        <section className="relative py-24 px-6 md:px-12 overflow-hidden">
            {/* Background HUD elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-10 left-10 w-40 h-40 border-t border-l border-white/20"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 border-b border-r border-white/20"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* Left: Interactive Controls */}
                    <div className="w-full lg:w-1/2 space-y-12">
                        <div>
                            <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-[0.4em] text-white/40 mb-4">
                                <Shield className="w-3 h-3 text-orange-500" />
                                Service Sectors // OPERATIONS BRIEF
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase leading-[0.95]">
                                Mission-Grade <br />
                                <span className="text-orange-500/80">Execution</span>
                            </h2>
                            <p className="mt-6 text-slate-400 max-w-lg leading-relaxed text-sm md:text-base font-mono">
                                Special Forces trained. AI augmented. I approach every project like a mission: define the objective, select the right tools, execute with precision, and deliver results that exceed expectations.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {STUDIO_SERVICES.map((service) => (
                                <button
                                    key={service.id}
                                    onClick={() => setActiveId(service.id)}
                                    className={`group relative text-left p-6 rounded-2xl border transition-all duration-500 ${activeId === service.id
                                        ? 'bg-white/10 border-white/20 backdrop-blur-xl translate-x-4'
                                        : 'bg-transparent border-white/5 hover:border-white/10'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl border ${activeId === service.id
                                                ? 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                                                : 'bg-white/5 border-white/10 text-white/40'
                                                }`}>
                                                <service.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
                                                    {service.tag}
                                                </div>
                                                <h3 className={`text-xl font-bold italic uppercase transition-colors ${activeId === service.id ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                                                    }`}>
                                                    {service.title}
                                                </h3>
                                            </div>
                                        </div>
                                        {activeId === service.id && (
                                            <motion.div
                                                layoutId="active-indicator"
                                                className="text-orange-500"
                                            >
                                                <MousePointer2 className="w-4 h-4" />
                                            </motion.div>
                                        )}
                                    </div>

                                    <AnimatePresence>
                                        {activeId === service.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="mt-4 text-xs font-mono text-slate-400 leading-relaxed pl-16">
                                                    {service.desc}
                                                </p>
                                                <div className="mt-4 pl-16 flex items-center gap-4">
                                                    <div className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-[9px] font-mono text-orange-400 uppercase tracking-widest">
                                                        {service.metric}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Dynamic Intelligence Console */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="aspect-[4/5] md:aspect-square relative rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeId}
                                    initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                                    transition={{ duration: 0.8, ease: "circOut" }}
                                    className="absolute inset-0"
                                >
                                    <img
                                        src={activeService.media}
                                        alt={activeService.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                                </motion.div>
                            </AnimatePresence>

                            {/* HUD Overlay Elements */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-mono text-white/60 tracking-widest">LOC_SRV_INDEX: {activeId.toUpperCase()}</div>
                                        <div className="text-[10px] font-mono text-white/60 tracking-widest">STATUS: SYSTEM_SYNC_ACTIVE</div>
                                    </div>
                                    <div className="h-10 w-10 flex items-center justify-center border border-white/20 rounded-full backdrop-blur-md">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="h-px bg-gradient-to-r from-white/40 to-transparent w-full"></div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="text-[12px] font-mono text-orange-400 font-bold mb-1 uppercase tracking-widest">Efficiency Metrics</div>
                                            <div className="text-[32px] font-black text-white italic transition-all duration-500">
                                                {activeService.metric}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Scale Index</div>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map(i => (
                                                    <div key={i} className={`w-3 h-1 ${i <= 5 ? 'bg-orange-500' : 'bg-white/20'}`}></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Tech Decorative Card - Only for AI Audio */}
                        <AnimatePresence>
                            {activeId === 'ai-solutions' && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20, y: 0 }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        y: [0, -10, 0],
                                        rotate: [0, 1, 0]
                                    }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        opacity: { duration: 0.3 }
                                    }}
                                    className="absolute -bottom-10 -left-10 md:-left-20 p-6 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-2xl max-w-[280px] hidden md:block"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <Cpu className="w-4 h-4 text-orange-400" />
                                        <div className="text-[10px] font-mono text-white/80 uppercase tracking-widest">AI Pipeline Active</div>
                                    </div>
                                    <div className="flex items-end gap-1 h-8">
                                        {[...Array(12)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ height: [10, Math.random() * 30 + 10, 10] }}
                                                transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                                                className="w-1 bg-orange-500/40 rounded-full"
                                            />
                                        ))}
                                    </div>
                                    <p className="mt-4 text-[10px] font-mono text-slate-500 leading-relaxed uppercase">
                                        Automation deployed. Custom workflow processing across all integration layers.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>

                <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Google_Logo_Green.svg" alt="Google" className="h-6 opacity-30 invert" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" alt="OpenAI" className="h-6 invert" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" alt="Adobe" className="h-6" />
                </div>
            </div>
        </section>
    );
};

export default AIStudioBrief;
