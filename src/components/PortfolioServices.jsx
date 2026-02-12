import React from 'react';
import { Layout, Palette, Zap, Cpu, Target, Layers, Check } from 'lucide-react';

const SERVICES = [
    {
        icon: Layout,
        title: 'Precision Web Design',
        desc: 'High-impact interfaces that turn visitors into loyal users with clean visuals and smooth UX.',
        tags: ['E-commerce', 'SaaS', 'Marketing'],
        gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent'
    },
    {
        icon: Palette,
        title: 'Brand Systems',
        desc: 'Full visual identities that capture the heart of your vision and connect with the right audience.',
        tags: ['Logos', 'Typography', 'Style Guides'],
        gradient: 'from-orange-500/20 via-red-500/10 to-transparent'
    },
    {
        icon: Target,
        title: 'Strategic UX',
        desc: 'User-first design grounded in real research, built for genuine engagement and lasting results.',
        tags: ['Research', 'Audit', 'Prototypes'],
        gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent'
    }
];

const FEATURES = [
    { icon: Zap, title: 'Rapid Deployment', sub: 'Fast turnaround cycles' },
    { icon: Cpu, title: 'AI Enhanced', sub: 'Cutting-edge workflows' },
    { icon: Layers, title: 'Fully Responsive', sub: 'Native on all devices' },
    { icon: Check, title: 'Mission Proven', sub: 'Battle-tested results' }
];

const PortfolioServices = () => {
    return (
        <section className="py-32 relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-8 relative">
                <div className="text-center mb-20">
                    <div className="text-[10px] font-mono text-orange-500/60 mb-4 tracking-[0.5em] uppercase">Tactical capabilities // Service matrix</div>
                    <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase">
                        DESIGN SERVICES THAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-white">DELIVER.</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto mt-6">
                        Comprehensive solutions from extraction to deployment, crafted to elevate your operational efficiency.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {SERVICES.map((service, i) => (
                        <div key={i} className="group relative p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-b ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                                    <service.icon className="w-6 h-6" />
                                </div>

                                <h3 className="text-2xl font-black text-white italic tracking-tighter mb-4">{service.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                    {service.desc}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {service.tags.map((tag, j) => (
                                        <span key={j} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Feature Bar */}
                <div className="mt-20 pt-12 border-t border-white/5">
                    <div className="marquee" aria-label="Service highlights">
                        <div className="marquee-track">
                            {[...FEATURES, ...FEATURES].map((feature, i) => (
                                <div key={`${feature.title}-${i}`} className="marquee-item">
                                    <div className="marquee-icon">
                                        <feature.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold uppercase tracking-tight">{feature.title}</h4>
                                        <p className="text-[10px] font-mono uppercase tracking-widest">{feature.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PortfolioServices;
