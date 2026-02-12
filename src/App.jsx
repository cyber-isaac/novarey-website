import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';

// Lazy-load all pages for code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Work = lazy(() => import('./pages/Work'));
const About = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const IDrive = lazy(() => import('./pages/IDrive'));
const FileViewer = lazy(() => import('./pages/FileViewer'));
const AIStrategy = lazy(() => import('./pages/AIStrategy'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const CRM = lazy(() => import('./pages/CRM'));
const Contact = lazy(() => import('./pages/Contact'));
const MindPalace = lazy(() => import('./pages/MindPalace'));
const Aether = lazy(() => import('./pages/Aether'));

const pageVariants = {
    initial: { opacity: 0, y: 10 },
    enter: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: {
        opacity: 0,
        y: -6,
        transition: { duration: 0.1, ease: [0.25, 0.1, 0.25, 1] },
    },
};

const overlayVariants = {
    initial: { opacity: 0 },
    enter: { opacity: [0, 0.08, 0], transition: { duration: 0.4, ease: 'easeInOut' } },
    exit: { opacity: 0, transition: { duration: 0.1 } },
};

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <Suspense fallback={null}>
        <AnimatePresence mode="sync" onExitComplete={() => {
            const sc = document.querySelector('[data-scroll-container]');
            if (sc) sc.scrollTop = 0;
        }}>
            <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                className="page-transition-layer flex-1 flex flex-col min-h-0"
            >
                {/* Accent flash overlay */}
                <motion.div
                    variants={overlayVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    className="pointer-events-none fixed inset-0 z-50"
                    style={{ background: 'var(--page-accent, #22c55e)' }}
                />
                <Routes location={location}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/idrive" element={<IDrive />} />
                    <Route path="/idrive/:id" element={<FileViewer />} />
                    <Route path="/ai-strategy" element={<AIStrategy />} />
                    <Route path="/crm" element={<CRM />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/services/:slug" element={<ServicePage />} />
                    <Route path="/mind-palace" element={<MindPalace />} />
                    <Route path="/aether" element={<Aether />} />
                    <Route path="*" element={<Dashboard />} />
                </Routes>
            </motion.div>
        </AnimatePresence>
        </Suspense>
    );
}

function App() {
    return (
        <Router>
            <div className="h-screen w-full bg-black">
                <Layout>
                    <AnimatedRoutes />
                </Layout>
            </div>
        </Router>
    );
}

export default App;
