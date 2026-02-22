import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../lib/db';
import { ArrowLeft, Share2, Download, ShieldCheck, Printer, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { scrollReveal, viewportConfig } from '../lib/animations';
import { Helmet } from 'react-helmet-async';
import { products } from '../content/products';

const FileViewer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const data = db.getPostById(id);
        setPost(data);
    }, [id]);

    if (!post) return <div className="p-20 text-white">Access Denied. File not found.</div>;

    return (
        <div className="flex-1 overflow-y-auto bg-[#0A090F] h-full selection:bg-yellow-500/30 selection:text-yellow-200" data-scroll-container>
            <Helmet>
                <title>{post.title} | NovaRey</title>
                <meta name="description" content={post.excerpt || 'NovaRey Ventures Digital Archive'} />
                {post.coverImage && <meta property="og:image" content={post.coverImage} />}
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            {/* Toolbar */}
            <div className="sticky top-0 z-50 bg-[#0D0C12]/80 backdrop-blur-md border-b border-white/5 px-8 py-3 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-mono"
                >
                    <ArrowLeft className="w-4 h-4" />
                    BACK_TO_DRIVE
                </button>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-500 border-r border-white/10 pr-6">
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3 h-3 text-emerald-500" />
                            {post.clearance}
                        </span>
                    </div>
                    <div className="flex gap-4">
                        <button className="text-slate-400 hover:text-white transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                        <button className="text-slate-400 hover:text-white transition-colors">
                            <Download className="w-4 h-4" />
                        </button>
                        <button className="text-slate-400 hover:text-white transition-colors">
                            <Printer className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Body - Styled as a premium editorial read */}
            <div className="relative">
                {/* Parallax Hero Image */}
                {post.coverImage && (
                    <div className="relative w-full h-[60vh] max-h-[600px] min-h-[400px] overflow-hidden">
                        <div className="absolute inset-0 bg-black/40 z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A090F] via-[#0A090F]/60 to-transparent z-10" />
                        <motion.img
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 z-20 max-w-4xl mx-auto px-8 pb-12">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="text-xs font-mono text-[var(--page-accent)] uppercase tracking-widest mb-4">
                                    {post.category} // {post.date}
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1] mb-6 font-display italic">
                                    {post.title}
                                </h1>
                                <div className="flex flex-wrap gap-3 items-center text-[10px] font-mono uppercase tracking-widest text-white/50">
                                    <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md border border-white/10">
                                        <Clock className="w-3 h-3" /> 8 MIN READ
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md border border-emerald-500/20">
                                        <ShieldCheck className="w-3 h-3" /> {post.clearance}
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}

                {/* Article Content */}
                <div className="max-w-3xl mx-auto py-16 px-8 relative z-20">
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="prose prose-invert prose-lg md:prose-xl max-w-none 
                            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-headings:font-display prose-headings:italic
                            prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6
                            prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-8 prose-p:font-light
                            prose-a:text-[var(--page-accent)] prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-white prose-strong:font-semibold
                            prose-ul:text-slate-300 prose-li:my-2
                            prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl prose-img:my-12
                            prose-code:text-emerald-400 prose-code:bg-emerald-950/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                            font-sans
                        "
                    >
                        {/* Excerpt as a lead paragraph if present */}
                        {post.excerpt && !post.contentHtml && (
                            <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium pb-8 border-b border-white/10 mb-8">
                                {post.excerpt}
                            </p>
                        )}

                        {post.contentHtml ? (
                            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
                        ) : (
                            <div className="whitespace-pre-wrap">{post.content}</div>
                        )}
                    </motion.article>

                    {/* Tags at bottom */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-16 pt-8 border-t border-white/10">
                            <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-4">Associated Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 transition-colors text-slate-300 rounded-full text-xs font-mono border border-white/10">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Support the Lab (Cross-Link) */}
                    <motion.div
                        className="mt-20 pt-16 border-t border-white/5"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-display font-medium text-white mb-4">Support the Lab</h3>
                            <p className="text-slate-400 max-w-xl mx-auto">Grab some fieldwork gear and heritage merch directly from our Etsy supply. All proceeds fuel the research.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {products.slice(0, 3).map((item) => (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative rounded-2xl border border-white/10 bg-[#16141F] overflow-hidden hover:border-emerald-500/50 transition-all duration-300 flex flex-col"
                                >
                                    <div className="aspect-square w-full overflow-hidden bg-white/5">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 hover:opacity-90" />
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="text-[10px] font-mono text-emerald-400/80 uppercase tracking-widest mb-2">{item.subtitle}</div>
                                        <h4 className="text-white font-medium mb-1 group-hover:text-emerald-400 transition-colors">{item.title}</h4>
                                        <p className="text-xs text-slate-400 mb-6 line-clamp-2">{item.description}</p>
                                        <div className="mt-auto flex items-center text-xs font-mono text-white/50 group-hover:text-emerald-400/80 transition-colors uppercase tracking-wider">
                                            {item.cta} <ArrowLeft className="w-3 h-3 ml-2 rotate-180" />
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.footer className="mt-20 pt-10 border-t border-white/5 text-center" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                        <div className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em]">
                            End of Transmission // Novarey Ventures Declassified
                        </div>
                    </motion.footer>
                </div>
            </div>

            {/* Scanline Effect Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 bg-[radial-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_100%),linear-gradient(rgba(18,16,16,0) 50%,rgba(0,0,0,0.1) 50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-20"></div>
        </div>
    );
};

export default FileViewer;
