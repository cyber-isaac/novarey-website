import React, { useMemo, useState } from 'react';
import { Search, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';
import { searchIndex } from '../../lib/searchIndex';
import { GENERAL_EMAIL_URL } from '../../lib/contactLinks';

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
        <header className="sticky top-0 z-50 flex min-w-0 items-center justify-between border-b surface-panel-border surface-panel-muted px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">
            <div className="min-w-0 flex-1 max-w-[96px] sm:max-w-xl">
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

            <div className="ml-3 flex shrink-0 items-center gap-2 sm:ml-6 sm:gap-4">
                <ThemeToggle theme={theme} onChange={onThemeChange} />
                <a
                    href={GENERAL_EMAIL_URL}
                    className="relative hidden p-2 text-slate-400 transition-colors hover:text-white sm:inline-flex"
                    aria-label="Email Isaac Reyes"
                >
                    <Mail className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#0D0C12]"></span>
                </a>

                {/* Emplaced Header Mini Logo */}
                <Link
                    to="/"
                    className="hidden h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-black p-1.5 text-sm font-semibold text-white ring-2 ring-white/10 sm:flex"
                    aria-label="Go to NovaRey home"
                >
                    <Logo className="w-full h-full" />
                </Link>
            </div>
        </header>
    );
};

export default React.memo(Header);
