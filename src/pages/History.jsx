import React from 'react';
import TimelineSlider from '../components/TimelineSlider';

// Timeline events based on Isaac's career
const TIMELINE_EVENTS = [
    {
        id: 1,
        year: '2010',
        title: 'Village Stability Operations',
        description: 'Deployed to Afghanistan as a Special Forces Communications Sergeant to conduct VSO (Village Stability Operations) in southern Afghanistan, northwest of Kandahar along the Arghandab River Valley. Partnered with local Afghan forces to fight alongside U.S. troops against the Taliban.',
        image: '/2010_mewithmalim.png',
        type: 'image'
    },
    {
        id: 2,
        year: '2013',
        title: 'Special Operations Instructor',
        description: 'Became a Special Operations Instructor/Writer at Fort Bragg, NC. Delivered comprehensive training to 78 U.S. and Allied officers per cycle during the prestigious Special Forces Qualification Course (SFQC). Designed curriculum that increased training effectiveness by 20%.',
        image: '/meafghanSFguys.png',
        type: 'image'
    },
    {
        id: 3,
        year: '2016',
        title: 'Special Forces Officer',
        description: 'Promoted to Special Forces Officer and Assistant Operations Warrant at Joint Base Lewis-McChord, WA. Directed multi-agency special operations integrating JSOC, CIA, DIA, FBI, and DTRA. Established and led Counter-Terrorism Task Force in Qatar.',
        image: '/ODA-3.png',
        type: 'image'
    },
    {
        id: 4,
        year: '2019',
        title: 'Novarey Ventures Launch',
        description: 'Founded Novarey Ventures as Design Strategist & AI Innovation Lead. Pioneered AI-enhanced design workflows using MidJourney, DALL-E, and Adobe Suite. Managed concurrent projects with budgets exceeding $500K for Fortune 500 clients.',
        image: '/mebannerport.png',
        type: 'image'
    },
    {
        id: 5,
        year: '2023',
        title: 'PMP & Bachelor\'s Degree',
        description: 'Earned Bachelor\'s Degree in Graphic Design & Media Arts from SNHU and obtained PMP Certification. Also completed certifications in AI for Project Managers, Cybersecurity, and Function Calling & Data Extraction.',
        image: '/isaac-portrait.png',
        type: 'image'
    },
    {
        id: 6,
        year: '2024',
        title: 'Renewable Energy & AI',
        description: 'Expanded into renewable energy as Land Agent for Scout Clean Energy, managing 4.5MW wind turbine projects in Texas and Minnesota. Created AI training bots using BotPress. Leading AI innovation with Claude, GPT, Grok, and cutting-edge generative tools.',
        image: '/mestandingbw.png',
        type: 'image'
    }
];

// Skills from resume
const SKILLS = {
    design: ['Visual Design', 'Brand Development', 'AI-Enhanced Design', 'Marketing Design', 'Cross Platform Design', 'Design Systems'],
    technical: ['Adobe Creative Suite', 'Visual Studio Code', 'ChatGPT', 'Claude AI', 'MidJourney', 'RunwayML', 'BotPress'],
    leadership: ['Project Management', 'Operations Leadership', 'Stakeholder Engagement', 'Team Leadership', 'Strategic Planning'],
    certifications: ['PMP Certified', 'Cybersecurity', 'Special Forces', 'TS/SCI Clearance']
};

const History = () => {
    return (
        <div className="flex-1 overflow-y-auto bg-[#0D0C12] min-h-screen" data-scroll-container>
            {/* Timeline Section - Full Width Edge-to-Edge */}
            <TimelineSlider
                title="My Journey"
                events={TIMELINE_EVENTS}
            />

            {/* Experience & Skills Section */}
            <section className="px-6 md:px-12 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tight mb-4">
                            Experience & Skills
                        </h2>
                        <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto">
                            20+ years of expertise in visual design, project management, strategic operations,
                            and renewable energy development. Bilingual in Spanish and Tagalog.
                        </p>
                    </div>

                    {/* Skills Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Design Skills */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20">
                            <h3 className="text-orange-400 font-bold uppercase tracking-wider text-sm mb-4">Design</h3>
                            <div className="space-y-2">
                                {SKILLS.design.map((skill) => (
                                    <div key={skill} className="text-white/70 text-sm font-mono">{skill}</div>
                                ))}
                            </div>
                        </div>

                        {/* Technical Skills */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
                            <h3 className="text-blue-400 font-bold uppercase tracking-wider text-sm mb-4">Technical</h3>
                            <div className="space-y-2">
                                {SKILLS.technical.map((skill) => (
                                    <div key={skill} className="text-white/70 text-sm font-mono">{skill}</div>
                                ))}
                            </div>
                        </div>

                        {/* Leadership Skills */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
                            <h3 className="text-purple-400 font-bold uppercase tracking-wider text-sm mb-4">Leadership</h3>
                            <div className="space-y-2">
                                {SKILLS.leadership.map((skill) => (
                                    <div key={skill} className="text-white/70 text-sm font-mono">{skill}</div>
                                ))}
                            </div>
                        </div>

                        {/* Certifications */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20">
                            <h3 className="text-green-400 font-bold uppercase tracking-wider text-sm mb-4">Certifications</h3>
                            <div className="space-y-2">
                                {SKILLS.certifications.map((skill) => (
                                    <div key={skill} className="text-white/70 text-sm font-mono">{skill}</div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Awards Section */}
                    <div className="mt-16 text-center">
                        <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-6">Notable Awards</h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {['Bronze Star (2)', 'Purple Heart', 'Meritorious Service (3)', 'Army Commendation (5)', 'NATO Medal'].map((award) => (
                                <span
                                    key={award}
                                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-mono"
                                >
                                    {award}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default History;
