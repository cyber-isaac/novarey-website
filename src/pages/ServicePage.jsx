import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { scrollReveal, viewportConfig } from '../lib/animations';

const ServicePage = () => {
    const { slug } = useParams();

    // Simple mapping for display title based on slug
    const titles = {
        brand: "Brand Identity",
        web: "Web Development",
        marketing: "Strategic Marketing",
        ai: "A.I. Solutions"
    };

    const title = titles[slug] || "Service";

    return (
        <div className="flex-1 overflow-y-auto bg-[#0D0C12] h-full p-8" data-scroll-container>
            <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
                <p className="text-slate-400">Details about our {title.toLowerCase()} services.</p>
            </motion.div>
        </div>
    );
};

export default ServicePage;
