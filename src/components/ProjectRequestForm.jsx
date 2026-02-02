import React, { useState, useEffect } from 'react';
import { Send, Palette, Globe, Megaphone, Fingerprint, Brain, Check, ChevronDown, X, Rocket } from 'lucide-react';
import Button from './Button';

const SERVICES = [
    {
        id: 'graphic-design',
        label: 'Graphic Design',
        icon: Palette,
        color: 'text-rose-400',
        bgColor: 'bg-rose-500/10',
        borderColor: 'border-rose-500/30',
        questions: [
            {
                id: 'graphic-type',
                label: 'What type of graphics do you need?',
                type: 'select',
                options: ['Social Media Assets', 'Print Materials', 'Packaging Design', 'Illustrations', 'Presentation Decks', 'Other']
            },
            {
                id: 'graphic-brand-guidelines',
                label: 'Do you have existing brand guidelines?',
                type: 'select',
                options: ['Yes, full brand kit', 'Partial (logo only)', 'No, starting fresh']
            }
        ]
    },
    {
        id: 'web-design',
        label: 'Web Design',
        icon: Globe,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/30',
        questions: [
            {
                id: 'web-type',
                label: 'Is this a new website or redesign?',
                type: 'select',
                options: ['New Website', 'Redesign Existing Site', 'Add New Pages/Features']
            },
            {
                id: 'web-pages',
                label: 'Estimated number of pages?',
                type: 'select',
                options: ['1-5 pages (Landing/Simple)', '5-15 pages (Standard)', '15+ pages (Complex)', 'Not sure yet']
            },
            {
                id: 'web-ecommerce',
                label: 'Do you need e-commerce functionality?',
                type: 'select',
                options: ['Yes', 'No', 'Maybe in the future']
            }
        ]
    },
    {
        id: 'marketing',
        label: 'Marketing',
        icon: Megaphone,
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/30',
        questions: [
            {
                id: 'marketing-channels',
                label: 'Which channels are you focused on?',
                type: 'select',
                options: ['Social Media', 'Email Marketing', 'Paid Ads (Google/Meta)', 'Content Marketing', 'Full-funnel Strategy']
            },
            {
                id: 'marketing-goal',
                label: 'Primary marketing goal?',
                type: 'select',
                options: ['Brand Awareness', 'Lead Generation', 'Sales/Conversions', 'Customer Retention', 'Launch Campaign']
            }
        ]
    },
    {
        id: 'branding',
        label: 'Branding',
        icon: Fingerprint,
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500/30',
        questions: [
            {
                id: 'brand-type',
                label: 'Is this a new brand or rebrand?',
                type: 'select',
                options: ['New Brand (Starting Fresh)', 'Rebrand (Refresh Existing)', 'Brand Extension']
            },
            {
                id: 'brand-deliverables',
                label: 'What deliverables do you need?',
                type: 'select',
                options: ['Logo Only', 'Logo + Basic Guidelines', 'Full Brand Identity System', 'Not sure yet']
            }
        ]
    },
    {
        id: 'ai-advising',
        label: 'A.I. Advising',
        icon: Brain,
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/10',
        borderColor: 'border-orange-500/30',
        questions: [
            {
                id: 'ai-goal',
                label: 'What are you looking to automate or improve?',
                type: 'select',
                options: ['Content Creation', 'Customer Service', 'Data Analysis', 'Internal Workflows', 'Product Features', 'General AI Strategy']
            },
            {
                id: 'ai-experience',
                label: 'Current AI experience level?',
                type: 'select',
                options: ['New to AI', 'Using basic tools (ChatGPT, etc.)', 'Some automation in place', 'Advanced implementation']
            }
        ]
    }
];

const BUDGETS = [
    '$1k - $3k',
    '$3k - $5k',
    '$5k - $10k',
    '$10k - $25k',
    '$25k+'
];

const TIMELINES = [
    'ASAP (Rush)',
    '2-4 weeks',
    '1-2 months',
    '3+ months',
    'Flexible'
];

