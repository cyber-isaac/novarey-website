import React from 'react';
import { BookOpen, FileText, Layers, Folder, ChevronRight } from 'lucide-react';

const Writing = () => {
    const navItems = [
        { id: 'overview', label: 'Overview', icon: BookOpen },
        { id: 'latest', label: 'Latest Drops', icon: FileText },
        { id: 'spotlight', label: 'Spotlight', icon: Layers },
        { id: 'archive', label: 'Archive Index', icon: Folder }
    ];

    const placeholderPosts = [
        {
            title: 'Dispatch 01: Design Systems for AI Products',
            excerpt: 'A field memo on building interfaces that stay human while scaling with automation.',
            status: 'Drafting',
            date: 'Q1 2026'
        },
        {
            title: 'Dispatch 02: Workflow Intelligence',
            excerpt: 'Notes on converting manual operations into lightweight, AI-ready pipelines.',
            status: 'Queued',
            date: 'Q1 2026'
        },
        {
            title: 'Dispatch 03: Visual R&D',
            excerpt: 'Explorations, experiments, and art direction logs from the studio.',
            status: 'Pending',
            date: 'Q2 2026'
        }
    ];

    return (
        <div className="flex-1 overflow-y-auto bg-[#0D0C12] h-full relative" data-scroll-container>
            <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]"></div>
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
                <header className="mb-10 animate-on-scroll">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                        Documentation Layout
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mt-4">
                        Writing & Field Notes
                    </h1>
                    <p className="text-slate-400 mt-4 max-w-2xl leading-relaxed">
                        A transparent, declassified space for long-form posts, research logs, and design breakdowns.
                        This page is styled after the documentation template while keeping line lengths tight and readable.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
                    <aside className="space-y-6">
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 sticky top-6">
                            <h3 className="text-sm font-mono uppercase tracking-widest text-white/70 mb-4">
                                Doc Navigation
                            </h3>
                            <nav className="space-y-2 text-xs font-mono text-slate-400">
                                {navItems.map((item) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                                    >
                                        <span className="flex items-center gap-2">
                                            <item.icon className="w-3 h-3 text-white/60" />
                                            {item.label}
                                        </span>
                                        <ChevronRight className="w-3 h-3" />
                                    </a>
                                ))}
                            </nav>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                            <h4 className="text-sm font-mono uppercase tracking-widest text-white/70 mb-4">
                                Focus Areas
                            </h4>
                            <div className="space-y-3 text-xs font-mono text-slate-400">
                                <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">Mycology & BioTech</div>
                                <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">Artificial Intelligence</div>
                                <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">Military & Geopolitics</div>
                                <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">A.I. Design Systems</div>
                            </div>
                        </div>
                    </aside>

                    <main className="space-y-8">
                        <section id="overview" className="rounded-2xl border border-white/10 bg-[#14121D]/70 backdrop-blur-sm p-6">
                            <h2 className="text-xl font-semibold text-white">Overview</h2>
                            <p className="text-sm text-slate-400 mt-3 max-w-2xl leading-relaxed">
                                This section will host a concise introduction to the blog, including the mission,
                                cadence, and the themes explored in the archive. The styling stays translucent and
                                restrained, mirroring the documentation aesthetic.
                            </p>
                        </section>

                        <section id="latest" className="rounded-2xl border border-white/10 bg-[#14121D]/70 backdrop-blur-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-white">Latest Drops</h2>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                                    Placeholders
                                </span>
                            </div>
                            <div className="space-y-4">
                                {placeholderPosts.map((post) => (
                                    <div key={post.title} className="rounded-xl border border-white/10 bg-black/30 p-5">
                                        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                                            {post.date} // {post.status}
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mt-2">{post.title}</h3>
                                        <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section id="spotlight" className="rounded-2xl border border-white/10 bg-[#14121D]/70 backdrop-blur-sm p-6">
                            <h2 className="text-xl font-semibold text-white">Spotlight</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="rounded-xl border border-white/10 bg-black/30 p-5 text-sm text-slate-400">
                                    Feature Essay Placeholder
                                </div>
                                <div className="rounded-xl border border-white/10 bg-black/30 p-5 text-sm text-slate-400">
                                    Visual Case Study Placeholder
                                </div>
                            </div>
                        </section>

                        <section id="archive" className="rounded-2xl border border-white/10 bg-[#14121D]/70 backdrop-blur-sm p-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-white">Archive Index</h2>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                                    Coming Soon
                                </span>
                            </div>
                            <div className="mt-4 space-y-3 text-sm text-slate-400 max-w-2xl leading-relaxed">
                                <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                                    Section 01: Intelligence Briefings (placeholder)
                                </div>
                                <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                                    Section 02: Design Systems (placeholder)
                                </div>
                                <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                                    Section 03: Experiments &amp; Prototypes (placeholder)
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Writing;
