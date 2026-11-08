import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Atom, Database, Eye, Folder, Globe } from 'lucide-react';
import { db } from '../lib/db';
import '../styles/cleanup.css';
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


export default function IDrive() {
    const posts = useMemo(() => [...db.getPosts()].sort((a,b) => new Date(b.date || 0) - new Date(a.date || 0)), []);
    const [category, setCategory] = useState('all');
    const [tag, setTag] = useState('all');
    const [query, setQuery] = useState('');
    const tags = useMemo(() => [...new Set(posts.flatMap(post => post.tags || []))].sort(), [posts]);
    const filtered = posts.filter(post => (category === 'all' || post.category === category) && (tag === 'all' || post.tags?.includes(tag)) && [post.title, post.excerpt, ...(post.tags || [])].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
    const reset = () => { setCategory('all'); setTag('all'); setQuery(''); };
    return <main className="clean-page" data-scroll-container><div className="clean-width clean-reading">
        <header className="clean-intro"><h1>Writing and research</h1><p>Essays and field notes on AI, mycology, strategy, and personal research.</p></header>
        <form role="search" className="clean-filters" onSubmit={event => event.preventDefault()}>
            <label>Search articles<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search titles, topics, or excerpts" /></label>
            <label>Topic<select aria-label="Topic" value={category} onChange={event => setCategory(event.target.value)}>{CATEGORY_ORDER.map(id => <option key={id} value={id}>{CATEGORY_CONFIG[id].label}</option>)}</select></label>
            <label>Tag<select aria-label="Tag" value={tag} onChange={event => setTag(event.target.value)}><option value="all">All tags</option>{tags.map(item => <option key={item}>{item}</option>)}</select></label>
        </form>
        <p className="clean-result-count" role="status">{filtered.length} {filtered.length === 1 ? 'article' : 'articles'}</p>
        <div className="clean-articles">{filtered.map(post => <article key={post.id}><time dateTime={post.date}>{formatDate(post.date)}</time><h2><Link to={`/idrive/${post.id}`}>{post.title}</Link></h2><p>{post.excerpt}</p><p className="clean-post-meta">{CATEGORY_CONFIG[post.category]?.label || post.category} · {estimateReadTime(post)}</p></article>)}</div>
        {!filtered.length && <div className="clean-empty"><h2>No articles match these filters.</h2><button type="button" className="clean-button" onClick={reset}>Clear filters</button></div>}
    </div></main>;
}
