import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { CONTACT_EMAIL, LINKEDIN_URL } from '../../lib/contactLinks';

const SITE_URL = 'https://www.novarey.us';
const SITE_NAME = 'NovaRey Ventures';
const DEFAULT_IMAGE = `${SITE_URL}/og-novarey.svg`;

const ROUTE_META = {
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

const SERVICE_META = {
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

const normalizePath = (pathname) => {
    if (!pathname || pathname === '/') return '/';
    return pathname.replace(/\/+$/, '');
};

const getMetaForPath = (pathname) => {
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

const buildStructuredData = (url, meta, pathname) => {
    const graph = [
        {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: SITE_NAME,
            url: SITE_URL,
            logo: `${SITE_URL}/favicon.svg`,
            sameAs: [
                'https://twitter.com/novareyventures',
                LINKEDIN_URL,
            ],
        },
        {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            name: SITE_NAME,
            url: SITE_URL,
            description: ROUTE_META['/'].description,
            publisher: { '@id': `${SITE_URL}/#organization` },
        },
        {
            '@type': 'WebPage',
            '@id': `${url}#webpage`,
            url,
            name: meta.title,
            description: meta.description,
            isPartOf: { '@id': `${SITE_URL}/#website` },
            about: { '@id': `${SITE_URL}/#organization` },
        },
    ];

    if (pathname === '/') {
        graph.push(
            {
                '@type': 'Person',
                '@id': `${SITE_URL}/#isaac-reyes`,
                name: 'Isaac Reyes',
                url: SITE_URL,
                worksFor: { '@id': `${SITE_URL}/#organization` },
                jobTitle: 'AI product designer and automation developer',
                knowsAbout: ['Web design', 'AI automation', 'Brand identity', 'Product design', 'Creative systems'],
            },
            {
                '@type': 'ProfessionalService',
                '@id': `${SITE_URL}/#services`,
                name: SITE_NAME,
                url: SITE_URL,
                description: meta.description,
                provider: { '@id': `${SITE_URL}/#organization` },
                areaServed: 'United States',
                serviceType: ['Web design', 'AI automation', 'Brand identity', 'Strategic marketing'],
            }
        );
    }

    if (pathname === '/idrive') {
        graph.push({
            '@type': 'Blog',
            '@id': `${url}#blog`,
            name: 'The i-Drive Blog',
            url,
            description: meta.description,
            publisher: { '@id': `${SITE_URL}/#organization` },
        });
    }

    if (pathname === '/ai-strategy') {
        graph.push({
            '@type': 'Service',
            '@id': `${url}#ai-strategy-service`,
            name: 'Closed-loop AI strategy systems',
            url,
            description: meta.description,
            provider: { '@id': `${SITE_URL}/#organization` },
            serviceType: [
                'AI integration for graphic design work',
                'Graphic design workflow automation',
                'AI creative systems',
                'AI strategy consulting',
                'AI video generation workflow design',
                'Agentic workflow automation',
                'Private knowledge base design',
                'Local and cloud model routing',
            ],
            areaServed: 'United States',
        });
    }

    if (pathname === '/contact') {
        graph.push({
            '@type': 'ContactPage',
            '@id': `${url}#contact`,
            name: 'Contact NovaRey Ventures',
            url,
            description: meta.description,
            isPartOf: { '@id': `${SITE_URL}/#website` },
            about: { '@id': `${SITE_URL}/#organization` },
            mainEntity: {
                '@type': 'Organization',
                '@id': `${SITE_URL}/#organization`,
                contactPoint: {
                    '@type': 'ContactPoint',
                    email: CONTACT_EMAIL,
                    contactType: 'Project inquiries',
                    areaServed: 'US',
                    availableLanguage: 'English',
                },
            },
        });
    }

    if (pathname === '/services' || pathname.startsWith('/services/')) {
        const slug = pathname === '/services' ? 'services' : pathname.split('/').pop();
        const serviceMeta = SERVICE_META[slug] || SERVICE_META.services;

        graph.push({
            '@type': 'Service',
            '@id': `${url}#service`,
            name: serviceMeta.title,
            url,
            description: serviceMeta.description,
            provider: { '@id': `${SITE_URL}/#organization` },
            serviceType: serviceMeta.serviceType,
            areaServed: 'United States',
        });
    }

    return {
        '@context': 'https://schema.org',
        '@graph': graph,
    };
};

const SEO = () => {
    const location = useLocation();
    const pathname = normalizePath(location.pathname);
    const meta = getMetaForPath(pathname);
    const canonical = `${SITE_URL}${pathname === '/' ? '' : pathname}`;
    const structuredData = buildStructuredData(canonical, meta, pathname);

    useEffect(() => {
        document.querySelectorAll('[data-static-seo="true"]').forEach((element) => {
            element.parentNode?.removeChild(element);
        });
    }, [pathname]);

    return (
        <Helmet prioritizeSeoTags>
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <link rel="canonical" href={canonical} />
            <meta name="robots" content="index, follow" />

            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={meta.title} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={DEFAULT_IMAGE} />
            <meta property="og:type" content="website" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={meta.title} />
            <meta name="twitter:description" content={meta.description} />
            <meta name="twitter:image" content={DEFAULT_IMAGE} />

            <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </Helmet>
    );
};

export default SEO;
