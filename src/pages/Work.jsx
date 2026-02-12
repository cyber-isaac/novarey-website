import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, scrollReveal, viewportConfig } from '../lib/animations';

const SECTION_LINKS = [
    { id: 'apps', label: 'Apps + Tools' },
    { id: 'motion', label: 'Motion + Video' },
    { id: 'artworks', label: 'Heritage Art' },
    { id: 'design', label: 'Design Systems' },
    { id: 'merch', label: 'Merch + Drops' },
    { id: 'plans', label: 'Plans + Roadmap' },
];

// Apps section placeholder (content removed for animated group replacement)


const DESIGN_SYSTEMS = [
    {
        id: 'design-1',
        title: 'NovaRey OS',
        subtitle: 'Interface Kit',
        image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/d61bc9fd-7a8a-40a2-94c9-1168179f1932_800w.webp',
        description: 'Component system for bold, high-contrast UI and fast iteration.',
    },
    {
        id: 'design-2',
        title: 'Industry Marketing Flyer',
        subtitle: 'Adobe Suite',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2400&auto=format&fit=crop',
        description: 'Industrial brand collateral for web + print rollout.',
    },
    {
        id: 'design-3',
        title: 'Terrain Poster Series',
        subtitle: 'Concept Studies',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2400&auto=format&fit=crop',
        description: 'Typographic systems and cartographic textures for visual narratives.',
    },
];

const MERCH = [
    {
        id: 'merch-1',
        title: '1st Special Forces Group Mug',
        subtitle: 'Merch Drop',
        image: 'https://i.etsystatic.com/45034429/r/il/847430/7235012828/il_1140xN.7235012828_o0tj.jpg',
        description: 'Black mug with a green beret motif for daily fieldwork fuel.',
        href: 'https://www.etsy.com/listing/4376935562/1st-special-forces-group-black-mug-green?click_key=40c75940ce7415a7f13e448387128724b162a1a7%3A4376935562&click_sum=22d6ef53&sr_prefetch=1&pf_from=shop_home&ref=shop_home_active_5',
        cta: 'View on Etsy',
    },
    {
        id: 'merch-2',
        title: 'FSSF Black Devil Legacy Mug',
        subtitle: 'Black Devils Series',
        image: 'https://i.etsystatic.com/45034429/r/il/b48618/5907143193/il_1140xN.5907143193_4z4k.jpg',
        description: 'WWII heritage design for 1st SSF and 1st SFG supporters.',
        href: 'https://www.etsy.com/listing/1686064626/fssf-black-devil-legacy-mug-morphing?sr_prefetch=1&pf_from=shop_home&ref=shop_home_active_10&logging_key=16c360fcc6d446f8f0f633da59835a65a47c836a%3A1686064626',
        cta: 'Shop on Etsy',
    },
    {
        id: 'merch-3',
        title: 'Devils Brigade Legacy Poster',
        subtitle: 'Legacy Poster',
        image: 'https://i.etsystatic.com/45034429/r/il/0c7a68/5306378755/il_794xN.5306378755_6wpa.jpg',
        description: 'Digital recreation of the 1st Special Service Force logo.',
        href: 'https://www.etsy.com/listing/1559753481/devils-brigade-legacy-a-tribute-poster?sr_prefetch=1&pf_from=shop_home&ref=shop_home_active_4&dd=1&logging_key=6a6f73aa77ff969ca1bc478a13e960813ea2a6ac%3A1559753481',
        cta: 'View on Etsy',
    },
];

const PLANS = [
    {
        id: 'plan-1',
        title: 'AI Venture Incubator',
        subtitle: 'Launch Track',
        description: 'A studio pipeline for validating ideas, building MVPs, and shipping fast.',
    },
    {
        id: 'plan-2',
        title: 'Studio Systems',
        subtitle: 'Ops + Automation',
        description: 'Reusable components, workflow automations, and internal tooling.',
    },
    {
        id: 'plan-3',
        title: 'Creative R&D',
        subtitle: 'Research Lab',
        description: 'Experimental art, generative visuals, and interactive prototypes.',
    },
];

