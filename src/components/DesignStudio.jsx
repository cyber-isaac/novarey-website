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
        <section className="w-full py-16 animate-on-scroll">
            <VideoModal
                isOpen={!!activeVideo}
                onClose={() => setActiveVideo(null)}
                videoSrc={activeVideo?.src}
                title={activeVideo?.title}
            />

            {/* Full-width header section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col gap-8 mb-12">
                    <div>
                        <div className="text-sm font-mono text-orange-400 uppercase tracking-widest mb-3">
                            Creative Portfolio
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase italic tracking-tight">
                            Design Studio
                        </h2>
                        <p className="text-lg text-slate-400 mt-4 max-w-2xl">
                            Cross-disciplinary creative outputs spanning motion, web, print, and AI-generated media.
                        </p>
                    </div>

                    {/* Full-width scrollable tabs */}
                    <div className="flex overflow-x-auto pb-2 gap-3 no-scrollbar">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 border ${activeTab === tab.id
                                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                    : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-black' : 'text-slate-500'}`} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Full-width content area */}
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                        >
                            {CONTENT[activeTab]?.map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative rounded-3xl border border-white/10 bg-[#0B0B0F] overflow-hidden hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2"
                                    onMouseEnter={() => setHoveredCard(item.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    onClick={() => item.type === 'video' && handleVideoClick(item.src, item.title)}
                                >
                                    {/* Media Container - Larger aspect ratio */}
                                    <div className={`relative aspect-[16/10] overflow-hidden ${item.type === 'video' ? 'cursor-pointer' : ''}`}>
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
                                                    <div className="p-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                                        <Play className="w-8 h-8 text-white fill-white" />
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className={`w-full h-full bg-gradient-to-br ${item.bgFrom} ${item.bgTo} flex items-center justify-center flex-col gap-4`}>
                                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                                                    {(() => {
                                                        const TabIcon = TABS.find(t => t.id === activeTab)?.icon || Layers;
                                                        return <TabIcon className="w-8 h-8 text-white/40" />;
                                                    })()}
                                                </div>
                                                <div className="text-white/40 font-mono text-xs uppercase tracking-widest border border-white/10 px-4 py-1.5 rounded-full bg-black/20">
                                                    Preview Coming Soon
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Info - Larger text */}
                                    <div className="p-8 relative">
                                        <h3 className="text-xl font-bold text-white mb-3 uppercase italic tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-slate-400 font-mono leading-relaxed line-clamp-2 group-hover:text-slate-300 transition-colors">
                                            {item.desc}
                                        </p>

                                        <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-300">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                                                <img src="/arrow-up-right.svg" className="w-5 h-5 invert opacity-70" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};


export default DesignStudio;
