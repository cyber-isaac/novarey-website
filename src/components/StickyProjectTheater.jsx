import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import Button from './Button';

const StickyProjectTheater = ({ projects = [] }) => {
    return (
        <div className="relative">
            {projects.map((project, index) => (
                <ProjectSection key={project.id} project={project} index={index} />
            ))}
        </div>
    );
};

const ProjectSection = ({ project, index }) => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    // Animation transforms
    const imageScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9]);
    const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const contentY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -50]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

    const isEven = index % 2 === 0;

    return (
        <section
            ref={sectionRef}
            className="min-h-screen flex items-center py-20 px-6 md:px-12 lg:px-20"
        >
            <div className={`w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                {/* Image Side */}
                <motion.div
                    className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                    style={{ scale: imageScale, opacity: imageOpacity }}
                >
                    <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 aspect-[4/3] group">
                        {project.video ? (
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src={project.video} type="video/mp4" />
                            </video>
                        ) : (
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Play overlay for videos */}
                        {project.video && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                    <Play className="w-6 h-6 text-white fill-current" />
                                </div>
                            </div>
                        )}

                        {/* Project tag */}
                        <div className="absolute top-6 left-6">
                            <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-white/80">
                                {project.category}
                            </span>
                        </div>
                    </div>

                    {/* Decorative glow */}
                    <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-orange-500/10 via-transparent to-blue-500/10 blur-3xl -z-10 opacity-50" />
                </motion.div>

                {/* Content Side */}
                <motion.div
                    className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                    style={{ y: contentY, opacity: contentOpacity }}
                >
                    <div className="space-y-6">
                        {/* Project number */}
                        <div className="text-[10px] font-mono uppercase tracking-widest text-orange-400">
                            Project {String(index + 1).padStart(2, '0')}
                        </div>

                        {/* Title */}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase italic tracking-tight leading-[0.95]">
                            {project.title}
                        </h2>

                        {/* Description */}
                        <p className="text-lg text-white/60 leading-relaxed max-w-lg">
                            {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {project.tags?.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70 uppercase tracking-wider"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Metrics */}
                        {project.metrics && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                                {project.metrics.map((metric) => (
                                    <div key={metric.label} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                        <div className="text-2xl font-bold text-white">{metric.value}</div>
                                        <div className="text-xs font-mono text-white/50 uppercase tracking-widest mt-1">
                                            {metric.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* CTA */}
                        {project.link && (
                            <div className="pt-4">
                                <Button
                                    as="a"
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    icon={ArrowUpRight}
                                    className="uppercase italic font-black tracking-widest text-xs"
                                >
                                    View Project
                                </Button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default StickyProjectTheater;
