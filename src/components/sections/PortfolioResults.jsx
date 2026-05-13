import React from 'react';
import { ArrowUpRight, BarChart3, Building2, Layout, LayoutPanelTop, Palette, Workflow } from 'lucide-react';
import Button from '../ui/Button';

const PROOF_BLOCKS = [
    {
        icon: BarChart3,
        label: 'Suntiff',
        title: 'Dashboard systems',
        body: 'Interface planning, dashboard hierarchy, and data-view layouts built to make business information easier to scan, compare, and act on.',
        tags: ['Dashboard UI', 'Data layout', 'Admin flows'],
        accent: 'orange'
    },
    {
        icon: Workflow,
        label: 'EPP',
        title: 'Workflow tools',
        body: 'Operational screens, process mapping, and internal-use layouts focused on cleaner handoffs, faster task tracking, and practical daily use.',
        tags: ['Workflow UX', 'Ops screens', 'System logic'],
        accent: 'cyan'
    },
    {
        icon: Building2,
        label: 'Local business',
        title: 'Custom websites',
        body: 'Service websites and brand pages for local businesses that need clear offers, fast page flow, mobile polish, and direct contact paths.',
        tags: ['Web design', 'Local SEO', 'Lead flow'],
        accent: 'emerald'
    }
];

const accentClasses = {
    orange: 'border-orange-500/15 bg-orange-500/5 text-orange-400',
    cyan: 'border-cyan-400/15 bg-cyan-400/5 text-cyan-300',
    emerald: 'border-emerald-400/15 bg-emerald-400/5 text-emerald-300'
};

const PortfolioResults = () => {
    return (
        <section className="py-32 relative">
            <div className="max-w-7xl mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-4">Real results</h2>
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.3em]">From concept to polished launch</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Metrics Card */}
                    <div className="lg:col-span-1 p-8 rounded-[2rem] bg-[#14121D] border border-white/5 flex flex-col justify-between">
                        <div>
                            <div className="text-6xl font-black text-white italic tracking-tighter mb-4">150+</div>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                Successful projects delivered with <span className="text-orange-500 font-bold">clear creative</span> precision across diverse industries.
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

                    {/* Project Proof */}
                    <div className="lg:col-span-2 grid grid-rows-2 gap-6">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-500 flex items-center justify-center">
                                    <LayoutPanelTop className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">Selected Work Proof</h4>
                                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Dashboards // Websites // Systems</p>
                                </div>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-slate-700" />
                        </div>
                        <div className="p-10 rounded-[2rem] bg-orange-500/5 border border-orange-500/10 relative overflow-hidden flex items-center">
                            <div className="absolute top-8 left-8 text-orange-500/10">
                                <BarChart3 className="w-24 h-24" />
                            </div>
                            <p className="text-2xl md:text-3xl font-black text-white italic tracking-tighter leading-snug relative z-10">
                                PRACTICAL DESIGN SYSTEMS FOR <span className="text-orange-500">REAL BUSINESS WORK</span>: DASHBOARDS, LOCAL WEBSITES, INTERNAL TOOLS, AND AI-READY WORKFLOWS.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {PROOF_BLOCKS.map((item) => (
                            <article key={item.title} className="group rounded-[2rem] border border-white/5 bg-[#14121D] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.04]">
                                <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border ${accentClasses[item.accent]}`}>
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <p className="text-[10px] font-mono uppercase tracking-[0.26em] text-slate-500">{item.label}</p>
                                <h3 className="mt-3 text-xl font-black uppercase italic tracking-tight text-white">{item.title}</h3>
                                <p className="mt-4 text-sm leading-relaxed text-slate-400">{item.body}</p>
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {item.tags.map((tag) => (
                                        <span key={tag} className="rounded-full border border-white/5 bg-white/[0.04] px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-slate-500">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PortfolioResults;
