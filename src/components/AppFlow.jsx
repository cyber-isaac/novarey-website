import React from 'react';
import { motion } from 'framer-motion';

const APPS = [
    // Incoming Paths (Left)
    { name: 'Canva', color: '#00C4CC', pathId: 'path-tl', delay: 0 },
    { name: 'After Effects', color: '#CF96FD', pathId: 'path-tl', delay: 4 },
    { name: 'Cursor AI', color: '#31C48D', pathId: 'path-bl', delay: 2 },
    { name: 'Antigravity', color: '#FF5E1A', pathId: 'path-bl', delay: 6 },

    // Outgoing Paths (Right)
    { name: 'Figma', color: '#F24E1E', pathId: 'path-tr', delay: 1 },
    { name: 'Google Stitch', color: '#4285F4', pathId: 'path-tr', delay: 5 },
    { name: 'Google Veo 3', color: '#EA4335', pathId: 'path-br', delay: 3 },
    { name: 'Higgsfield AI', color: '#FBBC05', pathId: 'path-br', delay: 7 },
];

const PATHS = {
    'path-tl': "M 20 100 L 120 100 L 180 180", // Top-Left to Hub
    'path-bl': "M 20 300 L 120 300 L 180 220", // Bottom-Left to Hub
    'path-tr': "M 220 180 L 280 100 L 380 100", // Hub to Top-Right
    'path-br': "M 220 220 L 280 300 L 380 300", // Hub to Bottom-Right
};

const AppFlow = () => {
    return (
        <div className="relative w-full max-w-4xl mx-auto h-[400px] flex items-center justify-center overflow-visible">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
            />

            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
                {Object.entries(PATHS).map(([id, d]) => {
                    const points = d.split(/[A-Z]\s/).filter(Boolean);
                    const start = points[0].trim().split(/\s+/);
                    const end = points[points.length - 1].trim().split(/\s+/);

                    return (
                        <React.Fragment key={id}>
                            {/* Start/End Nodes */}
                            <circle cx={start[0]} cy={start[1]} r="3" fill="rgba(255,255,255,0.15)" />
                            <circle cx={end[0]} cy={end[1]} r="3" fill="rgba(255,255,255,0.15)" />

                            <motion.path
                                d={d}
                                fill="none"
                                stroke="rgba(255,255,255,0.05)"
                                strokeWidth="1.5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5 }}
                            />
                            <motion.path
                                d={d}
                                fill="none"
                                stroke="url(#grad-flow)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                initial={{ pathLength: 0.1, pathOffset: 0, opacity: 0 }}
                                animate={{ pathOffset: 1, opacity: [0, 0.5, 0] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: Math.random() * 2
                                }}
                            />
                        </React.Fragment>
                    );
                })}

                <defs>
                    <linearGradient id="grad-flow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="#ff5e1a" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Central Neural Core */}
            <div className="relative z-10 scale-90 md:scale-100">
                <motion.div
                    className="w-24 h-24 rounded-full bg-[#0D0C12] border-2 border-orange-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(255,94,26,0.2)]"
                    animate={{
                        boxShadow: [
                            "0 0 20px rgba(255,94,26,0.1)",
                            "0 0 60px rgba(255,94,26,0.3)",
                            "0 0 20px rgba(255,94,26,0.1)"
                        ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="grid grid-cols-3 gap-1.5 opacity-40">
                        {[...Array(9)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-orange-500"
                                animate={{ opacity: [0.2, 1, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                            />
                        ))}
                    </div>
                    <motion.div
                        className="absolute inset-[-4px] border-t-2 border-orange-500/40 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>
            </div>

            <div className="absolute inset-0 w-full h-full pointer-events-none">
                {APPS.map((app) => (
                    <AppIcon key={app.name} app={app} path={PATHS[app.pathId]} />
                ))}
            </div>
        </div>
    );
};

const AppIcon = ({ app, path }) => {
    return (
        <motion.div
            className="absolute flex flex-col items-center group pointer-events-auto cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0], offsetDistance: ["0%", "100%"] }}
            transition={{ duration: 8, repeat: Infinity, delay: app.delay, ease: "linear", times: [0, 0.1, 0.9, 1] }}
            style={{ offsetPath: `path("${path}")`, rotate: 0, zIndex: 20 }}
        >
            <div
                className="w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center text-[10px] md:text-sm font-bold text-white shadow-xl backdrop-blur-md border border-white/20 transition-all hover:scale-125 hover:border-orange-500"
                style={{
                    background: `linear-gradient(135deg, ${app.color}cc, #000000)`,
                    boxShadow: `0 0 20px ${app.color}33`
                }}
            >
                <span>{app.name.charAt(0)}</span>
            </div>
            <div className="mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white">
                    {app.name}
                </span>
            </div>
            <div className="absolute -z-10 w-full h-full blur-xl opacity-20 scale-150" style={{ backgroundColor: app.color }} />
        </motion.div>
    );
};

export default AppFlow;
