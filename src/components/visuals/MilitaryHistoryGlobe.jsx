import React, { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { DESTINATIONS } from '../../data/militaryDestinations';


// Globe theme — clean blue
const THEME = {
    matColor: '#091522',
    matEmissive: 0x9fd8ff,
    matEmissiveIntensity: 0.28,
    atmosphere: 'rgb(143, 211, 255)',
    atmosphereAlt: 0.16,
    atmosphereShell: 0x8fd3ff,
    arcColor: ['rgba(143, 211, 255, 0.20)', 'rgba(243, 249, 255, 0.88)'],
    activeArcColor: ['rgba(143, 211, 255, 0.62)', 'rgba(255, 255, 255, 1)'],
    pointColor: 'rgba(143, 211, 255, 0.92)',
    pointActive: 'rgba(255, 255, 255, 1)',
    pointMuted: 'rgba(143, 211, 255, 0.34)',
    ringColor: (t) => `rgba(143, 211, 255, ${0.72 * (1 - t)})`,
    graticule: 'rgba(185, 225, 255, 0.065)',
    sunColor: 0xf6fbff,
    sunIntensity: 2.55,
    rimColor: 0x8fd3ff,
    rimIntensity: 3.1,
    ambientColor: 0x07111f,
    ambientIntensity: 0.42,
    markerAccent: '#8fd3ff',
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
        const decorativeObjects = [];

        try {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const initThemeData = THEME;

            // --- Build Data Sets (uses theme colors) ---
            const arcsData = DESTINATIONS.slice(1).map((dest, i) => ({
                startLat: DESTINATIONS[i].lat,
                startLng: DESTINATIONS[i].lon,
                endLat: dest.lat,
                endLng: dest.lon,
                color: initThemeData.arcColor,
                active: false,
                order: i
            }));

            const pointsData = DESTINATIONS.map((d, i) => ({
                lat: d.lat,
                lng: d.lon,
                size: i === DESTINATIONS.length - 1 ? 0.78 : 0.58,
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
            safeApply(globeInstance, 'arcAltitudeAutoScale', 0.38);
            safeApply(globeInstance, 'arcCurveResolution', 96);
            safeApply(globeInstance, 'arcDashLength', 0.36);
            safeApply(globeInstance, 'arcDashGap', 1.15);
            safeApply(globeInstance, 'arcDashInitialGap', d => d.order * 0.22);
            safeApply(globeInstance, 'arcDashAnimateTime', prefersReducedMotion ? 12000 : 3400);
            safeApply(globeInstance, 'arcStroke', d => d.active ? 1.12 : 0.58);
            safeApply(globeInstance, 'arcsTransitionDuration', 1100);

            // --- Points ---
            safeApply(globeInstance, 'pointsData', pointsData);
            safeApply(globeInstance, 'pointLat', 'lat');
            safeApply(globeInstance, 'pointLng', 'lng');
            safeApply(globeInstance, 'pointColor', d => {
                const activeIdx = globeInstance._activeIdx;
                if (activeIdx < 0) return initThemeData.pointColor;
                return d.idx === activeIdx ? initThemeData.pointActive : initThemeData.pointMuted;
            });
            safeApply(globeInstance, 'pointAltitude', d => d.idx === globeInstance._activeIdx ? 0.026 : 0.012);
            safeApply(globeInstance, 'pointRadius', d => d.idx === globeInstance._activeIdx ? d.size * 1.65 : d.size);

            // --- Graticules ---
            safeApply(globeInstance, 'showGraticules', true);
            safeApply(globeInstance, 'graticuleColor', () => initThemeData.graticule);

            // --- Rings ---
            safeApply(globeInstance, 'ringsData', []);
            safeApply(globeInstance, 'ringColor', () => initThemeData.ringColor);
            safeApply(globeInstance, 'ringMaxRadius', d => d.scale === 'wide' ? 7.2 : 4.4);
            safeApply(globeInstance, 'ringPropagationSpeed', d => d.scale === 'wide' ? 2.2 : 3.4);
            safeApply(globeInstance, 'ringRepeatPeriod', d => d.scale === 'wide' ? 1800 : 1100);

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
                    el.style.transition = 'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), filter 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                    el.style.pointerEvents = 'none';
                    el.innerHTML = `
                            <div style="display:flex;flex-direction:column;align-items:center;transform:translateY(10px) scale(0.98);transition:transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);">
                                <div style="
                                    position:relative;
                                    overflow:hidden;
                                    background:linear-gradient(135deg, rgba(8, 16, 28, 0.56), rgba(255, 255, 255, 0.07));
                                    backdrop-filter:blur(18px) saturate(150%);
                                    border:1px solid rgba(255, 255, 255, 0.16);
                                    padding:14px 18px 13px;
                                    white-space:nowrap;
                                    box-shadow:0 18px 48px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 0 24px rgba(143, 211, 255, 0.18);
                                    border-radius: 14px;
                                ">
                                    <span style="position:absolute;inset:0;background:linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.16) 45%, transparent 58%);transform:translateX(-72%);"></span>
                                    <span style="color:#fff;font-weight:760;font-size:18px;text-transform:uppercase;display:block;font-family:'Inter Tight',sans-serif;letter-spacing:0.04em;line-height:1;">
                                        ${d.city}
                                    </span>
                                     <span style="font-size:10px;color:#9fd8ff;font-family:'JetBrains Mono',monospace;display:block;margin-top:8px;letter-spacing:0.22em;text-transform:uppercase;">${d.year} / ${d.status.replace('_', ' ')}</span>
                                </div>
                                <div style="width:1px;height:34px;background:linear-gradient(to top, rgba(143, 211, 255, 0.72), transparent);box-shadow:0 0 14px rgba(143, 211, 255, 0.5);"></div>
                                <div style="width:7px;height:7px;border-radius:999px;background:#dff4ff;box-shadow:0 0 20px rgba(143, 211, 255, 0.9);"></div>
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
                    el.style.filter = isActive ? 'blur(0)' : 'blur(2px)';
                    const inner = el.querySelector('div');
                    if (inner) inner.style.transform = isActive ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.98)';
                });
            }

            // Mount to container
            globeInstance(container);

            const renderer = globeInstance.renderer && globeInstance.renderer();
            if (renderer) {
                renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
                renderer.outputColorSpace = THREE.SRGBColorSpace;
                renderer.toneMapping = THREE.ACESFilmicToneMapping;
                renderer.toneMappingExposure = 1.08;
                renderer.setClearColor(0x000000, 0);
            }

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

            if (globeInstance.scene && globeInstance.scene()) {
                const sceneObj = globeInstance.scene();
                const radius = globeInstance.getGlobeRadius();

                const atmosphereShell = new THREE.Mesh(
                    new THREE.SphereGeometry(radius * 1.045, 96, 96),
                    new THREE.MeshBasicMaterial({
                        color: new THREE.Color(THEME.atmosphereShell),
                        transparent: true,
                        opacity: 0.12,
                        blending: THREE.AdditiveBlending,
                        side: THREE.BackSide,
                        depthWrite: false
                    })
                );
                atmosphereShell.userData.pulse = true;
                sceneObj.add(atmosphereShell);
                decorativeObjects.push(atmosphereShell);

                const starCount = prefersReducedMotion ? 80 : 180;
                const starPositions = new Float32Array(starCount * 3);
                for (let i = 0; i < starCount; i++) {
                    const theta = Math.random() * Math.PI * 2;
                    const phi = Math.acos((Math.random() * 2) - 1);
                    const distance = radius * (2.5 + Math.random() * 2.1);
                    starPositions[i * 3] = distance * Math.sin(phi) * Math.cos(theta);
                    starPositions[i * 3 + 1] = distance * Math.cos(phi);
                    starPositions[i * 3 + 2] = distance * Math.sin(phi) * Math.sin(theta);
                }

                const starGeometry = new THREE.BufferGeometry();
                starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
                const starField = new THREE.Points(
                    starGeometry,
                    new THREE.PointsMaterial({
                        color: 0xcfefff,
                        size: 0.7,
                        transparent: true,
                        opacity: 0.42,
                        blending: THREE.AdditiveBlending,
                        depthWrite: false
                    })
                );
                starField.userData.drift = true;
                sceneObj.add(starField);
                decorativeObjects.push(starField);
            }

            // --- Clouds (high quality) ---
            const CLOUDS_ALT = 0.008;
            const CLOUDS_ROTATION_SPEED = prefersReducedMotion ? 0 : -0.01;
            if (globeInstance.scene) {
                const cloudTexLoader = new THREE.TextureLoader();
                cloudTexLoader.load(
                    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
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
                        // Fallback to a CDN mirror if the GitHub texture request is unavailable.
                        cloudTexLoader.load(
                            'https://threejs.org/examples/textures/planets/earth_clouds_1024.png',
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
                    color: i === idx - 1 ? theme.activeArcColor : theme.arcColor,
                    active: i === idx - 1,
                    order: i
                }));
            };

            // --- Helper Functions for Scroll Interaction ---
            const activateDestination = (i, loc) => {
                if (globeInstance._activeIdx === i) return;
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
                safeApply(globeInstance, 'pointsData', [...pointsData]);
                safeApply(globeInstance, 'ringsData', [
                    { lat: loc.lat, lng: loc.lon, scale: 'tight' },
                    { lat: loc.lat, lng: loc.lon, scale: 'wide' }
                ]);
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
                safeApply(globeInstance, 'pointsData', [...pointsData]);
                safeApply(globeInstance, 'pointOfView', { lat: 20, lng: 0, altitude: 2.5 }, 1500);
            };


            // --- ScrollTrigger Setup ---
            const ctx = gsap.context(() => {
                let retryCount = 0;
                const MAX_RETRIES = 120; // ~2 seconds at 60fps
                const initScrollTriggers = () => {
                    if (!containerRef.current) return;
                    // Fix: Use .closest() to ensure we get the active page's scroll container, 
                    // not a stale one from a page currently animating out
                    const scrollContainer = containerRef.current.closest('[data-scroll-container]');
                    const sections = scrollContainer ? scrollContainer.querySelectorAll('.military-dest-section') : [];

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

                    // Refresh ScrollTrigger slightly after initialization to ensure page transition animations
                    // haven't messed up the layout geometry.
                    setTimeout(() => {
                        ScrollTrigger.refresh();
                    }, 500);
                };
                initScrollTriggers();
            });

            // --- Animation Loop ---
            function animate() {
                const elapsed = performance.now() * 0.001;
                // Rotate clouds
                if (cloudsRef) {
                    cloudsRef.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
                }
                decorativeObjects.forEach((obj) => {
                    if (obj.userData.pulse && obj.material) {
                        obj.material.opacity = 0.105 + Math.sin(elapsed * 0.72) * 0.026;
                    }
                    if (obj.userData.drift && !prefersReducedMotion) {
                        obj.rotation.y += 0.00022;
                        obj.rotation.x += 0.00005;
                    }
                });
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

                decorativeObjects.forEach((obj) => {
                    if (globeInstance.scene()) globeInstance.scene().remove(obj);
                    if (obj.geometry) obj.geometry.dispose();
                    if (obj.material) obj.material.dispose();
                });

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
