import React from 'react';
import { Check, Star } from 'lucide-react';
import Button from './Button';

const PLANS = [
    {
        name: 'Starter',
        price: '$2,500',
        desc: 'Perfect for small projects',
        features: ['Up to 5 pages', 'Responsive design', '2 revision rounds', '1 week delivery', 'Email support'],
        featured: false
    },
    {
        name: 'Professional',
        price: '$5,500',
        desc: 'For growing businesses',
        features: ['Up to 15 pages', 'Advanced interactions', 'Unlimited revisions', '2 week delivery', 'CMS integration', 'Priority support'],
        featured: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        desc: 'Bespoke tactical solutions',
        features: ['Unlimited pages', 'Custom features', 'Dedicated ops team', 'Flexible timeline', 'API integrations', '24/7 support'],
        featured: false
    }
];

export const PortfolioPricing = () => {
    return (
        <section className="py-32 relative">
            <div className="max-w-7xl mx-auto px-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-4">Tactical Pricing</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">Transparent investment levels for mission success. No hidden variables.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PLANS.map((plan, i) => (
                        <div
                            key={i}
                            className={`relative flex flex-col p-10 rounded-[2.5rem] border ${plan.featured ? 'border-orange-500 bg-[#1A1825] shadow-[0_0_50px_rgba(249,115,22,0.1)]' : 'border-white/5 bg-[#14121D]'} transition-all hover:scale-[1.02]`}
                        >
                            {plan.featured && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-2">
                                    <Star className="w-3 h-3 fill-current" />
                                    Most Deployed
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-black text-white italic uppercase tracking-tight mb-2">{plan.name}</h3>
                                <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">{plan.desc}</p>
                            </div>

                            <div className="mb-10 flex items-baseline gap-2">
                                <span className="text-5xl font-black text-white italic tracking-tighter">{plan.price}</span>
                                {plan.price !== 'Custom' && <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">/ Project</span>}
                            </div>

                            <ul className="flex-1 space-y-4 mb-10">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm text-slate-400">
                                        <Check className={`w-4 h-4 ${plan.featured ? 'text-orange-500' : 'text-slate-600'}`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className="w-full uppercase italic font-black tracking-widest text-xs"
                                color="var(--mission-accent)"
                                soft="var(--mission-accent-soft)"
                                glow="var(--mission-accent-glow)"
                            >
                                Initialize mission
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FAQS = [
    { q: "What's the typical mission duration?", a: "Project timelines vary by scope. A typical landing page takes 1-2 weeks, while a full tactical OS can take 4-8 weeks." },
    { q: "Do you offer post-deployment support?", a: "Affirmative. All extractions include 30 days of standard maintenance. Extended support contracts are available." },
    { q: "Can you handle complex API integrations?", a: "Absolutely. We specialize in fusing modern design with robust backend systems and third-party data extractions." }
];

export const PortfolioFAQ = () => {
    return (
        <section className="py-32 bg-gradient-to-b from-transparent to-[#0A090F]/50">
            <div className="max-w-3xl mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">Operation Intel</h2>
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Everything you need to know about the process</p>
                </div>

                <div className="space-y-4">
                    {FAQS.map((faq, i) => (
                        <details key={i} className="group overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 transition-all hover:border-white/10">
                            <summary className="flex cursor-pointer p-6 items-center justify-between list-none">
                                <h3 className="text-base font-bold text-white pr-4">{faq.q}</h3>
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-open:rotate-180 transition-transform">
                                    <Check className="w-4 h-4" />
                                </div>
                            </summary>
                            <div className="px-6 pb-6 text-sm leading-relaxed text-slate-400 border-t border-white/5 pt-4">
                                {faq.a}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};
