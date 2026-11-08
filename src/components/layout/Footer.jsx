import React from 'react';
import Logo from '../ui/Logo';

const Footer = () => {
    return (
        <footer className="site-footer border-t border-white/10 px-4 py-3 md:px-8 md:py-5 text-slate-400">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-3">
                    <Logo className="w-8 h-8" />
                    <div className="text-xs font-mono uppercase tracking-[0.3em] text-slate-400">NovaRey Ventures</div>
                </div>
                <div className="site-footer-description hidden lg:block text-xs uppercase tracking-widest text-slate-500">
                    Design · websites · research
                </div>
            </div>
        </footer>
    );
};

export default React.memo(Footer);
