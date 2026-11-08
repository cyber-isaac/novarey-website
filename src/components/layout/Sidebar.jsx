import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useLocation } from 'react-router-dom';
import {
    Bot,
    Briefcase,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Code2,
    Workflow,
    BookOpen,
    Home,
    User,
    Mail,
    Megaphone,
    PenTool,
    Waves,
    Menu,
    X
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Logo from '../ui/Logo';
import '../../styles/sidebar.css';

const MAIN_NAV = [
    { icon: Home, label: 'Home', to: '/', accent: '#8FD3FF', accentInk: '#155e75', accentRgb: '143 211 255' },
    { icon: Briefcase, label: 'Selected work', to: '/work', accent: '#F97316', accentInk: '#9a3412', accentRgb: '249 115 22' },
    { icon: User, label: 'About', to: '/about', accent: '#E2E8F0', accentInk: '#334155', accentRgb: '226 232 240' },
    { icon: Mail, label: 'Contact', to: '/contact', accent: '#F472B6', accentInk: '#9d174d', accentRgb: '244 114 182' },
];

const LAB_NAV = [
    { icon: BookOpen, label: 'Research & writing', to: '/idrive', accent: '#34D399', accentInk: '#065f46', accentRgb: '52 211 153' },
    { icon: Workflow, label: 'AI strategy', to: '/ai-strategy', accent: '#22D3EE', accentInk: '#155e75', accentRgb: '34 211 238' },
    { icon: Waves, label: 'Audio visualizer', to: '/aether', accent: '#A3E635', accentInk: '#3f6212', accentRgb: '163 230 53' },
];

const SERVICE_NAV = [
    { icon: PenTool, label: 'Brand identity', to: '/services/brand', accent: '#F97316', accentInk: '#9a3412', accentRgb: '249 115 22' },
    { icon: Code2, label: 'Web development', to: '/services/web', accent: '#60A5FA', accentInk: '#1e40af', accentRgb: '96 165 250' },
    { icon: Megaphone, label: 'Strategic marketing', to: '/services/marketing', accent: '#FB7185', accentInk: '#9f1239', accentRgb: '251 113 133' },
    { icon: Bot, label: 'AI solutions', to: '/services/ai', accent: '#22D3EE', accentInk: '#155e75', accentRgb: '34 211 238' },
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
    collapsed: { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)', width: 84, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
};

const sectionVariants = {
    show: { transition: { staggerChildren: 0.025, delayChildren: 0.04 } },
};

const navItemVariant = {
    hidden: { opacity: 0, x: -8 },
    show: { opacity: 1, x: 0, transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] } },
};

