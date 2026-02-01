import React from 'react';

const Button = ({
    children,
    icon: Icon,
    onClick,
    className = "",
    color = "var(--mission-accent, #1BFD9C)",
    soft = "var(--mission-accent-soft, rgba(27, 253, 156, 0.12))",
    glow = "var(--mission-accent-glow, rgba(27, 253, 156, 0.4))",
    type = "button",
    floating = false,
    as: Component = "button",
    href,
    target,
    rel,
    ...rest
}) => {
    const isButton = Component === "button";

    return (
        <Component
            {...(isButton ? { type } : {})}
            {...(!isButton ? { href, target, rel } : {})}
            onClick={onClick}
            {...rest}
            className={`btn-beam inline-flex items-center justify-center gap-2 tracking-tight font-sans transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${floating ? 'animate-float' : ''} ${className}`}
            style={{
                '--btn-color': color,
                '--btn-color-soft': soft,
                '--btn-color-glow': glow,
                fontSize: '15px',
                padding: '0.7em 2.7em',
                letterSpacing: '0.06em',
                position: 'relative',
                borderRadius: '0.6em',
                overflow: 'hidden',
                lineHeight: '1.4em',
            }}
        >
            {Icon && <Icon className="w-4 h-4" strokeWidth={1.5} />}
            {children}
        </Component>
    );
};

export default Button;
