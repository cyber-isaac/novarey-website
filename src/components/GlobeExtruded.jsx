import React, { useEffect, useRef } from 'react';

// Countries you've OPERATED in (military missions)
const OPERATED_COUNTRIES = [
    'KH', // Cambodia
    'PH', // Philippines
    'SG', // Singapore
    'TH', // Thailand
    'QA', // Qatar
    'AF', // Afghanistan
    'JP', // Japan
    'KW', // Kuwait
    'UZ', // Uzbekistan
    'JO', // Jordan
    'KR', // South Korea
    'MM', // Myanmar
];

// Countries you've VISITED
const VISITED_COUNTRIES = [
    'US', // United States
    'MX', // Mexico
    'CA', // Canada
];

// All countries combined for highlighting
const ALL_COUNTRIES = [...OPERATED_COUNTRIES, ...VISITED_COUNTRIES];

const GlobeExtruded = () => {
    const containerRef = useRef(null);
    const globeRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Dynamically load globe.gl from CDN
        const script = document.createElement('script');
        script.src = '//cdn.jsdelivr.net/npm/globe.gl';
        script.async = true;

        script.onload = () => {
            // Fetch countries GeoJSON
            fetch('https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
                .then(res => res.json())
                .then(countries => {
                    if (!containerRef.current || globeRef.current) return;

                    const Globe = window.Globe;

                    const globe = Globe()(containerRef.current)
                        .globeImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg')
                        .backgroundColor('rgba(0,0,0,0)')
                        .showAtmosphere(true)
                        .atmosphereColor('#ff4444')
                        .atmosphereAltitude(0.15)
                        .polygonsData(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'))
                        .polygonAltitude(d => ALL_COUNTRIES.includes(d.properties.ISO_A2) ? 0.06 : 0.01)
                        .polygonCapColor(d => OPERATED_COUNTRIES.includes(d.properties.ISO_A2) ? '#ff3333' : (VISITED_COUNTRIES.includes(d.properties.ISO_A2) ? '#ff8833' : 'rgba(20, 20, 20, 0.8)'))
                        .polygonSideColor(d => ALL_COUNTRIES.includes(d.properties.ISO_A2) ? 'rgba(255, 50, 50, 0.4)' : 'rgba(0, 0, 0, 0.3)')
                        .polygonStrokeColor(() => '#333')
                        .polygonLabel(({ properties: d }) => {
                            const isOperated = OPERATED_COUNTRIES.includes(d.ISO_A2);
                            const isVisited = VISITED_COUNTRIES.includes(d.ISO_A2);
                            const label = isOperated ? '⚔ OPERATED' : (isVisited ? '✓ VISITED' : '');
                            const color = isOperated ? '#ff6666' : (isVisited ? '#ffaa66' : '#fff');
                            const borderColor = isOperated ? '#ff4444' : (isVisited ? '#ff8833' : '#333');
                            return `
                                <div style="background: rgba(0,0,0,0.9); padding: 10px 14px; border-radius: 8px; border: 1px solid ${borderColor}; font-family: monospace;">
                                    <b style="color: ${color}; font-size: 14px;">${d.ADMIN}</b>
                                    ${label ? `<br/><span style="color: ${color}; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">${label}</span>` : ''}
                                </div>
                            `;
                        })
                        .onPolygonHover(hoverD => globe
                            .polygonAltitude(d => d === hoverD ? 0.12 : (ALL_COUNTRIES.includes(d.properties.ISO_A2) ? 0.06 : 0.01))
                            .polygonCapColor(d => d === hoverD
                                ? (ALL_COUNTRIES.includes(d.properties.ISO_A2) ? '#ff6666' : '#444')
                                : (OPERATED_COUNTRIES.includes(d.properties.ISO_A2) ? '#ff3333' : (VISITED_COUNTRIES.includes(d.properties.ISO_A2) ? '#ff8833' : 'rgba(20, 20, 20, 0.8)'))
                            )
                        )
                        .polygonsTransitionDuration(300);

                    globeRef.current = globe;

                    // Auto-rotate
                    globe.controls().autoRotate = true;
                    globe.controls().autoRotateSpeed = 0.5;
                    globe.controls().enableZoom = false;

                    // Set initial position to show US
                    globe.pointOfView({ lat: 30, lng: -95, altitude: 2.2 }, 0);

                    // Handle resize
                    const handleResize = () => {
                        if (containerRef.current && globeRef.current) {
                            globeRef.current.width(containerRef.current.clientWidth);
                            globeRef.current.height(containerRef.current.clientHeight);
                        }
                    };

                    const resizeObserver = new ResizeObserver(handleResize);
                    resizeObserver.observe(containerRef.current);
                    handleResize();
                })
                .catch(err => console.error('Failed to load globe data:', err));
        };

        document.head.appendChild(script);

        return () => {
            if (globeRef.current) {
                globeRef.current._destructor && globeRef.current._destructor();
            }
            script.remove();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-full"
            style={{ background: 'transparent' }}
        />
    );
};

export default GlobeExtruded;
