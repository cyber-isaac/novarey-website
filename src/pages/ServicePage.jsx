import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import {
    Code2, PenTool, Megaphone, Cpu, ArrowRight, Sparkles,
    Globe, Palette, Video, Rocket, BarChart3, Mail,
    Search, Share2, Layers, Zap, Monitor, Shield,
    Wand2, Bot, BrainCircuit
} from 'lucide-react';
import { staggerContainer, fadeInUp, scrollReveal, viewportConfig } from '../lib/animations';

const SERVICES = {
    web: {
        icon: Code2,
        accent: '#60a5fa',
        accentSoft: 'rgba(96, 165, 250, 0.12)',
        title: 'Web Development',
        tagline: 'CODED FROM SCRATCH',
        subtitle: 'AI-powered websites built from the ground up, not dragged and dropped.',
        description: 'I don\'t use page builders or cookie-cutter templates. Every website is hand-coded using the latest AI coding assistants like Antigravity and Cursor AI, powered by Claude Opus 4.6 and Google Gemini Pro 3.0 (including Flash). That means pixel-perfect, blazing-fast sites that look and feel exactly the way you want them to. Got a design you love? Send me the link and I\'ll rebuild it from scratch with clean, modern code.',
        process: [
            { step: 'Discovery & Blueprint', desc: 'We define your vision, audience, and goals. I study any reference sites or templates you want to match and put together a clear project blueprint.' },
            { step: 'AI-Accelerated Build', desc: 'Using Antigravity + Cursor AI with Claude Opus 4.6 and Gemini Pro 3.0, I code your site from scratch in React, Next.js, or vanilla stack at 10x traditional speed.' },
            { step: 'Design & Polish', desc: 'Every page is hand-tuned with premium animations, responsive layouts, dark/light themes, and micro-interactions that make your site feel alive.' },
            { step: 'Launch & Support', desc: 'Deployed to Netlify, Vercel, or your hosting of choice. I walk you through everything and stay available for ongoing support.' },
        ],
        tools: [
            { name: 'Antigravity', desc: 'AI coding agent' },
            { name: 'Cursor AI', desc: 'AI-assisted IDE' },
            { name: 'Claude Opus 4.6', desc: 'Anthropic LLM' },
            { name: 'Gemini Pro 3.0', desc: 'Google AI model' },
            { name: 'Gemini Flash', desc: 'Fast inference' },
            { name: 'React / Next.js', desc: 'Modern frameworks' },
            { name: 'Vite', desc: 'Lightning-fast bundler' },
            { name: 'Netlify / Vercel', desc: 'Edge deployment' },
        ],
        features: [
            { icon: Zap, title: 'Zero Templates', desc: 'Every line of code is written specifically for your project. No WordPress, no Wix, no Squarespace. Just clean, custom code.' },
            { icon: Monitor, title: 'Template Replication', desc: 'Love a site you\'ve seen? Send me the link and I\'ll rebuild it from scratch with modern tech, customized to your brand.' },
            { icon: Rocket, title: '10x Build Speed', desc: 'AI coding tools let me deliver in days what traditionally takes weeks, without sacrificing quality or attention to detail.' },
            { icon: Shield, title: 'Future-Proof Stack', desc: 'React, Next.js, responsive CSS, and modern deployment. Your site will scale and perform for years to come.' },
        ],
    },

    brand: {
        icon: PenTool,
        accent: '#f472b6',
        accentSoft: 'rgba(244, 114, 182, 0.12)',
        title: 'Branding & Identity',
        tagline: 'VISUAL IDENTITY SYSTEMS',
        subtitle: 'Craft a brand identity that\'s unmistakably yours, powered by design tools and AI.',
        description: 'Your brand is more than a logo. It\'s a system that speaks across every touchpoint. I combine the full Adobe Creative Suite and Canva Pro with cutting-edge AI tools like Google Veo 3.0 and Nano Banana to create logos, motion graphics, branded videos, and complete visual identity packages. From concept to final delivery, every asset is built to make your brand unforgettable.',
        process: [
            { step: 'Brand Discovery', desc: 'Deep dive into your business, audience, competitors, and vision. We nail down your brand voice, color palette, and visual direction.' },
            { step: 'Logo & Mark Design', desc: 'Hand-crafted logos and brand marks using Illustrator and Photoshop, refined with AI generation for rapid concept exploration.' },
            { step: 'Motion & Video', desc: 'Animated logos, branded intros, and video content created with Google Veo 3.0, Nano Banana, and After Effects to give your brand real energy.' },
            { step: 'Brand Kit Delivery', desc: 'You get the whole package: logo suite, color palette, typography guide, social templates, and usage guidelines.' },
        ],
        tools: [
            { name: 'Adobe Photoshop', desc: 'Photo + graphics' },
            { name: 'Adobe Illustrator', desc: 'Vector design' },
            { name: 'Adobe After Effects', desc: 'Motion graphics' },
            { name: 'Canva Pro', desc: 'Rapid design' },
            { name: 'Google Veo 3.0', desc: 'AI video generation' },
            { name: 'Nano Banana', desc: 'AI video tools' },
            { name: 'Midjourney', desc: 'AI image gen' },
            { name: 'Adobe Firefly', desc: 'Generative AI' },
        ],
        features: [
            { icon: Palette, title: 'Complete Identity Systems', desc: 'Logos, color palettes, typography, iconography, and brand guidelines that work everywhere: web, print, social, and video.' },
            { icon: Video, title: 'AI-Powered Motion', desc: 'Animated logos and branded video content using Google Veo 3.0 and Nano Banana. Dynamic brand energy without the production studio cost.' },
            { icon: Sparkles, title: 'Rapid Concept Exploration', desc: 'AI image generation lets us explore dozens of directions in hours, not weeks. You see more options and pick the one that feels right.' },
            { icon: Layers, title: 'Multi-Platform Ready', desc: 'Every asset delivered in the right formats for web, social media, print collateral, and digital campaigns.' },
        ],
    },

    marketing: {
        icon: Megaphone,
        accent: '#fb923c',
        accentSoft: 'rgba(251, 146, 60, 0.12)',
        title: 'Strategic Marketing',
        tagline: 'GROWTH ENGINEERED',
        subtitle: 'Get in front of the right people with campaigns that actually convert.',
        description: 'Marketing isn\'t about shouting louder. It\'s about reaching the right audience with the right message at the right time. I build marketing strategies that combine SEO, social media management, paid advertising, email campaigns, and content funnels into one cohesive growth engine. Every campaign is data-driven, AI-assisted, and built to deliver real results.',
        process: [
            { step: 'Market Analysis', desc: 'Competitor research, audience profiling, keyword mapping, and opportunity identification to find where your business can win.' },
            { step: 'Strategy & Channels', desc: 'Custom marketing plan selecting the right mix of SEO, social, paid ads, email, and content based on your budget and goals.' },
            { step: 'Content & Campaigns', desc: 'Campaign creation with AI-assisted copywriting, visual assets, landing pages, and ad creative, all aligned with your brand.' },
            { step: 'Measure & Optimize', desc: 'Analytics dashboards, A/B testing, and continuous optimization to maximize ROI and scale what works.' },
        ],
        tools: [
            { name: 'Google Ads', desc: 'Paid search' },
            { name: 'Meta Ads', desc: 'Social advertising' },
            { name: 'Google Analytics', desc: 'Performance data' },
            { name: 'Mailchimp', desc: 'Email campaigns' },
            { name: 'SEMrush', desc: 'SEO intelligence' },
            { name: 'Canva Pro', desc: 'Ad creative' },
            { name: 'AI Copywriting', desc: 'Content generation' },
            { name: 'Buffer', desc: 'Social management' },
        ],
        features: [
            { icon: Search, title: 'SEO & Organic Growth', desc: 'Keyword strategy, on-page optimization, and content calendars designed to build long-term organic traffic and authority.' },
            { icon: Share2, title: 'Social Media Management', desc: 'Content planning, scheduling, community engagement, and analytics across Instagram, LinkedIn, TikTok, and more.' },
            { icon: BarChart3, title: 'Paid Advertising', desc: 'Google Ads, Meta Ads, and retargeting campaigns built to maximize your ad spend with precise audience targeting.' },
            { icon: Mail, title: 'Email & Funnels', desc: 'Automated email sequences, lead magnets, and conversion funnels that nurture prospects into loyal customers.' },
        ],
    },

    ai: {
        icon: Cpu,
        accent: '#8b5cf6',
        accentSoft: 'rgba(139, 92, 246, 0.12)',
        title: 'A.I. Solutions',
        tagline: 'INTELLIGENT SYSTEMS',
        subtitle: 'Custom AI tools and automations built for your specific business needs.',
        description: 'AI isn\'t one-size-fits-all. I build custom solutions tailored to your workflows, from intelligent chatbots and content pipelines to data processing automations and internal copilots. Using the latest models from OpenAI, Anthropic, and Google, I create tools that save you hours every week and unlock capabilities you didn\'t think were possible for a business your size.',
        process: [
            { step: 'Workflow Audit', desc: 'I map out your current processes, find the bottlenecks, and identify where AI can make the biggest impact.' },
            { step: 'Solution Design', desc: 'Custom architecture for your AI pipeline, choosing the right models, integrations, and interfaces for your specific use case.' },
            { step: 'Build & Train', desc: 'Development of your custom AI tools, including prompt engineering, fine-tuning, API integrations, and user interface design.' },
            { step: 'Deploy & Iterate', desc: 'Launch with monitoring, usage analytics, and continuous improvement as your needs evolve.' },
        ],
        tools: [
            { name: 'Claude Opus 4.6', desc: 'Anthropic advanced' },
            { name: 'Gemini Pro 3.0', desc: 'Google multimodal' },
            { name: 'GPT-4o', desc: 'OpenAI flagship' },
            { name: 'LangChain', desc: 'AI orchestration' },
            { name: 'Zapier AI', desc: 'Workflow automation' },
            { name: 'Make.com', desc: 'Integration engine' },
            { name: 'Pinecone', desc: 'Vector database' },
            { name: 'Custom APIs', desc: 'Bespoke integrations' },
        ],
        features: [
            { icon: Bot, title: 'Custom Chatbots', desc: 'AI-powered chat interfaces trained on your data for customer support, lead qualification, or internal knowledge bases.' },
            { icon: BrainCircuit, title: 'Workflow Automation', desc: 'Connect your tools with intelligent automation, from document processing to content generation to data analysis pipelines.' },
            { icon: Wand2, title: 'Content Pipelines', desc: 'Automated content creation systems that generate, edit, and publish blog posts, social content, email sequences, and more.' },
            { icon: Globe, title: 'AI-Enhanced Products', desc: 'Embed intelligence directly into your product or service with recommendation engines, smart search, and predictive features.' },
        ],
    },
};

