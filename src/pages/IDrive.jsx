import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Folder, Atom, Globe, Shield, Eye, Database, ChevronRight, HardDrive } from 'lucide-react';
import { db } from '../lib/db';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../lib/animations';
import ConstellationBackground from '../components/ConstellationBackground';
import Button from '../components/Button';

const CATEGORIES = [
    { id: 'all', label: 'All Files', icon: Folder, theme: 'default' },
    { id: 'ai', label: 'A.I.', icon: Database, theme: 'tech' },
    { id: 'politics', label: 'Politics & Military', icon: Globe, theme: 'tactical' },
    { id: 'mycology', label: 'Mycology', icon: Atom, theme: 'bio' },
    { id: 'uncanny', label: 'The Uncanny', icon: Eye, theme: 'glitch' }
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
        Conspiracy: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
        'Ancient Tech': 'bg-rose-500/15 text-rose-300 border-rose-500/30',
        Tesla: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
    };

    const getTagClasses = (tag, isActive) => {
        const themed = tagStyleMap[tag] || 'bg-white/5 text-slate-300 border-white/10';
        if (isActive) {
            return 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.12)]';
        }
        return `${themed} hover:text-white hover:bg-white/10 hover:border-white/30`;
    };

    const getThemeAccent = (theme) => {
        switch (theme) {
            case 'tactical': return 'border-emerald-500 text-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.2)] bg-emerald-500/10';
            case 'bio': return 'border-green-400 text-green-300 shadow-[0_0_16px_rgba(74,222,128,0.2)] bg-green-500/10';
            case 'glitch': return 'border-purple-500 text-purple-300 shadow-[0_0_16px_rgba(168,85,247,0.2)] bg-purple-500/10';
            case 'tech': return 'border-sky-500 text-sky-400 shadow-[0_0_16px_rgba(14,165,233,0.2)] bg-sky-500/10';
            default: return 'border-white text-black shadow-[0_0_16px_rgba(255,255,255,0.12)] bg-white';
        }
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
                            <motion.div
                                className="space-y-6"
                                variants={staggerContainer(0.1, 0.2)}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <motion.div variants={fadeInUp}>
                                    <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/70">
                                        Documentation / Getting Started
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
                                        The i-Drive
                                    </h1>
                                </motion.div>

                                <motion.div variants={fadeInUp} className="rounded-2xl border border-white/10 bg-black/20 p-5">
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
                                </motion.div>

                                <motion.div variants={fadeInUp} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                    <h2 className="text-lg font-semibold text-white">Introduction</h2>
                                    <p className="text-sm text-slate-400 mt-3 max-w-2xl leading-relaxed">
                                        A living blog covering high-interest topics: special operations, politics, military and
                                        intelligence notes, mycology, AI, design, and the tools that help me become an experienced
                                        practitioner of the best systems available.
                                    </p>
                                    <div className="mt-4 text-sm text-slate-400">
                                        Expect field notes, research logs, and tactical breakdowns across those domains.
                                    </div>
                                </motion.div>

                                <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
                                    <Button as={Link} to="/contact" className="uppercase italic font-black tracking-widest text-xs">
                                        Request Support
                                    </Button>
                                    <div className="text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                                        PATH: /root/archive/declassified
                                    </div>
                                </motion.div>
                            </motion.div>
                            <motion.figure variants={fadeInUp} className="rounded-3xl border border-white/10 overflow-hidden bg-black/25">
                                <img
                                    src="/homepage_whatido.png"
                                    alt="Archive preview"
                                    className="w-full h-[280px] object-cover opacity-85"
                                />
                                <figcaption className="px-4 py-3 text-xs font-mono text-white/50 border-t border-white/10">
                                    Documentation preview still frame
                                </figcaption>
                            </motion.figure>
                        </div>
                        <motion.div
                            className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5"
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <h3 className="text-base font-semibold text-white">Template Features</h3>
                            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-400 max-w-2xl">
                                <li>Structured documentation layout</li>
                                <li>Scroll-triggered reveal animation</li>
                                <li>Category and tag filters</li>
                                <li>Searchable archive entries</li>
                                <li>Translucent panels and grid</li>
                                <li>Responsive column layout</li>
                            </ul>
                        </motion.div>
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
                                                        ? getThemeAccent(cat.theme)
                                                        : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
                                                        }`}
                                                >
                                                    <Icon className={`w-3 h-3 ${isActive ? '' : 'text-slate-400'}`} />
                                                    {cat.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                className="rounded-2xl border border-white/10 bg-[#14121D]/45 backdrop-blur-sm p-5"
                                variants={staggerContainer(0.1, 0.2)}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <motion.h4 variants={fadeInUp} className="text-sm font-mono uppercase tracking-widest text-white/70 mb-4">Popular Posts</motion.h4>
                                <div className="space-y-4">
                                    {sidebarPosts.map((post) => (
                                        <motion.div key={post.id} variants={fadeInUp}>
                                            <Link to={`/idrive/${post.id}`} className="flex gap-3 group">
                                                <div className="h-14 w-14 rounded-xl overflow-hidden border border-white/10 group-hover:border-[var(--page-accent)] transition-colors">
                                                    <img src={post.coverImage || '/homepage_info.png'} alt={post.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{post.date}</div>
                                                    <div className="text-sm text-white group-hover:text-[var(--page-accent)] transition-colors line-clamp-2">
                                                        {post.title}
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </aside>

                        <div className="space-y-10 pb-16">

                            <motion.section
                                id="featured"
                                className="rounded-2xl border border-white/10 bg-[#14121D]/45 backdrop-blur-sm p-6"
                                variants={staggerContainer(0.1)}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                <motion.div variants={fadeInUp} className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-white">Featured Intel</h2>
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Priority Feed</span>
                                </motion.div>

                                {featuredPost ? (
                                    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
                                        <motion.div variants={fadeInUp}>
                                            <Link
                                                to={`/idrive/${featuredPost.id}`}
                                                className="group block rounded-2xl border border-white/10 bg-black/20 overflow-hidden hover:border-[var(--page-accent)] transition-all"
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
                                        </motion.div>

                                        <div className="space-y-4">
                                            {secondaryPosts.map((post) => (
                                                <motion.div key={post.id} variants={fadeInUp}>
                                                    <Link
                                                        to={`/idrive/${post.id}`}
                                                        className="group flex gap-4 rounded-xl border border-white/10 bg-black/20 p-4 hover:border-[var(--page-accent)] transition-all"
                                                    >
                                                        <div className="h-16 w-20 rounded-xl overflow-hidden border border-white/10 group-hover:border-[var(--page-accent)] transition-colors">
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
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-16 text-center text-slate-500">No featured entries yet.</div>
                                )}
                            </motion.section>

                            <section id="latest">
                                <motion.div
                                    className="flex items-center justify-between mb-4"
                                    variants={fadeInUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    <h2 className="text-xl font-semibold text-white">Latest Drops</h2>
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Grid Feed</span>
                                </motion.div>
                                <motion.div
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                    variants={staggerContainer(0.08)}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    {gridPosts.map((post) => (
                                        <motion.div key={post.id} variants={fadeInUp}>
                                            <Link
                                                to={`/idrive/${post.id}`}
                                                className="group block rounded-2xl border border-white/10 bg-[#14121D]/45 backdrop-blur-sm overflow-hidden hover:border-[var(--page-accent)] transition-all hover:-translate-y-1"
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
                                                    <h3 className="text-lg font-semibold text-white mt-2 line-clamp-2 italic group-hover:text-[var(--page-accent)] transition-colors">
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
                                </motion.div>

                                {
                                    filteredPosts.length === 0 && (
                                        <div className="col-span-full py-24 flex flex-col items-center justify-center text-slate-600 animate-pulse">
                                            <HardDrive className="w-12 h-12 mb-4 opacity-20" />
                                            <span className="font-mono text-sm uppercase tracking-widest">No entries found in current directory</span>
                                        </div>
                                    )
                                }
                            </section>

                            <motion.section
                                id="media"
                                className="rounded-2xl border border-white/10 bg-[#14121D]/45 backdrop-blur-sm p-6"
                                variants={fadeInUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
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
                            </motion.section>

                            <motion.section
                                id="tags"
                                className="rounded-2xl border border-white/10 bg-[#14121D]/45 backdrop-blur-sm p-6"
                                variants={fadeInUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
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
                            </motion.section>
                        </div>
                    </div >
                </section >
            </main >
        </div >
    );
};

export default IDrive;
