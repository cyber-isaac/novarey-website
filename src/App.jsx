import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Work from './pages/Work';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import IDrive from './pages/IDrive';
import FileViewer from './pages/FileViewer';
import AIStrategy from './pages/AIStrategy';
import ServicePage from './pages/ServicePage';
import CRM from './pages/CRM';
import Contact from './pages/Contact';
import MindPalace from './pages/MindPalace';
import Aether from './pages/Aether';

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
        transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] },
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
