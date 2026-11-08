import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { PenTool, Code2, Megaphone, Cpu, Brain, Target, Layers, Zap, Monitor, Search, BarChart3, Mail, Bot, Database, Shield } from 'lucide-react';
import AISolutions from './AISolutions';
import '../styles/cleanup.css';
const SERVICES = {
    brand: {
        icon: PenTool,
        accent: '#f472b6',
        accentSoft: 'rgba(244, 114, 182, 0.12)',
        accentLine: 'rgba(244, 114, 182, 0.32)',
        title: 'Brand Identity',
        eyebrow: 'Signal system',
        headline: 'A brand system people can recognize fast.',
        subtitle: 'Identity, image direction, typography, motion rules, and launch assets built as one usable system.',
        promise: 'I turn scattered taste, references, and business goals into a visual language your site, social, decks, and campaigns can keep using.',
        heroImage: '/portfolio/DesignPortfolio9.webp',
        visualAlt: 'Premium graphic design identity system artwork',
        gallery: ['/portfolio/DesignPortfolio11.webp', '/portfolio/DesignPortfolio12.webp', '/portfolio/example_Flyer.png'],
        proof: ['Logo + visual language', 'Launch-ready assets', 'Rules your team can reuse'],
        methodTitle: 'Branding without loose parts.',
        method: [
            { label: 'Read', text: 'Audience, offer, references, competitors, and the visual codes that fit the business.' },
            { label: 'Shape', text: 'Fast concept exploration, then hand-edited direction for hierarchy, type, color, and image style.' },
            { label: 'Package', text: 'A working identity kit with enough rules to keep every new asset consistent.' },
        ],
        stack: ['Illustrator', 'Photoshop', 'After Effects', 'Canva Pro', 'AI image exploration', 'Motion references'],
        outcomes: [
            { icon: Target, title: 'Positioning', text: 'A clearer signal for who you are, what you sell, and why it should be trusted.' },
            { icon: Layers, title: 'Asset system', text: 'Reusable logo, type, color, layout, image, and social directions.' },
            { icon: Layers, title: 'Fast variation', text: 'AI speeds exploration without making the final brand look generated.' },
        ],
        timeline: '1-3 weeks',
        bestFor: 'New brands, rebrands, founder-led brands, content systems',
    },
    web: {
        icon: Code2,
        accent: '#60a5fa',
        accentSoft: 'rgba(96, 165, 250, 0.12)',
        accentLine: 'rgba(96, 165, 250, 0.32)',
        title: 'Web Development',
        eyebrow: 'Fast custom builds',
        headline: 'Websites that feel custom and load fast.',
        subtitle: 'Responsive React builds with clean SEO, compressed assets, polished motion, and clear conversion paths.',
        promise: 'I use AI-assisted coding to move faster, then inspect the code, layout, metadata, assets, and responsive behavior by hand.',
        heroImage: '/web_design.png',
        visualAlt: 'Custom website design and development preview',
        gallery: ['/website_image2.png', '/homepage_whatido.png', '/portfolio/DesignPortfolio7.webp'],
        proof: ['Route-level loading', 'Responsive layouts', 'SEO-ready structure'],
        methodTitle: 'Build the useful path first.',
        method: [
            { label: 'Map', text: 'Routes, sections, CTAs, search intent, and the job each page has to do.' },
            { label: 'Build', text: 'Custom components, motion, media, and content structure without page-builder drag.' },
            { label: 'Tune', text: 'Images, chunks, spacing, mobile fit, metadata, and final browser checks.' },
        ],
        stack: ['React', 'Vite', 'Next.js patterns', 'Tailwind CSS', 'Framer Motion', 'Vercel / Netlify'],
        outcomes: [
            { icon: Zap, title: 'Speed', text: 'Lazy routes, compressed assets, and fewer dependencies where they are not needed.' },
            { icon: Monitor, title: 'Responsive UI', text: 'Text, cards, media, and CTAs shaped for desktop, tablet, and mobile.' },
            { icon: Search, title: 'SEO base', text: 'Titles, descriptions, canonical URLs, schema, and clean heading structure.' },
        ],
        timeline: '3 days - 4 weeks',
        bestFor: 'Landing pages, portfolios, service sites, dashboards, web apps',
    },
    marketing: {
        icon: Megaphone,
        accent: '#fb923c',
        accentSoft: 'rgba(251, 146, 60, 0.12)',
        accentLine: 'rgba(251, 146, 60, 0.32)',
        title: 'Strategic Marketing',
        eyebrow: 'Demand engine',
        headline: 'Marketing that makes the offer easier to believe.',
        subtitle: 'Positioning, SEO, content, landing pages, email, and campaign creative connected into one practical system.',
        promise: 'I simplify the offer, build the asset path, and create repeatable content workflows that support traffic, leads, and follow-up.',
        heroImage: '/homepage_info.png',
        visualAlt: 'Marketing strategy and content system preview',
        gallery: ['/portfolio/example_Flyer.png', '/URBAN SURVIVAL_flyer.png', '/portfolio/DesignPortfolio12.webp'],
        proof: ['Search intent mapped', 'Campaign assets', 'Follow-up flow'],
        methodTitle: 'Make the message easier to move.',
        method: [
            { label: 'Find', text: 'Search intent, objections, competitor language, market gaps, and offer clarity.' },
            { label: 'Frame', text: 'Landing copy, content angles, visuals, and channel priorities built around the buyer.' },
            { label: 'Repeat', text: 'A workflow for publishing, measuring, learning, and improving the next pass.' },
        ],
        stack: ['SEO mapping', 'Content calendars', 'Google Analytics', 'Email sequences', 'Social creative', 'Landing pages'],
        outcomes: [
            { icon: Search, title: 'Visibility', text: 'Keyword-informed pages and content themes that support organic traffic.' },
            { icon: BarChart3, title: 'Campaign logic', text: 'Each campaign gets a goal, channel, message, and way to measure it.' },
            { icon: Mail, title: 'Lead flow', text: 'Landing pages, email, and follow-up copy aligned around the same offer.' },
        ],
        timeline: '1-4 weeks',
        bestFor: 'Launches, service offers, content engines, SEO refreshes',
    },
    ai: {
        icon: Cpu,
        accent: '#8b5cf6',
        accentSoft: 'rgba(139, 92, 246, 0.12)',
        accentLine: 'rgba(139, 92, 246, 0.32)',
        title: 'A.I. Solutions',
        eyebrow: 'Workflow intelligence',
        headline: 'AI systems that remove drag from real work.',
        subtitle: 'Copilots, automations, content systems, and private knowledge bases built around how your business already operates.',
        promise: 'The work starts with the process, not the model. I map the workflow, decide what should be automated, and keep human approval where it matters.',
        heroImage: '/aiservices_image.webp',
        visualAlt: 'AI workflow and automation system preview',
        gallery: ['/portfolio/DesignPortfolio17.webp', '/homepage_whatido.png', '/portfolio/DesignPortfolio14.webp'],
        proof: ['Model routing', 'Private knowledge base', 'Human approval gates'],
        methodTitle: 'Use AI where it actually saves time.',
        method: [
            { label: 'Audit', text: 'Repetitive work, knowledge bottlenecks, handoff gaps, and high-value AI opportunities.' },
            { label: 'Route', text: 'Online models, local models, databases, automations, and approvals matched to the task.' },
            { label: 'Install', text: 'Prompts, tools, docs, and a workflow your team can keep running after launch.' },
        ],
        stack: ['OpenAI APIs', 'Claude / Gemini workflows', 'Hermes-style agents', 'Notion', 'Obsidian', 'Make / Zapier'],
        outcomes: [
            { icon: Bot, title: 'Copilots', text: 'Assistants for intake, support, research, drafting, and internal retrieval.' },
            { icon: Database, title: 'Memory', text: 'Client context organized into databases, vaults, SOPs, and references.' },
            { icon: Brain, title: 'Routing', text: 'Use the right model for the job instead of overspending on every request.' },
        ],
        timeline: '1-6 weeks',
        bestFor: 'Operations, content pipelines, internal copilots, client knowledge systems',
    },
};

