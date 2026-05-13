import React from 'react';
import { Play } from 'lucide-react';

const Theater = () => {
    return (
        <div className="">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
                        <Play className="w-5 h-5 text-yellow-500" />
                        Client Showcases
                    </h2>
                    <p className="text-sm text-slate-500">Recent visual experiences</p>
                </div>
                <div className="flex gap-2">
                    <button className="text-xs font-semibold text-slate-400 hover:text-white bg-white/5 rounded-lg px-3 py-1.5 transition-colors">
                        View All Projects
                    </button>
                </div>
            </div>

            {/* Carousel Container */}
            <div className="flex overflow-x-auto gap-6 snap-x-mandatory pb-6 no-scrollbar">
                {/* Theater Item 1 */}
                <div className="min-w-[400px] md:min-w-[500px] lg:min-w-[600px] h-[320px] rounded-2xl relative overflow-hidden group snap-center border border-white/5">
                    <img
                        src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/3b795adb-ad80-41d3-a178-49d3af0168f8_800w.webp"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt="Project"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                        <span className="inline-block px-2 py-1 mb-3 text-[10px] font-bold tracking-wider text-black bg-white rounded uppercase">
                            Case Study
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-2">
                            Neon City Rebrand
                        </h3>
                        <p className="text-slate-300 text-sm line-clamp-2">
                            Complete visual identity overhaul for the annual tech conference including stage graphics and social assets.
                        </p>
                    </div>
                </div>

                {/* Theater Item 2 */}
                <div className="min-w-[400px] md:min-w-[500px] lg:min-w-[600px] h-[320px] rounded-2xl relative overflow-hidden group snap-center border border-white/5">
                    <img
                        src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/d61bc9fd-7a8a-40a2-94c9-1168179f1932_800w.webp"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt="Project"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                        <span className="inline-block px-2 py-1 mb-3 text-[10px] font-bold tracking-wider text-black bg-cyan-400 rounded uppercase">
                            Web Design
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-2">
                            Apex Financial UI Kit
                        </h3>
                        <p className="text-slate-300 text-sm line-clamp-2">
                            A comprehensive dashboard design system built for fintech startups.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Theater;
