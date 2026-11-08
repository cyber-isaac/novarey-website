import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { CONTACT_EMAIL, LINKEDIN_URL } from '../../lib/contactLinks';

import { SITE_URL, SITE_NAME, DEFAULT_IMAGE, ROUTE_META, SERVICE_META, normalizePath, getMetaForPath } from '../../lib/seoMeta';

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
    const pathname = normalizePath(location.pathname) === "/portfolio" ? "/work" : normalizePath(location.pathname);
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
