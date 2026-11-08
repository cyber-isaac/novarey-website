import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import SEO from './components/seo/SEO';

// Lazy-load all pages for code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Work = lazy(() => import('./pages/Work'));
const About = lazy(() => import('./pages/About'));
const IDrive = lazy(() => import('./pages/IDrive'));
const FileViewer = lazy(() => import('./pages/FileViewer'));
const AIStrategy = lazy(() => import('./pages/AIStrategy'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const CRM = lazy(() => import('./pages/CRM'));
const Contact = lazy(() => import('./pages/Contact'));
const MindPalace = lazy(() => import('./pages/MindPalace'));
const Aether = lazy(() => import('./pages/Aether'));

function AnimatedRoutes() {
    const location = useLocation();
    return <Suspense fallback={<div role="status" className="flex-1 p-8">Loading page…</div>}><div className="page-transition-layer flex-1 flex flex-col min-h-0">
                <Routes location={location}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/portfolio" element={<Navigate replace to={{ pathname: "/work", search: location.search, hash: location.hash }} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/idrive" element={<IDrive />} />
                    <Route path="/idrive/:id" element={<FileViewer />} />
                    <Route path="/ai-strategy" element={<AIStrategy />} />
                    <Route path="/crm" element={<CRM />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/services" element={<ServicePage />} />
                    <Route path="/services/:slug" element={<ServicePage />} />
                    <Route path="/mind-palace" element={<MindPalace />} />
                    <Route path="/aether" element={<Aether />} />
                    <Route path="*" element={<Dashboard />} />
                </Routes>
    </div></Suspense>;
}

export function Website() {
    return (
            <div className="h-screen w-full bg-black">
                <SEO />
                <Layout>
                    <AnimatedRoutes />
                </Layout>
            </div>
    );
}

export default function App() {
    return <Router><Website /></Router>;
}
