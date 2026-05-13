import React from 'react';
import {
    ArrowRight,
    Download,
    Eye,
    FileText,
    Layers,
    MonitorSmartphone,
    Sparkles,
    Store,
    Wand2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Button from '../components/ui/Button';
import { products as MERCH } from '../content/products';
import {
    FEATURED_PROJECTS,
    GALLERY_ITEMS,
    WORK_ARCHIVE_STATS,
    WORK_PORTFOLIO_CATEGORIES,
} from '../data/portfolioProjects';
import { fadeInUp, scrollReveal, staggerContainer, viewportConfig } from '../lib/animations';

const SECTION_LINKS = [
    { id: 'featured', label: 'Featured' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'categories', label: 'Categories' },
    { id: 'motion', label: 'Motion' },
    { id: 'artworks', label: 'Heritage' },
    { id: 'services', label: 'Services' },
    { id: 'merch', label: 'Merch' },
    { id: 'portfolio-pdf', label: 'PDF' },
];

const PORTFOLIO_PDF = {
    href: '/portfolio/DesignPortfolio11.png',
    title: 'Isaac Reyes Portfolio PDF',
    description: 'A client-ready portfolio document with selected design, brand, AI, and creative systems work.',
    fileMeta: 'PDF / 4.3 MB / client share',
};

const SERVICE_WORK = [
    {
        id: 'web',
        title: 'Custom Web Builds',
        subtitle: 'React / Vite / SEO',
        description: 'Service pages, portfolios, dashboards, and landing systems built with responsive components instead of page-builder templates.',
        image: '/web_design.png',
        href: '/services/web',
        tools: 'Responsive UI / motion / SEO',
    },
    {
        id: 'brand',
        title: 'Brand Systems',
        subtitle: 'Identity / collateral',
        description: 'Marks, campaign visuals, flyers, social templates, and usage rules shaped into a repeatable visual language.',
        image: '/portfolio/DesignPortfolio11.png',
        href: '/services/brand',
        tools: 'Logo systems / print / launch kits',
    },
    {
        id: 'ai',
        title: 'AI Workflows',
        subtitle: 'Automation / copilots',
        description: 'Private knowledge bases, intake assistants, content pipelines, and workflow automations with human approval where it matters.',
        image: '/aiservices_image.png',
        href: '/services/ai',
        tools: 'Knowledge bases / model routing / approvals',
    },
];

const PLANS = [
    {
        id: 'plan-1',
        title: 'AI Venture Incubator',
        subtitle: 'Launch track',
        description: 'A studio pipeline for validating ideas, building MVPs, and shipping fast.',
        icon: Sparkles,
    },
    {
        id: 'plan-2',
        title: 'Studio Systems',
        subtitle: 'Ops + automation',
        description: 'Reusable components, workflow automations, and internal tooling.',
        icon: Layers,
    },
    {
        id: 'plan-3',
        title: 'Creative R&D',
        subtitle: 'Research lab',
        description: 'Experimental art, generative visuals, and interactive prototypes.',
        icon: Wand2,
    },
];

const MOTION_VIDEOS = [
    {
        id: 'motion-1',
        title: 'Client Logo Animation',
        subtitle: 'Marketing & branding',
        description: 'Animated client logo created with Adobe After Effects for marketing and branding campaigns.',
        gumletId: '6979b30a0c58139a84b3faf0',
        tech: 'Adobe After Effects',
        year: '2024',
    },
    {
        id: 'motion-2',
        title: 'AI Character Placement',
        subtitle: 'Face animation & scene integration',
        description: 'AI-powered face placement and character integration into animated scenes for creative storytelling.',
        gumletId: '696ade5705ff587e8d0b5235',
        tech: 'Google Veo 3 + After Effects + Premiere Pro',
        year: '2024',
    },
];

const HERITAGE_ART = [
    {
        id: 'art-1',
        title: "Devil's Brigade Torii Gate",
        subtitle: 'Heritage design study',
        description: 'Custom redesign blending unit heritage, Japanese visual influence, and clean emblem construction.',
        image: '/portfolio/DesignPortfolio4.png',
        tools: 'Adobe Illustrator',
    },
    {
        id: 'art-2',
        title: 'F.S.S.F. Legacy Collection',
        subtitle: 'Legacy identity system',
        description: 'Illustrated mark exploring shared history, symbol balance, and badge-style identity design.',
        image: '/portfolio/DesignPortfolio5.png',
        tools: 'Adobe Illustrator',
    },
    {
        id: 'art-3',
        title: 'Patch + Emblem Studies',
        subtitle: 'Heritage artwork',
        description: 'Recreated patch and emblem layouts focused on linework, hierarchy, and production-ready vector detail.',
        image: '/portfolio/DesignPortfolio8.png',
        tools: 'Adobe Illustrator',
    },
    {
        id: 'art-4',
        title: 'Custom Posters & Team Logos',
        subtitle: 'Valor in art',
        description: 'Custom artwork staged in AI-generated office scenes, built for print, merch, and digital presentation.',
        image: '/portfolio/DesignPortfolio9.png',
        tools: 'Adobe Illustrator + AI',
    },
];

const imageMotion = (reduceMotion, index = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 30, scale: 0.97 },
    whileInView: reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] },
});