const Sidebar = ({ theme = 'dark' }) => {
    const [desktopCollapsed, setDesktopCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const toggleRef = useRef(null);
    const modalRef = useRef(null);
    const navScrollRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const isCollapsed = isMobile ? !mobileOpen : desktopCollapsed;
    const location = useLocation();
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1023px)');
        const handleChange = (e) => {
            setIsMobile(e.matches);
            setMobileOpen(false);
        };

        handleChange(mediaQuery);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const activeItem = useMemo(() => {
        const items = [...MAIN_NAV, ...SERVICE_NAV, ...LAB_NAV];
        return items.find((item) => (
            item.to === '/'
                ? location.pathname === '/'
                : location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)
        )) || MAIN_NAV[0];
    }, [location.pathname]);

    useEffect(() => {
        try { setDesktopCollapsed(localStorage.getItem('novarey-sidebar-collapsed') === 'true'); } catch { /* Storage may be unavailable. */ }
    }, []);

    const toggleDesktop = () => {
        const next = !desktopCollapsed;
        setDesktopCollapsed(next);
        try { localStorage.setItem('novarey-sidebar-collapsed', String(next)); } catch { /* Keep the control usable without storage. */ }
    };

    useEffect(() => { setMobileOpen(false); }, [location.pathname]);

    useEffect(() => {
        if (!isMobile || !mobileOpen) return;
        const modal = modalRef.current;
        const background = [...document.body.children].filter(node => node !== modal);
        const previousInert = background.map(node => node.inert);
        background.forEach(node => { node.inert = true; });
        const previousOverflow = document.body.style.overflow;
        const previousRootOverflow = document.documentElement.style.overflow;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        const focusable = () => [...modal.querySelectorAll('button:not([disabled]), a[href]')].filter(node => node.getClientRects().length);
        toggleRef.current?.focus();
        const onKeyDown = event => {
            if (event.key === 'Escape') {
                event.preventDefault();
                setMobileOpen(false);
            }
            if (event.key === 'Tab') {
                const items = focusable();
                const first = items[0];
                const last = items[items.length - 1];
                if (event.shiftKey && (document.activeElement === first || !modal.contains(document.activeElement))) {
                    event.preventDefault(); last?.focus();
                } else if (!event.shiftKey && (document.activeElement === last || !modal.contains(document.activeElement))) {
                    event.preventDefault(); first?.focus();
                }
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            background.forEach((node, index) => { node.inert = previousInert[index]; });
            document.body.style.overflow = previousOverflow;
            document.documentElement.style.overflow = previousRootOverflow;
            requestAnimationFrame(() => toggleRef.current?.focus());
        };
    }, [isMobile, mobileOpen]);

    useEffect(() => {
        if (isMobile && !mobileOpen) return;
        const frame = requestAnimationFrame(() => {
            const scroller = navScrollRef.current;
            const active = scroller?.querySelector('[aria-current="page"]');
            if (!active) return;
            const bounds = scroller.getBoundingClientRect();
            const item = active.getBoundingClientRect();
            if (item.bottom > bounds.bottom - 12) scroller.scrollTop += item.bottom - bounds.bottom + 12;
            else if (item.top < bounds.top + 12) scroller.scrollTop -= bounds.top - item.top + 12;
        });
        return () => cancelAnimationFrame(frame);
    }, [location.pathname, isCollapsed, isMobile, mobileOpen]);

    const content = (
        <>
        {isMobile && <button ref={toggleRef} type="button" aria-label={isCollapsed ? 'Open navigation' : 'Close navigation'} aria-expanded={!isCollapsed} aria-controls="site-navigation" onClick={() => setMobileOpen(value => !value)} className="fixed left-3 top-4 z-[230] flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-[#111821] text-white">
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </button>}
        {isMobile && !isCollapsed && <div aria-hidden="true" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-[200] bg-black/70" />}
        <motion.aside
            id="site-navigation"
            data-collapsed={isCollapsed}
            data-mobile={isMobile}
            role={isMobile && mobileOpen ? 'dialog' : undefined}
            aria-modal={isMobile && mobileOpen ? true : undefined}
            inert={isMobile && isCollapsed ? '' : undefined}
            variants={reduceMotion || isMobile ? undefined : sidebarVariants}
            initial={false}
            animate={isMobile ? { width: 304, x: isCollapsed ? -304 : 0, opacity: 1, scale: 1, filter: 'blur(0px)' } : isCollapsed ? 'collapsed' : 'expanded'}
            className={`sidebar-panel ${isMobile ? 'fixed inset-y-0 left-0 z-[210]' : 'relative z-20'} flex h-full flex-shrink-0 flex-col overflow-hidden rounded-r-[28px]`}
            aria-label="Primary navigation"
            style={{
                '--nav-accent': activeItem.accent,
                '--nav-accent-rgb': activeItem.accentRgb,
                ...(!isMobile && reduceMotion ? { width: isCollapsed ? 84 : 304 } : {})
            }}
        >
            <button
                type="button"
                onClick={toggleDesktop}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                aria-expanded={!isCollapsed}
                aria-controls="site-navigation"
                className={`${isMobile ? 'hidden' : ''} sidebar-toggle-btn absolute right-4 top-2 z-30 flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-200 hover:scale-105 active:scale-95`}
            >
                {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
            </button>

            <div className={`sidebar-brand-area shrink-0 px-[18px] pb-2 ${isMobile ? 'pt-16' : 'pt-12'} ${isCollapsed ? 'items-center text-center' : ''}`}>
                <NavLink to="/" aria-label="NovaRey home" onClick={() => setMobileOpen(false)} className={`sidebar-brand group flex min-h-[72px] items-center gap-3.5 rounded-[22px] border p-4 ${isCollapsed ? 'justify-center px-3' : ''}`}>
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
                </NavLink>
            </div>

            <div ref={navScrollRef} className="sidebar-nav-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-[18px] pb-3">
                <SidebarSection title="Navigation" collapsed={isCollapsed}>
                    <motion.nav aria-label="Main navigation" className="space-y-1" variants={sectionVariants} initial={false} animate="show">
                        {MAIN_NAV.map((item) => (
                            <NavItem key={item.to} {...item} collapsed={isCollapsed} reduceMotion={reduceMotion} />
                        ))}
                    </motion.nav>
                </SidebarSection>

                <SidebarSection title="Services" collapsed={isCollapsed}>
                    <motion.nav aria-label="Services" className="space-y-1" variants={sectionVariants} initial={false} animate="show">
                        {SERVICE_NAV.map((item) => (
                            <NavItem key={item.to} {...item} collapsed={isCollapsed} reduceMotion={reduceMotion} size="sm" />
                        ))}
                    </motion.nav>
                </SidebarSection>

                <SidebarSection title="Research & Lab" collapsed={isCollapsed}>
                    <motion.nav aria-label="Research and experiments" className="space-y-1" variants={sectionVariants} initial={false} animate="show">
                        {LAB_NAV.map((item) => <NavItem key={item.to} {...item} collapsed={isCollapsed} reduceMotion={reduceMotion} size="sm" />)}
                    </motion.nav>
                </SidebarSection>


            </div>

            <div className="sidebar-footer shrink-0 p-[18px] pt-2">
                {isCollapsed ? (
                    <NavLink
                        to="/contact"
                        className="sidebar-cta-mini flex h-12 items-center justify-center rounded-2xl"
                        title="Start a project"
                        aria-label="Start a project"
                    >
                        <ArrowRight className="h-4 w-4" />
                    </NavLink>
                ) : (
                    <NavLink
                        to="/contact"
                        className="sidebar-cta group block rounded-[20px] border p-4"
                    >
                        <div className="flex items-end justify-between gap-3">
                            <div>
                                <div className="text-sm font-bold text-[#F5F7FA]">Start a project</div>
                                <div className="mt-1 text-xs leading-relaxed text-[#9AA8B8]">Tell me what you need.</div>
                            </div>
                            <span className="sidebar-cta-arrow flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                                <ArrowRight className="h-4 w-4" />
                            </span>
                        </div>
                    </NavLink>
                )}
            </div>
        </motion.aside>
        </>
    );
    return isMobile && mobileOpen
        ? createPortal(<div ref={modalRef} className={`theme-${theme} fixed inset-0 z-[200]`}>{content}</div>, document.body)
        : content;
};

function SidebarSection({ title, collapsed, children }) {
    return (
        <div className="sidebar-section mt-4">
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

function NavItem({ icon: Icon, label, to, accent, accentInk, accentRgb, size = 'md', collapsed, reduceMotion }) {
    const baseClasses = 'nav-item group relative flex h-11 items-center gap-3.5 overflow-hidden rounded-2xl px-3 transition-colors duration-200';
    const textSize = size === 'sm' ? 'text-[12px]' : 'text-[13px]';

    return (
        <motion.div variants={reduceMotion ? undefined : navItemVariant}>
            <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => (
                    `${baseClasses} ${isActive ? 'nav-item-active nav-text-active font-bold' : 'nav-text-inactive'} ${collapsed ? 'justify-center px-2' : ''}`
                )}
                title={collapsed ? label : undefined}
                style={{ '--nav-accent': accent, '--nav-accent-ink': accentInk, '--nav-accent-rgb': accentRgb }}
            >
                {({ isActive }) => (
                    <>
                        {isActive && (
                            <span
                                aria-hidden="true"
                                className="sidebar-active-glass absolute inset-0 z-0 rounded-2xl"
                            />
                        )}
                        <span aria-hidden="true" className="nav-icon relative z-[2] flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                            <Icon className="nav-glyph" size={20} strokeWidth={1.75} aria-hidden="true" focusable="false" />
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
                            <span aria-hidden="true" className="nav-status-dot relative z-[2] h-[7px] w-[7px] rounded-full" />
                        )}
                        {collapsed && <span className="sr-only">{label}</span>}
                    </>
                )}
            </NavLink>
        </motion.div>
    );
}

export default React.memo(Sidebar);
