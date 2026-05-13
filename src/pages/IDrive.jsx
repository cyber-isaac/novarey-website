import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Atom,
    BookOpen,
    Clock,
    Database,
    Eye,
    Folder,
    Globe,
    HardDrive,
    Library,
    Search,
    Shield,
    Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { db } from '../lib/db';
import { fadeInUp, scrollReveal, staggerContainer, viewportConfig } from '../lib/animations';

const CATEGORY_CONFIG = {
    all: {
        label: 'All Essays',
        eyebrow: 'Full Archive',
        description: 'Every published i-Drive entry in one chronological feed.',
        icon: Folder,
        accent: '#f8fafc',
    },
    ai: {
        label: 'AI Systems',
        eyebrow: 'Automation',
        description: 'Agents, workflow design, AI tools, security notes, and implementation breakdowns.',
        icon: Database,
        accent: '#38bdf8',
    },
    politics: {
        label: 'Power & Strategy',
        eyebrow: 'Geopolitics',
        description: 'Military, politics, intelligence, and strategic technology notes.',
        icon: Globe,
        accent: '#22c55e',
    },
    mycology: {
        label: 'Mycology Lab',
        eyebrow: 'Biology',
        description: 'Cultivation, medicine, field protocols, and fungi research logs.',
        icon: Atom,
        accent: '#34d399',
    },
    uncanny: {
        label: 'The Uncanny',
        eyebrow: 'Speculation',
        description: 'Ancient technology, fringe history, anomalies, and weird research trails.',
        icon: Eye,
        accent: '#c084fc',
    },
};

const CATEGORY_ORDER = ['all', 'ai', 'politics', 'mycology', 'uncanny'];

const estimateReadTime = (post) => {
    const raw = `${post.excerpt || ''} ${post.contentHtml || post.content || ''}`;
    const text = raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = text ? text.split(' ').length : 0;
    return `${Math.max(2, Math.ceil(words / 220))} min read`;
};

const formatDate = (value) => {
    if (!value) return 'Undated';
    return new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(`${value}T00:00:00`));
};

const getPostImage = (post) => post.coverImage || '/homepage_info.png';

