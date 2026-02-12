import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Home, Briefcase, Camera, LayoutGrid, HardDrive, Cpu,
    ChevronLeft, ChevronRight, Settings, LogOut, PanelLeftClose, PanelLeft,
    Image as ImageIcon, Menu, FileText, Layout, PenTool, Code2, Megaphone,
    Monitor, Rocket, Zap, Palette, Hash, Mail, Castle, Waves
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Auto-collapse on mobile screens
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleChange = (e) => {
            setIsMobile(e.matches);
            if (e.matches) setIsCollapsed(true);
        };

        // Set initial state
        handleChange(mediaQuery);

        // Listen for changes
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <motion.aside
            initial={{ width: 256 }}
            animate={{ width: isCollapsed ? 80 : 256 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full flex flex-col flex-shrink-0 border-r surface-panel-border surface-panel relative z-20"
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-8 w-6 h-6 border surface-panel-strong surface-panel-border rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors z-30"
            >
                {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
            </button>

            {/* Window Controls & Logo */}
            <div className={`px-6 pt-5 pb-6 ${isCollapsed ? 'px-4 items-center flex flex-col' : ''}`}>
                <div className={`flex space-x-2 mb-6 opacity-80 ${isCollapsed ? 'space-x-1 justify-center' : ''}`}>
                    <div className="window-dot w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                    <div className="window-dot w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                    <div className="window-dot w-3 h-3 rounded-full bg-[#28C840]"></div>
                </div>

                <div className={`flex items-center gap-3 group cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}>
                    {!isCollapsed && (
                        <button className="text-slate-400 hover:text-white transition-colors">
                            <Menu className="w-6 h-6" />
                        </button>
                    )}
                    <div className={`flex items-center gap-2.5 ${isCollapsed ? '' : ''}`}>
                        <div className="w-6 h-6 flex items-center justify-center">
                            <Logo className="w-6 h-6 opacity-90" />
                        </div>
                        {!isCollapsed && (
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-base font-bold text-white tracking-wide uppercase whitespace-nowrap"
                            >
                                Novarey
                            </motion.h1>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 space-y-6 pb-6 scrollbar-hide">
                {/* Main Section */}
                <nav className="space-y-1">
                    <NavItem icon={<Home className="w-5 h-5" />} label="Home" to="/" accent="#22c55e" soft="rgba(34, 197, 94, 0.18)" collapsed={isCollapsed} />
                    <NavItem icon={<Briefcase className="w-5 h-5" />} label="Work" to="/work" accent="#f97316" soft="rgba(249, 115, 22, 0.18)" collapsed={isCollapsed} />
                    <NavItem icon={<ImageIcon className="w-5 h-5" />} label="Portfolio" to="/portfolio" accent="#38bdf8" soft="rgba(56, 189, 248, 0.18)" collapsed={isCollapsed} />
                    <NavItem icon={<HardDrive className="w-5 h-5" />} label="The i-Drive" to="/idrive" accent="#6366f1" soft="rgba(99, 102, 241, 0.18)" collapsed={isCollapsed} />
                    <NavItem icon={<Cpu className="w-5 h-5" />} label="A.I. Strategy" to="/ai-strategy" accent="#ec4899" soft="rgba(236, 72, 153, 0.18)" collapsed={isCollapsed} />
                    <NavItem icon={<Waves className="w-5 h-5" />} label="Aether" to="/aether" accent="#06b6d4" soft="rgba(6, 182, 212, 0.18)" collapsed={isCollapsed} />
                    <NavItem icon={<Layout className="w-5 h-5" />} label="About" to="/about" accent="#f59e0b" soft="rgba(245, 158, 11, 0.18)" collapsed={isCollapsed} />
                    <NavItem icon={<Mail className="w-5 h-5" />} label="Contact" to="/contact" accent="#14b8a6" soft="rgba(20, 184, 166, 0.18)" collapsed={isCollapsed} />
                </nav>

                {/* Expertise */}
                <div className="pt-2">
                    {!isCollapsed && (
                        <h3 className="uppercase text-xs font-semibold text-slate-500 tracking-wider mb-2 pr-3 pl-3 whitespace-nowrap">
                            Services
                        </h3>
                    )}
                    <nav className="space-y-1">
                        <NavItem icon={<PenTool className="w-4 h-4" />} label="Brand Identity" size="sm" to="/services/brand" accent="#f472b6" soft="rgba(244, 114, 182, 0.18)" collapsed={isCollapsed} />
                        <NavItem icon={<Code2 className="w-4 h-4" />} label="Web Development" size="sm" to="/services/web" accent="#60a5fa" soft="rgba(96, 165, 250, 0.18)" collapsed={isCollapsed} />
                        <NavItem icon={<Megaphone className="w-4 h-4" />} label="Strategic Marketing" size="sm" to="/services/marketing" accent="#fb923c" soft="rgba(251, 146, 60, 0.18)" collapsed={isCollapsed} />
                        <NavItem icon={<Cpu className="w-4 h-4" />} label="A.I. Solutions" size="sm" to="/services/ai" accent="#8b5cf6" soft="rgba(139, 92, 246, 0.18)" collapsed={isCollapsed} />
                    </nav>
                </div>

                {/* Studio OS (Internal) */}
                <div className="pt-6 pb-2">
                    {!isCollapsed && (
                        <h3 className="uppercase text-xs font-semibold text-slate-500 tracking-wider mb-2 pr-3 pl-3 whitespace-nowrap">
                            Studio OS
                        </h3>
                    )}
                    <nav className="space-y-1">
                        <NavItem icon={<Monitor className="w-4 h-4" />} label="Deal Flow CRM" size="sm" to="/crm" collapsed={isCollapsed} />
                    </nav>
                </div>

                {/* Ecosystem */}
                <div className="">
                    {!isCollapsed && (
                        <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 whitespace-nowrap">
                            Ecosystem
                        </h3>
                    )}
                    <nav className="space-y-1">
                        <EcoItem icon={<Rocket className="w-3 h-3" />} color="text-violet-400 bg-violet-500/20" label="Antigravity" collapsed={isCollapsed} />
                        <EcoItem icon={<Zap className="w-3 h-3" />} color="text-indigo-400 bg-indigo-500/20" label="Cursor AI" collapsed={isCollapsed} />
                        <EcoItem icon={<Code2 className="w-3 h-3" />} color="text-blue-500 bg-blue-600/20" label="Visual Studio Code 2" collapsed={isCollapsed} />
                        <EcoItem icon={<Zap className="w-3 h-3" />} color="text-cyan-400 bg-cyan-500/20" label="Gemini Flash 3.0 Pro" collapsed={isCollapsed} />
                        <EcoItem icon={<Palette className="w-3 h-3" />} color="text-fuchsia-400 bg-fuchsia-500/20" label="Opus 4.5" collapsed={isCollapsed} />
                        <EcoItem icon={<Hash className="w-3 h-3" />} color="text-zinc-300 bg-zinc-700/50" label="Grok" collapsed={isCollapsed} />
                        <EcoItem icon={<Code2 className="w-3 h-3" />} color="text-emerald-400 bg-emerald-500/20" label="GPT 5.2 Codex" collapsed={isCollapsed} />
                        <EcoItem icon={<Palette className="w-3 h-3" />} color="text-teal-400 bg-teal-500/20" label="Canva" collapsed={isCollapsed} />
                    </nav>
                </div>
            </div>
        </motion.aside>
    );
};

function NavItem({ icon, label, to, accent, soft, size = 'md', collapsed }) {
    const baseClasses = "nav-item flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all group cursor-pointer relative overflow-hidden";
    const activeClasses = "nav-item-active font-medium text-white";
    const inactiveClasses = "text-slate-400";

    return (
        <NavLink
            to={to}
            style={{ '--nav-accent': accent, '--nav-accent-soft': soft }}
            className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${collapsed ? 'justify-center px-2' : ''}`}
            title={collapsed ? label : ''}
        >
            <span className="nav-icon transition-transform duration-300 flex-shrink-0">
                {icon}
            </span>
            {!collapsed && (
                <span className={`${size === 'sm' ? 'text-sm' : ''} whitespace-nowrap opacity-100 transition-opacity duration-200`}>
                    {label}
                </span>
            )}
        </NavLink>
    )
}

function EcoItem({ icon, label, color, collapsed }) {
    return (
        <div
            className={`flex items-center px-3 py-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all group cursor-default ${collapsed ? 'justify-center' : 'justify-between'}`}
            title={collapsed ? label : ''}
        >
            <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ring-1 ring-white/10 ${color} flex-shrink-0`}>
                    {icon}
                </div>
                {!collapsed && <span className="text-sm whitespace-nowrap">{label}</span>}
            </div>
        </div>
    )
}

export default React.memo(Sidebar);