// Modal Component
const ProjectModal = ({ isOpen, onClose }) => {
    const [selectedServices, setSelectedServices] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        budget: '',
        timeline: '',
        description: ''
    });
    const [serviceAnswers, setServiceAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [step, setStep] = useState(1); // 1: services, 2: details, 3: contact

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const toggleService = (serviceId) => {
        setSelectedServices(prev =>
            prev.includes(serviceId)
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId]
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleServiceAnswer = (questionId, value) => {
        setServiceAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    const resetForm = () => {
        setSelectedServices([]);
        setFormData({ name: '', email: '', company: '', budget: '', timeline: '', description: '' });
        setServiceAnswers({});
        setIsSubmitted(false);
        setStep(1);
        onClose();
    };

    const selectedServiceData = SERVICES.filter(s => selectedServices.includes(s.id));

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[var(--border-1)] bg-[var(--surface-1)] shadow-2xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                    <X className="w-5 h-5 text-white" />
                </button>

                {isSubmitted ? (
                    <div className="p-10 text-center">
                        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                            <Check className="w-10 h-10 text-emerald-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">Request Received!</h3>
                        <p className="text-lg text-neutral-400 max-w-md mx-auto mb-8">
                            Thanks for reaching out. I'll review your project details and get back to you within 24-48 hours.
                        </p>
                        <Button onClick={resetForm} className="uppercase italic font-black tracking-widest text-xs">
                            Close
                        </Button>
                    </div>
                ) : (
                    <form
                        name="project-request"
                        method="POST"
                        data-netlify="true"
                        netlify-honeypot="bot-field"
                        onSubmit={handleSubmit}
                        className="p-6 md:p-10"
                    >
                        <input type="hidden" name="form-name" value="project-request" />
                        <input type="hidden" name="bot-field" />
                        <input type="hidden" name="selected-services" value={selectedServices.join(', ')} />
                        <input type="hidden" name="service-answers" value={JSON.stringify(serviceAnswers)} />

                        {/* Header */}
                        <div className="mb-8 pr-8">
                            <div className="text-sm font-mono text-orange-400 uppercase tracking-widest mb-2">
                                Build a Project
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white">
                                Let's create something exceptional.
                            </h3>
                            <p className="text-lg text-neutral-400 mt-3">
                                {step === 1 && "Select the services you need to get started."}
                                {step === 2 && "Tell me more about your project requirements."}
                                {step === 3 && "Almost done! Just need your contact info."}
                            </p>
                        </div>

                        {/* Step Indicator */}
                        <div className="flex items-center gap-2 mb-8">
                            {[1, 2, 3].map(s => (
                                <div
                                    key={s}
                                    className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? 'bg-orange-500' : 'bg-white/10'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Step 1: Service Selection */}
                        {step === 1 && (
                            <div className="space-y-6">
                                <label className="block text-sm font-mono uppercase tracking-widest text-neutral-400 mb-4">
                                    What services do you need?
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {SERVICES.map(service => {
                                        const isSelected = selectedServices.includes(service.id);
                                        const Icon = service.icon;
                                        return (
                                            <button
                                                key={service.id}
                                                type="button"
                                                onClick={() => toggleService(service.id)}
                                                className={`relative rounded-xl border p-5 text-left transition-all ${isSelected
                                                        ? `${service.bgColor} ${service.borderColor} ring-1 ring-white/10`
                                                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                                                    }`}
                                            >
                                                {isSelected && (
                                                    <div className="absolute top-3 right-3">
                                                        <Check className={`w-4 h-4 ${service.color}`} />
                                                    </div>
                                                )}
                                                <Icon className={`w-6 h-6 mb-3 ${isSelected ? service.color : 'text-neutral-400'}`} />
                                                <div className={`text-base font-medium ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                                                    {service.label}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <Button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        disabled={selectedServices.length === 0}
                                        className="uppercase italic font-black tracking-widest text-xs"
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Service-Specific Questions */}
                        {step === 2 && (
                            <div className="space-y-6">
                                {selectedServiceData.map(service => (
                                    <div key={service.id} className={`rounded-xl border ${service.borderColor} ${service.bgColor} p-5`}>
                                        <div className={`text-sm font-mono uppercase tracking-widest ${service.color} mb-4 flex items-center gap-2`}>
                                            <service.icon className="w-4 h-4" />
                                            {service.label}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {service.questions.map(question => (
                                                <div key={question.id} className="space-y-2">
                                                    <label className="block text-sm text-neutral-300">
                                                        {question.label}
                                                    </label>
                                                    <div className="relative">
                                                        <select
                                                            name={question.id}
                                                            value={serviceAnswers[question.id] || ''}
                                                            onChange={(e) => handleServiceAnswer(question.id, e.target.value)}
                                                            className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-base text-white focus:border-white/30 focus:outline-none appearance-none cursor-pointer"
                                                        >
                                                            <option value="">Select...</option>
                                                            {question.options.map(opt => (
                                                                <option key={opt} value={opt} className="bg-[#14121D]">{opt}</option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {/* Budget & Timeline */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-mono uppercase tracking-widest text-neutral-400">
                                            Budget Range
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleInputChange}
                                                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base text-white focus:border-orange-500/50 focus:outline-none appearance-none cursor-pointer"
                                            >
                                                <option value="">Select budget...</option>
                                                {BUDGETS.map(b => (
                                                    <option key={b} value={b} className="bg-[#14121D]">{b}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-mono uppercase tracking-widest text-neutral-400">
                                            Timeline
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="timeline"
                                                value={formData.timeline}
                                                onChange={handleInputChange}
                                                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base text-white focus:border-orange-500/50 focus:outline-none appearance-none cursor-pointer"
                                            >
                                                <option value="">Select timeline...</option>
                                                {TIMELINES.map(t => (
                                                    <option key={t} value={t} className="bg-[#14121D]">{t}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Project Description */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-mono uppercase tracking-widest text-neutral-400">
                                        Tell me about your project
                                    </label>
                                    <textarea
                                        name="description"
                                        rows="4"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder-neutral-500 focus:border-orange-500/50 focus:outline-none resize-none"
                                        placeholder="What's your vision? Any specific goals, challenges, or inspiration?"
                                    />
                                </div>

                                <div className="pt-4 flex justify-between">
                                    <Button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="uppercase italic font-black tracking-widest text-xs"
                                        style={{ opacity: 0.7 }}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => setStep(3)}
                                        className="uppercase italic font-black tracking-widest text-xs"
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Contact Info */}
                        {step === 3 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-mono uppercase tracking-widest text-neutral-400">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder-neutral-500 focus:border-orange-500/50 focus:outline-none"
                                            placeholder="John Smith"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-mono uppercase tracking-widest text-neutral-400">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder-neutral-500 focus:border-orange-500/50 focus:outline-none"
                                            placeholder="you@company.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-mono uppercase tracking-widest text-neutral-400">
                                        Company (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder-neutral-500 focus:border-orange-500/50 focus:outline-none"
                                        placeholder="Your company name"
                                    />
                                </div>

                                <div className="pt-4 flex justify-between">
                                    <Button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="uppercase italic font-black tracking-widest text-xs"
                                        style={{ opacity: 0.7 }}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        icon={Send}
                                        className="uppercase italic font-black tracking-widest text-xs"
                                    >
                                        Submit Request
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
};

// Main CTA Component that triggers the modal
const ProjectRequestForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {/* CTA Section */}
            <div className="rounded-3xl border border-[var(--border-1)] bg-[var(--surface-2)] p-8 md:p-12 text-center">
                <div className="max-w-2xl mx-auto">
                    <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mx-auto mb-6">
                        <Rocket className="w-8 h-8 text-orange-400" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[var(--text-1)] mb-4">
                        Ready to build something exceptional?
                    </h3>
                    <p className="text-lg text-[var(--text-3)] mb-8 max-w-xl mx-auto">
                        From branding to AI strategy, let's create something that stands out. Start your project request in just a few clicks.
                    </p>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        icon={Rocket}
                        className="uppercase italic font-black tracking-widest text-sm px-8 py-4"
                    >
                        Build a Project
                    </Button>
                </div>
            </div>

            {/* Modal */}
            <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default ProjectRequestForm;
