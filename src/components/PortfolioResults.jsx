import React from 'react';
import { TrendingUp, Star, Palette, Layout, ArrowUpRight } from 'lucide-react';
import Button from './Button';

const PortfolioResults = () => {
    return (
        <section className="py-32 relative">
            <div className="max-w-7xl mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-4">Real results</h2>
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.3em]">From concept to mission completion</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Metrics Card */}
                    <div className="lg:col-span-1 p-8 rounded-[2rem] bg-[#14121D] border border-white/5 flex flex-col justify-between">
                        <div>
                            <div className="text-6xl font-black text-white italic tracking-tighter mb-4">150+</div>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                Successful projects delivered with <span className="text-orange-500 font-bold">mission-critical</span> precision across diverse industries.
                            </p>
                            <div className="flex -space-x-3 mb-6">
                                {[Palette, Layout, TrendingUp].map((Icon, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-[#1A1825] border border-white/10 flex items-center justify-center text-slate-400">
                                        <Icon className="w-4 h-4" />
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-bold">
                                    99%
                                </div>
                            </div>
                        </div>
                        <Button
                            className="w-full uppercase italic font-black tracking-widest text-xs"
                            color="var(--mission-accent)"
                            soft="var(--mission-accent-soft)"
                            glow="var(--mission-accent-glow)"
                        >
                            Initialize Project
                        </Button>
                    </div>

                    {/* Testimonial Big */}
                    <div className="lg:col-span-2 grid grid-rows-2 gap-6">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-500 flex items-center justify-center">
                                    <Star className="w-5 h-5 fill-current" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">Sarah Chen</h4>
                                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">CEO // TECHFLOW SOLUTIONS</p>
                                </div>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-slate-700" />
                        </div>
                        <div className="p-10 rounded-[2rem] bg-orange-500/5 border border-orange-500/10 relative overflow-hidden flex items-center">
                            <div className="absolute top-8 left-8 text-orange-500/10">
                                <Star className="w-24 h-24 fill-current" />
                            </div>
                            <p className="text-2xl md:text-3xl font-black text-white italic tracking-tighter leading-snug relative z-10">
                                "THE NEW ARCHITECTURE INCREASED CONVERSIONS BY <span className="text-orange-500">180%</span> IN THE FIRST QUARTER. ABSOLUTELY TRANSFORMATIVE."
                            </p>
                        </div>
                    </div>

                    {/* Testimonial Small Stack */}
                    <div className="lg:col-span-1 grid grid-rows-2 gap-6">
                        <div className="p-8 rounded-[2rem] bg-[#14121D] border border-white/5 flex flex-col justify-center text-center">
                            <p className="text-lg font-bold text-white mb-4 italic">"True design partners."</p>
                            <div className="flex justify-center gap-1 text-orange-500 mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                            </div>
                            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Marcus Johnson // Innovate Labs</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                                <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/cb364025-2387-4977-a5e2-b5466b778b1d_320w.webp" alt="Maya Patel" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm">Maya Patel</h4>
                                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">CEO // Digital Ventures</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PortfolioResults;