const Work = () => {
    const reduceMotion = useReducedMotion();

    return (
        <div className="flex-1 h-full w-full min-w-0 overflow-y-auto overflow-x-hidden bg-[#050506] px-4 pb-16 pt-5 text-white sm:px-6 lg:px-8 lg:pt-8" data-scroll-container>
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(249,115,22,0.12),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(45,212,191,0.10),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_38%)]" />

            <div className="relative mx-auto max-w-7xl">
                <motion.section
                    variants={staggerContainer(0.08)}
                    initial="hidden"
                    animate="visible"
                    className="grid min-h-[calc(100vh-9rem)] items-center gap-8 pb-10 md:grid-cols-[0.92fr_1.08fr] lg:gap-12"
                >
                    <div>
                        <motion.div variants={fadeInUp} className="hero-chip-text mb-5 inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-300/[0.08] px-3 py-2 text-orange-200">
                            <MonitorSmartphone className="h-3.5 w-3.5" />
                            Main portfolio hub
                        </motion.div>
                        <motion.h1 variants={fadeInUp} className="max-w-4xl text-[2.7rem] font-black leading-[0.96] tracking-tight text-white sm:text-6xl lg:text-7xl">
                            Selected work across brand, web, AI, and motion.
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                            A focused portfolio archive for identity systems, campaign collateral, responsive interfaces, AI-generated visuals, and motion work.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="mt-7 flex flex-wrap gap-2.5">
                            {SECTION_LINKS.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className="rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-300 transition hover:border-orange-300/35 hover:bg-orange-300/[0.08] hover:text-white"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </motion.div>

                        <motion.div variants={fadeInUp} className="mt-7">
                            <Button as={Link} to="/contact" icon={ArrowRight} className="uppercase italic font-black tracking-widest text-xs">
                                Start a Project
                            </Button>
                            <Link to="/portfolio" className="ml-4 inline-flex min-h-[44px] items-center text-xs font-black uppercase tracking-[0.14em] text-white/55 transition hover:text-white">
                                Archive View
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div variants={fadeInUp} className="relative h-[390px] sm:h-[430px] md:h-[560px]">
                        <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_30%_25%,rgba(251,146,60,0.22),transparent_34%),radial-gradient(circle_at_74%_64%,rgba(14,165,233,0.18),transparent_36%)] blur-3xl" />
                        <div className="relative grid h-full grid-cols-6 grid-rows-6 gap-3">
                            {FEATURED_PROJECTS.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    animate={reduceMotion ? undefined : { y: index === 1 ? [0, -10, 0] : [0, 8, 0] }}
                                    transition={{ duration: 6 + index, repeat: Infinity, ease: 'easeInOut' }}
                                    className={[
                                        'group relative overflow-hidden rounded-[1.65rem] bg-white/[0.055] p-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl',
                                        index === 0 ? 'col-span-6 row-span-6 sm:col-span-4 sm:row-span-3' : '',
                                        index === 1 ? 'hidden sm:block sm:col-span-3 sm:col-start-4 sm:row-span-3 sm:row-start-2' : '',
                                        index === 2 ? 'hidden sm:block sm:col-span-4 sm:row-span-3 sm:row-start-4' : '',
                                    ].join(' ')}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/25 via-cyan-300/10 to-transparent" />
                                    <img src={item.image} alt="" className="relative h-full w-full rounded-[1.25rem] object-cover opacity-85 transition duration-500 group-hover:scale-[1.035] group-hover:opacity-100" />
                                    <div className="absolute inset-2 rounded-[1.25rem] bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                    <div className="absolute bottom-5 left-5 right-5">
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/55">{item.category}</div>
                                        <div className="mt-1 text-sm font-black leading-5 text-white sm:text-base">{item.title}</div>
                                    </div>
                                </motion.div>
                            ))}
                            <div className="col-span-2 col-start-5 row-span-2 row-start-5 hidden rounded-[1.65rem] border border-white/10 bg-black/35 p-4 backdrop-blur-xl sm:block">
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-200">Scope</div>
                                <div className="mt-5 space-y-3">
                                    {WORK_ARCHIVE_STATS.map((item) => (
                                        <div key={item.label}>
                                            <div className="text-[10px] font-black uppercase tracking-[0.16em] text-white/45">{item.label}</div>
                                            <div className="mt-0.5 text-sm font-black text-white">{item.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.section>

                <motion.section id="featured" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="scroll-mt-10 py-10 md:py-14">
                    <SectionHeader eyebrow="Featured work" title="The portfolio starts with the strongest proof." copy="These pieces anchor the Work page as the primary archive, with category context, outcomes, and clear visual priority." />

                    <motion.div variants={staggerContainer(0.08)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-90px' }} className="mt-8 grid gap-5 lg:grid-cols-3">
                        {FEATURED_PROJECTS.map((item, index) => (
                            <FeaturedWorkCard key={item.id} item={item} index={index} reduceMotion={reduceMotion} />
                        ))}
                    </motion.div>
                </motion.section>

                <motion.section id="gallery" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="scroll-mt-10 py-10 md:py-14">
                    <SectionHeader eyebrow="Visual gallery" title="A scannable wall of portfolio pieces." copy="Portfolio images are grouped into a responsive gallery so the page works as a complete destination without sending visitors away first." />
                    <motion.div variants={staggerContainer(0.06)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-90px' }} className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {GALLERY_ITEMS.map((item, index) => (
                            <ImageWorkCard key={item.id} item={{ ...item, subtitle: item.category }} index={index} reduceMotion={reduceMotion} accent="text-orange-300" />
                        ))}
                    </motion.div>
                </motion.section>

                <motion.section id="categories" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="scroll-mt-10 py-10 md:py-14">
                    <SectionHeader eyebrow="Portfolio lanes" title="Four ways to understand the work." copy="The archive is organized by the kind of outcome a client or collaborator is usually looking for." />
                    <motion.div variants={staggerContainer(0.08)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-90px' }} className="mt-8 grid gap-5 lg:grid-cols-2">
                        {WORK_PORTFOLIO_CATEGORIES.map((item, index) => (
                            <PortfolioLaneCard key={item.id} item={item} index={index} reduceMotion={reduceMotion} />
                        ))}
                    </motion.div>
                </motion.section>

                <motion.section id="services" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="scroll-mt-10 py-10 md:py-14">
                    <SectionHeader eyebrow="Services" title="Turn the portfolio into a working system." copy="The service cards now support the portfolio narrative instead of competing with it." />

                    <motion.div variants={staggerContainer(0.08)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-90px' }} className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
                        {SERVICE_WORK.map((item, index) => (
                            <ImageWorkCard key={item.id} item={item} index={index} reduceMotion={reduceMotion} accent="text-sky-300" compact />
                        ))}
                    </motion.div>
                </motion.section>

                <motion.section id="motion" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="scroll-mt-10 py-10 md:py-14">
                    <SectionHeader eyebrow="Motion + video" title="Video blocks that keep their shape." copy="Embedded motion work sits in fixed 16:9 frames with cleaner metadata and less boxed-in treatment." />
                    <motion.div variants={staggerContainer(0.08)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-90px' }} className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
                        {MOTION_VIDEOS.map((item, index) => (
                            <motion.article variants={fadeInUp} key={item.id} className="group overflow-hidden rounded-[1.75rem] bg-white/[0.045] p-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
                                <div className="relative aspect-video overflow-hidden rounded-[1.35rem] bg-black/70">
                                    <iframe
                                        loading="lazy"
                                        title={item.title}
                                        src={`https://play.gumlet.io/embed/${item.gumletId}?background=false&autoplay=true&loop=true&disableControls=false`}
                                        className="absolute inset-0 h-full w-full"
                                        style={{ border: 'none' }}
                                        referrerPolicy="origin"
                                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                                    />
                                </div>
                                <div className="p-4 sm:p-5">
                                    <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-black uppercase tracking-[0.18em]">
                                        <span className="text-orange-200/80">{item.subtitle}</span>
                                        <span className="text-emerald-300">{item.year}</span>
                                    </div>
                                    <h3 className="mt-3 text-2xl font-black tracking-tight text-white">{item.title}</h3>
                                    <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
                                    <div className="mt-4 inline-flex max-w-full rounded-full bg-white/[0.06] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white/60 ring-1 ring-white/10">
                                        <span className="truncate">{item.tech}</span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </motion.section>

                <motion.section id="artworks" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="scroll-mt-10 py-10 md:py-14">
                    <SectionHeader eyebrow="Heritage art" title="Artwork with room around it." copy="Emblems and poster studies use contain-fit staging so the full design stays visible instead of being awkwardly cropped." />
                    <motion.div variants={staggerContainer(0.08)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-90px' }} className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                        {HERITAGE_ART.map((item, index) => (
                            <ImageWorkCard key={item.id} item={item} index={index} reduceMotion={reduceMotion} contain accent="text-red-300" />
                        ))}
                    </motion.div>
                </motion.section>

                <motion.section id="merch" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="scroll-mt-10 py-10 md:py-14">
                    <SectionHeader eyebrow="Merch + drops" title="Product images that feel intentional." copy="Product cards now use a steady visual rhythm so the store links do not fight the artwork." />
                    <motion.div variants={staggerContainer(0.08)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-90px' }} className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
                        {MERCH.map((item, index) => (
                            <motion.article key={item.id} variants={fadeInUp} className="group overflow-hidden rounded-[1.75rem] bg-white/[0.045] p-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
                                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] bg-black/50">
                                    <img src={item.image} alt={item.title} loading="lazy" decoding="async" className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-100" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                                    <Store className="absolute right-4 top-4 h-5 w-5 text-white/65" />
                                </div>
                                <div className="p-4 sm:p-5">
                                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-300/80">{item.subtitle}</div>
                                    <h3 className="mt-2 text-xl font-black tracking-tight text-white">{item.title}</h3>
                                    <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
                                    <a href={item.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-white transition hover:text-emerald-300">
                                        {item.cta} <ArrowRight className="h-4 w-4" />
                                    </a>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </motion.section>

                <motion.section id="portfolio-pdf" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="scroll-mt-10 py-10 md:py-16">
                    <PortfolioPdfBlock />
                </motion.section>

                <motion.section id="plans" variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="scroll-mt-10 py-10 md:py-16">
                    <SectionHeader eyebrow="Plans + roadmap" title="What the archive is building toward." copy="Short roadmap cards with softer materials and predictable mobile stacking." />
                    <motion.div variants={staggerContainer(0.08)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-90px' }} className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
                        {PLANS.map((item) => (
                            <motion.article key={item.id} variants={fadeInUp} whileHover={reduceMotion ? undefined : { y: -6 }} transition={{ type: 'spring', stiffness: 380, damping: 22 }} className="rounded-[1.5rem] bg-white/[0.045] p-5 ring-1 ring-white/10 backdrop-blur-xl">
                                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-300/[0.10] text-orange-200 ring-1 ring-orange-200/15">
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{item.subtitle}</div>
                                <h3 className="mt-2 text-xl font-black tracking-tight text-white">{item.title}</h3>
                                <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
                            </motion.article>
                        ))}
                    </motion.div>
                </motion.section>
            </div>
        </div>
    );
};

const FeaturedWorkCard = ({ item, index, reduceMotion }) => (
    <motion.article variants={fadeInUp} whileHover={reduceMotion ? undefined : { y: -6 }} transition={{ type: 'spring', stiffness: 380, damping: 22 }} className="group flex min-h-[560px] flex-col overflow-hidden rounded-[1.9rem] bg-white/[0.045] p-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
        <motion.div {...imageMotion(reduceMotion, index)} className="relative aspect-[4/3] overflow-hidden rounded-[1.45rem] bg-black/50">
            <img src={item.image} alt={item.title} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.72)),radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.16),transparent_28%)]" />
            <div className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/80 ring-1 ring-white/10 backdrop-blur-xl">
                {item.category}
            </div>
        </motion.div>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
            <h3 className="text-2xl font-black tracking-tight text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
                {item.tags?.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/[0.055] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white/55 ring-1 ring-white/10">
                        {tag}
                    </span>
                ))}
            </div>
            {item.metrics && (
                <div className="mt-auto grid grid-cols-3 gap-2 pt-6">
                    {item.metrics.map((metric) => (
                        <div key={metric.label} className="rounded-2xl bg-black/28 px-3 py-3 ring-1 ring-white/10">
                            <div className="text-lg font-black text-white">{metric.value}</div>
                            <div className="mt-1 text-[9px] font-black uppercase tracking-[0.14em] text-white/45">{metric.label}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </motion.article>
);

const PortfolioLaneCard = ({ item, index, reduceMotion }) => (
    <motion.article variants={fadeInUp} whileHover={reduceMotion ? undefined : { y: -6 }} transition={{ type: 'spring', stiffness: 380, damping: 22 }} className="group grid overflow-hidden rounded-[1.9rem] bg-white/[0.045] p-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl md:grid-cols-[0.92fr_1.08fr]">
        <motion.div {...imageMotion(reduceMotion, index)} className="relative min-h-[260px] overflow-hidden rounded-[1.45rem] bg-black/50">
            <img src={item.image} alt={item.title} loading="lazy" decoding="async" className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
        </motion.div>
        <div className="flex min-h-[280px] flex-col p-4 sm:p-6">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-200/80">{item.eyebrow}</div>
            <h3 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
            <div className="mt-auto flex flex-wrap gap-2 pt-6">
                {item.stats.map((stat) => (
                    <span key={stat} className="rounded-full bg-white/[0.055] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white/55 ring-1 ring-white/10">
                        {stat}
                    </span>
                ))}
            </div>
        </div>
    </motion.article>
);

const PortfolioPdfBlock = () => (
    <div className="overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/[0.045] shadow-2xl backdrop-blur-xl">
        <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="relative min-h-[260px] overflow-hidden bg-black/55 p-6 sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(249,115,22,0.25),transparent_34%),radial-gradient(circle_at_84%_76%,rgba(56,189,248,0.18),transparent_32%)]" />
                <div className="relative flex h-full min-h-[220px] flex-col justify-between rounded-[1.35rem] border border-white/10 bg-black/35 p-6 ring-1 ring-white/10">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-300/[0.12] text-orange-200 ring-1 ring-orange-200/20">
                            <FileText className="h-7 w-7" />
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/55">
                            Client PDF
                        </span>
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-200/80">Shareable document</div>
                        <div className="mt-3 text-3xl font-black leading-none tracking-tight text-white sm:text-4xl">Portfolio</div>
                        <div className="mt-2 text-sm font-black uppercase tracking-[0.18em] text-white/45">Isaac Reyes</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <div className="mb-3 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-orange-200/80">
                    <span className="h-px w-8 bg-orange-200/60" />
                    Client portfolio PDF
                </div>
                <h2 className="max-w-3xl text-3xl font-black tracking-tight text-white md:text-5xl">
                    A polished document version for client sharing.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                    {PORTFOLIO_PDF.description} Open it in the browser for quick review, or download the file for proposals, email follow-ups, and offline review.
                </p>
                <div className="mt-5 inline-flex w-fit rounded-full bg-white/[0.055] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white/55 ring-1 ring-white/10">
                    {PORTFOLIO_PDF.fileMeta}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <a
                        href={PORTFOLIO_PDF.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-white px-5 text-xs font-black uppercase tracking-[0.14em] text-black transition hover:bg-orange-200"
                    >
                        <Eye className="h-4 w-4" />
                        View PDF
                    </a>
                    <a
                        href={PORTFOLIO_PDF.href}
                        download="isaac-reyes-portfolio.png"
                        className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:border-orange-200/40 hover:bg-orange-200/[0.10]"
                    >
                        <Download className="h-4 w-4" />
                        Download
                    </a>
                </div>
            </div>
        </div>
    </div>
);

const ImageWorkCard = ({ item, index, reduceMotion, contain = false, compact = false, accent = 'text-orange-300' }) => (
    <motion.article variants={fadeInUp} whileHover={reduceMotion ? undefined : { y: -5 }} transition={{ type: 'spring', stiffness: 380, damping: 22 }} className="group overflow-hidden rounded-[1.75rem] bg-white/[0.045] p-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
        <motion.div {...imageMotion(reduceMotion, index)} className={`${compact ? 'aspect-[4/3]' : 'aspect-[5/4]'} relative overflow-hidden rounded-[1.35rem] bg-black/55`}>
            <img src={item.image} alt={item.title} loading="lazy" decoding="async" className={`h-full w-full ${contain ? 'object-contain p-5' : 'object-cover'} opacity-90 transition duration-500 group-hover:scale-[1.035] group-hover:opacity-100`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
        <div className="p-4 sm:p-5">
            <div className={`text-[10px] font-black uppercase tracking-[0.18em] ${accent}`}>{item.subtitle}</div>
            <h3 className="mt-2 text-xl font-black tracking-tight text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
            {item.tools && (
                <div className="mt-4 inline-flex rounded-full bg-white/[0.055] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white/55 ring-1 ring-white/10">
                    {item.tools}
                </div>
            )}
            {item.href && (
                <Link to={item.href} className="mt-4 inline-flex items-center gap-2 text-sm font-black text-white transition hover:text-orange-200">
                    View service <ArrowRight className="h-4 w-4" />
                </Link>
            )}
        </div>
    </motion.article>
);

const SectionHeader = ({ eyebrow, title, copy }) => (
    <div className="max-w-3xl">
        <div className="mb-3 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-orange-200/80">
            <span className="h-px w-8 bg-orange-200/60" />
            {eyebrow}
        </div>
        <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h2>
        <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">{copy}</p>
    </div>
);

export default Work;
