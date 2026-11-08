import React from 'react';
import { Link } from 'react-router-dom';
import GumletFilm from '../ui/GumletFilm';
export default function SpecialOpsTheater() {
    return <section className="home-clean-section home-clean-split"><div><h2>From Special Forces to the design studio</h2><p>My military background shaped how I organize work, communicate decisions, and follow through. Today I bring that experience to graphic design, websites, and business workflows.</p><Link to="/about">Read Isaac’s story</Link></div><figure><GumletFilm assetId="698d57f0ea3f1b28841fb7d9" title="Career and Design Archive" /><figcaption>Career and design archive</figcaption></figure></section>;
}
