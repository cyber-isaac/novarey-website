import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HorizontalScrollGallery = ({ items = [], title = 'Gallery' }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    // Transform vertical scroll to horizontal movement
    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

    return (
        <section ref={containerRef} className="relative py-20 overflow-hidden">
            {/* Section Header */}
            <div className="px-6 md:px-12 lg:px-20 mb-12">
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-px bg-white/10 flex-1" />
                    <span className="text-xs font-mono uppercase tracking-[0.4em] text-white/50">
                        {title}
                    </span>
                    <div className="h-px bg-white/10 flex-1" />
                </div>
            </div>

            {/* Horizontal Scroll Track */}
            <div className="relative">
                <motion.div
                    className="flex gap-6 px-6 md:px-12"
                    style={{ x }}
                >
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id || index}
                            className="flex-shrink-0 w-[400px] md:w-[500px] lg:w-[600px] group cursor-pointer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 aspect-[16/10] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-white/20">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-8">
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 mb-2">
                                        {item.category}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-white/60 line-clamp-2 max-w-sm">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Hover Arrow */}
                                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                                    <ArrowRight className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Hint */}
            <div className="flex items-center justify-center mt-8 gap-2 text-white/40">
                <div className="w-8 h-px bg-current" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Scroll to explore</span>
                <div className="w-8 h-px bg-current" />
            </div>
        </section>
    );
};

export default HorizontalScrollGallery;
