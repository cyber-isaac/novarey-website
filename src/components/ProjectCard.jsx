import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ title, category, image, description, size = 'normal' }) => {
    // Size logic for masonry-style grid if we want later, for now sticking to standard adaptable card
    return (
        <div className="group cursor-pointer group relative rounded-xl overflow-hidden bg-[#1A1823] border border-white/5 hover:border-white/20 transition-all duration-500 animate-on-scroll">
            {/* Image Container */}
            <div className={`relative w-full ${size === 'large' ? 'aspect-[16/9]' : 'aspect-[4/3]'} overflow-hidden`}>
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>

                {/* Overlay Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs font-semibold text-white border border-white/10 uppercase tracking-wider">
                        {category}
                    </span>
                </div>
            </div>

            {/* Content Content */}
            <div className="p-6 relative">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                            {title}
                        </h3>
                        <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                            {description}
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <ArrowUpRight className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
