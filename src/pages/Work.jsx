import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { products as MERCH } from '../content/products';
import { GALLERY_ITEMS } from '../data/portfolioProjects';
import '../styles/cleanup.css';
import GumletFilm from '../components/ui/GumletFilm';

const MOTION_VIDEOS = [
    { id: 'motion-social', title: 'Social Media Marketing', description: 'Video from the original social media portfolio.', gumletId: '69802addffc582b7d2f7304c' },
    { id: 'motion-training', title: 'Training Program Promo', description: 'Training program promotional film from the original studio collection.', gumletId: '696af4d10de908dc60a332f9' },
    { id: 'motion-showcase', title: 'Studio Showcase', description: 'Motion graphics and design work from the NovaRey studio.', gumletId: '69498bb4621936ee0129ab36' },
    { id: 'motion-ypo', title: 'YPO Marketing Film', description: 'Marketing film from the original portfolio.', gumletId: '6957d6f315b21a591c4e08cc' },
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
        image: '/portfolio/DesignPortfolio9.webp',
        tools: 'Adobe Illustrator + AI',
    },
];


const SELECTED = [
    { title: 'SunTiff website', image: '/web_design.png', description: 'Website layouts presenting services, equipment rental, and project information.' },
    { title: 'Industrial branding and marketing', image: '/portfolio/DesignPortfolio6.png', description: 'Product line cards, branding assets, and marketing collateral for industrial tools.' },
];
const aliases = { 'featured-projects': 'featured', 'portfolio-operations': 'motion', 'portfolio-about': 'featured', 'portfolio-expertise': 'featured', categories: 'gallery', services: 'featured', merch: 'resources', 'portfolio-pdf': 'resources' };

function Artwork({ item }) {
    return <figure className="clean-artwork"><img src={item.image} alt={item.title} loading="lazy" decoding="async" /><figcaption><h3>{item.title}</h3><p>{item.description}</p></figcaption></figure>;
}

export default function Work() {
    const location = useLocation();
    const scroller = useRef(null);
    useEffect(() => {
        const hash = location.hash.slice(1);
        const id = aliases[hash] || hash;
        const target = id && scroller.current?.querySelector(`#${CSS.escape(id)}`);
        if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' });
        else scroller.current?.scrollTo(0, 0);
    }, [location.hash]);
    return <main ref={scroller} className="clean-page work-collection" data-scroll-container><div className="clean-width">
        <header className="clean-intro"><h1>Selected work</h1><p>Website design, graphic design, motion, and artwork by Isaac Reyes.</p>
            <nav className="clean-section-nav" aria-label="Work sections"><a href="#featured">Projects</a><a href="#gallery">Visual studies</a><a href="#motion">Motion</a><a href="#artworks">Heritage</a><a href="#resources">Shop & PDF</a></nav>
        </header>
        <section id="featured" className="clean-section" aria-labelledby="selected-title"><h2 id="selected-title">Websites and industrial design</h2><div className="clean-art-grid">{SELECTED.map(item => <Artwork key={item.title} item={item} />)}</div></section>
        <section id="gallery" className="clean-section" aria-labelledby="studies-title"><h2 id="studies-title">Graphic design and AI-assisted studies</h2><p>Portfolio spreads showing image exploration, product compositions, and design layouts.</p><div className="clean-art-grid">{GALLERY_ITEMS.map(item => <Artwork key={item.id} item={{...item, description: item.category}} />)}<Artwork item={{title:'AI services poster',image:'/aiservices_image.webp',description:'AI-assisted promotional artwork for NovaRey.'}} /></div></section>
        <section id="motion" className="clean-section" aria-labelledby="motion-title"><h2 id="motion-title">Motion work</h2><div className="clean-art-grid">{MOTION_VIDEOS.map(item => <article key={item.id}><GumletFilm assetId={item.gumletId} title={item.title} /><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>
        <section id="artworks" className="clean-section" aria-labelledby="heritage-title"><h2 id="heritage-title">Heritage artwork</h2><div className="clean-art-grid">{HERITAGE_ART.map(item => <Artwork key={item.id} item={item} />)}</div></section>
        <section id="resources" className="clean-section" aria-labelledby="resources-title"><h2 id="resources-title">Shop artwork and download the portfolio</h2><div className="clean-shop">{MERCH.map(item => <article key={item.title}><img src={item.image} alt={item.title} loading="lazy" /><h3>{item.title}</h3><a href={item.href} target="_blank" rel="noopener noreferrer">View on Etsy</a></article>)}</div><p className="clean-resource-link"><a href="/portfolio/Isaac-Reyes-Portfolio.pdf" download>Download the portfolio PDF</a></p></section>
        <section className="clean-section clean-closing"><h2>Have a project in mind?</h2><Link className="clean-button" to="/contact">Start a project</Link></section>
    </div></main>;
}
