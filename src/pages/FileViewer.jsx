import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../lib/db';
import { ArrowLeft, Share2, Download, ShieldCheck, Printer, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { scrollReveal, viewportConfig } from '../lib/animations';

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

            {/* Document area */}
            <div className="max-w-4xl mx-auto py-20 px-8 relative">
                {/* Secure Watermark */}
                <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.03] select-none">
                    <h1 className="text-[20vw] font-black -rotate-45 border-8 border-white p-10">CONFIDENTIAL</h1>
                </div>

                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <motion.header className="mb-12 border-l-4 border-white/20 pl-8" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                        <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">
                            Subject-ID: {post.id} / Type: DOC_RESEARCH
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-white/5 text-slate-400 rounded text-[10px] font-mono border border-white/5">
                                CAT: {post.category.toUpperCase()}
                            </span>
                            <span className="px-2 py-1 bg-white/5 text-slate-400 rounded text-[10px] font-mono border border-white/5">
                                SIZE: {post.size}
                            </span>
                            {post.tags?.map((tag) => (
                                <span key={tag} className="px-2 py-1 bg-white/10 text-slate-300 rounded text-[10px] font-mono border border-white/10">
                                    TAG: {tag.toUpperCase()}
                                </span>
                            ))}
                        </div>
                    </motion.header>

                    {post.coverImage && (
                        <div className="mb-10 rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                            <img src={post.coverImage} alt={post.title} className="w-full h-[360px] object-cover" />
                        </div>
                    )}

                    {/* Content Body - Styled as a declassified report */}
                    <div className="prose prose-invert prose-slate max-w-none 
                        prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
                        prose-p:text-slate-400 prose-p:leading-relaxed
                        prose-code:text-emerald-400 prose-code:bg-emerald-950/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                        whitespace-pre-wrap font-sans text-lg
                    ">
                        {post.contentHtml ? (
                            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
                        ) : (
                            post.content
                        )}
                    </div>

                    <motion.footer className="mt-20 pt-10 border-t border-white/5 text-center" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                        <div className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em]">
                            End of Transmission // Novarey Ventures Declassified
                        </div>
                    </motion.footer>
                </motion.article>
            </div>

            {/* Scanline Effect Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 bg-[radial-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_100%),linear-gradient(rgba(18,16,16,0) 50%,rgba(0,0,0,0.1) 50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-20"></div>
        </div>
    );
};

export default FileViewer;
