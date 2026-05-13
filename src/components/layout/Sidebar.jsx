import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    Bot,
    Briefcase,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Code2,
    Cpu,
    HardDrive,
    Home,
    Image as ImageIcon,
    Layout,
    Mail,
    Megaphone,
    PenTool,
    Radio,
    Sparkles,
    Waves
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Logo from '../ui/Logo';

const MAIN_NAV = [
    { icon: Home, label: 'Home', to: '/', accent: '#8FD3FF', accentRgb: '143 211 255' },
    { icon: Briefcase, label: 'Work', to: '/work', accent: '#F97316', accentRgb: '249 115 22' },
    { icon: ImageIcon, label: 'Portfolio', to: '/portfolio', accent: '#FB7185', accentRgb: '251 113 133' },
    { icon: HardDrive, label: 'The i-Drive', to: '/idrive', accent: '#34D399', accentRgb: '52 211 153' },
    { icon: Cpu, label: 'A.I. Strategy', to: '/ai-strategy', accent: '#22D3EE', accentRgb: '34 211 238' },
    { icon: Waves, label: 'Aether', to: '/aether', accent: '#A3E635', accentRgb: '163 230 53' },
    { icon: Layout, label: 'About', to: '/about', accent: '#E2E8F0', accentRgb: '226 232 240' },
    { icon: Mail, label: 'Contact', to: '/contact', accent: '#F472B6', accentRgb: '244 114 182' },
];

const SERVICE_NAV = [
    { icon: PenTool, label: 'Brand Identity', to: '/services/brand', accent: '#F97316', accentRgb: '249 115 22' },
    { icon: Code2, label: 'Web Development', to: '/services/web', accent: '#60A5FA', accentRgb: '96 165 250' },
    { icon: Megaphone, label: 'Strategic Marketing', to: '/services/marketing', accent: '#FB7185', accentRgb: '251 113 133' },
    { icon: Bot, label: 'A.I. Solutions', to: '/services/ai', accent: '#22D3EE', accentRgb: '34 211 238' },
];

