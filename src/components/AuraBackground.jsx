import React, { useEffect } from 'react';

const AuraBackground = () => {
    useEffect(() => {
        // Initialize Unicorn Studio script if not already present
        if (!window.UnicornStudio) {
            window.UnicornStudio = { isInitialized: false };
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
            script.onload = () => {
                if (!window.UnicornStudio.isInitialized) {
                    // Check if UnicornStudio is available on window
                    if (window.UnicornStudio && typeof window.UnicornStudio.init === 'function') {
                        window.UnicornStudio.init();
                        window.UnicornStudio.isInitialized = true;
                    }
                }
            };
            (document.head || document.body).appendChild(script);
        } else if (window.UnicornStudio.isInitialized && typeof window.UnicornStudio.init === 'function') {
            // Re-init if already loaded but maybe needs a refresh for new DOM elements
            window.UnicornStudio.init();
        }
    }, []);

    return (
        <div className="aura-background-component top-0 w-full -z-10 absolute h-full pointer-events-none opacity-50">
            <div
                data-us-project="tPmIIl0vKqHO9yqmtge2"
                className="absolute w-full h-full left-0 top-0 -z-10"
            ></div>
        </div>
    );
};

export default AuraBackground;
