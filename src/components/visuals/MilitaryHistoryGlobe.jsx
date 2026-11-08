import React, { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import '../../styles/about-globe.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { DESTINATIONS } from '../../data/militaryDestinations';


// Globe theme — clean blue
const THEME = {
    matColor: '#091522',
    matEmissive: 0x9fd8ff,
    matEmissiveIntensity: 0.28,
    atmosphere: 'rgb(143, 211, 255)',
    atmosphereAlt: 0.1,
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
    const [motionPaused, setMotionPaused] = useState(false);
    const [globeError, setGlobeError] = useState(false);
    const pausedRef = useRef(false);
    const actionsRef = useRef({});

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
        const scrollTriggers = [];
        let disposed = false;
        let refreshTimer;
        let retryFrame;
        let visibilityObserver;
        let resizeObserver;
        let sceneVisible = true;

        try {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const initThemeData = THEME;
            pausedRef.current = prefersReducedMotion;
            setMotionPaused(prefersReducedMotion);

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

            // Fit the globe to narrow/tall viewports without cutting off its horizon.
            const cameraAltitude = (focused = false) => Math.max(focused ? 2.2 : 2.5,
                container.clientHeight / Math.max(container.clientWidth, 1) * 2.4);

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
            safeApply(globeInstance, 'arcDashAnimateTime', prefersReducedMotion ? 0 : 3400);
            safeApply(globeInstance, 'arcStroke', d => d.active ? 1.12 : 0.58);
            safeApply(globeInstance, 'arcsTransitionDuration', prefersReducedMotion ? 0 : 900);

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
            safeApply(globeInstance, 'ringsData', pausedRef.current ? [] : []);
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
                    el.setAttribute('aria-hidden', 'true');
                    const marker = document.createElement('div');
                    marker.className = 'globe-marker';
                    const panel = document.createElement('div');
                    panel.className = 'globe-marker-panel';
                    const title = document.createElement('strong');
                    title.textContent = d.city;
                    const detail = document.createElement('span');
                    detail.textContent = `${d.year} / ${d.status.replaceAll('_', ' ').toLowerCase()}`;
                    panel.append(title, detail);
                    const stem = document.createElement('span');
                    stem.className = 'globe-marker-stem';
                    marker.append(panel, stem);
                    el.append(marker);
                    el.dataset.labelIdx = d.idx;
                    return el;
                });

                safeApply(globeInstance, 'htmlElementVisibilityModifier', (el, isVisible) => {
                    const idx = parseInt(el.dataset.labelIdx);
                    const activeIdx = globeRef.current ? globeRef.current._activeIdx : -1;
                    const isActive = (idx === activeIdx);
                    el.style.opacity = isActive && isVisible ? '1' : '0';
                    el.style.filter = isActive ? 'blur(0)' : 'blur(2px)';
                    const inner = el.querySelector('div');
                    if (inner) inner.style.transform = isActive ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.98)';
                });
            }

            // Mount to container
            globeInstance(container);

            const renderer = globeInstance.renderer && globeInstance.renderer();
            if (renderer) {
                renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
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
                        opacity: 0.055,
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
                        if (disposed) { cloudsTexture.dispose(); return; }
                        cloudsTexture.anisotropy = 4;
                        const clouds = new THREE.Mesh(
                            new THREE.SphereGeometry(globeInstance.getGlobeRadius() * (1 + CLOUDS_ALT), 64, 48),
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
                                if (disposed) { cloudsTexture.dispose(); return; }
                                const clouds = new THREE.Mesh(
                                    new THREE.SphereGeometry(globeInstance.getGlobeRadius() * (1 + CLOUDS_ALT), 64, 48),
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
                controls.autoRotate = !pausedRef.current;
                controls.autoRotateSpeed = 0.5;
                controls.enableZoom = false;
                controls.enablePan = false;
                controls.enableRotate = container.clientWidth >= 600;
            }
            safeApply(globeInstance, 'pointOfView', { lat: 20, lng: 0, altitude: cameraAltitude() });

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
                    ctrl.autoRotate = !pausedRef.current;
                    gsap.to(ctrl, { autoRotateSpeed: 0.06, duration: prefersReducedMotion ? 0 : 1.2, ease: 'power2.out' });
                }

                // Cinematic POV transition (1800ms)
                safeApply(globeInstance, 'pointOfView', {
                    lat: loc.lat,
                    lng: loc.lon,
                    altitude: cameraAltitude(true)
                }, prefersReducedMotion ? 0 : 1400);

                // Progressive arcs: reveal path up to current destination
                safeApply(globeInstance, 'arcsData', getArcsUpTo(i));
                safeApply(globeInstance, 'pointsData', [...pointsData]);
                safeApply(globeInstance, 'ringsData', pausedRef.current ? [] : [
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
                    ctrl.autoRotate = !pausedRef.current;
                    gsap.to(ctrl, { autoRotateSpeed: 0.5, duration: 1.5, ease: 'power2.inOut' });
                }

                safeApply(globeInstance, 'arcsData', []);
                safeApply(globeInstance, 'ringsData', pausedRef.current ? [] : []);
                safeApply(globeInstance, 'pointsData', [...pointsData]);
                safeApply(globeInstance, 'pointOfView', { lat: 20, lng: 0, altitude: cameraAltitude() }, prefersReducedMotion ? 0 : 1200);
            };


            actionsRef.current = {
                visit(index) {
                    const next = Math.max(0, Math.min(DESTINATIONS.length - 1, index));
                    activateDestination(next, DESTINATIONS[next]);
                    const section = container.closest('[data-scroll-container]')?.querySelectorAll('.military-dest-section')[next];
                    section?.scrollIntoView({ behavior: 'instant', block: container.clientWidth < 600 ? 'end' : 'center' });
                    ScrollTrigger.update();
                    activateDestination(next, DESTINATIONS[next]);
                },
                pause(paused) {
                    pausedRef.current = paused;
                    setMotionPaused(paused);
                    controls.autoRotate = !paused;
                    safeApply(globeInstance, 'arcDashAnimateTime', paused ? 0 : 3400);
                    const active = globeInstance._activeIdx;
                    safeApply(globeInstance, 'ringsData', paused || active < 0 ? [] : [{ lat: DESTINATIONS[active].lat, lng: DESTINATIONS[active].lon, scale: 'tight' }]);
                }
            };
            safeApply(globeInstance, 'onPointClick', point => actionsRef.current.visit?.(point.idx));

            // --- ScrollTrigger Setup ---
            const ctx = gsap.context(() => {
                let retryCount = 0;
                const MAX_RETRIES = 120; // ~2 seconds at 60fps
                const initScrollTriggers = () => {
                    if (disposed || !containerRef.current) return;
                    // Fix: Use .closest() to ensure we get the active page's scroll container, 
                    // not a stale one from a page currently animating out
                    const scrollContainer = containerRef.current.closest('[data-scroll-container]');
                    const sections = scrollContainer ? scrollContainer.querySelectorAll('.military-dest-section') : [];

                    if (sections.length === 0 || !scrollContainer) {
                        retryCount++;
                        if (retryCount < MAX_RETRIES) {
                            retryFrame = requestAnimationFrame(initScrollTriggers);
                        } else {
                            console.warn('MilitaryHistoryGlobe: Could not find scroll sections or container after max retries.');
                        }
                        return;
                    }

                    DESTINATIONS.forEach((dest, i) => {
                        const section = sections[i];
                        if (!section) return;

                        scrollTriggers.push(ScrollTrigger.create({
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
                        }));
                    });

                    // Refresh ScrollTrigger slightly after initialization to ensure page transition animations
                    // haven't messed up the layout geometry.
                    refreshTimer = setTimeout(() => {
                        ScrollTrigger.refresh();
                    }, 500);
                };
                initScrollTriggers();
            });

            // --- Animation Loop ---
            function animate() {
                if (disposed || !sceneVisible) return;
                const elapsed = performance.now() * 0.001;
                // Rotate clouds
                if (cloudsRef && !pausedRef.current) {
                    cloudsRef.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
                }
                decorativeObjects.forEach((obj) => {
                    if (obj.userData.pulse && obj.material && !pausedRef.current) {
                        obj.material.opacity = 0.055 + Math.sin(elapsed * 0.72) * 0.008;
                    }
                    if (obj.userData.drift && !pausedRef.current) {
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
                    controls.enableRotate = container.clientWidth >= 600;
                    globeInstance.pointOfView({ ...globeInstance.pointOfView(), altitude: cameraAltitude(globeInstance._activeIdx >= 0) }, 0);
                }
            };
            resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(container);
            visibilityObserver = new IntersectionObserver(([entry]) => {
                sceneVisible = entry.isIntersecting;
                if (animationFrameId) cancelAnimationFrame(animationFrameId);
                if (sceneVisible) { globeInstance.resumeAnimation(); animate(); }
                else globeInstance.pauseAnimation();
            });
            visibilityObserver.observe(container.closest('.about-globe-story') || container);

            // Store cleanups
            return () => {
                if (animationFrameId) cancelAnimationFrame(animationFrameId);
                disposed = true;
                clearTimeout(refreshTimer);
                if (retryFrame) cancelAnimationFrame(retryFrame);
                visibilityObserver?.disconnect();
                resizeObserver?.disconnect();
                gsap.killTweensOf(controls);
                actionsRef.current = {};
                scrollTriggers.forEach(trigger => trigger.kill());
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
            setGlobeError(true);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            globeInstance?._destructor?.();
            globeRef.current = null;
        }
    }, []);

    const current = DESTINATIONS[activeIndexState];
    return (
        <div className="globe-experience" data-active-location={current?.name || 'overview'}>
            <div className="globe-orbital-halo" aria-hidden="true" />
            <div ref={containerRef} className="globe-viewport" role="img" aria-label="Interactive Earth showing the locations in Isaac's career. Scroll the stories or use the location controls." />
            <div className="globe-toolbar" aria-label="Globe controls">
                <div className="globe-route-summary">
                    <span>{current ? `${activeIndexState + 1} / ${DESTINATIONS.length}` : 'Explore the route'}</span>
                    <strong>{current?.city || 'A world of experience'}</strong>
                </div>
                <div className="globe-toolbar-actions">
                    <button type="button" aria-label="Previous location" disabled={activeIndexState <= 0 || globeError} onClick={() => actionsRef.current.visit?.(activeIndexState - 1)}><ChevronLeft size={18} /></button>
                    <button type="button" aria-label="Next location" disabled={activeIndexState === DESTINATIONS.length - 1 || globeError} onClick={() => actionsRef.current.visit?.(activeIndexState + 1)}><ChevronRight size={18} /></button>
                    <button type="button" aria-label={motionPaused ? 'Resume globe motion' : 'Pause globe motion'} aria-pressed={motionPaused} disabled={globeError} onClick={() => actionsRef.current.pause?.(!motionPaused)}>{motionPaused ? <Play size={16} /> : <Pause size={16} />}</button>
                </div>
            </div>
            {globeError && <p className="globe-render-notice" role="status">The interactive globe is unavailable. You can still explore every location in the stories below.</p>}
        </div>
    );
};

export default MilitaryHistoryGlobe;
