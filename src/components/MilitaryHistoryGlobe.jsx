import React, { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Military Operations & Career Timeline
export const DESTINATIONS = [
    { name: 'FORT SILL', city: 'Oklahoma, USA', lat: 34.65, lon: -98.40, year: '2004', desc: 'Advanced leadership development in Fire Support systems. Honed technical precision required for complex kinetic operations.', mgrs: '14S LG 462 381', status: 'STATIONED' },
    { name: 'CAMP CASEY', city: 'South Korea', lat: 37.91, lon: 127.07, year: '2004', desc: 'Field Artillery Fire Direction Specialist. Established foundational discipline in high-tempo logistics near the DMZ.', mgrs: '52S DT 044 982', status: 'DEPLOYED' },
    { name: 'FORT BRAGG', city: 'North Carolina, USA', lat: 35.13, lon: -79.00, year: '2005', desc: 'Attended the Special Forces Qualification Course (SFQC). The definitive transition into elite Special Operations.', mgrs: '17S PV 593 782', status: 'SELECTION' },
    { name: 'JBLM', city: 'Washington, USA', lat: 47.09, lon: -122.58, year: '2006', desc: '1st Special Forces Group (Airborne). Assigned to the Pacific-oriented SF unit focused on Indo-Pacific theater operations and partner force engagement.', mgrs: '10T ET 549 173', status: 'STATIONED' },
    { name: 'COTABATO CITY', city: 'Philippines', lat: 7.22, lon: 124.24, year: '2008 / 2012', desc: 'JSOTF-Philippines. Two deployments leveraging Tagalog fluency for civil-military operations, counterinsurgency advisory missions, and high-stakes negotiation in Mindanao.', mgrs: '51N UK 605 982', status: 'OPERATED' },
    { name: 'SINGAPORE', city: 'Singapore', lat: 1.35, lon: 103.81, year: '2009', desc: 'Joint Combined Exchange Training (JCET). Partnered with Singaporean Commandos to refine urban warfare and counter-terrorism tactics.', mgrs: '48N PK 123 456', status: 'OPERATED' },
    { name: 'KANDAHAR', city: 'Afghanistan', lat: 31.62, lon: 65.71, year: '2010 / 2018', desc: 'Two combat deployments. OEF: SF Communications Sergeant managing intelligence fusion. OFS: Advisory and assist operations supporting Afghan NDSF.', mgrs: '41R PQ 672 018', status: 'OPERATED' },
    { name: 'PHNOM PENH', city: 'Cambodia', lat: 11.56, lon: 104.92, year: '2011', desc: 'Royal Cambodian Armed Forces training. Facilitated multi-national engagement and stability operations through cultural diplomacy.', mgrs: '48P VU 927 133', status: 'OPERATED' },
    { name: 'FORT BRAGG', city: 'North Carolina, USA', lat: 35.13, lon: -79.00, year: '2013', desc: 'SFQC Instructor. Trained 300+ U.S. and Allied officers in doctrine and operational planning. Managed $1M+ in sensitive property.', mgrs: '17S PV 593 782', status: 'INSTRUCTOR' },
    { name: 'LOPBURI', city: 'Thailand', lat: 14.80, lon: 100.62, year: '2017 / 2019', desc: 'Two deployments for Cobra Gold & Balance Torch exercises. Led multi-national force integration and strategic interoperability drills with Royal Thai Armed Forces.', mgrs: '47P PS 462 381', status: 'OPERATED' },
    { name: 'CAMP HUMPHREYS', city: 'South Korea', lat: 36.96, lon: 127.03, year: '2019', desc: 'Second tour in South Korea. Supported rotational force operations and regional security cooperation across the Korean Peninsula.', mgrs: '52S DT 008 876', status: 'DEPLOYED' },
    { name: 'KABUL', city: 'Afghanistan', lat: 34.55, lon: 69.20, year: '2021', desc: 'HKIA Evacuation (Aug 2021). Critical crisis response during the withdrawal. Facilitated non-combatant evacuation under extreme pressure.', mgrs: '42S WD 123 987', status: 'OPERATED' },
    { name: 'SPARTAN BASE', city: 'Qatar', lat: 25.12, lon: 51.31, year: '2021', desc: 'Director, Counter-Terrorism Task Force at Spartan Base. Integrated JSOC, CIA, DIA, and FBI efforts for Over-The-Horizon operations.', mgrs: '39R XH 284 661', status: 'OPERATED' },
    { name: 'TEXAS', city: 'USA', lat: 31.96, lon: -99.90, year: '2023', desc: 'Founded Novarey Ventures. Leading AI-enhanced design strategy & managing multi-million dollar renewable energy projects (Engie/Scout Clean Energy).', mgrs: '14R LP 123 456', status: 'FOUNDED' }
];

// Globe theme — clean blue
const THEME = {
    matColor: '#152030',
    matEmissive: 0xddeeff,
    matEmissiveIntensity: 0.35,
    atmosphere: 'rgba(100, 180, 255, 0.25)',
    atmosphereAlt: 0.12,
    arcColor: ['rgba(96, 165, 250, 0.3)', 'rgba(96, 165, 250, 0.7)'],
    pointColor: 'rgba(96, 165, 250, 1)',
    ringColor: (t) => `rgba(96, 165, 250, ${0.6 * (1 - t)})`,
    graticule: 'rgba(100, 180, 255, 0.05)',
    sunColor: 0xfff8f0,
    sunIntensity: 2.2,
    rimColor: 0x88bbff,
    rimIntensity: 2.5,
    ambientColor: 0x0a0a1a,
    ambientIntensity: 0.35,
    markerBorder: 'rgba(96, 165, 250, 0.3)',
    markerShadow: 'rgba(96, 165, 250, 0.1)',
    markerAccent: '#60a5fa',
    markerLine: 'rgba(96, 165, 250, 0.5)',
};

const MilitaryHistoryGlobe = () => {
    const containerRef = useRef(null);
    const globeRef = useRef(null);
    const lightsRef = useRef({ sun: null, rim: null, ambient: null });
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
            const initThemeData = THEME;

            // --- Build Data Sets (uses theme colors) ---
            const arcsData = DESTINATIONS.slice(1).map((dest, i) => ({
                startLat: DESTINATIONS[i].lat,
                startLng: DESTINATIONS[i].lon,
                endLat: dest.lat,
                endLng: dest.lon,
                color: initThemeData.arcColor,
                order: i
            }));

            const pointsData = DESTINATIONS.map((d, i) => ({
                lat: d.lat,
                lng: d.lon,
                size: 0.6,
                color: initThemeData.pointColor,
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
            safeApply(globeInstance, 'globeImageUrl', '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg');
            safeApply(globeInstance, 'bumpImageUrl', '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png');
            safeApply(globeInstance, 'backgroundColor', 'rgba(0,0,0,0)');

            safeApply(globeInstance, 'showAtmosphere', true);
            safeApply(globeInstance, 'atmosphereColor', initThemeData.atmosphere);
            safeApply(globeInstance, 'atmosphereAltitude', initThemeData.atmosphereAlt);

            // --- Arcs (start empty, reveal progressively on scroll) ---
            safeApply(globeInstance, 'arcsData', []);
            safeApply(globeInstance, 'arcColor', 'color');
            safeApply(globeInstance, 'arcDashLength', 1.0);
            safeApply(globeInstance, 'arcDashGap', 0.4);
            safeApply(globeInstance, 'arcDashAnimateTime', 4000);
            safeApply(globeInstance, 'arcStroke', 0.6);
            safeApply(globeInstance, 'arcsTransitionDuration', 800);

            // --- Points ---
            safeApply(globeInstance, 'pointsData', pointsData);
            safeApply(globeInstance, 'pointLat', 'lat');
            safeApply(globeInstance, 'pointLng', 'lng');
            safeApply(globeInstance, 'pointColor', 'color');
            safeApply(globeInstance, 'pointAltitude', 0.01);
            safeApply(globeInstance, 'pointRadius', 'size');

            // --- Graticules ---
            safeApply(globeInstance, 'showGraticules', true);
            safeApply(globeInstance, 'graticuleColor', () => initThemeData.graticule);

            // --- Rings ---
            safeApply(globeInstance, 'ringsData', []);
            safeApply(globeInstance, 'ringColor', () => initThemeData.ringColor);
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
                                    background:rgba(5, 10, 20, 0.12);
                                    backdrop-filter:blur(8px);
                                    border:1px solid rgba(255, 255, 255, 0.08);
                                    padding:16px 24px;
                                    white-space:nowrap;
                                    box-shadow:0 0 30px rgba(0, 0, 0, 0.1);
                                    border-radius: 4px;
                                ">
                                    <span style="color:#fff;font-weight:900;font-size:22px;text-transform:uppercase;display:block;font-family:'Syne',sans-serif;letter-spacing:0.02em;">
                                        ${d.city}
                                    </span>
                                     <span style="font-size:14px;color:#60a5fa;font-family:'Space Mono',monospace;display:block;margin-top:6px;">${d.year}</span>
                                </div>
                                <div style="width:1px;height:30px;background:linear-gradient(to top, rgba(96, 165, 250, 0.5), transparent);"></div>
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

            // --- Custom Material (Sun-lit colorful globe, high quality) ---
            const initTheme = THEME;
            const loadedTextures = []; // Track for disposal
            if (globeInstance.globeMaterial) {
                const mat = globeInstance.globeMaterial();
                if (mat) {
                    const texLoader = new THREE.TextureLoader();
                    const applyAniso = (tex) => { tex.anisotropy = 4; loadedTextures.push(tex); return tex; };
                    const specTexture = applyAniso(texLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg'));
                    const lightsTexture = applyAniso(texLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png'));
                    const normalTexture = applyAniso(texLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg'));

                    mat.specularMap = specTexture;
                    mat.specular = new THREE.Color(0x666666);
                    mat.shininess = 15;
                    mat.normalMap = normalTexture;
                    mat.normalScale = new THREE.Vector2(0.8, 0.8);
                    mat.emissiveMap = lightsTexture;
                    mat.emissive = new THREE.Color(initTheme.matEmissive);
                    mat.emissiveIntensity = initTheme.matEmissiveIntensity;
                    mat.color = new THREE.Color(initTheme.matColor);
                    mat.transparent = false;
                    mat.opacity = 1.0;
                    mat.needsUpdate = true;
                }
            }

            // --- Sun & Rim Lighting (remove defaults first for strong sun effect) ---
            if (globeInstance.scene && globeInstance.scene()) {
                const sceneObj = globeInstance.scene();

                // Remove globe.gl default lights so our sun dominates
                const lightsToRemove = [];
                sceneObj.traverse((child) => {
                    if (child.isLight) lightsToRemove.push(child);
                });
                lightsToRemove.forEach((l) => sceneObj.remove(l));

                // Strong sun directional light — creates the day/night terminator
                const sunLight = new THREE.DirectionalLight(initTheme.sunColor, initTheme.sunIntensity);
                sunLight.position.set(10, 5, 10);
                sceneObj.add(sunLight);

                // Amber/red rim light for warm edge glow
                const rimLight = new THREE.PointLight(initTheme.rimColor, initTheme.rimIntensity, 50);
                rimLight.position.set(-8, 6, -8);
                sceneObj.add(rimLight);

                // Very subtle ambient so the dark side isn't pure black
                const ambientLight = new THREE.AmbientLight(initTheme.ambientColor, initTheme.ambientIntensity);
                sceneObj.add(ambientLight);

                lightsRef.current = { sun: sunLight, rim: rimLight, ambient: ambientLight };
            }

            // --- Clouds (high quality) ---
            const CLOUDS_ALT = 0.008;
            const CLOUDS_ROTATION_SPEED = -0.012;
            if (globeInstance.scene) {
                const cloudTexLoader = new THREE.TextureLoader();
                cloudTexLoader.load(
                    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_2048.png',
                    (cloudsTexture) => {
                        if (!globeRef.current) return;
                        cloudsTexture.anisotropy = 16;
                        const clouds = new THREE.Mesh(
                            new THREE.SphereGeometry(globeInstance.getGlobeRadius() * (1 + CLOUDS_ALT), 128, 128),
                            new THREE.MeshPhongMaterial({
                                map: cloudsTexture,
                                transparent: true,
                                opacity: 0.45,
                                blending: THREE.AdditiveBlending,
                                depthWrite: false
                            })
                        );
                        if (globeInstance.scene()) {
                            globeInstance.scene().add(clouds);
                            cloudsRef = clouds;
                        }
                    },
                    undefined,
                    () => {
                        // Fallback to 1024 if 2048 not available
                        cloudTexLoader.load(
                            'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
                            (cloudsTexture) => {
                                if (!globeRef.current) return;
                                const clouds = new THREE.Mesh(
                                    new THREE.SphereGeometry(globeInstance.getGlobeRadius() * (1 + CLOUDS_ALT), 128, 128),
                                    new THREE.MeshPhongMaterial({
                                        map: cloudsTexture,
                                        transparent: true,
                                        opacity: 0.45,
                                        blending: THREE.AdditiveBlending,
                                        depthWrite: false
                                    })
                                );
                                if (globeInstance.scene()) {
                                    globeInstance.scene().add(clouds);
                                    cloudsRef = clouds;
                                }
                            }
                        );
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

            // --- Helper: build arcs up to a given index using current theme ---
            const getArcsUpTo = (idx) => {
                const theme = THEME;
                if (idx < 0) return [];
                return DESTINATIONS.slice(1, idx + 1).map((dest, i) => ({
                    startLat: DESTINATIONS[i].lat,
                    startLng: DESTINATIONS[i].lon,
                    endLat: dest.lat,
                    endLng: dest.lon,
                    color: theme.arcColor,
                    order: i
                }));
            };

            // --- Helper Functions for Scroll Interaction ---
            const activateDestination = (i, loc) => {
                if (globeInstance._activeIdx === i) return;
                console.log(`Activating Destination: ${loc.city}`);
                globeInstance._activeIdx = i;
                setActiveIndexState(i);

                // Gently ease auto-rotation down when focusing
                if (globeInstance.controls()) {
                    const ctrl = globeInstance.controls();
                    ctrl.autoRotate = true;
                    gsap.to(ctrl, { autoRotateSpeed: 0.06, duration: 1.2, ease: 'power2.out' });
                }

                // Cinematic POV transition (1800ms)
                safeApply(globeInstance, 'pointOfView', {
                    lat: loc.lat,
                    lng: loc.lon,
                    altitude: 1.8
                }, 1800);

                // Progressive arcs: reveal path up to current destination
                safeApply(globeInstance, 'arcsData', getArcsUpTo(i));

                safeApply(globeInstance, 'ringsData', [{ lat: loc.lat, lng: loc.lon }]);
            };

            const deactivate = () => {
                globeInstance._activeIdx = -1;
                setActiveIndexState(-1);

                // Gently ease auto-rotation back up
                if (globeInstance.controls()) {
                    const ctrl = globeInstance.controls();
                    ctrl.autoRotate = true;
                    gsap.to(ctrl, { autoRotateSpeed: 0.5, duration: 1.5, ease: 'power2.inOut' });
                }

                safeApply(globeInstance, 'arcsData', []);
                safeApply(globeInstance, 'ringsData', []);
                safeApply(globeInstance, 'pointOfView', { lat: 20, lng: 0, altitude: 2.5 }, 1500);
            };


            // --- ScrollTrigger Setup ---
            const ctx = gsap.context(() => {
                let retryCount = 0;
                const MAX_RETRIES = 120; // ~2 seconds at 60fps
                const initScrollTriggers = () => {
                    const scrollContainer = document.querySelector('[data-scroll-container]');
                    const sections = document.querySelectorAll('.military-dest-section');
                    if (sections.length === 0 || !scrollContainer) {
                        retryCount++;
                        if (retryCount < MAX_RETRIES) {
                            requestAnimationFrame(initScrollTriggers);
                        } else {
                            console.warn('MilitaryHistoryGlobe: Could not find scroll sections or container after max retries.');
                        }
                        return;
                    }

                    DESTINATIONS.forEach((dest, i) => {
                        const section = sections[i];
                        if (!section) return;

                        ScrollTrigger.create({
                            trigger: section,
                            scroller: scrollContainer,
                            start: 'top 60%',
                            end: 'bottom 20%',
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

                // Dispose loaded textures (~16MB GPU each)
                loadedTextures.forEach(tex => tex.dispose());

                // Dispose specific cloud layer
                if (cloudsRef) {
                    if (globeInstance.scene()) globeInstance.scene().remove(cloudsRef);
                    if (cloudsRef.geometry) cloudsRef.geometry.dispose();
                    if (cloudsRef.material) {
                        if (cloudsRef.material.map) cloudsRef.material.map.dispose();
                        cloudsRef.material.dispose();
                    }
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
        <div className="w-full h-full min-h-[600px] relative cursor-crosshair overflow-hidden">
            <div ref={containerRef} className="w-full h-full" />
        </div>
    );
};

export default MilitaryHistoryGlobe;
