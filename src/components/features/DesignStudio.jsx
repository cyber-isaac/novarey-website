import React from 'react';
import { Link } from 'react-router-dom';

export default function DesignStudio() {
    return <section className="home-clean-section"><h2>See the studio’s work</h2><p>Explore website layouts, graphic design, original motion pieces, and heritage artwork in one collection.</p><Link to="/work">View selected work</Link></section>;
}
