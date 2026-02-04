import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import UnifiedBackground from './UnifiedBackground';
import Footer from './Footer';

const PAGE_ACCENTS = {
    '/': { accent: '#22c55e', soft: 'rgba(34, 197, 94, 0.18)', glow: 'rgba(34, 197, 94, 0.45)' },
    '/work': { accent: '#f97316', soft: 'rgba(249, 115, 22, 0.18)', glow: 'rgba(249, 115, 22, 0.45)' },
    '/portfolio': { accent: '#38bdf8', soft: 'rgba(56, 189, 248, 0.18)', glow: 'rgba(56, 189, 248, 0.45)' },
    '/history': { accent: '#3b82f6', soft: 'rgba(59, 130, 246, 0.05)', glow: 'rgba(59, 130, 246, 0.15)' },
    '/idrive': { accent: '#6366f1', soft: 'rgba(99, 102, 241, 0.18)', glow: 'rgba(99, 102, 241, 0.45)' },
    '/ai-strategy': { accent: '#ec4899', soft: 'rgba(236, 72, 153, 0.18)', glow: 'rgba(236, 72, 153, 0.45)' },
    '/about': { accent: '#22c55e', soft: 'rgba(34, 197, 94, 0.18)', glow: 'rgba(34, 197, 94, 0.45)' },
    '/contact': { accent: '#14b8a6', soft: 'rgba(20, 184, 166, 0.18)', glow: 'rgba(20, 184, 166, 0.45)' },
    '/services/brand': { accent: '#f472b6', soft: 'rgba(244, 114, 182, 0.18)', glow: 'rgba(244, 114, 182, 0.45)' },
    '/services/web': { accent: '#60a5fa', soft: 'rgba(96, 165, 250, 0.18)', glow: 'rgba(96, 165, 250, 0.45)' },
    '/services/marketing': { accent: '#fb923c', soft: 'rgba(251, 146, 60, 0.18)', glow: 'rgba(251, 146, 60, 0.45)' },
    '/services/ai': { accent: '#8b5cf6', soft: 'rgba(139, 92, 246, 0.18)', glow: 'rgba(139, 92, 246, 0.45)' }
};

const Layout = ({ children }) => {
    const location = useLocation();
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll('.animate-on-scroll'));
        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
        );

        elements.forEach((el, index) => {
            el.classList.remove('is-visible');
            const delay = (index % 5) * 60;
            el.style.setProperty('--reveal-delay', `${delay}ms`);
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, [location.pathname]);

    useEffect(() => {
        const stored = localStorage.getItem('novarey-theme');
        if (stored) {
            setTheme(stored);
        }
    }, []);

    useEffect(() => {
        const match = Object.keys(PAGE_ACCENTS).find((path) =>
            location.pathname === path || (path !== '/' && location.pathname.startsWith(path))
        );
        const palette = PAGE_ACCENTS[match] || PAGE_ACCENTS['/'];
        const root = document.documentElement;
        root.style.setProperty('--page-accent', palette.accent);
        root.style.setProperty('--page-accent-soft', palette.soft);
        root.style.setProperty('--page-accent-glow', palette.glow);
        root.style.setProperty('--mission-accent', palette.accent);
        root.style.setProperty('--mission-accent-soft', palette.soft);
        root.style.setProperty('--mission-accent-glow', palette.glow);
    }, [location.pathname]);

    useEffect(() => {
        localStorage.setItem('novarey-theme', theme);
    }, [theme]);

    return (
        <div className={`theme-${theme} text-slate-300 w-full h-screen overflow-hidden flex selection:bg-neon/30 selection:text-neon-200`}>
            <UnifiedBackground />
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
                <Header theme={theme} onThemeChange={setTheme} />
                {children}
                <Footer />
            </main>
        </div>
    );
};

export default Layout;
