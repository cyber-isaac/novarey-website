import React, { useState } from 'react';
import { Code2, PenTool, Megaphone, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../styles/cleanup.css';
const STUDIO_SERVICES = [
    {
        id: 'web-development',
        title: 'Web Development',
                desc: 'Website layouts and builds for services, products, and portfolios.',
        icon: Code2,
        accent: 'blue',
        media: '/web_design.png',
        metric: 'SunTiff website layouts'
    },
    {
        id: 'branding-identity',
        title: 'Branding & Identity',
                desc: 'Logos, typography, print layouts, and assets for a consistent identity.',
        icon: PenTool,
        accent: 'rose',
        media: '/portfolio/DesignPortfolio9.webp',
        metric: 'Identity and print work'
    },
    {
        id: 'strategic-marketing',
        title: 'Strategic Marketing',
                desc: 'Campaign visuals, flyers, landing pages, and content planning.',
        icon: Megaphone,
        accent: 'amber',
        media: '/homepage_info.png',
        metric: 'Campaign artwork'
    },
    {
        id: 'ai-solutions',
        title: 'A.I. Solutions',
                desc: 'Tools for document search, draft preparation, and repetitive business tasks.',
        icon: Cpu,
        accent: 'emerald',
        media: '/aiservices_image.webp',
        metric: 'AI-assisted visual exploration'
    }
];


export default function AIStudioBrief() {
    const [activeId, setActiveId] = useState(STUDIO_SERVICES[0].id);
    const active = STUDIO_SERVICES.find(item => item.id === activeId);
    return <section className="home-clean-section"><h2>Design, websites, and business tools</h2><div className="home-clean-split">
        <div className="home-service-options">{STUDIO_SERVICES.map(item => <button key={item.id} type="button" aria-pressed={activeId===item.id} aria-controls="studio-artwork" onClick={()=>setActiveId(item.id)}><h3>{item.title}</h3><p>{item.desc}</p></button>)}<Link to="/services">Explore the services</Link></div>
        <figure id="studio-artwork" className="clean-artwork"><div className="home-clean-media"><img src={active.media} alt={active.metric} loading="lazy" />{activeId==='web-development'&&<img src="/website_image2.png" alt="SunTiff services page" loading="lazy" />}</div><figcaption aria-live="polite">{active.metric}</figcaption></figure>
    </div></section>;
}
