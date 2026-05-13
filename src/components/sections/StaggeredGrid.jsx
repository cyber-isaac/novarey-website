import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const StaggeredGrid = ({ items = [], columns = 3 }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <motion.div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
        >
            {items.map((item, index) => (
                <motion.div
                    key={item.id || index}
                    variants={itemVariants}
                    className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/10"
                    style={{ '--reveal-delay': `${index * 50}ms` }}
                >
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                        {/* Category Tag */}
                        <div className="mb-3">
                            <span className="inline-flex px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-white/80">
                                {item.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                            {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-white/60 line-clamp-2 mb-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            {item.description}
                        </p>

                        {/* Link Arrow */}
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                                {item.year}
                            </span>
                            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                <ArrowUpRight className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent" />
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default StaggeredGrid;
