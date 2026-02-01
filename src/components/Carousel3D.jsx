import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion';
import { FileText, User, Briefcase, PenTool, Mail } from 'lucide-react';

const items = [
    { id: 1, title: "Blog", icon: <FileText className="w-full h-full" />, color: "from-pink-500/80 to-rose-500/80", border: "border-pink-500", text: "text-white" },
    { id: 2, title: "About", icon: <User className="w-full h-full" />, color: "from-purple-500/80 to-indigo-500/80", border: "border-purple-500", text: "text-white" },
    { id: 3, title: "Portfolio", icon: <Briefcase className="w-full h-full" />, color: "from-cyan-500/80 to-blue-500/80", border: "border-cyan-500", text: "text-white" },
    { id: 4, title: "Services", icon: <PenTool className="w-full h-full" />, color: "from-emerald-500/80 to-teal-500/80", border: "border-emerald-500", text: "text-white" },
    { id: 5, title: "Contact", icon: <Mail className="w-full h-full" />, color: "from-orange-500/80 to-amber-500/80", border: "border-orange-500", text: "text-white" },
];

const Carousel3D = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [isHovered, setIsHovered] = useState(false);
    const rotation = useMotionValue(0);
    const springRotation = useSpring(rotation, { stiffness: 100, damping: 20, mass: 1 });
    const lastX = useRef(0);

    const FACE_COUNT = items.length;
    const ANGLE_SLICE = 360 / FACE_COUNT;
    const RADIUS = width < 768 ? 140 : 180;
    const CARD_SIZE = 120;

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useAnimationFrame((t, delta) => {
        if (!isHovered) {
            rotation.set(rotation.get() - delta * 0.015);
        }
    });

    const handleMouseMove = (e) => {
        if (isHovered) {
            const currentX = e.clientX;
            const delta = currentX - lastX.current;
            lastX.current = currentX;
            rotation.set(rotation.get() + delta * 0.25);
        }
    };

    const handleMouseEnter = (e) => {
        setIsHovered(true);
        lastX.current = e.clientX;
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            id="carousel-root"
            className="relative w-full h-[550px] bg-[#0D0C12] border-b border-white/5 overflow-hidden flex flex-col group cursor-grab active:cursor-grabbing"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                    alt="Background"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C12] via-[#0D0C12]/40 to-transparent"></div>
            </div>

            <div className="absolute top-1/4 left-0 w-full text-center z-10 pointer-events-none -translate-y-1/2 px-4">
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4 drop-shadow-2xl">Novarey</h1>
                <p className="text-slate-200 text-lg md:text-xl tracking-[0.2em] uppercase font-light">Design & Venture Studio</p>
            </div>

            <div className="flex-1 flex items-end justify-center pb-20 z-10 perspective-[1000px] mt-24">
                <div className="relative flex items-center justify-center h-full w-full" style={{ perspective: "1000px" }}>
                    <motion.div
                        className="relative flex items-center justify-center transform-style-3d"
                        style={{
                            transformStyle: "preserve-3d",
                            rotateY: springRotation,
                            width: CARD_SIZE,
                            height: CARD_SIZE
                        }}
                    >
                        {items.map((item, i) => {
                            const angle = i * ANGLE_SLICE;
                            return (
                                <div
                                    key={item.id}
                                    className={`absolute inset-0 rounded-2xl border-2 ${item.border} bg-gradient-to-br ${item.color} shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center transition-all duration-500 ease-out select-none hover:scale-125 hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:z-50 hover:brightness-110`}
                                    style={{
                                        transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                                        backfaceVisibility: "visible"
                                    }}
                                >
                                    <div className={`p-4 w-20 h-20 ${item.text} drop-shadow-xl transform transition-transform duration-500 hover:rotate-12 hover:scale-110`}>
                                        {item.icon}
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Carousel3D;
