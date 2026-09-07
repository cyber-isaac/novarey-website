export const SITE_URL = (import.meta.env?.VITE_SITE_URL || 'https://novarey.netlify.app').replace(/\/+$/, '');
export const SITE_NAME = 'NovaRey Ventures';
export const DEFAULT_IMAGE = `${SITE_URL}/og-novarey.svg`;

export const ROUTE_META = {
    '/': {
        title: 'NovaRey Ventures | AI Web Design, Automation, and Creative Systems',
        description: 'NovaRey Ventures builds fast websites, AI automation workflows, brand systems, and creative digital experiences for founders and small businesses.',
    },
    '/work': {
        title: 'Work | NovaRey Ventures',
        description: 'Explore NovaRey apps, AI tools, design systems, motion work, heritage artwork, and product experiments.',
    },
    '/portfolio': {
        title: 'Portfolio | Web Design, Brand Systems, and AI Creative Work',
        description: 'Selected NovaRey portfolio work across web design, brand identity, AI-assisted creative systems, motion, and digital products.',
    },
    '/about': {
        title: 'About Isaac Reyes | NovaRey Ventures',
        description: 'Meet Isaac Reyes, a designer, AI automation builder, and Special Forces veteran behind NovaRey Ventures.',
    },
    '/idrive': {
        title: 'The i-Drive Blog | AI, Mycology, Strategy, and Field Notes',
        description: 'Read the NovaRey i-Drive blog for AI systems, automation, mycology, military strategy, politics, field notes, and research essays.',
    },
    '/ai-strategy': {
        title: 'AI Integration for Graphic Design Work | NovaRey AI Strategy',
        description: 'NovaRey builds AI integration systems for graphic design work, brand assets, campaign visuals, image generation, video models, Hermes agents, Obsidian, and Notion.',
    },
    '/crm': {
        title: 'CRM Workspace | NovaRey Ventures',
        description: 'A lightweight CRM workspace concept for tracking leads, project pipeline, revenue, and client activity.',
    },
    '/contact': {
        title: 'Contact NovaRey Ventures | Start a Project',
        description: 'Contact NovaRey Ventures to start a website, brand identity, AI automation, AI strategy, portfolio, or custom digital build with Isaac Reyes.',
    },
    '/mind-palace': {
        title: 'Mind Palace | Interactive Knowledge Map',
        description: 'An experimental 3D knowledge environment connecting NovaRey projects, writing, research, and creative systems.',
    },
    '/aether': {
        title: 'Aether | Generative Audio Visualizer',
        description: 'Aether is an experimental generative audio and visual system from NovaRey Ventures.',
    },
};

export const SERVICE_META = {
    services: {
        title: 'Services | Web, Brand, Marketing, and AI Systems',
        description: 'Explore NovaRey services for custom web development, brand identity, strategic marketing, AI automation, and practical service systems.',
        serviceType: ['Web development', 'Brand identity', 'Strategic marketing', 'AI automation'],
    },
    brand: {
        title: 'Brand Identity Services | Visual Systems and Creative Direction',
        description: 'Brand identity services for logo systems, visual direction, motion-ready assets, design rules, and launch-ready brand kits.',
        serviceType: ['Brand identity', 'Logo design', 'Visual identity systems', 'Creative direction'],
    },
    web: {
        title: 'Web Development Services | Fast Custom Websites and Interfaces',
        description: 'Custom web development for fast websites, landing pages, service pages, portfolios, SEO structure, responsive interfaces, and launch-ready builds.',
        serviceType: ['Web development', 'Landing page design', 'Frontend development', 'Website optimization'],
    },
    marketing: {
        title: 'Strategic Marketing Services | SEO, Content, and Campaign Systems',
        description: 'Strategic marketing services for SEO, content systems, campaign planning, landing page messaging, email flows, and measurable growth workflows.',
        serviceType: ['Strategic marketing', 'SEO strategy', 'Content marketing', 'Campaign planning'],
    },
    ai: {
        title: 'AI Solutions Services | Automation, Copilots, and Knowledge Systems',
        description: 'AI solution services for workflow automation, custom copilots, content pipelines, model routing, private knowledge systems, and business operations.',
        serviceType: ['AI automation', 'AI copilots', 'Workflow automation', 'Knowledge systems'],
    },
};

export const normalizePath = (pathname) => {
    if (!pathname || pathname === '/') return '/';
    return pathname.replace(/\/+$/, '');
};

export const getMetaForPath = (pathname) => {
    const path = normalizePath(pathname);
    if (path.startsWith('/services/')) {
        const slug = path.split('/').pop();
        return SERVICE_META[slug] || SERVICE_META.services;
    }
    if (path === '/services') {
        return SERVICE_META.services;
    }
    if (path.startsWith('/idrive/')) {
        return {
            title: 'Research Article | The i-Drive by NovaRey Ventures',
            description: 'A NovaRey Ventures research article from the i-Drive archive.',
        };
    }
    return ROUTE_META[path] || ROUTE_META['/'];
};

