import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Calendar, Twitter, Instagram, Dribbble, Linkedin, Globe, Shield, User } from 'lucide-react';
import { scrollReveal, viewportConfig } from '../lib/animations';
import Button from '../components/Button';
import ParticleBackground from '../components/ParticleBackground';

const Contact = () => {
    return (
        <div className="flex-1 overflow-y-auto h-full selection:bg-orange-500/30 font-sans" data-scroll-container>
            {/* Red Particle Background */}
            <ParticleBackground />

            <motion.section
                className="md:pt-40 bg-center z-10 bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/77f55872-adf5-4910-9a7c-d21c0041bbe1_3840w.webp)] bg-cover pt-40 pb-40 relative"
                variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}
                style={{
                    maskImage: 'linear-gradient(90deg, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(90deg, transparent, black 15%, black 85%, transparent)'
                }}
                id="contact"
            >
                {/* Decorative Blur */}
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute -left-40 top-10 h-[70vh] w-[60vh] rounded-full blur-3xl opacity-25"
                        style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.15), rgba(0,0,0,0))' }}></div>
                </div>

                <div className="max-w-4xl mx-auto px-6 relative z-20">
                    <div className="text-center">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-100 uppercase tracking-widest"
                        >
                            <Mail className="h-4 w-4 text-orange-400" />
                            Let's Work Together // Secure Line
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mt-4 text-4xl sm:text-6xl tracking-tight font-semibold text-white uppercase italic"
                        >
                            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-white">collaborate?</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed"
                        >
                            Fusing Special Forces precision with award-winning design strategies. Whether you need help with product design, AI strategy, or brand development, I'm here to bring mission-critical results to your vision.
                        </motion.p>
                    </div>

                    <div className="mt-12 grid md:grid-cols-2 gap-8">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="relative rounded-2xl border border-white/10 bg-[#14121D]/40 p-8 shadow-2xl backdrop-blur-xl group hover:border-orange-500/20 transition-all duration-500"
                        >
                            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                <Send className="w-5 h-5 text-orange-500" />
                                Send a Message
                            </h3>
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 ml-1">Callsign / Name</label>
                                        <input type="text" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all" placeholder="Enter name" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 ml-1">Email</label>
                                        <input type="email" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all" placeholder="your@email.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 ml-1">Mission Budget</label>
                                    <select className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-neutral-100 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all appearance-none cursor-pointer">
                                        <option className="bg-[#14121D]">$5k - $10k</option>
                                        <option className="bg-[#14121D]">$10k - $25k</option>
                                        <option className="bg-[#14121D]">$25k - $50k</option>
                                        <option className="bg-[#14121D]">$50k+</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 ml-1">Intel / Message</label>
                                    <textarea rows="4" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all resize-none" placeholder="Tell me about your project..."></textarea>
                                </div>
                                <Button
                                    type="submit"
                                    icon={Send}
                                    className="w-full uppercase italic font-black tracking-widest text-xs"
                                    color="var(--mission-accent)"
                                    soft="var(--mission-accent-soft)"
                                    glow="var(--mission-accent-glow)"
                                    floating
                                >
                                    Initialize Mission
                                </Button>
                            </form>
                        </motion.div>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            {/* Bio Brief */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                                        <User className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Isaac Reyes</h3>
                                        <p className="text-orange-400 font-mono text-[10px] uppercase tracking-widest">Designer // Green Beret</p>
                                    </div>
                                </div>
                                <p className="text-neutral-400 text-sm italic leading-relaxed">
                                    "Strategy is the design of a mission. Design is the strategy of commerce."
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl group hover:border-white/20 transition-all cursor-pointer"
                                onClick={() => window.location.href = 'mailto:isaac@novarey.us'}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <Mail className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="">
                                        <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest">Email</h3>
                                        <p className="text-white font-medium">isaac@novarey.us</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                                className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl group hover:border-white/20 transition-all cursor-pointer"
                                onClick={() => window.open('https://cal.com/novarey', '_blank')}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <Calendar className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="">
                                        <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest">Schedule</h3>
                                        <p className="text-white font-medium">Book a free consultation</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl"
                            >
                                <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-4">Ecosystem Links</h3>
                                <div className="flex items-center gap-4">
                                    <SocialLink href="https://twitter.com/novareyventures" icon={<Twitter className="w-5 h-5" />} />
                                    <SocialLink href="https://linkedin.com/in/isaacreyes" icon={<Linkedin className="w-5 h-5" />} />
                                    <SocialLink href="#" icon={<Dribbble className="w-5 h-5" />} />
                                    <SocialLink href="#" icon={<Instagram className="w-5 h-5" />} />
                                    <SocialLink href="https://www.novarey.us" icon={<Globe className="w-5 h-5" />} />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-25 w-[60%] h-8"
                        style={{ background: 'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 30%, transparent 70%)' }}>
                    </div>
                    <div className="h-px bg-white/10 w-full"></div>
                </div>
            </motion.section>
        </div>
    );
};

const SocialLink = ({ href, icon }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-neutral-400 hover:text-white hover:bg-orange-500/20 hover:border-orange-500/30 transition-all active:scale-90"
    >
        {icon}
    </a>
);

export default Contact;

