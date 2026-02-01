import React from 'react';

const GlowCard = ({
    children,
    className = "",
    color = "#00F3FF",
    onClick
}) => {
    return (
        <div
            className={`group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 backdrop-blur-sm overflow-hidden cursor-pointer ${className}`}
            style={{
                '--hover-color': color
            }}
            onClick={onClick}
        >
            {/* Top Glow (Hover Only) */}
            <div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--hover-color)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Internal Gradient Mesh (Hover) */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-[var(--hover-color)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            />

            {/* Hover Border Glow */}
            <div className="absolute inset-0 border border-[var(--hover-color)]/0 group-hover:border-[var(--hover-color)]/30 rounded-2xl transition-all duration-500 pointer-events-none" />

            <div className="relative z-10 h-full flex flex-col">
                {children}
            </div>
        </div>
    );
};

export default GlowCard;
