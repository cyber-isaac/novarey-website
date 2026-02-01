import React, { useMemo, useState } from 'react';
import { Search, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { searchIndex } from '../lib/searchIndex';

const Header = ({ theme, onThemeChange }) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        return searchIndex.filter((item) => {
            const haystack = `${item.title} ${item.description} ${item.tags.join(' ')}`.toLowerCase();
            return haystack.includes(q);
        }).slice(0, 6);
    }, [query]);

    const handleSelect = (href) => {
        setQuery('');
        setIsOpen(false);
        navigate(href);
    };

    return (
        <header className="sticky z-50 flex surface-panel-muted border-b surface-panel-border pt-4 pr-8 pb-4 pl-8 top-0 backdrop-blur-md items-center justify-between">
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-white">
                        <Search className="w-4 h-4" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search projects, tags, or articles..."
                        className="placeholder-slate-500 outline-none focus:ring-2 transition-all focus:ring-white/10 text-sm w-full border rounded-full pt-2.5 pr-12 pb-2.5 pl-11 surface-input"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setIsOpen(true);
                        }}
                        onFocus={() => setIsOpen(true)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && results.length > 0) {
                                handleSelect(results[0].href);
                            }
                            if (e.key === 'Escape') {
                                setIsOpen(false);
                            }
                        }}
                    />
                    {isOpen && query.trim().length > 0 && (
                        <div
                            className="absolute left-0 right-0 mt-3 rounded-2xl border surface-panel-border surface-panel shadow-2xl overflow-hidden z-50"
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            {results.length === 0 ? (
                                <div className="p-4 text-xs font-mono text-slate-500 uppercase tracking-widest">
                                    No matches found
                                </div>
                            ) : (
                                <div className="py-2">
                                    {results.map((item) => (
                                        <button
                                            key={item.href}
                                            onClick={() => handleSelect(item.href)}
                                            className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors"
                                        >
                                            <div className="text-sm font-semibold text-white">{item.title}</div>
                                            <div className="text-xs text-slate-400 mt-1">{item.description}</div>
                                            <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-2">
                                                {item.tags.slice(0, 4).join(' • ')}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4 ml-6">
                <ThemeToggle theme={theme} onChange={onThemeChange} />
                <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                    <Mail className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#0D0C12]"></span>
                </button>

                {/* Emplaced Header Mini Logo */}
                <div className="flex cursor-pointer text-sm font-semibold text-white bg-black w-9 h-9 rounded-full ring-white/10 ring-2 items-center justify-center overflow-hidden p-1.5">
                    <Logo className="w-full h-full" />
                </div>
            </div>
        </header>
    );
};

export default Header;
