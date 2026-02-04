import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
    return (
        <Router>
            <div className="h-screen w-full bg-black">
                <Layout>
                    <Routes>
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
                        {/* Fallback for other routes for now */}
                        <Route path="*" element={<Dashboard />} />
                    </Routes>
                </Layout>
            </div>
        </Router>
    );
}

export default App;
