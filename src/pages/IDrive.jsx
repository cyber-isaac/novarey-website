import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Folder, Atom, Zap, Globe, Hammer, FileText, HardDrive, Shield, ChevronRight } from 'lucide-react';
import { db } from '../lib/db';
import { motion } from 'framer-motion';
import ConstellationBackground from '../components/ConstellationBackground';
import Button from '../components/Button';

const CATEGORIES = [
    { id: 'all', label: 'All Files', icon: Folder },
    { id: 'mycology', label: 'Mycology', icon: Atom },
    { id: 'ai', label: 'Intelligence', icon: Zap },
    { id: 'politics', label: 'World Stats', icon: Globe },
    { id: 'diy', label: 'Physical', icon: Hammer },
    { id: 'productivity', label: 'Efficiency', icon: FileText }
];

const IDrive = () => {
    const [posts, setPosts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTag, setActiveTag] = useState('all');

    useEffect(() => {
        const data = db.getPosts();
        setPosts(data);
    }, []);

    const filteredPosts = posts.filter((post) => {
        const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
        const matchesTag = activeTag === 'all' || (post.tags || []).includes(activeTag);
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch = !query || [
            post.title,
            post.excerpt,
            ...(post.tags || [])
        ].some((field) => field?.toLowerCase().includes(query));
        return matchesCategory && matchesTag && matchesSearch;
    });

    const allTags = Array.from(new Set(posts.flatMap((post) => post.tags || [])));

    const tagCounts = posts.reduce((acc, post) => {
        (post.tags || []).forEach((tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
    }, {});

    const tagStyleMap = {
        AI: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30',
        Agents: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
        Research: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
        Mycology: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
        'Bio Lab': 'bg-teal-500/15 text-teal-300 border-teal-500/30',
        Protocols: 'bg-green-500/15 text-green-300 border-green-500/30',
        DIY: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
        Hardware: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
        'Build Log': 'bg-rose-500/15 text-rose-300 border-rose-500/30'
    };

    const getTagClasses = (tag, isActive) => {
        const themed = tagStyleMap[tag] || 'bg-white/5 text-slate-300 border-white/10';
        if (isActive) {
            return 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.12)]';
        }
        return `${themed} hover:text-white hover:bg-white/10 hover:border-white/30`;
    };

    const featuredPost = filteredPosts[0];
    const secondaryPosts = filteredPosts.slice(1, 4);
    const gridPosts = filteredPosts.slice(4, 12);
    const sidebarPosts = posts.slice(0, 4);

    return (
        <div className="flex-1 min-h-0 overflow-y-auto h-full relative bg-transparent" data-scroll-container>
            <ConstellationBackground />
            <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

            <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/30 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-3 text-emerald-400/70 font-mono text-[10px] tracking-widest">
                        <Shield className="w-3 h-3" />
                        SECURE_TERMINAL_ESTABLISHED // NODE-NR-44
                    </div>
                    <div className="flex flex-1 justify-end">
                        <div className="relative w-full max-w-xl group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-white transition-colors" />
                            <input
                                type="text"
                                placeholder="SEARCH ARCHIVE..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#14121D]/70 backdrop-blur-sm border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-white/30 transition-all font-mono text-sm"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="relative z-10">
                <section className="max-w-7xl mx-auto px-6 pt-10">
                    <section id="overview" className="rounded-[28px] border border-white/10 bg-[#12131A]/45 backdrop-blur-xl p-8 lg:p-12">
                        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
                            <div className="space-y-6">
                                <div className="animate-on-scroll">
                                    <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/70">
                                        Documentation / Getting Started
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
                                        The i-Drive
                                    </h1>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-black/20 p-5 animate-on-scroll">
                                    <ol className="space-y-3 text-sm text-slate-300 max-w-2xl">
                                        <li className="flex items-center justify-between gap-4">
                                            <span className="font-mono uppercase tracking-widest text-white/50">Item Name</span>
                                            <span className="text-white">NovaRey i-Drive Archive</span>
                                        </li>
                                        <li className="flex items-center justify-between gap-4">
                                            <span className="font-mono uppercase tracking-widest text-white/50">Created</span>
                                            <span className="text-white">2026</span>
                                        </li>
                                        <li className="flex items-center justify-between gap-4">
                                            <span className="font-mono uppercase tracking-widest text-white/50">Item Version</span>
                                            <span className="text-white">v1.0</span>
                                        </li>
                                        <li className="flex items-center justify-between gap-4">
                                            <span className="font-mono uppercase tracking-widest text-white/50">Author</span>
                                            <span className="text-white">NovaRey Studio</span>
                                        </li>
                                    </ol>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 animate-on-scroll">
                                    <h2 className="text-lg font-semibold text-white">Introduction</h2>
                                    <p className="text-sm text-slate-400 mt-3 max-w-2xl leading-relaxed">
                                        A living blog covering high-interest topics: special operations, politics, military and
                                        intelligence notes, mycology, AI, design, and the tools that help me become an experienced
                                        practitioner of the best systems available.
                                    </p>
                                    <div className="mt-4 text-sm text-slate-400">
                                        Expect field notes, research logs, and tactical breakdowns across those domains.
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 animate-on-scroll">
                                    <Button as={Link} to="/contact" className="uppercase italic font-black tracking-widest text-xs">
                                        Request Support
                                    </Button>
                                    <div className="text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                                        PATH: /root/archive/declassified
                                    </div>
                                </div>
                            </div>
                            <figure className="rounded-3xl border border-white/10 overflow-hidden bg-black/25 animate-on-scroll">
                                <img
                                    src="/homepage_whatido.png"
                                    alt="Archive preview"
                                    className="w-full h-[280px] object-cover opacity-85"
                                />
                                <figcaption className="px-4 py-3 text-xs font-mono text-white/50 border-t border-white/10">
                                    Documentation preview still frame
                                </figcaption>
                            </figure>
                        </div>
                        <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5 animate-on-scroll">
                            <h3 className="text-base font-semibold text-white">Template Features</h3>
                            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-400 max-w-2xl">
                                <li>Structured documentation layout</li>
                                <li>Scroll-triggered reveal animation</li>
                                <li>Category and tag filters</li>
                                <li>Searchable archive entries</li>
                                <li>Translucent panels and grid</li>
                                <li>Responsive column layout</li>
                            </ul>
                        </div>
                    </section>
                </section>

                <section className="max-w-7xl mx-auto px-6 pt-10">
                    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
                        <aside className="space-y-6">
                            <div className="rounded-2xl border border-white/10 bg-[#14121D]/45 backdrop-blur-sm p-5 sticky top-24">
                                <h3 className="text-sm font-mono uppercase tracking-widest text-white/70 mb-4">
                                    Doc Navigation
                                </h3>
                                <nav className="space-y-2 text-xs font-mono text-slate-400">
                                    <a href="#overview" className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                        Overview <ChevronRight className="w-3 h-3" />
                                    </a>
                                    <a href="#featured" className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                        Featured Intel <ChevronRight className="w-3 h-3" />
                                    </a>
                                    <a href="#latest" className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                        Latest Drops <ChevronRight className="w-3 h-3" />
                                    </a>
                                    <a href="#media" className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                        Media Vault <ChevronRight className="w-3 h-3" />
                                    </a>
                                    <a href="#tags" className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                        Tags & Filters <ChevronRight className="w-3 h-3" />
                                    </a>
                                </nav>
                                <div className="mt-6">
                                    <div className="text-[10px] font-mono uppercase tracking-widest text-white/60 mb-3">Categories</div>
                                    <div className="flex flex-wrap gap-2">
                                        {CATEGORIES.map((cat) => {
                                            const Icon = cat.icon;
                                            const isActive = activeCategory === cat.id;
                                            return (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => setActiveCategory(cat.id)}
                                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase tracking-widest border transition-all ${isActive
                                                        ? 'bg-white text-black border-white shadow-[0_0_16px_rgba(255,255,255,0.12)]'
                                                        : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
                                                        }`}
                                                >
                                                    <Icon className={`w-3 h-3 ${isActive ? 'text-black' : 'text-slate-400'}`} />
                                                    {cat.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-[#14121D]/45 backdrop-blur-sm p-5">
                                <h4 className="text-sm font-mono uppercase tracking-widest text-white/70 mb-4">Popular Posts</h4>
                                <div className="space-y-4">
                                    {sidebarPosts.map((post) => (
                                        <Link key={post.id} to={`/idrive/${post.id}`} className="flex gap-3 group">
                                            <div className="h-14 w-14 rounded-xl overflow-hidden border border-white/10">
                                                <img src={post.coverImage || '/homepage_info.png'} alt={post.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{post.date}</div>
                                                <div className="text-sm text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                                                    {post.title}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        <div className="space-y-10 pb-16">

                            <section id="featured" className="rounded-2xl border border-white/10 bg-[#14121D]/45 backdrop-blur-sm p-6 animate-on-scroll">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-white">Featured Intel</h2>
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Priority Feed</span>
                                </div>

                                {featuredPost ? (
                                    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
                                        <Link
                                            to={`/idrive/${featuredPost.id}`}
                                            className="group rounded-2xl border border-white/10 bg-black/20 overflow-hidden hover:border-white/25 transition-all"
                                        >
                                            <div className="relative h-52 md:h-64">
                                                <img
                                                    src={featuredPost.coverImage || '/homepage_whatido.png'}
                                                    alt={featuredPost.title}
                                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                                <div className="absolute bottom-5 left-5 right-5">
                                                    <div className="text-[10px] font-mono uppercase tracking-widest text-white/60">
                                                        {featuredPost.category.toUpperCase()}
                                                    </div>
                                                    <h3 className="text-xl font-semibold text-white mt-2">
                                                        {featuredPost.title}
                                                    </h3>
                                                    <p className="text-sm text-slate-300 mt-2 line-clamp-2">
                                                        {featuredPost.excerpt}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>

                                        <div className="space-y-4">
                                            {secondaryPosts.map((post) => (
                                                <Link
                                                    key={post.id}
                                                    to={`/idrive/${post.id}`}
                                                    className="group flex gap-4 rounded-xl border border-white/10 bg-black/20 p-4 hover:border-white/25 transition-all"
                                                >
                                                    <div className="h-16 w-20 rounded-xl overflow-hidden border border-white/10">
                                                        <img
                                                            src={post.coverImage || '/homepage_info.png'}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                                                            {post.date}
                                                        </div>
                                                        <h3 className="text-sm font-semibold text-white mt-2 line-clamp-2">
                                                            {post.title}
                                                        </h3>
                                                        <div className="text-[10px] font-mono text-slate-400 mt-2">
                                                            {post.clearance}
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-16 text-center text-slate-500">No featured entries yet.</div>
                                )}
                            </section>

                            <section id="latest" className="animate-on-scroll">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-white">Latest Drops</h2>
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Grid Feed</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {gridPosts.map((post, idx) => (
                                        <motion.div
                                            key={post.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <Link
                                                to={`/idrive/${post.id}`}
                                                className="group block rounded-2xl border border-white/10 bg-[#14121D]/45 backdrop-blur-sm overflow-hidden hover:border-white/25 transition-all hover:-translate-y-1"
                                            >
                                                <div className="h-40 overflow-hidden">
                                                    <img
                                                        src={post.coverImage || '/homepage_whatido.png'}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                                                    />
                                                </div>
                                                <div className="p-5">
                                                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                                                        {post.date} // {post.category.toUpperCase()}
                                                    </div>
                                                    <h3 className="text-lg font-semibold text-white mt-2 line-clamp-2">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-sm text-slate-400 mt-3 line-clamp-2">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                                                        <span>{post.clearance}</span>
                                                        <span>{post.size}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}

                                    {filteredPosts.length === 0 && (
                                        <div className="col-span-full py-24 flex flex-col items-center justify-center text-slate-600 animate-pulse">
                                            <HardDrive className="w-12 h-12 mb-4 opacity-20" />
                                            <span className="font-mono text-sm uppercase tracking-widest">No entries found in current directory</span>
                                        </div>
                                    )}
                                </div>
                            </section>

                            <section id="media" className="rounded-2xl border border-white/10 bg-[#14121D]/45 backdrop-blur-sm p-6 animate-on-scroll">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-white">Media Vault</h2>
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Placeholders</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-slate-400">
                                        3D Scene Placeholder
                                    </div>
                                    <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-slate-400">
                                        Video Embed Placeholder
                                    </div>
                                    <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-slate-400">
                                        Image Gallery Placeholder
                                    </div>
                                </div>
                            </section>

                            <section id="tags" className="rounded-2xl border border-white/10 bg-[#14121D]/45 backdrop-blur-sm p-6 animate-on-scroll">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-white">Tags & Filters</h2>
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Searchable</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setActiveTag('all')}
                                        className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border transition-all ${activeTag === 'all'
                                            ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.12)]'
                                            : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        All Tags <span className="ml-1 text-[9px] opacity-70">({posts.length})</span>
                                    </button>
                                    {allTags.map((tag) => (
                                        <button
                                            key={tag}
                                            onClick={() => setActiveTag(tag)}
                                            className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border transition-all ${getTagClasses(tag, activeTag === tag)}`}
                                        >
                                            {tag} <span className="ml-1 text-[9px] opacity-70">({tagCounts[tag] || 0})</span>
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default IDrive;