const IDrive = () => {
    const posts = useMemo(() => db.getPosts(), []);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTag, setActiveTag] = useState('all');

    const postsByDate = useMemo(
        () => [...posts].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)),
        [posts]
    );

    const allTags = useMemo(
        () => Array.from(new Set(posts.flatMap((post) => post.tags || []))).sort((a, b) => a.localeCompare(b)),
        [posts]
    );

    const tagCounts = useMemo(() => posts.reduce((acc, post) => {
        (post.tags || []).forEach((tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
    }, {}), [posts]);

    const categoryCounts = useMemo(() => posts.reduce((acc, post) => {
        acc[post.category] = (acc[post.category] || 0) + 1;
        acc.all = (acc.all || 0) + 1;
        return acc;
    }, { all: 0 }), [posts]);

    const filteredPosts = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();

        return postsByDate.filter((post) => {
            const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
            const matchesTag = activeTag === 'all' || (post.tags || []).includes(activeTag);
            const matchesSearch = !query || [
                post.title,
                post.excerpt,
                post.category,
                ...(post.tags || []),
            ].some((field) => field?.toLowerCase().includes(query));

            return matchesCategory && matchesTag && matchesSearch;
        });
    }, [activeCategory, activeTag, postsByDate, searchQuery]);

    const featuredPost = filteredPosts[0] || postsByDate[0];
    const leadPosts = filteredPosts.filter((post) => post.id !== featuredPost?.id).slice(0, 3);
    const latestPosts = filteredPosts.filter((post) => post.id !== featuredPost?.id).slice(3);
    const popularPosts = postsByDate.slice(0, 4);
    const activeConfig = CATEGORY_CONFIG[activeCategory] || CATEGORY_CONFIG.all;

    return (
        <div className="relative h-full min-h-0 flex-1 overflow-y-auto bg-[#07080d] text-slate-200" data-scroll-container>
            <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_8%,rgba(34,197,94,0.14),transparent_30%),radial-gradient(circle_at_78%_0%,rgba(56,189,248,0.1),transparent_34%),linear-gradient(180deg,#07080d_0%,#0d0f16_45%,#07080d_100%)]" />

            <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07080d]/82 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-emerald-300">
                            <HardDrive className="h-3.5 w-3.5" />
                            The i-Drive Journal
                        </div>
                        <p className="mt-1 text-sm text-slate-400">
                            Research notes, field essays, AI systems, mycology, and strategy writing.
                        </p>
                    </div>

                    <label className="relative block w-full max-w-xl">
                        <span className="sr-only">Search i-Drive articles</span>
                        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="Search essays, tags, and topics..."
                            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-emerald-300/50 focus:bg-white/[0.07]"
                        />
                    </label>
                </div>
            </header>

            <main className="relative z-10">
                <section className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pt-14">
                    <motion.div
                        variants={staggerContainer(0.08)}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.05fr)_360px] lg:items-end"
                    >
                        <motion.div variants={fadeInUp} className="max-w-4xl">
                            <div className="hero-chip-text inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-emerald-200">
                                <BookOpen className="h-3.5 w-3.5" />
                                Blog Archive
                            </div>
                            <h1 className="hero-title-compact mt-6 text-white">
                                Field notes for systems thinkers.
                            </h1>
                            <p className="hero-copy mt-5 max-w-3xl text-slate-300">
                                Long-form writing on AI systems, design thinking, mycology, politics, field experience, and the stranger edges of research.
                            </p>
                            <div className="mt-7 flex flex-wrap gap-3">
                                <a href="#latest-essays" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5">
                                    Start Reading <ArrowRight className="h-4 w-4" />
                                </a>
                                <a href="#topics" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]">
                                    Browse Topics <Library className="h-4 w-4" />
                                </a>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                            <Metric value={posts.length} label="Published Posts" />
                            <Metric value={allTags.length} label="Research Tags" />
                            <Metric value={CATEGORY_ORDER.length - 1} label="Main Topics" />
                            <Metric value="2026" label="Current Edition" />
                        </motion.div>
                    </motion.div>
                </section>

                <section className="border-y border-white/10 bg-white/[0.025]" id="topics">
                    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <SectionHeader
                                eyebrow="Topics"
                                title="Choose a Research Lane"
                                description="Filter the archive by the writing track you want to read."
                            />
                            <div className="flex flex-wrap gap-2">
                                {CATEGORY_ORDER.map((categoryId) => {
                                    const config = CATEGORY_CONFIG[categoryId];
                                    const Icon = config.icon;
                                    const isActive = activeCategory === categoryId;

                                    return (
                                        <button
                                            key={categoryId}
                                            type="button"
                                            onClick={() => setActiveCategory(categoryId)}
                                            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${isActive ? 'border-white bg-white text-black' : 'border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white'}`}
                                        >
                                            <Icon className="h-4 w-4" />
                                            {config.label}
                                            <span className={isActive ? 'text-black/55' : 'text-slate-500'}>
                                                {categoryCounts[categoryId] || 0}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
                        <div className="space-y-10">
                            <motion.section
                                variants={scrollReveal}
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewportConfig}
                                aria-labelledby="featured-essay-heading"
                            >
                                <SectionHeader
                                    eyebrow={activeConfig.eyebrow}
                                    title="Featured Essay"
                                    description={activeConfig.description}
                                    id="featured-essay-heading"
                                />

                                {featuredPost && (
                                    <Link
                                        to={`/idrive/${featuredPost.id}`}
                                        className="group mt-5 grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-colors hover:border-emerald-300/40 lg:grid-cols-[0.95fr_1.05fr]"
                                    >
                                        <div className="relative min-h-[280px] overflow-hidden">
                                            <img
                                                src={getPostImage(featuredPost)}
                                                alt={featuredPost.title}
                                                loading="eager"
                                                decoding="async"
                                                className="h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-[1.03]"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                                        </div>
                                        <article className="flex min-h-[280px] flex-col justify-between p-6 sm:p-7">
                                            <div>
                                                <PostMeta post={featuredPost} />
                                                <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                                                    {featuredPost.title}
                                                </h2>
                                                <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                                                    {featuredPost.excerpt}
                                                </p>
                                            </div>
                                            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                                                <TagList tags={featuredPost.tags} limit={3} />
                                                <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-200">
                                                    Read essay <ArrowRight className="h-4 w-4" />
                                                </span>
                                            </div>
                                        </article>
                                    </Link>
                                )}
                            </motion.section>

                            {leadPosts.length > 0 && (
                                <motion.section
                                    variants={staggerContainer(0.08)}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewportConfig}
                                    aria-labelledby="editor-picks-heading"
                                >
                                    <SectionHeader
                                        eyebrow="Recommended"
                                        title="Editor Picks"
                                        description="Strong starting points for readers who want the best current signal."
                                        id="editor-picks-heading"
                                    />
                                    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                                        {leadPosts.map((post) => (
                                            <motion.article key={post.id} variants={fadeInUp}>
                                                <PostCard post={post} compact />
                                            </motion.article>
                                        ))}
                                    </div>
                                </motion.section>
                            )}

                            <motion.section
                                id="latest-essays"
                                variants={staggerContainer(0.08)}
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewportConfig}
                                aria-labelledby="latest-essays-heading"
                            >
                                <SectionHeader
                                    eyebrow="Archive Feed"
                                    title="Latest Essays"
                                    description={`Showing ${filteredPosts.length} ${filteredPosts.length === 1 ? 'entry' : 'entries'} for the current filter set.`}
                                    id="latest-essays-heading"
                                />

                                {filteredPosts.length > 0 ? (
                                    <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                                        {latestPosts.length > 0
                                            ? latestPosts.map((post) => (
                                                <motion.article key={post.id} variants={fadeInUp}>
                                                    <PostCard post={post} />
                                                </motion.article>
                                            ))
                                            : leadPosts.map((post) => (
                                                <motion.article key={post.id} variants={fadeInUp}>
                                                    <PostCard post={post} />
                                                </motion.article>
                                            ))}
                                    </div>
                                ) : (
                                    <div className="mt-5 flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] text-center">
                                        <HardDrive className="h-10 w-10 text-slate-600" />
                                        <h3 className="mt-4 text-lg font-semibold text-white">No essays found</h3>
                                        <p className="mt-2 max-w-md text-sm text-slate-400">
                                            Adjust your category, tag, or search query to widen the archive view.
                                        </p>
                                    </div>
                                )}
                            </motion.section>
                        </div>

                        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
                            <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" aria-labelledby="about-drive-heading">
                                <SectionHeader
                                    eyebrow="About"
                                    title="What This Blog Covers"
                                    description="Practical notes, research summaries, experiments, and essays organized for repeated reading."
                                    id="about-drive-heading"
                                    compact
                                />
                                <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                                    <p>
                                        The i-Drive is the NovaRey writing hub: part blog, part research notebook, part field archive.
                                    </p>
                                    <p>
                                        Entries are grouped by topic and tagged for discovery, so each post can become part of a larger knowledge trail.
                                    </p>
                                </div>
                            </section>

                            <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" aria-labelledby="popular-heading">
                                <SectionHeader
                                    eyebrow="Reading Queue"
                                    title="Popular Starting Points"
                                    description="Recent posts worth opening first."
                                    id="popular-heading"
                                    compact
                                />
                                <div className="mt-5 space-y-4">
                                    {popularPosts.map((post) => (
                                        <Link key={post.id} to={`/idrive/${post.id}`} className="group flex gap-3">
                                            <img
                                                src={getPostImage(post)}
                                                alt=""
                                                loading="lazy"
                                                decoding="async"
                                                className="h-16 w-16 shrink-0 rounded-xl object-cover opacity-85"
                                            />
                                            <div className="min-w-0">
                                                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                                                    {formatDate(post.date)}
                                                </div>
                                                <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-emerald-200">
                                                    {post.title}
                                                </h3>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>

                            <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" aria-labelledby="tag-index-heading">
                                <SectionHeader
                                    eyebrow="Index"
                                    title="Tags"
                                    description="Filter the archive by recurring themes."
                                    id="tag-index-heading"
                                    compact
                                />
                                <div className="mt-5 flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTag('all')}
                                        className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${activeTag === 'all' ? 'border-white bg-white text-black' : 'border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]'}`}
                                    >
                                        All ({posts.length})
                                    </button>
                                    {allTags.map((tag) => (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => setActiveTag(tag)}
                                            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${activeTag === tag ? 'border-white bg-white text-black' : 'border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]'}`}
                                        >
                                            {tag} ({tagCounts[tag] || 0})
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </aside>
                    </div>
                </section>
            </main>
        </div>
    );
};

function Metric({ value, label }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="text-2xl font-semibold text-white">{value}</div>
            <div className="mt-1 text-xs font-mono uppercase tracking-widest text-slate-500">{label}</div>
        </div>
    );
}

function SectionHeader({ eyebrow, title, description, id, compact = false }) {
    return (
        <div className={compact ? '' : 'max-w-3xl'}>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" />
                {eyebrow}
            </div>
            <h2 id={id} className={`${compact ? 'mt-2 text-lg' : 'mt-2 text-2xl sm:text-3xl'} font-semibold tracking-tight text-white`}>
                {title}
            </h2>
            {description && (
                <p className={`${compact ? 'mt-2 text-sm leading-6' : 'mt-3 text-sm leading-7 sm:text-base'} text-slate-400`}>
                    {description}
                </p>
            )}
        </div>
    );
}

function PostMeta({ post }) {
    return (
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
            <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {formatDate(post.date)}
            </span>
            <span>/</span>
            <span>{estimateReadTime(post)}</span>
            <span>/</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-300">
                <Shield className="h-3.5 w-3.5" />
                {post.clearance}
            </span>
        </div>
    );
}

function TagList({ tags = [], limit = 4 }) {
    return (
        <div className="flex flex-wrap gap-2">
            {tags.slice(0, limit).map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-slate-300">
                    {tag}
                </span>
            ))}
        </div>
    );
}

function PostCard({ post, compact = false }) {
    return (
        <Link
            to={`/idrive/${post.id}`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-colors hover:border-emerald-300/40 hover:bg-white/[0.06]"
        >
            <div className={compact ? 'h-36 overflow-hidden' : 'h-44 overflow-hidden'}>
                <img
                    src={getPostImage(post)}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-[1.03]"
                />
            </div>
            <div className="flex flex-1 flex-col p-5">
                <PostMeta post={post} />
                <h3 className={`${compact ? 'text-lg' : 'text-xl'} mt-3 font-semibold leading-tight tracking-tight text-white transition-colors group-hover:text-emerald-200`}>
                    {post.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                    {post.excerpt}
                </p>
                <div className="mt-5 flex flex-1 items-end justify-between gap-3">
                    <TagList tags={post.tags} limit={compact ? 2 : 3} />
                    <span className="shrink-0 text-emerald-200 transition-transform group-hover:translate-x-0.5">
                        <ArrowRight className="h-4 w-4" />
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default IDrive;
