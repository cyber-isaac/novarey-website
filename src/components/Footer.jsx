import React from 'react';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className="border-t border-white/10 px-8 py-8 text-slate-400">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-3">
                    <Logo className="w-8 h-8" />
                    <div className="text-xs font-mono uppercase tracking-[0.3em] text-slate-400">NovaRey Ventures</div>
                </div>
                <div className="text-xs uppercase tracking-widest text-slate-500">
                    AI venture studio · custom builds · research archive
                </div>
            </div>
        </footer>
    );
};

export default React.memo(Footer);
