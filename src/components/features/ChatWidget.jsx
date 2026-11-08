import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HelpCircle, X } from 'lucide-react';
import '../../styles/cleanup.css';

const LINKS = [
    ['View selected work', '/work'], ['Explore services', '/services'],
    ['Read about Isaac', '/about'], ['Start a project', '/contact'],
];

export default function QuickHelp() {
    const [open, setOpen] = useState(false);
    const launcher = useRef(null);
    const panel = useRef(null);
    const location = useLocation();
    useEffect(() => { setOpen(false); }, [location.pathname]);
    useEffect(() => {
        if (!open) return;
        panel.current?.querySelector('a')?.focus();
        const keydown = event => {
            if (event.key === 'Escape') { event.preventDefault(); setOpen(false); launcher.current?.focus(); }
        };
        const outside = event => {
            if (!panel.current?.contains(event.target) && !launcher.current?.contains(event.target)) setOpen(false);
        };
        document.addEventListener('keydown', keydown);
        document.addEventListener('pointerdown', outside);
        return () => { document.removeEventListener('keydown', keydown); document.removeEventListener('pointerdown', outside); };
    }, [open]);
    const close = () => { setOpen(false); launcher.current?.focus(); };
    return <div className="quick-help">
        {open && <section ref={panel} id="quick-help-panel" aria-labelledby="quick-help-title" className="quick-help-panel">
            <div className="quick-help-heading"><h2 id="quick-help-title">Find your way</h2><button type="button" aria-label="Close quick help" onClick={close}><X size={20} aria-hidden="true" /></button></div>
            <nav aria-label="Quick help">{LINKS.map(([label, to]) => <Link key={to} to={to} onClick={close}>{label}</Link>)}</nav>
        </section>}
        <button ref={launcher} type="button" className="quick-help-launcher" aria-expanded={open} aria-controls="quick-help-panel" onClick={() => setOpen(value => !value)}><HelpCircle size={19} aria-hidden="true" />Quick help</button>
    </div>;
}
