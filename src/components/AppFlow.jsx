import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const APPS = [
    // Left side convergence
    { name: 'Canva', color: '#10b981', side: 'left', delay: 0 },
    { name: 'After Effects', color: '#10b981', side: 'left', delay: 2 },
    { name: 'Photoshop', color: '#10b981', side: 'left', delay: 4 },
    { name: 'Illustrator', color: '#10b981', side: 'left', delay: 6 },

    // Right side convergence
    { name: 'Cursor', color: '#10b981', side: 'right', delay: 1 },
    { name: 'ChatGPT', color: '#10b981', side: 'right', delay: 3 },
    { name: 'MidJourney', color: '#10b981', side: 'right', delay: 5 },
    { name: 'Runway', color: '#10b981', side: 'right', delay: 7 },
];

const AppFlow = () => {
    return (
        <div className="relative w-full max-w-5xl mx-auto h-[500px] flex items-center justify-center overflow-visible bg-black/20 rounded-3xl border border-white/5">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            {/* SVG Background Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <linearGradient id="glow-left" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="glow-right" x1="100%" y1="0%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
                    </linearGradient>
                </defs>

                {/* Left Paths */}
                {[100, 200, 300, 400].map((y, i) => (
                    <path key={`l-${i}`} d={`M 50 ${y} L 250 ${y} L 380 250`} fill="none" stroke="url(#glow-left)" strokeWidth="1" opacity="0.2" />
                ))}

                {/* Right Paths */}
                {[100, 200, 300, 400].map((y, i) => (
                    <path key={`r-${i}`} d={`M 750 ${y} L 550 ${y} L 420 250`} fill="none" stroke="url(#glow-right)" strokeWidth="1" opacity="0.2" />
                ))}
            </svg>

            {/* Central Neural Hub */}
            <div className="relative z-10">
                <motion.div
                    className="w-32 h-32 rounded-full bg-[#050505] border border-emerald-500/30 flex items-center justify-center shadow-[0_0_80px_rgba(16,185,129,0.15)]"
                    animate={{
                        boxShadow: [
                            "0 0 40px rgba(16,185,129,0.1)",
                            "0 0 90px rgba(16,185,129,0.3)",
                            "0 0 40px rgba(16,185,129,0.1)"
                        ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="grid grid-cols-3 gap-2 opacity-60">
                        {[...Array(9)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
                                animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                            />
                        ))}
                    </div>
                    {/* Rotating Ring */}
                    <motion.div
                        className="absolute inset-[-8px] border-t border-b border-emerald-500/20 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute inset-[-15px] border-l border-r border-emerald-500/10 rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>

                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-[10px] font-mono tracking-[0.4em] text-emerald-500/60 uppercase">Neural App Pipeline</span>
                </div>
            </div>

            {/* Floating App Icons */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                {APPS.map((app, i) => (
                    <AppIcon key={app.name} app={app} index={i} />
                ))}
            </div>
        </div>
    );
};

const AppIcon = ({ app, index }) => {
    // Generate randomized paths for more organic feel
    const startX = app.side === 'left' ? -50 : 850;
    const startY = 100 + (index % 4) * 100;
    const endX = 400; // Hub Center
    const endY = 250;

    const midX = app.side === 'left' ? 250 : 550;
    const midY = startY;

    const path = `M ${startX} ${startY} L ${midX} ${midY} L ${endX} ${endY}`;

    return (
        <motion.div
            className="absolute flex flex-col items-center group pointer-events-auto cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{
                opacity: [0, 1, 1, 0],
                offsetDistance: ["0%", "100%"]
            }}
            transition={{
                duration: 10,
                repeat: Infinity,
                delay: app.delay,
                ease: "linear",
                times: [0, 0.1, 0.9, 1]
            }}
            style={{
                offsetPath: `path("${path}")`,
                rotate: 0,
                zIndex: 20
            }}
        >
            <motion.div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-md border border-emerald-500/20 transition-all hover:scale-110"
                style={{
                    background: `linear-gradient(135deg, rgba(16,185,129,0.15), rgba(0,0,0,0.8))`,
                    boxShadow: `0 0 20px rgba(16,185,129,0.1)`
                }}
            >
                <div className="flex flex-col items-center">
                    <span className="text-white font-black text-lg italic">{app.name.charAt(0)}</span>
                </div>

                {/* Glow Backdrop */}
                <div className="absolute inset-0 -z-10 bg-emerald-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            <div className="mt-2 text-[9px] font-mono text-emerald-500/50 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                {app.name}
            </div>
        </motion.div>
    );
};

export default AppFlow;