const SERVICE_ORDER = ['brand', 'web', 'marketing', 'ai'];


export default function ServicePage() {
    const { slug } = useParams();
    if (slug === 'ai') return <AISolutions />;
    if (!slug) return <main className="clean-page" data-scroll-container><div className="clean-width"><header className="clean-intro"><h1>Services</h1><p>Design and development for your website, brand, campaign, or business workflow.</p></header><div className="clean-service-list">{SERVICE_ORDER.map(id => <article key={id}><h2><Link to={`/services/${id}`}>{SERVICES[id].title}</Link></h2><p>{SERVICES[id].subtitle}</p></article>)}</div></div></main>;
    const data = SERVICES[slug];
    if (!data) return <main className="clean-page"><div className="clean-width"><h1>Service not found</h1><Link to="/services">Explore services</Link></div></main>;
    const headings = { brand: ['Identity design', 'Logo, type, and launch assets'], web: ['Website development', 'Pages, components, and handoff'], marketing: ['Campaign planning', 'Messaging, creative, and channels'] };
    return <main className="clean-page" data-scroll-container><div className="clean-width">
        <header className="clean-service-hero"><div><h1>{headings[slug][0]}</h1><p>{data.subtitle}</p><p>{data.promise}</p><div className="clean-actions"><Link className="clean-button" to="/contact">Discuss your project</Link><Link to="/work">See selected work</Link></div></div><figure className="clean-artwork"><img src={data.heroImage} alt={data.visualAlt} /><figcaption>{data.title} example from the portfolio</figcaption></figure></header>
        <section className="clean-section"><h2>{headings[slug][1]}</h2><div className="clean-method">{data.outcomes.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
        <section className="clean-section"><h2>{slug === 'brand' ? 'From references to an identity kit' : slug === 'web' ? 'From page plan to launch' : 'From the offer to the campaign'}</h2><ol className="clean-steps">{data.method.map(item => <li key={item.label}><h3>{item.label}</h3><p>{item.text}</p></li>)}</ol></section>
        <section className="clean-section"><h2>{slug === 'brand' ? 'Identity and print examples' : slug === 'web' ? 'Website layouts' : 'Campaign and flyer examples'}</h2><div className="clean-art-grid">{data.gallery.map(image => <figure key={image} className="clean-artwork"><img src={image} alt={`${data.title} portfolio example`} loading="lazy" /></figure>)}</div></section>
        <section className="clean-section"><h2>Tools and handoff</h2><p>{data.stack.join(', ')}. The final scope and deliverables are agreed before production.</p></section>
        <section className="clean-section clean-closing"><div><h2>Tell me about your project.</h2><p>Share your goal, existing materials, and timeline.</p></div><Link className="clean-button" to="/contact">Start a project</Link></section>
        <nav className="clean-section-nav" aria-label="Other services">{SERVICE_ORDER.filter(id => id!==slug).map(id => <Link key={id} to={`/services/${id}`}>{SERVICES[id].title}</Link>)}</nav>
    </div></main>;
}
