import React from 'react';
import { ArrowRight } from 'lucide-react';

const HorizontalScrollGallery = ({ items = [], title = 'Gallery' }) => {
    return (
        <section className="relative py-16 overflow-hidden">
            <div className="px-6 md:px-12 lg:px-20 mb-8">
                <div className="flex items-center gap-4">
                    <div className="h-px bg-white/10 flex-1" />
                    <span className="text-xs font-mono uppercase tracking-[0.4em] text-white/50">
                        {title}
                    </span>
                    <div className="h-px bg-white/10 flex-1" />
                </div>
            </div>

            <div className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 pb-4 md:px-12 lg:px-20">
                {items.map((item, index) => (
                    <article
                        key={item.id || index}
                        className="group relative flex-shrink-0 snap-start w-[82vw] max-w-[520px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors duration-300 hover:border-white/25"
                    >
                        <div className="aspect-[16/10] overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                            <span className="mb-2 block text-[10px] font-mono uppercase tracking-widest text-orange-400">
                                {item.category}
                            </span>
                            <h3 className="text-xl font-bold text-white md:text-2xl">
                                {item.title}
                            </h3>
                            <p className="mt-2 line-clamp-2 max-w-sm text-sm text-white/65">
                                {item.description}
                            </p>
                        </div>
                        <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                            <ArrowRight className="h-4 w-4" />
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default HorizontalScrollGallery;
