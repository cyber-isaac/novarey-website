import React, { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Military Operations & Career Timeline
export const DESTINATIONS = [
    { name: 'CAMP CASEY', city: 'South Korea', lat: 37.91, lon: 127.07, year: '2002', desc: 'First overseas assignment: Field Artillery Fire Direction Specialist. Established foundational discipline in high-tempo logistics near the DMZ.', mgrs: '52S DT 044 982', status: 'MISSION_COMPLETE' },
    { name: 'FORT SILL', city: 'Oklahoma, USA', lat: 34.65, lon: -98.40, year: '2004', desc: 'Advanced leadership development in Fire Support systems. Honed technical precision required for complex kinetic operations.', mgrs: '14S LG 462 381', status: 'STATIONED' },
    { name: 'FORT BRAGG', city: 'North Carolina, USA', lat: 35.13, lon: -79.00, year: '2005', desc: 'Selected for Special Forces Assessment & Selection (SFAS). The definitive transition into elite Special Operations.', mgrs: '17S PV 593 782', status: 'SELECTION' },
    { name: 'COTABATO CITY', city: 'Philippines', lat: 7.22, lon: 124.24, year: '2008', desc: 'JSOTF-Philippines. Leveraged Tagalog fluency for civil-military operations and high-stakes negotiation in conflict zones.', mgrs: '51N UK 605 982', status: 'OPERATED' },
    { name: 'SINGAPORE', city: 'Singapore', lat: 1.35, lon: 103.81, year: '2009', desc: 'Joint Combined Exchange Training (JCET). Partnered with Singaporean Commandos to refine urban warfare and counter-terrorism tactics.', mgrs: '48N PK 123 456', status: 'OPERATED' },
    { name: 'KANDAHAR', city: 'Afghanistan', lat: 31.62, lon: 65.71, year: '2010', desc: 'Operation Enduring Freedom. SF Communications Sergeant managing intelligence fusion and kinetic operations with Afghan partner forces.', mgrs: '41R PQ 672 018', status: 'OPERATED' },
    { name: 'KAMPONG SPEU', city: 'Cambodia', lat: 11.45, lon: 104.52, year: '2012', desc: 'Royal Cambodian Armed Forces training. Facilitated multi-national engagement and stability operations through cultural diplomacy.', mgrs: '48P VU 883 121', status: 'OPERATED' },
    { name: 'FORT BRAGG', city: 'North Carolina, USA', lat: 35.13, lon: -79.00, year: '2013', desc: 'SFQC Instructor. Trained 300+ U.S. and Allied officers in doctrine and operational planning. Managed $1M+ in sensitive property.', mgrs: '17S PV 593 782', status: 'INSTRUCTOR' },
    { name: 'LOPBURI', city: 'Thailand', lat: 14.80, lon: 100.62, year: '2017', desc: 'Cobra Gold & Balance Torch Exercises. Led multi-national force integration and strategic interoperability drills.', mgrs: '47P PS 462 381', status: 'OPERATED' },
    { name: 'KABUL', city: 'Afghanistan', lat: 34.55, lon: 69.20, year: '2021', desc: 'HKIA Evacuation (Aug 2021). Critical crisis response during the withdrawal. Facilitated non-combatant evacuation under extreme pressure.', mgrs: '42S WD 123 987', status: 'OPERATED' },
    { name: 'DOHA', city: 'Qatar', lat: 25.28, lon: 51.52, year: '2021', desc: 'Director, Counter-Terrorism Task Force. Integrated JSOC, CIA, DIA, and FBI efforts for Over-The-Horizon operations.', mgrs: '39R XH 318 842', status: 'OPERATED' },
    { name: 'TEXAS', city: 'USA', lat: 31.96, lon: -99.90, year: '2023', desc: 'Founded Novarey Ventures. Leading AI-enhanced design strategy & managing multi-million dollar renewable energy projects (Engie/Scout Clean Energy).', mgrs: '14R LP 123 456', status: 'FOUNDED' }
];

const MilitaryHistoryGlobe = () => {
    const containerRef = useRef(null);
    const globeRef = useRef(null);
    const [activeIndexState, setActiveIndexState] = useState(-1);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        container.innerHTML = '';

        // Safe helpers
        const safeApply = (instance, method, ...args) => {
            if (instance && typeof instance[method] === 'function') {
                instance[method](...args);
            }
        };

        let globeInstance;
        let animationFrameId;
        let cloudsRef = null;

        try {
            // --- Build Data Sets ---
            const arcsData = DESTINATIONS.slice(1).map((dest, i) => ({
                startLat: DESTINATIONS[i].lat,
                startLng: DESTINATIONS[i].lon,
                endLat: dest.lat,
                endLng: dest.lon,
                color: ['rgba(16, 185, 129, 0.3)', 'rgba(16, 185, 129, 0.7)']
            }));

            const pointsData = DESTINATIONS.map((d, i) => ({
                lat: d.lat,
                lng: d.lon,
                size: 0.6,
                color: 'rgba(16, 185, 129, 1)',
                idx: i
            }));

            const labelsData = DESTINATIONS.map((d, i) => ({
                lat: d.lat,
                lng: d.lon,
                text: d.name,
                color: 'rgba(255, 255, 255, 0.7)',
                size: 0.8,
                idx: i
            }));

            // Initialize globe instance
            globeInstance = Globe();
            globeRef.current = globeInstance;
            globeInstance._activeIdx = -1;

            // --- Configure Globe (Safely) ---
            safeApply(globeInstance, 'width', container.clientWidth);
            safeApply(globeInstance, 'height', container.clientHeight);
            safeApply(globeInstance, 'globeImageUrl', '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg');
            safeApply(globeInstance, 'bumpImageUrl', '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png');
            safeApply(globeInstance, 'backgroundColor', 'rgba(0,0,0,0)');

            safeApply(globeInstance, 'showAtmosphere', true);
            safeApply(globeInstance, 'atmosphereColor', 'rgba(16, 185, 129, 0.35)');
            safeApply(globeInstance, 'atmosphereAltitude', 0.12);

            // --- Arcs ---
            safeApply(globeInstance, 'arcsData', arcsData);
            safeApply(globeInstance, 'arcColor', 'color');
            safeApply(globeInstance, 'arcDashLength', 0.6);
            safeApply(globeInstance, 'arcDashGap', 0.3);
            safeApply(globeInstance, 'arcDashAnimateTime', 2000);
            safeApply(globeInstance, 'arcStroke', 0.5);
            safeApply(globeInstance, 'arcsTransitionDuration', 0);

            // --- Points ---
            safeApply(globeInstance, 'pointsData', pointsData);
            safeApply(globeInstance, 'pointLat', 'lat');
            safeApply(globeInstance, 'pointLng', 'lng');
            safeApply(globeInstance, 'pointColor', 'color');
            safeApply(globeInstance, 'pointAltitude', 0.01);
            safeApply(globeInstance, 'pointRadius', 'size');

            // --- Labels ---
            safeApply(globeInstance, 'labelsData', labelsData);
            safeApply(globeInstance, 'labelLat', 'lat');
            safeApply(globeInstance, 'labelLng', 'lng');
            safeApply(globeInstance, 'labelText', 'text');
            safeApply(globeInstance, 'labelSize', 'size');
            safeApply(globeInstance, 'labelColor', 'color');
            safeApply(globeInstance, 'labelDotRadius', 0.4);
            safeApply(globeInstance, 'labelAltitude', 0.02);
            safeApply(globeInstance, 'labelResolution', 3);

            // --- Graticules ---
            safeApply(globeInstance, 'showGraticules', true);
            safeApply(globeInstance, 'graticuleColor', () => 'rgba(16, 185, 129, 0.08)');

            // --- Rings ---
            safeApply(globeInstance, 'ringsData', []); // Start empty
            safeApply(globeInstance, 'ringColor', () => t => `rgba(16, 185, 129, ${0.6 * (1 - t)})`);
            safeApply(globeInstance, 'ringMaxRadius', 4);
            safeApply(globeInstance, 'ringPropagationSpeed', 3);
            safeApply(globeInstance, 'ringRepeatPeriod', 1200);

            // --- HTML Elements (Markers) ---
            if (typeof globeInstance.htmlElementsData === 'function') {
                globeInstance.htmlElementsData(DESTINATIONS.map((d, i) => ({ lat: d.lat, lng: d.lon, ...d, idx: i })));
                safeApply(globeInstance, 'htmlLat', 'lat');
                safeApply(globeInstance, 'htmlLng', d => d.lon);
                safeApply(globeInstance, 'htmlAltitude', 0.05);

                safeApply(globeInstance, 'htmlElement', d => {
                    const el = document.createElement('div');
                    el.className = 'globe-html-label';
                    el.style.opacity = '0'; // Start hidden
                    el.style.transition = 'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                    el.style.pointerEvents = 'none';
                    el.innerHTML = `
                            <div style="display:flex;flex-direction:column;align-items:center;transform:translateY(10px);">
                                <div style="
                                    background:rgba(5, 15, 10, 0.85);
                                    backdrop-filter:blur(20px);
                                    border:1px solid rgba(16, 185, 129, 0.3);
                                    padding:12px 18px;
                                    white-space:nowrap;
                                    box-shadow:0 0 20px rgba(16, 185, 129, 0.1);
                                    border-radius: 2px;
                                ">
                                    <span style="color:#fff;font-weight:900;font-size:16px;text-transform:uppercase;display:block;font-family:'Syne',sans-serif;">
                                        ${d.city}
                                    </span>
                                     <span style="font-size:10px;color:#10b981;font-family:'Space Mono',monospace;display:block;margin-top:4px;">${d.year}</span>
                                </div>
                                <div style="width:1px;height:30px;background:linear-gradient(to top, rgba(16, 185, 129, 0.5), transparent);"></div>
                            </div>
                        `;
                    el.dataset.labelIdx = d.idx;
                    return el;
                });

                safeApply(globeInstance, 'htmlElementVisibilityModifier', (el, isVisible) => {
                    const idx = parseInt(el.dataset.labelIdx);
                    const activeIdx = globeRef.current ? globeRef.current._activeIdx : -1;
                    const isActive = (idx === activeIdx);
                    el.style.opacity = isActive ? '1' : '0';
                    const inner = el.querySelector('div');
                    if (inner) inner.style.transform = isActive ? 'translateY(0)' : 'translateY(10px)';
                });
            }

            // Mount to container
            globeInstance(container);

            // --- Custom Material ---
            if (globeInstance.globeMaterial) {
                const mat = globeInstance.globeMaterial();
                if (mat) {
                    mat.color = new THREE.Color('#0a1510');
                    mat.emissive = new THREE.Color('#022212');
                    mat.emissiveIntensity = 0.2;
                    mat.transparent = true;
                    mat.opacity = 0.8;
                }
            }

            // --- Clouds ---
            const CLOUDS_ALT = 0.01;
            const CLOUDS_ROTATION_SPEED = -0.015;
            if (globeInstance.scene) {
                new THREE.TextureLoader().load(
                    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
                    (cloudsTexture) => {
                        if (!globeRef.current) return;
                        const clouds = new THREE.Mesh(
                            new THREE.SphereGeometry(globeInstance.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
                            new THREE.MeshPhongMaterial({
                                map: cloudsTexture,
                                transparent: true,
                                opacity: 0.4,
                                blending: THREE.AdditiveBlending
                            })
                        );
                        if (globeInstance.scene()) {
                            globeInstance.scene().add(clouds);
                            cloudsRef = clouds;
                        }
                    }
                );
            }

            // --- Camera & Controls ---
            const controls = globeInstance.controls();
            if (controls) {
                controls.autoRotate = true;
                controls.autoRotateSpeed = 0.5;
                controls.enableZoom = false;
                controls.enablePan = false;
            }
            safeApply(globeInstance, 'pointOfView', { lat: 20, lng: 0, altitude: 2.5 });

            // --- Helper Functions for Scroll Interaction ---
            const activateDestination = (i, loc) => {
                if (globeInstance._activeIdx === i) return;
                console.log(`Activating Destination: ${loc.city}`);
                globeInstance._activeIdx = i;
                setActiveIndexState(i);

                // Stop auto-rotation when focusing
                if (globeInstance.controls()) globeInstance.controls().autoRotate = false;

                // Move POV with smooth duration (1500ms)
                safeApply(globeInstance, 'pointOfView', {
                    lat: loc.lat,
                    lng: loc.lon,
                    altitude: 1.5
                }, 1500);

                safeApply(globeInstance, 'ringsData', [{ lat: loc.lat, lng: loc.lon }]);
            };

            const deactivate = () => {
                globeInstance._activeIdx = -1;
                setActiveIndexState(-1);

                // Resume auto-rotation
                if (globeInstance.controls()) globeInstance.controls().autoRotate = true;

                safeApply(globeInstance, 'ringsData', []);
                safeApply(globeInstance, 'pointOfView', { lat: 20, lng: 0, altitude: 2.5 }, 1500);
            };


            // --- ScrollTrigger Setup ---
            const ctx = gsap.context(() => {
                const initScrollTriggers = () => {
                    const sections = document.querySelectorAll('.military-dest-section');
                    if (sections.length === 0) {
                        requestAnimationFrame(initScrollTriggers);
                        return;
                    }

                    DESTINATIONS.forEach((dest, i) => {
                        const section = sections[i];
                        if (!section) return;

                        ScrollTrigger.create({
                            trigger: section,
                            start: 'top 60%',
                            end: 'bottom 40%',
                            onEnter: () => activateDestination(i, dest),
                            onEnterBack: () => activateDestination(i, dest),
                            onLeave: () => {
                                if (i === DESTINATIONS.length - 1) deactivate();
                            },
                            onLeaveBack: () => {
                                if (i === 0) deactivate();
                            }
                        });
                    });
                };
                initScrollTriggers();
            });

            // --- Animation Loop ---
            function animate() {
                // Rotate clouds
                if (cloudsRef) {
                    cloudsRef.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
                }
                // Force controls update
                if (globeInstance.controls()) {
                    globeInstance.controls().update();
                }
                animationFrameId = requestAnimationFrame(animate);
            }
            animate();

            // Add resizing
            const handleResize = () => {
                if (containerRef.current) {
                    safeApply(globeInstance, 'width', containerRef.current.clientWidth);
                    safeApply(globeInstance, 'height', containerRef.current.clientHeight);
                }
            };
            window.addEventListener('resize', handleResize);

            // Store cleanups
            return () => {
                if (animationFrameId) cancelAnimationFrame(animationFrameId);
                window.removeEventListener('resize', handleResize);
                ctx.revert(); // Cleanup GSAP
                container.innerHTML = '';

                // Dispose specific cloud layer
                if (cloudsRef) {
                    if (globeInstance.scene()) globeInstance.scene().remove(cloudsRef);
                    if (cloudsRef.geometry) cloudsRef.geometry.dispose();
                    if (cloudsRef.material) cloudsRef.material.dispose();
                }

                if (globeInstance._destructor) globeInstance._destructor();
                globeRef.current = null;
            };

        } catch (error) {
            console.error("Globe Initialization Failed:", error);
            container.innerHTML = `<div style="color: red; padding: 20px;">Globe Error: ${error.message}</div>`;
        }
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full min-h-[600px] relative cursor-crosshair overflow-hidden" />
    );
};

export default MilitaryHistoryGlobe;