const sidebarVariants = {
    initial: { opacity: 0, x: -24, scale: 0.985, filter: 'blur(12px)' },
    expanded: {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: 'blur(0px)',
        width: 304,
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
    collapsed: { width: 84, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
};

const sectionVariants = {
    show: { transition: { staggerChildren: 0.025, delayChildren: 0.04 } },
};

const navItemVariant = {
    hidden: { opacity: 0, x: -8 },
    show: { opacity: 1, x: 0, transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] } },
};

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleChange = (e) => {
            setIsMobile(e.matches);
            if (e.matches) setIsCollapsed(true);
        };

        handleChange(mediaQuery);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const activeItem = useMemo(() => {
        const items = [...MAIN_NAV, ...SERVICE_NAV];
        return items.find((item) => (
            item.to === '/'
                ? location.pathname === '/'
                : location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)
        )) || MAIN_NAV[0];
    }, [location.pathname]);

    const activeLabel = activeItem.label;

    return (
        <motion.aside
            variants={reduceMotion ? undefined : sidebarVariants}
            initial={reduceMotion ? false : 'initial'}
            animate={isCollapsed ? 'collapsed' : 'expanded'}
            className="sidebar-panel relative z-20 flex h-full flex-shrink-0 flex-col overflow-hidden rounded-r-[28px]"
            aria-label="Primary navigation"
            style={{
                '--nav-accent': activeItem.accent,
                '--nav-accent-rgb': activeItem.accentRgb,
                ...(reduceMotion ? { width: isCollapsed ? 84 : 304 } : {})
            }}
        >
            <button
                type="button"
                onClick={() => setIsCollapsed((value) => !value)}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                className="sidebar-toggle-btn absolute right-4 top-9 z-30 flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-200 hover:scale-105 active:scale-95"
            >
                {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
            </button>

            <div className={`px-[18px] pb-4 pt-6 ${isCollapsed ? 'items-center text-center' : ''}`}>
                <div className={`mb-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8FD3FF]/80 shadow-[0_0_14px_rgba(143,211,255,0.55)]"></span>
                        <span className="h-1.5 w-1.5 rounded-full bg-white/30"></span>
                        <span className="h-1.5 w-1.5 rounded-full bg-white/20"></span>
                    </div>
                    {!isCollapsed && (
                        <div className="rounded-full border border-white/10 bg-white/[0.045] px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.2em] text-[#9AA8B8]">
                            Online
                        </div>
                    )}
                </div>

                <div className={`sidebar-brand group flex min-h-[96px] items-center gap-3.5 rounded-[22px] border p-4 ${isCollapsed ? 'justify-center px-3' : ''}`}>
                    <div className="sidebar-logo-shell flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl p-2.5">
                        <Logo className="logo-svg h-full w-full opacity-95" />
                    </div>
                    <AnimatePresence initial={false}>
                        {!isCollapsed && (
                            <motion.div
                                initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                                animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                                exit={reduceMotion ? undefined : { opacity: 0, x: -6 }}
                                transition={{ duration: 0.16 }}
                                className="min-w-0"
                            >
                                <div className="truncate text-[18px] font-bold uppercase leading-none tracking-[0.16em] text-[#F7F9FC]">NovaRey</div>
                                <div className="mt-2 truncate text-[10px] font-mono uppercase tracking-[0.2em] text-[#A6B7C8]">AI Build Lab</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden px-[18px] pb-5 scrollbar-hide">
                <SidebarSection title="Navigation" collapsed={isCollapsed}>
                    <motion.nav className="space-y-3" variants={sectionVariants} initial="hidden" animate="show">
                        {MAIN_NAV.map((item) => (
                            <NavItem key={item.to} {...item} collapsed={isCollapsed} reduceMotion={reduceMotion} />
                        ))}
                    </motion.nav>
                </SidebarSection>

                <SidebarSection title="Services" collapsed={isCollapsed}>
                    <motion.nav className="space-y-3" variants={sectionVariants} initial="hidden" animate="show">
                        {SERVICE_NAV.map((item) => (
                            <NavItem key={item.to} {...item} collapsed={isCollapsed} reduceMotion={reduceMotion} size="sm" />
                        ))}
                    </motion.nav>
                </SidebarSection>

                <div className={`sidebar-status mt-6 rounded-[20px] border p-4 ${isCollapsed ? 'px-2' : ''}`}>
                    {isCollapsed ? (
                        <div className="flex justify-center text-[#8FD3FF]" title={activeLabel}>
                            <Radio className="h-4 w-4" />
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-[#667282]">
                                    <Radio className="h-3.5 w-3.5 text-[#8FD3FF]" />
                                    Current
                                </div>
                                <span className="rounded-full border border-[#8FD3FF]/20 bg-[#8FD3FF]/10 px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.18em] text-[#BFE5FF]">
                                    Live
                                </span>
                            </div>
                            <div className="mt-3 text-sm font-bold text-[#F5F7FA]">{activeLabel}</div>
                            <div className="mt-1 text-xs leading-relaxed text-[#9AA8B8]">You are here. Move through the studio or start a project when ready.</div>
                        </>
                    )}
                </div>
            </div>

            <div className="p-[18px] pt-3">
                {isCollapsed ? (
                    <NavLink
                        to="/contact"
                        className="sidebar-cta-mini flex h-12 items-center justify-center rounded-2xl"
                        title="Start a project"
                    >
                        <Sparkles className="h-4 w-4" />
                    </NavLink>
                ) : (
                    <NavLink
                        to="/contact"
                        className="sidebar-cta group block rounded-[20px] border p-4"
                    >
                        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-[#BFE5FF]">
                            <Sparkles className="h-3.5 w-3.5" />
                            Start
                        </div>
                        <div className="mt-2 flex items-end justify-between gap-3">
                            <div>
                                <div className="text-sm font-bold text-[#F5F7FA]">Let's build the future.</div>
                                <div className="mt-1 text-xs leading-relaxed text-[#9AA8B8]">Together with AI.</div>
                            </div>
                            <span className="sidebar-cta-arrow flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                                <ArrowRight className="h-4 w-4" />
                            </span>
                        </div>
                    </NavLink>
                )}
            </div>
        </motion.aside>
    );
};

function SidebarSection({ title, collapsed, children }) {
    return (
        <div className="mt-[34px]">
            <AnimatePresence initial={false}>
                {!collapsed && (
                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.14 }}
                        className="mb-3 px-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8FA1B5]"
                    >
                        {title}
                    </motion.h3>
                )}
            </AnimatePresence>
            {children}
        </div>
    );
}

function NavItem({ icon: Icon, label, to, accent, accentRgb, size = 'md', collapsed, reduceMotion }) {
    const baseClasses = 'nav-item group relative flex h-[54px] items-center gap-3.5 overflow-hidden rounded-2xl px-3 transition-colors duration-200';
    const textSize = size === 'sm' ? 'text-[12px]' : 'text-[13px]';

    return (
        <motion.div variants={navItemVariant}>
            <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => (
                    `${baseClasses} ${isActive ? 'nav-item-active nav-text-active font-bold' : 'nav-text-inactive'} ${collapsed ? 'justify-center px-2' : ''}`
                )}
                title={collapsed ? label : undefined}
                style={{ '--nav-accent': accent, '--nav-accent-rgb': accentRgb }}
            >
                {({ isActive }) => (
                    <>
                        {isActive && (
                            <motion.span
                                layoutId="sidebar-active-glass"
                                className="sidebar-active-glass absolute inset-0 z-0 rounded-2xl"
                                transition={{ type: 'spring', stiffness: 420, damping: 34, mass: 0.8 }}
                            />
                        )}
                        <span className="nav-icon relative z-[2] flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                            <Icon className={size === 'sm' ? 'h-[15px] w-[15px]' : 'h-4 w-4'} />
                        </span>
                        <AnimatePresence initial={false}>
                            {!collapsed && (
                                <motion.span
                                    initial={reduceMotion ? false : { opacity: 0, x: -4 }}
                                    animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                                    exit={reduceMotion ? undefined : { opacity: 0, x: -4 }}
                                    transition={{ duration: 0.14 }}
                                    className={`nav-label relative z-[2] min-w-0 flex-1 truncate ${textSize}`}
                                >
                                    {label}
                                </motion.span>
                            )}
                        </AnimatePresence>
                        {!collapsed && isActive && (
                            <span className="nav-status-dot relative z-[2] h-[7px] w-[7px] rounded-full" />
                        )}
                        {collapsed && <span className="sr-only">{label}</span>}
                    </>
                )}
            </NavLink>
        </motion.div>
    );
}

export default React.memo(Sidebar);