const MOTION_VIDEOS = [
    {
        id: 'motion-1',
        title: 'Client Logo Animation',
        subtitle: 'Marketing & Branding',
        description: 'Animated client logo created with Adobe After Effects for marketing and branding campaigns.',
        gumletId: '6979b30a0c58139a84b3faf0',
        tech: 'Adobe After Effects',
        year: '2024',
    },
    {
        id: 'motion-2',
        title: 'AI Character Placement',
        subtitle: 'Face Animation & Scene Integration',
        description: 'Showcasing AI-powered face placement and character integration into animated scenes for creative storytelling.',
        gumletId: '696ade5705ff587e8d0b5235',
        tech: 'Google Veo 3 + After Effects + Premiere Pro',
        year: '2024',
    },
];

const HERITAGE_ART = [
    {
        id: 'art-1',
        title: 'Devil\'s Brigade Torii Gate',
        subtitle: 'Special Forces Tribute',
        description: 'Custom redesign influenced by the historic 1st Special Forces Group (Airborne). Combines Devil\'s Brigade heritage with Japanese culture.',
        image: '/portfolio/DesignPortfolio4.png',
        tools: 'Adobe Illustrator',
    },
    {
        id: 'art-2',
        title: 'F.S.S.F. Legacy Collection',
        subtitle: 'First Special Service Force',
        description: '1st Special Service Force logo for Devil\'s Brigade representing unity between U.S. and Canadian Special Forces.',
        image: '/portfolio/DesignPortfolio5.png',
        tools: 'Adobe Illustrator',
    },
    {
        id: 'art-3',
        title: 'Valor in Art - Military Patches',
        subtitle: 'Special Forces Patches',
        description: 'Recreated Special Forces Airborne patch and 1st SFG Asia patch featuring the famous "De Oppresso Liber" motto.',
        image: '/portfolio/DesignPortfolio8.png',
        tools: 'Adobe Illustrator',
    },
    {
        id: 'art-4',
        title: 'Custom Posters & Team Logos',
        subtitle: 'Valor in Art',
        description: 'Custom artwork staged in AI-generated office scenes. Team logos for military and police organizations.',
        image: '/portfolio/DesignPortfolio9.png',
        tools: 'Adobe Illustrator + AI',
    },
];



