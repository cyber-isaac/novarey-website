import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Maximize2 } from 'lucide-react';

const VideoModal = ({ isOpen, onClose, videoSrc, title }) => {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                        className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                    >
                        {/* Header/Controls */}
                        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-end p-6 pointer-events-none">
                            <button
                                onClick={onClose}
                                className="pointer-events-auto p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10 backdrop-blur-md group"
                            >
                                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Footer/Title */}
                        <div className="absolute bottom-0 left-0 right-0 z-20 p-8 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                delay={0.2}
                                className="text-white font-medium text-xl tracking-wide"
                            >
                                {title}
                            </motion.h3>
                        </div>

                        {/* Video Frame */}
                        {videoSrc && (
                            <iframe
                                title={title || "Video Player"}
                                src={videoSrc}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        )}

                        {/* Glow Effects */}
                        <div className="absolute -inset-[1px] rounded-3xl border border-white/10 pointer-events-none z-10"></div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default VideoModal;
