import React, { useEffect, useRef, useState } from 'react';

const GlitchReveal = ({
    leftSrc,
    rightSrc,
    rightType = 'video',
    labelLeft,
    labelRight,
    overlayText,
    className = ''
}) => {
    const [value, setValue] = useState(0);
    const [hasInteracted, setHasInteracted] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        if (!videoRef.current) return;
        if (hasInteracted) {
            videoRef.current.play().catch(() => undefined);
        } else {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [hasInteracted]);

    const handleInput = (event) => {
        const nextValue = 100 - Number(event.target.value);
        setValue(nextValue);
        if (!hasInteracted) {
            setHasInteracted(true);
        }
    };

    return (
        <div className={`relative w-full h-[420px] md:h-[520px] rounded-[32px] overflow-hidden border border-white/10 bg-black/30 ${className}`}>
            <img
                src={leftSrc}
                alt={labelLeft || 'Original image'}
                className="absolute inset-0 w-full h-full object-cover opacity-95"
                loading="lazy"
            />

            {overlayText && (
                <div className="absolute left-8 top-8 md:left-10 md:top-10 text-2xl md:text-3xl font-black uppercase italic text-black/85 drop-shadow-[0_6px_18px_rgba(255,255,255,0.35)]">
                    {overlayText}
                </div>
            )}

            <div className="absolute inset-0 overflow-hidden" style={{ width: `${value}%`, right: 0, left: 'auto' }}>
                {rightType === 'video' ? (
                    <video
                        ref={videoRef}
                        src={rightSrc}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <img
                        src={rightSrc}
                        alt={labelRight || 'Variant image'}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                    />
                )}
                <div className="absolute inset-0 glitch-overlay"></div>
            </div>

            <div className="absolute inset-0 glitch-noise pointer-events-none"></div>

            <div
                className="absolute top-0 bottom-0 w-[3px] bg-cyan-200/70 shadow-[0_0_30px_rgba(56,189,248,0.9)] glow-pulse"
                style={{ left: `calc(${100 - value}% - 1.5px)` }}
            >
                <div className="absolute -left-[6px] -top-6 h-6 w-4 rounded-full bg-cyan-200/80 blur-sm"></div>
                <div className="absolute -left-[6px] -bottom-6 h-6 w-4 rounded-full bg-cyan-200/80 blur-sm"></div>
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cyan-200/20 border border-cyan-100/70 backdrop-blur"></div>
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-cyan-300/10 blur-xl"></div>
            </div>

            <input
                type="range"
                min="0"
                max="100"
                value={100 - value}
                onInput={handleInput}
                onPointerDown={() => setHasInteracted(true)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                aria-label="Glitch reveal slider"
            />

            {!hasInteracted && (
                <div className="absolute top-6 right-6 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.4em] text-white/70 slide-nudge pointer-events-none">
                    Slide <span className="text-white/80">←</span>
                </div>
            )}

            {labelLeft && (
                <div className="absolute bottom-6 left-6 text-[10px] font-mono uppercase tracking-widest text-white/70 bg-black/40 border border-white/10 px-3 py-2 rounded-full">
                    {labelLeft}
                </div>
            )}
            {labelRight && (
                <div className="absolute bottom-6 right-6 text-[10px] font-mono uppercase tracking-widest text-white/70 bg-black/40 border border-white/10 px-3 py-2 rounded-full">
                    {labelRight}
                </div>
            )}

            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.6em] text-orange-400/90 drop-shadow-[0_0_12px_rgba(251,146,60,0.7)]">
                Slide
            </div>
        </div>
    );
};

export default GlitchReveal;
