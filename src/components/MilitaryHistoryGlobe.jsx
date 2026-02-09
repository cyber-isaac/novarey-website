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
    { name: 'NEW HAMPSHIRE', city: 'USA', lat: 43.19, lon: -71.57, year: '2022', desc: 'Academic Milestone. Earned Bachelor\'s in Graphic Design & Media Arts while achieving PMP Certification.', mgrs: '19T CL 982 044', status: 'ACHIEVED' },
    { name: 'TEXAS', city: 'USA', lat: 31.96, lon: -99.90, year: '2023', desc: 'Founded Novarey Ventures. Leading AI-enhanced design strategy & managing multi-million dollar renewable energy projects (Engie/Scout Clean Energy).', mgrs: '14R LP 123 456', status: 'FOUNDED' }
];

const MilitaryHistoryGlobe = () => {
    const containerRef = useRef(null);
    const globeRef = useRef(null);
    const [activeIndexState, setActiveIndexState] = useState(-1);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const w = container.clientWidth;
        const h = container.clientHeight;

        // --- Build arc data: connect sequential destinations ---
        const arcsData = DESTINATIONS.slice(1).map((dest, i) => ({
            startLat: DESTINATIONS[i].lat,
            startLng: DESTINATIONS[i].lon,
            endLat: dest.lat,
            endLng: dest.lon,
            color: ['rgba(249,115,22,0.9)', 'rgba(16,185,129,0.9)']
        }));

        // --- Build points data ---
        const pointsData = DESTINATIONS.map((d, i) => ({
            lat: d.lat,
            lng: d.lon,
            size: 0.6,
            color: '#10b981',
            idx: i
        }));

        // --- Build labels data ---
        const labelsData = DESTINATIONS.map((d, i) => ({
            lat: d.lat,
            lng: d.lon,
            text: d.name,
            color: 'rgba(16, 185, 129, 0.85)',
            size: 0.8,
            idx: i
        }));

        // --- Create globe.gl instance ---
        const globe = Globe()
            .width(w)
            .height(h)
            .backgroundColor('rgba(0,0,0,0)')
            .globeImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg')
            .bumpImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png')
            .showAtmosphere(true)
            .atmosphereColor('#10b981')
            .atmosphereAltitude(0.2)
            // --- Arcs (animated dash routes) ---
            .arcsData(arcsData)
            .arcColor('color')
            .arcDashLength(0.6)
            .arcDashGap(0.3)
            .arcDashAnimateTime(2000)
            .arcStroke(0.5)
            .arcsTransitionDuration(0)
            // --- Points at each destination ---
            .pointsData(pointsData)
            .pointLat('lat')
            .pointLng('lng')
            .pointColor('color')
            .pointAltitude(0.01)
            .pointRadius('size')
            // --- Labels at each destination ---
            .labelsData(labelsData)
            .labelLat('lat')
            .labelLng('lng')
            .labelText('text')
            .labelSize('size')
            .labelColor('color')
            .labelDotRadius(0.4)
            .labelAltitude(0.02)
            .labelResolution(3)
            // --- Rings (pulse at active location) ---
            .ringsData([])
            .ringColor(() => t => `rgba(249,115,22,${1 - t})`)
            .ringMaxRadius(4)
            .ringPropagationSpeed(3)
            .ringRepeatPeriod(1200)
            // --- HTML markers (tactical label boxes) ---
            .htmlElementsData(DESTINATIONS.map((d, i) => ({ lat: d.lat, lng: d.lon, ...d, idx: i })))
            .htmlLat('lat')
            .htmlLng(d => d.lon)
            .htmlAltitude(0.05)
            .htmlElement(d => {
                const el = document.createElement('div');
                el.className = 'globe-html-label';
                el.style.opacity = '0';
                el.style.transition = 'opacity 0.5s ease';
                el.style.pointerEvents = 'none';
                el.style.willChange = 'opacity';
                el.innerHTML = `
                    <div style="display:flex;flex-direction:column;align-items:center;">
                        <div style="
                            background:rgba(0,0,0,0.92);
                            backdrop-filter:blur(24px);
                            border:1px solid rgba(16,185,129,0.4);
                            padding:12px 20px;
                            white-space:nowrap;
                            box-shadow:0 0 40px rgba(16,185,129,0.1);
                        ">
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;gap:16px;">
                                <span style="font-size:9px;color:rgba(16,185,129,0.8);font-family:'Space Mono',monospace;letter-spacing:0.15em;text-transform:uppercase;">NODE_${d.idx + 1}</span>
                                <div style="width:6px;height:6px;background:#10b981;border-radius:50%;"></div>
                            </div>
                            <span style="color:#fff;font-weight:900;letter-spacing:-0.02em;font-size:22px;font-style:italic;text-transform:uppercase;line-height:1;display:block;font-family:'Syne',sans-serif;">
                                ${d.city}
                            </span>
                            <div style="height:1px;width:100%;background:rgba(16,185,129,0.2);margin:8px 0;"></div>
                            <div style="display:flex;justify-content:space-between;align-items:center;">
                                <span style="font-size:9px;color:rgba(100,116,139,1);font-family:'Space Mono',monospace;text-transform:uppercase;">${d.name}</span>
                                <span style="font-size:9px;color:#10b981;font-family:'Space Mono',monospace;margin-left:16px;">${d.year}</span>
                            </div>
                        </div>
                        <div style="width:1px;height:40px;background:linear-gradient(to top, rgba(16,185,129,0.3), transparent);"></div>
                    </div>
                `;
                el.dataset.labelIdx = d.idx;
                return el;
            })
            .htmlElementVisibilityModifier((el, isVisible) => {
                // Only show if this is the active destination AND it's on the visible side
                const idx = parseInt(el.dataset.labelIdx);
                el.style.opacity = (isVisible && idx === globeRef.current?._activeIdx) ? '1' : '0';
            })
            (container);

        globeRef.current = globe;
        globe._activeIdx = -1;

        // --- Camera & Controls ---
        globe.controls().autoRotate = false;
        globe.controls().enableZoom = false;
        globe.controls().enablePan = false;
        globe.controls().enableRotate = false;

        // Set initial view
        globe.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 0);

        // --- Custom globe material for specular highlights ---
        const globeMaterial = globe.globeMaterial();
        globeMaterial.bumpScale = 8;

        // --- Clouds layer (transparent sphere above the surface) ---
        const CLOUDS_ALT = 0.004;
        const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame
        let cloudsRef = null;

        new THREE.TextureLoader().load(
            '/globe.gl-master/example/clouds/clouds.png',
            (cloudsTexture) => {
                const clouds = new THREE.Mesh(
                    new THREE.SphereGeometry(globe.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
                    new THREE.MeshPhongMaterial({
                        map: cloudsTexture,
                        transparent: true,
                        opacity: 0.65
                    })
                );
                globe.scene().add(clouds);
                cloudsRef = clouds;

                // Slow independent rotation
                (function rotateClouds() {
                    if (!cloudsRef) return;
                    clouds.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
                    requestAnimationFrame(rotateClouds);
                })();
            }
        );

        // --- GSAP ScrollTrigger per destination ---
        let activeIdx = -1;
        const ctx = gsap.context(() => {
            const scroller = document.querySelector('[data-scroll-container]') || window;
            ScrollTrigger.defaults({ scroller });
            setTimeout(() => ScrollTrigger.refresh(), 600);

            const sections = document.querySelectorAll('.military-dest-section');

            sections.forEach((section, i) => {
                const loc = DESTINATIONS[i];

                ScrollTrigger.create({
                    trigger: section,
                    start: 'top 75%',
                    end: 'bottom 25%',
                    onEnter: () => activateDestination(i, loc),
                    onEnterBack: () => activateDestination(i, loc),
                    onLeave: () => { if (activeIdx === i) deactivate(); },
                    onLeaveBack: () => { if (activeIdx === i) deactivate(); }
                });
            });
        });

        function activateDestination(i, loc) {
            activeIdx = i;
            globe._activeIdx = i;
            setActiveIndexState(i);
            // Fly to the destination
            globe.pointOfView({ lat: loc.lat, lng: loc.lon, altitude: 2.0 }, 1200);
            // Show ring pulse at destination
            globe.ringsData([{ lat: loc.lat, lng: loc.lon }]);
        }

        function deactivate() {
            activeIdx = -1;
            globe._activeIdx = -1;
            setActiveIndexState(-1);
            globe.ringsData([]);
        }

        // --- Resize ---
        const handleResize = () => {
            if (!container) return;
            globe.width(container.clientWidth);
            globe.height(container.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            ctx.revert();
            if (cloudsRef) {
                globe.scene().remove(cloudsRef);
                cloudsRef.geometry.dispose();
                cloudsRef.material.dispose();
                cloudsRef = null;
            }
            globe._destructor && globe._destructor();
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full min-h-[600px] relative cursor-crosshair" />
    );
};

export default MilitaryHistoryGlobe;