const Work = () => {
    return (
        <div className="flex-1 overflow-y-auto h-full p-8 pb-20" data-scroll-container>
            {/* Hero */}
            <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="flex flex-col gap-6 mb-12">
                <div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Work Playground</h1>
                    <p className="text-slate-400 max-w-2xl text-lg mt-3">
                        The hub for everything I build: apps, design systems, merch, experiments, and venture plans.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    {SECTION_LINKS.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className="px-4 py-2 rounded-full surface-panel-muted surface-panel-border text-slate-300 hover:text-slate-100 transition-colors border text-xs font-semibold uppercase tracking-widest"
                        >
                            {item.label}
                        </a>
                    ))}
                    <Button
                        as={Link}
                        to="/portfolio"
                        icon={ArrowRight}
                        className="uppercase italic font-black tracking-widest text-xs"
                    >
                        Full Portfolio
                    </Button>
                </div>
            </motion.div>

            {/* Apps */}
            <motion.section id="apps" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="space-y-6 mb-16">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-white tracking-tight">Apps + Tools</h2>
                    <div className="h-px bg-white/10 flex-1"></div>
                </div>
            </motion.section>

            {/* Motion + Video */}
            <motion.section id="motion" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="space-y-6 mb-16">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-white tracking-tight">Motion + Video</h2>
                    <div className="h-px bg-white/10 flex-1"></div>
                </div>
                <motion.div
                    variants={staggerContainer(0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {MOTION_VIDEOS.map((item) => (
                        <motion.div variants={fadeInUp} key={item.id} className="group rounded-2xl overflow-hidden border surface-panel-border surface-panel hover:border-orange-500/50 transition-colors duration-500">
                            <div className="relative" style={{ aspectRatio: '16/9' }}>
                                <iframe
                                    loading="lazy"
                                    title={item.title}
                                    src={`https://play.gumlet.io/embed/${item.gumletId}?background=false&autoplay=true&loop=true&disableControls=false`}
                                    style={{ border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
                                    referrerPolicy="origin"
                                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                                ></iframe>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{item.subtitle}</div>
                                    <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">{item.year}</div>
                                </div>
                                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                <p className="text-sm text-slate-400 mt-2">{item.description}</p>
                                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/60 uppercase tracking-widest">
                                    {item.tech}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>

            {/* Heritage Art */}
            <motion.section id="artworks" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="space-y-6 mb-16">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-white tracking-tight">Heritage Art</h2>
                    <div className="h-px bg-white/10 flex-1"></div>
                </div>
                <p className="text-slate-400 text-sm max-w-2xl">
                    Personal artwork rooted in Special Forces culture, heritage, and brotherhood. Many of these designs are available as merchandise.
                </p>
                <motion.div
                    variants={staggerContainer(0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {HERITAGE_ART.map((item) => (
                        <motion.div variants={fadeInUp} key={item.id} className="group rounded-2xl overflow-hidden border surface-panel-border surface-panel hover:border-red-500/50 transition-colors duration-500">
                            <div className="relative bg-black/50" style={{ aspectRatio: '4/3' }}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                                />
                            </div>
                            <div className="p-6">
                                <div className="text-[10px] font-mono text-red-400 uppercase tracking-widest mb-2">{item.subtitle}</div>
                                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                <p className="text-sm text-slate-400 mt-2">{item.description}</p>
                                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/60 uppercase tracking-widest">
                                    {item.tools}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>

            {/* Design Systems */}
            <motion.section id="design" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="space-y-6 mb-16">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-white tracking-tight">Design Systems</h2>
                    <div className="h-px bg-white/10 flex-1"></div>
                </div>
                <motion.div
                    variants={staggerContainer(0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {DESIGN_SYSTEMS.map((item) => (
                        <motion.div variants={fadeInUp} key={item.id} className="group rounded-2xl overflow-hidden border surface-panel-border surface-panel hover:border-blue-500/50 transition-colors duration-500">
                            <img src={item.image} alt={item.title} className="w-full h-56 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="p-6">
                                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{item.subtitle}</div>
                                <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
                                <p className="text-sm text-slate-400 mt-2">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>

            {/* Merch */}
            <motion.section id="merch" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="space-y-6 mb-16">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-white tracking-tight">Merch + Drops</h2>
                    <div className="h-px bg-white/10 flex-1"></div>
                </div>
                <motion.div
                    variants={staggerContainer(0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {MERCH.map((item) => (
                        <motion.div variants={fadeInUp} key={item.id} className="group rounded-2xl overflow-hidden border surface-panel-border surface-panel hover:border-emerald-500/50 transition-colors duration-500">
                            <img src={item.image} alt={item.title} className="w-full h-56 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="p-6">
                                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{item.subtitle}</div>
                                <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
                                <p className="text-sm text-slate-400 mt-2">{item.description}</p>
                                <a href={item.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-emerald-300 transition-colors mt-4">
                                    {item.cta} <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>

            {/* Plans */}
            <motion.section id="plans" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="space-y-6">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-white tracking-tight">Plans + Roadmap</h2>
                    <div className="h-px bg-white/10 flex-1"></div>
                </div>
                <motion.div
                    variants={staggerContainer(0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {PLANS.map((item) => (
                        <motion.div variants={fadeInUp} key={item.id} className="rounded-2xl border surface-panel-border surface-panel-muted p-6 hover:border-white/30 transition-colors duration-500">
                            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{item.subtitle}</div>
                            <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
                            <p className="text-sm text-slate-400 mt-2">{item.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>
        </div>
    );
};

export default Work;

