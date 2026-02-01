import React from 'react';
import logoSvg from '../assets/nr_logo_alt.svg?raw';

const Logo = ({ className = '', title = 'NovaRey Ventures Logo' }) => {
    return (
        <span
            className={`logo-svg ${className}`}
            role="img"
            aria-label={title}
            dangerouslySetInnerHTML={{ __html: logoSvg }}
        />
    );
};

export default Logo;

