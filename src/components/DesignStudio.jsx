import React, { useState } from 'react';
import { Play, Layers, Globe, Zap, MessageSquare, Monitor, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoModal from './VideoModal';

const TABS = [
    { id: 'MARKETING', label: 'Marketing Video', icon: Play },
    { id: 'WEBSITES', label: 'Websites', icon: Globe },
    { id: 'FLYERS', label: 'Flyers', icon: Layers },
    { id: 'SOCIAL', label: 'Social Media', icon: MessageSquare },
    { id: 'AI', label: 'A.I. Models', icon: Zap },
];

const CONTENT = {
    MARKETING: [
        {
            id: 'ypo',
            title: 'YPO Marketing Film',
            desc: "Brand-focused motion piece for Young Presidents' Organization highlighting leadership, community, and global impact.",
            src: 'https://play.gumlet.io/embed/6957d6f315b21a591c4e08cc?autoplay=true&loop=true&disableControls=false',
            previewSrc: 'https://play.gumlet.io/embed/6957d6f315b21a591c4e08cc?background=false&autoplay=false&loop=true&disableControls=false',
            type: 'video'
        },
        {
            id: 'training',
            title: 'Training Program Promo',
            desc: "High-energy marketing video for an elite training program, focusing on intensity and results.",
            src: 'https://play.gumlet.io/embed/696af4d10de908dc60a332f9?autoplay=true&loop=true&disableControls=false',
            previewSrc: 'https://play.gumlet.io/embed/696af4d10de908dc60a332f9?background=false&autoplay=true&loop=true&disableControls=false&muted=true',
            type: 'video'
        },
        {
            id: 'showcase',
            title: 'Studio Showcase',
            desc: 'Creative design work and motion graphics from the NovaRey studio.',
            src: 'https://play.gumlet.io/embed/69498bb4621936ee0129ab36?autoplay=true&loop=true&disableControls=false',
            previewSrc: 'https://play.gumlet.io/embed/69498bb4621936ee0129ab36?background=false&autoplay=true&loop=true&disableControls=false&muted=true',
            type: 'video'
        },
    ],
    WEBSITES: [
        {
            id: 'website-1',
            title: 'Lumiere Photography',
            desc: 'Portfolio platform for high-end photography.',
            type: 'image',
            placeholder: true,
            bgFrom: 'from-purple-900/40',
            bgTo: 'to-blue-900/40'
        },
        {
            id: 'website-2',
            title: 'NovaRey V1',
            desc: 'Legacy agency site design.',
            type: 'image',
            placeholder: true,
            bgFrom: 'from-slate-900/40',
            bgTo: 'to-slate-800/40'
        }
    ],
    FLYERS: [
        {
            id: 'flyer-1',
            title: 'Event Launch',
            desc: 'Print collateral for major product reveal.',
            type: 'image',
            placeholder: true,
            bgFrom: 'from-orange-900/40',
            bgTo: 'to-red-900/40'
        },
        {
            id: 'flyer-2',
            title: 'Business Promo',
            desc: 'Sales sheet design.',
            type: 'image',
            placeholder: true,
            bgFrom: 'from-green-900/40',
            bgTo: 'to-emerald-900/40'
        }
    ],
    SOCIAL: [
        {
            id: 'social-1',
            title: 'Viral Campaign',
            desc: 'Social assets for Instagram drive.',
            type: 'image',
            placeholder: true,
            bgFrom: 'from-pink-900/40',
            bgTo: 'to-rose-900/40'
        },
        {
            id: 'social-2',
            title: 'Meme Series',
            desc: 'Cultural commentary graphics.',
            type: 'image',
            placeholder: true,
            bgFrom: 'from-cyan-900/40',
            bgTo: 'to-blue-900/40'
        }
    ],
    AI: [
        {
            id: 'ai-runway',
            title: 'AI Character Placement',
            desc: 'RunwayML video generation using AI to animate character placement into scenes.',
            src: 'https://play.gumlet.io/embed/696ade5705ff587e8d0b5235?autoplay=true&loop=true&disableControls=false',
            previewSrc: 'https://play.gumlet.io/embed/696ade5705ff587e8d0b5235?background=false&autoplay=true&loop=true&disableControls=false&muted=true',
            type: 'video'
        },
        {
            id: 'ai-gen-2',
            title: 'Generative Landscapes',
            desc: 'Exploring latent space with MidJourney v6.',
            type: 'image',
            placeholder: true,
            bgFrom: 'from-indigo-900/40',
            bgTo: 'to-violet-900/40'
        }
    ]
};

const DesignStudio = () => {
    const [activeTab, setActiveTab] = useState('MARKETING');
    const [activeVideo, setActiveVideo] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleVideoClick = (src, title) => {
        setActiveVideo({ src, title });
    };

    return (
        <section className="max-w-7xl mx-auto py-12 animate-on-scroll px-4 md:px-0">
            <VideoModal
                isOpen={!!activeVideo}
                onClose={() => setActiveVideo(null)}
                videoSrc={activeVideo?.src}
                title={activeVideo?.title}
            />

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                <div>
                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">Design Studio</h2>
                    <p className="text-slate-400 max-w-lg text-sm font-mono uppercase tracking-widest">
                        Cross-disciplinary creative outputs.
                    </p>
                </div>

                {/* Scrollable Tabs */}
                <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar w-full md:w-auto mask-linear-fade">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 border ${activeTab === tab.id
                                ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-black' : 'text-slate-500'}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {CONTENT[activeTab]?.map((item) => (
                            <div
                                key={item.id}
                                className="group relative rounded-3xl border border-white/10 bg-[#0B0B0F] overflow-hidden hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1"
                                onMouseEnter={() => setHoveredCard(item.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                onClick={() => item.type === 'video' && handleVideoClick(item.src, item.title)}
                            >
                                {/* Media Container */}
                                <div className={`relative aspect-video overflow-hidden ${item.type === 'video' ? 'cursor-pointer' : ''}`}>
                                    {item.type === 'video' ? (
                                        <>
                                            <iframe
                                                title={item.title}
                                                src={item.previewSrc}
                                                className="absolute inset-0 h-full w-full pointer-events-none scale-105 group-hover:scale-110 transition-transform duration-700"
                                                style={{ border: 'none' }}
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                                <div className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                                    <Play className="w-6 h-6 text-white fill-white" />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className={`w-full h-full bg-gradient-to-br ${item.bgFrom} ${item.bgTo} flex items-center justify-center flex-col gap-4`}>
                                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                                                {(() => {
                                                    const TabIcon = TABS.find(t => t.id === activeTab)?.icon || Layers;
                                                    return <TabIcon className="w-6 h-6 text-white/40" />;
                                                })()}
                                            </div>
                                            <div className="text-white/40 font-mono text-[10px] uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full bg-black/20">
                                                Preview Coming Soon
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="p-6 relative">
                                    <h3 className="text-lg font-bold text-white mb-2 uppercase italic tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-slate-400 font-mono leading-relaxed line-clamp-2 group-hover:text-slate-300 transition-colors">
                                        {item.desc}
                                    </p>

                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-300">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                                            <img src="/arrow-up-right.svg" className="w-4 h-4 invert opacity-70" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default DesignStudio;