const ServicePage = () => {
    const { slug } = useParams();
    const data = SERVICES[slug];

    if (!data) {
        return (
            <div className="flex-1 overflow-y-auto bg-[#0D0C12] h-full flex items-center justify-center" data-scroll-container>
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-3">Service Not Found</h1>
                    <p className="text-slate-400 mb-6">The service you're looking for doesn't exist.</p>
                    <Link to="/" className="text-sm font-mono uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const Icon = data.icon;

    return (
        <div className="flex-1 overflow-y-auto h-full" data-scroll-container>
            <div className="max-w-5xl mx-auto px-6 py-10 space-y-16">

                {/* HERO */}
                <motion.section variants={scrollReveal} initial="hidden" animate="visible">
                    <div className="flex items-center gap-3 mb-4">
                        <div
                            className="h-12 w-12 rounded-2xl flex items-center justify-center"
                            style={{ background: data.accentSoft, color: data.accent }}
                        >
                            <Icon className="w-6 h-6" />
                        </div>
                        <span
                            className="text-[10px] font-mono uppercase tracking-[0.3em]"
                            style={{ color: data.accent }}
                        >
                            {data.tagline}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        {data.title}
                    </h1>
                    <p className="mt-3 text-lg md:text-xl text-slate-300 max-w-3xl">
                        {data.subtitle}
                    </p>
                    <div
                        className="mt-6 rounded-2xl border p-6 backdrop-blur-sm"
                        style={{ borderColor: data.accent + '20', background: data.accent + '06' }}
                    >
                        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                            {data.description}
                        </p>
                    </div>
                </motion.section>

                {/* PROCESS */}
                <motion.section variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-lg font-semibold text-white tracking-tight">How I Work</h2>
                        <div className="h-px flex-1" style={{ background: data.accent + '20' }} />
                    </div>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                        variants={staggerContainer(0.1, 0.2)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        {data.process.map((item, i) => (
                            <motion.div
                                key={item.step}
                                variants={fadeInUp}
                                className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm group hover:border-white/[0.12] transition-colors duration-500"
                            >
                                <div className="flex items-start gap-4">
                                    <div
                                        className="flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold"
                                        style={{ background: data.accentSoft, color: data.accent }}
                                    >
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-white">{item.step}</h3>
                                        <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>

                {/* TOOLS */}
                <motion.section variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-lg font-semibold text-white tracking-tight">Tools & Stack</h2>
                        <div className="h-px flex-1" style={{ background: data.accent + '20' }} />
                    </div>
                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                        variants={staggerContainer(0.05, 0.1)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        {data.tools.map((tool) => (
                            <motion.div
                                key={tool.name}
                                variants={fadeInUp}
                                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center hover:border-white/[0.12] transition-colors duration-300 group"
                            >
                                <div className="text-sm font-semibold text-white">{tool.name}</div>
                                <div className="text-[11px] text-slate-500 mt-1">{tool.desc}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>

                {/* FEATURES */}
                <motion.section variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-lg font-semibold text-white tracking-tight">What You Get</h2>
                        <div className="h-px flex-1" style={{ background: data.accent + '20' }} />
                    </div>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                        variants={staggerContainer(0.1, 0.15)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        {data.features.map((feat) => {
                            const FIcon = feat.icon;
                            return (
                                <motion.div
                                    key={feat.title}
                                    variants={fadeInUp}
                                    className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm hover:border-white/[0.12] transition-colors duration-500 group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center"
                                            style={{ background: data.accentSoft, color: data.accent }}
                                        >
                                            <FIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold text-white">{feat.title}</h3>
                                            <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{feat.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.section>

                {/* CTA */}
                <motion.section variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                    <div
                        className="rounded-3xl border p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                        style={{ borderColor: data.accent + '20', background: data.accent + '06' }}
                    >
                        <div>
                            <div
                                className="text-[10px] font-mono uppercase tracking-widest mb-2"
                                style={{ color: data.accent }}
                            >
                                Ready to Start?
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white">
                                Let us build something extraordinary.
                            </h3>
                            <p className="text-sm text-slate-400 mt-2 max-w-xl">
                                Every project starts with a conversation. Tell me what you need and I will show you what is possible.
                            </p>
                        </div>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap"
                            style={{ background: data.accent }}
                        >
                            Get in Touch
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.section>

                {/* CROSS-LINKS */}
                <motion.section variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="pb-4">
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-sm font-mono uppercase tracking-widest text-slate-500">Other Services</h2>
                        <div className="h-px bg-white/[0.06] flex-1" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {Object.entries(SERVICES)
                            .filter(([key]) => key !== slug)
                            .map(([key, svc]) => {
                                const SIcon = svc.icon;
                                return (
                                    <Link
                                        key={key}
                                        to={'/services/' + key}
                                        className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 flex items-center gap-3 hover:border-white/[0.12] transition-colors duration-300 group"
                                    >
                                        <div
                                            className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                            style={{ background: svc.accentSoft, color: svc.accent }}
                                        >
                                            <SIcon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-white">{svc.title}</div>
                                            <div className="text-[11px] text-slate-500">{svc.tagline}</div>
                                        </div>
                                        <ArrowRight className="w-3.5 h-3.5 text-slate-600 ml-auto group-hover:text-slate-400 transition-colors" />
                                    </Link>
                                );
                            })}
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default ServicePage;
