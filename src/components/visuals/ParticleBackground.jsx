import React from 'react';

const ParticleBackground = () => {
    return (
        <div
            className="ambient-background fixed inset-0 -z-10 pointer-events-none overflow-hidden"
            aria-hidden="true"
        >
            <div className="ambient-grid" />
            <div className="ambient-field ambient-field-a" />
            <div className="ambient-field ambient-field-b" />
        </div>
    );
};

export default ParticleBackground;
