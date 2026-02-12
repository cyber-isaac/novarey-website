import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Plug, Github, Zap, Workflow, ShieldCheck, Gauge, MousePointerClick, Layers } from 'lucide-react';

const IntegrationsShowcase = () => {
    // Custom Icons for specialized tools
    const CursorIcon = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
            <path d="M4 4l11.733 11.733-3.733.267 3.2 5.067-1.333.8-3.2-5.067-2.933 2.933L4 4z" />
        </svg>
    );

    const VSCodeIcon = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
            <path d="M16 3l-13 13 4 4 14-14-5-3z" />
            <path d="M16 3v16l5-3" />
            <path d="M3 16l5-3" />
        </svg>
    );

    const ChatGPTIcon = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
            <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" />
            <circle cx="12" cy="12" r="1.5" />
        </svg>
    );

    const PerplexityIcon = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
            <path d="M12 2v20M2 12h20M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
        </svg>
    );

    const AntigravityIcon = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
    );

    const AdobeIcon = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
            <path d="M15.5 5.5l5 13h-4l-1-2.5h-5.5l-1 2.5h-4l5-13h5.5zM12 9l-2 5h4l-2-5z" />
        </svg>
    );

    const tools = useMemo(() => ([
        { icon: AdobeIcon, label: 'Adobe CC' },
        { icon: CursorIcon, label: 'Cursor' },
        { icon: VSCodeIcon, label: 'VS Code' },
        { icon: AntigravityIcon, label: 'Antigravity' },
        { icon: ChatGPTIcon, label: 'ChatGPT' },
        { icon: PerplexityIcon, label: 'Perplexity' },
        { icon: Github, label: 'GitHub' }
    ]), []);

    const rowRef = useRef(null);
    const iconRefs = useRef([]);
    if (iconRefs.current.length !== tools.length) {
        iconRefs.current = tools.map((_, index) => iconRefs.current[index] || React.createRef());
    }
    const [nodePoints, setNodePoints] = useState(() => tools.map((_, index) => 90 + index * 120));

    useEffect(() => {
        const updateNodes = () => {
            const rowEl = rowRef.current;
            if (!rowEl) return;
            const rowRect = rowEl.getBoundingClientRect();
            if (!rowRect.width) return;
            const nextPoints = iconRefs.current.map((ref, index) => {
                const iconEl = ref.current;
                if (!iconEl) return 90 + index * 120;
                const iconRect = iconEl.getBoundingClientRect();
                const x = (iconRect.left + iconRect.width / 2) - rowRect.left;
                return Math.round((x / rowRect.width) * 900);
            });
            setNodePoints(nextPoints);
        };

        updateNodes();
        const rowEl = rowRef.current;
        const resizeObserver = new ResizeObserver(updateNodes);
        if (rowEl) {
            resizeObserver.observe(rowEl);
        }
        window.addEventListener('resize', updateNodes);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateNodes);
        };
    }, [tools.length]);

    return (
        <div className="py-24 relative overflow-hidden">
            <div className="sm:px-6 lg:px-8 max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-3 py-1 text-[11px] text-orange-400 ring-1 ring-orange-300/20 uppercase tracking-widest font-mono"
                    >
                        <Plug className="h-3.5 w-3.5" />
                        NovaRey Ventures // Integrated Design System
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl font-black text-white tracking-tighter mt-6 italic uppercase"
                    >
                        One Generalist Designer. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-white">Infinite Outputs.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto mt-4 max-w-3xl text-sm sm:text-base text-neutral-400 leading-relaxed font-medium"
                    >
                        Fusing the precision of the Adobe Suite with the speed of AI tools like Cursor, ChatGPT, and Antigravity. I synchronize these systems to engineer any design, application, or workflow with mission-critical precision.
                    </motion.p>
                </div>

                <div className="relative mx-auto mt-12 max-w-5xl">
                    {/* Tool Icons Row - Adjusted for 7 items */}
                    <div ref={rowRef} className="flex items-center justify-between gap-4 relative z-20 px-8">
                        {tools.map((tool, index) => (
                            <ToolIcon
                                key={tool.label}
                                icon={tool.icon}
                                label={tool.label}
                                ref={iconRefs.current[index]}
                            />
                        ))}
                    </div>

                    {/* Animated Connection SVG */}
                    <div className="relative mt-8 h-64 w-full">
                        <svg viewBox="0 0 900 360" className="absolute inset-0 w-full h-full text-white" fill="none" preserveAspectRatio="xMidYMid meet">
                            <defs>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="white" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="white" stopOpacity="0.1" />
                                </linearGradient>
                            </defs>

                            {/* Static guide lines (faint) for structure */}
                            {nodePoints.map((x, i) => (
                                <path key={`guide-${i}`} d={`M450 300 Q ${450 + (x - 450) * 0.3} 160, ${x} 30`} stroke="white" strokeWidth="0.5" opacity="0.06" />
                            ))}

                            {/* Node Points */}
                            {nodePoints.map((x, i) => (
                                <g key={i}>
                                    <circle cx={x} cy="30" r="4" fill="white" opacity="0.15" />
                                    <circle cx={x} cy="30" r="3" fill="white" filter="url(#glow)">
                                        <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                                    </circle>
                                </g>
                            ))}

                            {/* Connection Paths - smooth quadratic curves */}
                            <ConnectionPath d={`M450 300 Q ${450 + (nodePoints[0] - 450) * 0.3} 150, ${nodePoints[0]} 30`} delay="0s" length={500} />
                            <ConnectionPath d={`M450 300 Q ${450 + (nodePoints[1] - 450) * 0.3} 150, ${nodePoints[1]} 30`} delay="0.3s" length={450} />
                            <ConnectionPath d={`M450 300 Q ${450 + (nodePoints[2] - 450) * 0.3} 140, ${nodePoints[2]} 30`} delay="0.6s" length={400} />
                            <ConnectionPath d={`M450 300 Q 450 140, ${nodePoints[3]} 30`} delay="0.9s" length={300} />
                            <ConnectionPath d={`M450 300 Q ${450 + (nodePoints[4] - 450) * 0.3} 140, ${nodePoints[4]} 30`} delay="0.6s" length={400} />
                            <ConnectionPath d={`M450 300 Q ${450 + (nodePoints[5] - 450) * 0.3} 150, ${nodePoints[5]} 30`} delay="0.3s" length={450} />
                            <ConnectionPath d={`M450 300 Q ${450 + (nodePoints[6] - 450) * 0.3} 150, ${nodePoints[6]} 30`} delay="0s" length={500} />
                        </svg>

                        {/* Central Hub Icon */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30">
                            <motion.span
                                animate={{
                                    boxShadow: ["0 0 20px rgba(251,146,60,0.3)", "0 0 40px rgba(251,146,60,0.6)", "0 0 20px rgba(251,146,60,0.3)"]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/20 ring-2 ring-orange-400/40 backdrop-blur-md"
                            >
                                <Zap className="h-7 w-7 text-orange-300" />
                            </motion.span>
                        </div>
                    </div>
                </div>

                {/* Features Bar */}
                <div className="mx-auto mt-20 max-w-5xl">
                    <div className="flex items-center justify-center gap-6 flex-wrap text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                        <FeatureItem icon={Layers} label="Cross-Stack Execution" />
                        <div className="hidden md:block w-12 h-px border-t border-dashed border-white/10"></div>
                        <FeatureItem icon={Workflow} label="High-Precision Design" />
                        <div className="hidden md:block w-12 h-px border-t border-dashed border-white/10"></div>
                        <FeatureItem icon={Gauge} label="AI-Augmented Velocity" />
                        <div className="hidden md:block w-12 h-px border-t border-dashed border-white/10"></div>
                        <FeatureItem icon={MousePointerClick} label="End-to-End Workflow" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ToolIcon = React.forwardRef(({ icon: Icon, label }, ref) => (
    <motion.div
        ref={ref}
        whileHover={{ y: -5 }}
        className="flex flex-col items-center gap-3 group"
        style={{ flex: '1 1 0', minWidth: 0 }}
    >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] ring-1 ring-white/10 backdrop-blur-sm group-hover:bg-white/10 group-hover:ring-orange-500/30 transition-all duration-300">
            <Icon />
        </span>
        <span className="text-xs font-semibold text-neutral-400 group-hover:text-orange-400 transition-colors tracking-wide whitespace-nowrap">
            {label}
        </span>
    </motion.div>
));

const ConnectionPath = ({ d, delay, length }) => (
    <path
        d={d}
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        style={{
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 0.15
        }}
    >
        <animate
            attributeName="stroke-dashoffset"
            values={`${length};0;${length}`}
            dur="5s"
            begin={delay}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.25 0.1 0.25 1; 0.25 0.1 0.25 1"
        />
        <animate
            attributeName="opacity"
            values="0.05;0.4;0.05"
            dur="5s"
            begin={delay}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.25 0.1 0.25 1; 0.25 0.1 0.25 1"
        />
    </path>
);

const FeatureItem = ({ icon: Icon, label }) => (
    <div className="inline-flex items-center gap-2 group transition-colors hover:text-white">
        <Icon className="h-4 w-4 text-orange-400" />
        <span className="font-bold">{label}</span>
    </div>
);

export default IntegrationsShowcase;
