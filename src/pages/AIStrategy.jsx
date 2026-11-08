import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, PenTool, Workflow, BookOpen } from 'lucide-react';
import '../styles/ai-strategy.css';

const TOOLS = [
    { name: 'Higgsfield', role: 'Camera motion' },
    { name: 'Seedance 2.0', role: 'Video variants' },
    { name: 'Veo 3.1', role: 'Cinematic scenes' },
    { name: 'Grok Imagine', role: 'Image exploration' },
    { name: 'Hermes Agent', role: 'Routing and tasks' },
    { name: 'Qwen', role: 'Private drafting' },
];

const DIRECTION = [
    { title: 'Design direction', icon: PenTool, copy: 'AI explores directions. I edit for hierarchy, composition, typography, and brand fit.' },
    { title: 'Task-based routing', icon: Workflow, copy: 'Video, images, copy, and research each get tools chosen for the work, with human review throughout.' },
    { title: 'Client memory', icon: BookOpen, copy: 'Briefs, assets, approvals, prompts, and decisions stay organized and useful after delivery.' },
];

const FLOW = [
    { title: 'Brief', copy: 'Define the audience, goals, visual direction, and constraints.' },
    { title: 'Route', copy: 'Choose the tools and model workflows for each task.' },
    { title: 'Create', copy: 'Explore video, images, copy, and interface directions.' },
    { title: 'Refine', copy: 'Edit, select, and review the work before it ships.' },
];

const DELIVERABLES = [
    'AI model routing map', 'Creative prompt library', 'Obsidian client vault',
    'Notion asset database', 'Image and video direction boards', 'Approval and governance flow',
];

function StrategyLink({ children, secondary = false }) {
    return <Link className={`strategy-link${secondary ? ' strategy-link-secondary' : ''}`} to={secondary ? '/work' : '/contact'}>{children}</Link>;
}

export default function AIStrategy() {
    return (
        <main className="strategy-page" data-scroll-container>
            <div className="strategy-content">
                <section className="strategy-hero" aria-labelledby="strategy-title">
                    <div className="strategy-hero-copy">
                        <h1 id="strategy-title">AI systems with a designer’s eye.</h1>
                        <p>Research, creative exploration, production, and handoff—shaped around your brand, with human direction at every step.</p>
                        <div className="strategy-actions">
                            <StrategyLink>Build my AI system</StrategyLink>
                            <StrategyLink secondary>View design work</StrategyLink>
                        </div>
                    </div>
                    <figure className="strategy-workflow"><figcaption>Illustrative creative workflow</figcaption><ol>{['Brief', 'Explore directions', 'Human review', 'Deliver'].map((step, index) => <li key={step}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></li>)}</ol><p>Tools support the process. You approve the direction.</p></figure>
                </section>
                <section className="strategy-section strategy-tools" aria-labelledby="strategy-tools-title">
                    <div className="strategy-section-intro">
                        <h2 id="strategy-tools-title">The right tool for the work.</h2>
                        <p>The tools support the work: brand assets, web visuals, campaign graphics, and workflows your team can use. The selection follows your brief.</p>
                    </div>
                    <dl className="strategy-tool-list">
                        {TOOLS.map(tool => <div key={tool.name}><dt>{tool.name}</dt><dd>{tool.role}</dd></div>)}
                    </dl>
                </section>
                <section className="strategy-section" aria-labelledby="strategy-direction-title">
                    <h2 id="strategy-direction-title">Creative direction at every stage.</h2>
                    <div className="strategy-principles">
                        {DIRECTION.map(({ title, icon: Icon, copy }) => <article key={title}>
                            <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
                            <h3>{title}</h3><p>{copy}</p>
                        </article>)}
                    </div>
                </section>
                <section className="strategy-section strategy-process" aria-labelledby="strategy-process-title">
                    <div className="strategy-section-intro">
                        <h2 id="strategy-process-title">From the brief to the final edit.</h2>
                        <p>A clear sequence keeps the work moving. Every stage has a human review before the next handoff.</p>
                    </div>
                    <ol className="strategy-flow">
                        {FLOW.map((step, index) => <li key={step.title}>
                            <span className="strategy-step" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                            <div><h3>{step.title}</h3><p>{step.copy}</p></div>
                        </li>)}
                    </ol>
                </section>
                <section className="strategy-section strategy-delivery" aria-labelledby="strategy-delivery-title">
                    <div className="strategy-section-intro">
                        <h2 id="strategy-delivery-title">A creative system you keep.</h2>
                        <p>Obsidian stores the thinking. Notion organizes assets, approvals, and tasks. The handoff includes the tools and decisions behind the finished work.</p>
                        <ul className="strategy-deliverables">
                            {DELIVERABLES.map(item => <li key={item}><CheckCircle2 size={18} aria-hidden="true" /><span>{item}</span></li>)}
                        </ul>
                    </div>
                    <figure className="strategy-proof">
                        <Link to="/work" aria-label="Explore the graphic design portfolio">
                            <img src="/portfolio/DesignPortfolio9.webp" alt="Isaac Reyes portfolio spread featuring custom heritage posters and team logos" width="1131" height="1600" loading="lazy" decoding="async" />
                        </Link>
                        <figcaption>Selected graphic design work. <Link to="/work">Explore the portfolio</Link></figcaption>
                    </figure>
                </section>
                <section className="strategy-section strategy-closing" aria-labelledby="strategy-closing-title">
                    <div><h2 id="strategy-closing-title">Build your next creative workflow.</h2><p>Bring the brief. We’ll find the right starting point.</p></div>
                    <StrategyLink>Build my AI system</StrategyLink>
                </section>
            </div>
        </main>
    );
}
