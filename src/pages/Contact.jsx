import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Calendar,
    CheckCircle2,
    Clock,
    FileText,
    Linkedin,
    Mail,
    MapPin,
    MessageSquare,
    Send,
    Shield,
    Sparkles,
} from 'lucide-react';
import { fadeInUp, scrollReveal, staggerContainer, viewportConfig } from '../lib/animations';
import { CONTACT_EMAIL, GENERAL_EMAIL_URL, LINKEDIN_URL, STRATEGY_CALL_URL, makeMailto } from '../lib/contactLinks';

const CONTACT_CHANNELS = [
    {
        label: 'Email',
        value: CONTACT_EMAIL,
        href: GENERAL_EMAIL_URL,
        icon: Mail,
        note: 'Opens a new email already addressed to Isaac.',
    },
    {
        label: 'Book',
        value: 'Google strategy call',
        href: STRATEGY_CALL_URL,
        icon: Calendar,
        note: 'Creates a Google Calendar invite with Isaac added.',
    },
    {
        label: 'LinkedIn',
        value: 'Isaac Reyes',
        href: LINKEDIN_URL,
        icon: Linkedin,
        note: 'Professional context, background, and collaboration.',
    },
];

const PROJECT_TYPES = [
    'Website or landing page',
    'Brand identity system',
    'AI automation',
    'AI strategy system',
    'Portfolio or content system',
    'Not sure yet',
];

const BUDGETS = ['$1k - $3k', '$3k - $5k', '$5k - $10k', '$10k - $25k', '$25k+'];
const TIMELINES = ['ASAP', '2-4 weeks', '1-2 months', '3+ months', 'Flexible'];

const SIGNALS = [
    { label: 'Typical reply', value: '24-48h', icon: Clock },
    { label: 'Primary zone', value: 'United States', icon: MapPin },
    { label: 'Build style', value: 'Strategy first', icon: Shield },
];

const BRIEF_POINTS = [
    'What you are trying to build or improve',
    'The business goal behind the project',
    'Any current website, brand, content, or workflow links',
    'Budget range and ideal launch window',
];

const initialForm = {
    name: '',
    email: '',
    projectType: PROJECT_TYPES[0],
    budget: BUDGETS[2],
    timeline: TIMELINES[2],
    message: '',
};

