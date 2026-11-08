/**
 * Premium Animation Variants for Framer Motion
 * Used across the NovaRey website to maintain a consistent high-end feel.
 */

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
    hidden: { opacity: 1, x: 0, y: 0, scale: 1 },
});

export const fadeInUp = {
    hidden: { opacity: 1, x: 0, y: 0, scale: 1 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for "premium" feel
        }
    }
};

export const fadeInRight = {
    hidden: { opacity: 1, x: 0, y: 0, scale: 1 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
        }
    }
};

export const fadeInLeft = {
    hidden: { opacity: 1, x: 0, y: 0, scale: 1 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
        }
    }
};

export const scaleUp = {
    hidden: { opacity: 1, x: 0, y: 0, scale: 1 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export const spotlightHover = {
    rest: {
        borderColor: "rgba(255, 255, 255, 0.1)",
        backgroundColor: "rgba(255, 255, 255, 0.05)"
    },
    hover: {
        borderColor: "rgba(255, 255, 255, 0.3)",
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        transition: {
            duration: 0.3
        }
    }
};

// ===== Scroll-reveal variants (replaces CSS .animate-on-scroll) =====

export const scrollReveal = {
    hidden: { opacity: 1, x: 0, y: 0, scale: 1 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export const revealScale = {
    hidden: { opacity: 1, x: 0, y: 0, scale: 1 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export const revealLeft = {
    hidden: { opacity: 1, x: 0, y: 0, scale: 1 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export const revealRight = {
    hidden: { opacity: 1, x: 0, y: 0, scale: 1 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Viewport config for whileInView — shared default
export const viewportConfig = { once: true, amount: 0.15, margin: '0px 0px -8% 0px' };
