import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, FileText, Inbox, MessagesSquare, Check, Layers } from 'lucide-react';
import '../styles/ai-solutions.css';

const examples = [
    { name: 'New inquiry', input: '“We need a new website for our studio. Can you send more information?”', action: 'Extract the project details, organize the inquiry, and draft a relevant reply.', result: 'A prepared lead and a reply ready for you to review.' },
    { name: 'Team question', input: '“What do we need from a client before starting a project?”', action: 'Search your approved onboarding documents and summarize the relevant steps with source references.', result: 'A useful answer your team can check against the original documents.' },
    { name: 'Content brief', input: '“Turn these product notes into a first draft for our newsletter.”', action: 'Use your notes and brand guidelines to create a structured draft, flagging missing details.', result: 'An editable first draft for your team to refine and approve.' },
];
const services = [
    { icon: MessagesSquare, title: 'Find answers faster', text: 'Give your team an assistant that searches your business documents and helps explain what it finds.', example: 'Onboarding guides · Internal questions · Project knowledge' },
    { icon: Inbox, title: 'Move work along', text: 'Connect repetitive steps between your forms, inbox, and business tools so information is easier to act on.', example: 'Inquiry sorting · Meeting summaries · Task handoffs' },
    { icon: FileText, title: 'Get past the blank page', text: 'Turn your notes and approved source material into drafts that follow your voice and format.', example: 'Email drafts · Content briefs · Product descriptions' },
];
const faqs = [
    ['Do I need to know how to use AI?', 'No. We start with a task you already do, then design a tool around it. The handover explains how to use it, review its output, and update its instructions.'],
    ['Can this work with the tools I already use?', 'Often, yes. We check the integrations and access your tools support before choosing an approach. The goal is to fit your workflow, with any limitations explained before the build.'],
    ['What happens to my business data?', 'We decide what information the system needs, who can access it, and which providers will process it during scoping. Storage and privacy depend on the selected tools; those choices are part of the design.'],
    ['Will it do everything automatically?', 'Only the steps we agree to automate. Drafting, finding information, and organizing tasks are useful starting points. Sensitive decisions and outgoing messages can stay behind your approval.'],
    ['Are there ongoing costs?', 'There can be model usage, hosting, or connected software costs in addition to the build. We identify the expected services and costs when defining your project.'],
];

export default function AISolutions() {
    const [selected, setSelected] = useState(0);
    const example = examples[selected];
    return (
        <main className="ai-solutions" data-scroll-container>
            <div className="ai-wrap">
                <section className="ai-hero" aria-labelledby="ai-title">
                    <div className="ai-hero-copy">
                        <p className="ai-kicker">NovaRey / AI solutions</p>
                        <h1 id="ai-title">Less busywork.<br /><span>More room to think.</span></h1>
                        <p className="ai-lead">Practical AI tools built around your business. Find answers in your documents, turn notes into useful drafts, and simplify the work you repeat every day.</p>
                        <div className="ai-actions"><Link className="ai-button" to="/contact">Plan my AI workflow <ArrowRight size={17} /></Link><a className="ai-text-link" href="#ai-use-cases">See what’s possible <ArrowDown size={16} /></a></div>
                        <p className="ai-hero-note">Start with one task. Build something useful. Keep people in control.</p>
                    </div>
                    <div className="ai-demo info-card">
                        <div className="ai-demo-top"><span className="ai-kicker">From task to useful output</span><span className="ai-example-label">Illustrative example</span></div>
                        <div className="ai-example-picker" aria-label="Choose an example workflow">{examples.map((item, index) => <button key={item.name} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.name}</button>)}</div>
                        <div className="ai-workflow" aria-live="polite" aria-atomic="true">
                            <div className="ai-workflow-step info-card info-card--compact"><span className="ai-step-label">01 / You provide</span><p className="ai-input">{example.input}</p></div>
                            <div className="ai-flow-connector"><ArrowDown size={17} /></div>
                            <div className="ai-workflow-step info-card info-card--compact"><span className="ai-step-label">02 / The tool helps</span><p>{example.action}</p></div>
                            <div className="ai-flow-connector"><ArrowDown size={17} /></div>
                            <div className="ai-workflow-result info-card info-card--compact"><span className="ai-step-label"><Check size={14} /> 03 / Ready for your review</span><p>{example.result}</p></div>
                        </div>
                        <p className="ai-demo-note">Your sources. Your process. Your final say.</p>
                    </div>
                </section>
                <section id="ai-use-cases" className="ai-section" aria-labelledby="ai-use-title">
                    <div className="ai-section-heading"><p className="ai-kicker">Where it helps</p><h2 id="ai-use-title">Real tasks. Clear uses.</h2><p>You don’t need an “AI strategy” to get started. You need a job worth making easier.</p></div>
                    <div className="ai-card-grid">{services.map(({ icon: Icon, title, text, example: detail }) => <article className="ai-card info-card info-card--body" key={title}><Icon size={25} strokeWidth={1.5} /><h3>{title}</h3><p>{text}</p><div className="ai-card-examples">{detail}</div></article>)}</div>
                </section>
                <section className="ai-section ai-delivery" aria-labelledby="ai-delivery-title">
                    <div className="ai-section-heading"><p className="ai-kicker">The deliverable</p><h2 id="ai-delivery-title">A working tool.<br />A clear way to use it.</h2><p>The project is more than a prompt. We define the workflow, connect the right tools, and make the result usable by the people doing the work.</p></div>
                    <div className="ai-delivery-list">{[
                        ['Built for your workflow', 'A focused assistant or automation connected to the sources and tools agreed in your scope.'],
                        ['Tested with real examples', 'Representative tasks, output checks, and clear handling for missing information or failed steps.'],
                        ['Ready for your team', 'Documented instructions, a walkthrough, and an explanation of what to review and how to maintain it.'],
                    ].map(([title, text]) => <div key={title}><Check size={19} /><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
                </section>
                <section className="ai-section" aria-labelledby="ai-process-title"><div className="ai-section-heading"><p className="ai-kicker">How we build it</p><h2 id="ai-process-title">Start small. Make it work.</h2></div><div className="ai-card-grid ai-process">{[
                    ['Find the right task', 'Show me what takes too much time. We map the steps, the inputs, and what a useful result looks like.'],
                    ['Try a focused prototype', 'Test one workflow with representative examples. Refine the output and decide where your approval is needed.'],
                    ['Put it into practice', 'Connect the agreed tools, walk through the finished workflow, and hand over the instructions your team needs.'],
                ].map(([title, text], index) => <article className="ai-card info-card info-card--body" key={title}><span className="ai-process-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
                <section className="ai-section ai-faq" aria-labelledby="ai-faq-title"><div className="ai-section-heading"><p className="ai-kicker">Before we start</p><h2 id="ai-faq-title">A few useful answers.</h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
                <section className="ai-cta"><Layers size={28} strokeWidth={1.5} /><h2>What would you like<br />to take off your plate?</h2><p>Bring one repetitive task, a messy process, or an idea. We’ll work out where AI can help and what a useful first version should do.</p><Link className="ai-button" to="/contact">Tell me about your task <ArrowRight size={17} /></Link></section>
                <nav className="ai-other-services" aria-label="Other services"><span>Explore other services</span><Link to="/services/web">Web development <ArrowRight size={14} /></Link><Link to="/services/brand">Branding <ArrowRight size={14} /></Link><Link to="/services/marketing">Marketing <ArrowRight size={14} /></Link></nav>
            </div>
        </main>
    );
}