const Contact = () => {
    const [form, setForm] = useState(initialForm);

    const mailtoHref = useMemo(() => {
        const subject = `Project inquiry from ${form.name || 'NovaRey contact page'}`;
        const body = [
            `Name: ${form.name}`,
            `Email: ${form.email}`,
            `Project type: ${form.projectType}`,
            `Budget: ${form.budget}`,
            `Timeline: ${form.timeline}`,
            '',
            'Project brief:',
            form.message,
        ].join('\n');

        return makeMailto({ subject, body });
    }, [form]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        window.location.href = mailtoHref;
    };

    return (
        <main className="flex-1 h-full overflow-y-auto bg-[#050506] text-white selection:bg-orange-500/30" data-scroll-container>
            <div className="contact-grid-overlay pointer-events-none fixed inset-0 opacity-[0.055] bg-[linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[size:52px_52px]" />
            <div className="contact-ambient-overlay pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(249,115,22,0.16),transparent_30%),radial-gradient(circle_at_84%_16%,rgba(14,165,233,0.12),transparent_28%),linear-gradient(180deg,rgba(5,5,6,0)_0%,#050506_86%)]" />

            <section className="relative px-5 pb-12 pt-10 md:px-10 md:pb-16 md:pt-14">
                <div className="mx-auto max-w-7xl">
                    <motion.div
                        variants={staggerContainer(0.08)}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)]"
                    >
                        <motion.div variants={fadeInUp} className="flex flex-col justify-between">
                            <div>
                                <div className="hero-chip-text mb-5 inline-flex items-center gap-2 border border-orange-300/25 bg-orange-500/10 px-3 py-2 font-black text-orange-100">
                                    <MessageSquare className="h-3.5 w-3.5" />
                                    Project intake
                                </div>
                                <h1 className="hero-title max-w-4xl text-white">
                                    NOVAREY VENTURES
                                </h1>
                                <p className="hero-copy mt-6 max-w-2xl text-slate-300">
                                    AI-integrated intelligent design for websites, brand systems, automation, and custom digital builds. I use AI to speed up planning, iteration, and production, while keeping the final work polished, human, and built around your actual business.
                                </p>
                            </div>

                            <div className="mt-8 grid gap-3 sm:grid-cols-3">
                                {SIGNALS.map((signal) => (
                                    <div key={signal.label} className="border border-white/10 bg-white/[0.035] p-4">
                                        <signal.icon className="mb-3 h-5 w-5 text-orange-300" />
                                        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{signal.label}</div>
                                        <div className="mt-1 text-sm font-bold text-white">{signal.value}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="border border-white/10 bg-black/45 p-4 shadow-2xl shadow-orange-950/20 backdrop-blur-xl md:p-5">
                            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                                <div>
                                    <div className="text-xs font-black uppercase tracking-[0.18em] text-orange-200">Start a brief</div>
                                    <h2 className="mt-1 text-2xl font-black tracking-tight text-white">Tell me what you need built.</h2>
                                </div>
                                <FileText className="hidden h-8 w-8 text-orange-300 sm:block" />
                            </div>

                            <form onSubmit={handleSubmit} className="grid gap-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field label="Name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                                    <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@company.com" required />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-3">
                                    <SelectField label="Project" name="projectType" value={form.projectType} onChange={handleChange} options={PROJECT_TYPES} />
                                    <SelectField label="Budget" name="budget" value={form.budget} onChange={handleChange} options={BUDGETS} />
                                    <SelectField label="Timeline" name="timeline" value={form.timeline} onChange={handleChange} options={TIMELINES} />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="block text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Project brief</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        rows={6}
                                        required
                                        placeholder="What are you building, what needs to change, and what would make this a win?"
                                        className="min-h-[150px] w-full resize-y border border-white/10 bg-white/[0.045] px-4 py-3 text-sm leading-7 text-white placeholder:text-slate-600 outline-none transition focus:border-orange-300/60 focus:bg-white/[0.07]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="group inline-flex min-h-[50px] w-full items-center justify-center gap-2 border border-orange-300/35 bg-orange-500/12 px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-orange-200/60 hover:bg-orange-500/18"
                                >
                                    <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                    Prepare email brief
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="relative px-5 py-10 md:px-10 md:py-14">
                <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_1.15fr]">
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        className="border border-white/10 bg-white/[0.035] p-5 md:p-6"
                    >
                        <div className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-orange-200">
                            <Sparkles className="h-4 w-4" />
                            Strong brief checklist
                        </div>
                        <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">Send enough context to make the first reply useful.</h2>
                        <div className="mt-6 grid gap-3">
                            {BRIEF_POINTS.map((point) => (
                                <div key={point} className="flex gap-3 border border-white/8 bg-black/20 p-3 text-sm leading-6 text-slate-300">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" />
                                    <span>{point}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer(0.07)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        className="grid gap-4"
                    >
                        {CONTACT_CHANNELS.map((channel) => (
                            <motion.a
                                key={channel.label}
                                variants={fadeInUp}
                                href={channel.href}
                                target={channel.href.startsWith('http') ? '_blank' : undefined}
                                rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="group grid gap-4 border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-0.5 hover:border-orange-300/40 hover:bg-white/[0.06] sm:grid-cols-[56px_1fr_auto] sm:items-center"
                            >
                                <div className="flex h-12 w-12 items-center justify-center bg-orange-500/12 text-orange-200">
                                    <channel.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{channel.label}</div>
                                    <div className="mt-1 text-lg font-black text-white">{channel.value}</div>
                                    <p className="mt-1 text-sm leading-6 text-slate-400">{channel.note}</p>
                                </div>
                                <ArrowRight className="hidden h-5 w-5 text-slate-500 transition group-hover:translate-x-1 group-hover:text-orange-200 sm:block" />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="relative px-5 pb-16 pt-8 md:px-10 md:pb-24">
                <div className="mx-auto max-w-7xl border border-white/10 bg-white/[0.04] p-5 md:p-8">
                    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
                        <div>
                            <div className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-orange-200">How the first conversation works</div>
                            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">Clear scope before production starts.</h2>
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                                The first pass is about defining the actual problem, priority, budget fit, timeline, and the smallest useful version to ship. That keeps the build efficient and avoids vague creative drift.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                            {['Diagnose', 'Scope', 'Build'].map((step, index) => (
                                <div key={step} className="flex items-center justify-between border border-white/10 bg-black/20 px-4 py-3">
                                    <span className="text-sm font-black uppercase tracking-[0.12em] text-white">{step}</span>
                                    <span className="font-mono text-xs text-orange-200">0{index + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

const Field = ({ label, name, type = 'text', value, onChange, placeholder, required = false }) => (
    <div className="space-y-2">
        <label htmlFor={name} className="block text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{label}</label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="min-h-[46px] w-full border border-white/10 bg-white/[0.045] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-orange-300/60 focus:bg-white/[0.07]"
        />
    </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
    <div className="space-y-2">
        <label htmlFor={name} className="block text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{label}</label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="min-h-[46px] w-full border border-white/10 bg-[#111014] px-3 py-3 text-sm text-white outline-none transition focus:border-orange-300/60 focus:bg-[#151319]"
        >
            {options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);

export default Contact;
