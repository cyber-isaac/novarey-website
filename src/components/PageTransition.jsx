import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const pageVariants = {
    initial: {
        opacity: 0,
        y: 16,
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
            ease: [0.25, 0.1, 0.25, 1],
            when: 'beforeChildren',
        },
    },
    exit: {
        opacity: 0,
        y: -8,
        transition: {
            duration: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
};

const PageTransition = ({ children }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top when route changes
        const scrollContainer = document.querySelector('[data-scroll-container]');
        if (scrollContainer) {
            scrollContainer.scrollTop = 0;
        }
    }, [pathname]);

    return (
        <motion.div
            key={pathname}
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="flex-1 flex flex-col h-full overflow-hidden"
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
