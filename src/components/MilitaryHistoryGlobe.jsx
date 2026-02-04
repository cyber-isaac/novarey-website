import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

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
    const sceneRef = useRef(null);
    const labelContainerRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (!containerRef.current) return;

        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;

        // --- SCENE SETUP ---
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 1000);
        camera.position.set(0, 0, 18);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // --- POST PROCESSING ---
        const renderPass = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 1.5, 0.4, 0.85);
        bloomPass.threshold = 0.1;
        bloomPass.strength = 1.0;
        bloomPass.radius = 0.5;

        const composer = new EffectComposer(renderer);
        composer.addPass(renderPass);
        composer.addPass(bloomPass);

        const earthGroup = new THREE.Group();
        earthGroup.rotation.order = 'YXZ';
        earthGroup.rotation.z = 23.5 * (Math.PI / 180);
        scene.add(earthGroup);

        // --- TACTICAL GLOBE MATERIAL (SHADER) ---
        const GLOBE_RADIUS = 5;
        const loader = new THREE.TextureLoader();
        const earthMask = loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');

        const tacticalMat = new THREE.ShaderMaterial({
            uniforms: {
                uMask: { value: earthMask },
                uColor: { value: new THREE.Color(0x10b981) }, // Emerald-500
                uTime: { value: 0 }
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                void main() {
                    vUv = uv;
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D uMask;
                uniform vec3 uColor;
                uniform float uTime;
                varying vec2 vUv;
                varying vec3 vNormal;
                void main() {
                    vec4 mask = texture2D(uMask, vUv);
                    float land = mask.g; // Green channel for landmass
                    
                    // Scanning line effect
                    float scan = smoothstep(0.4, 0.5, sin(vUv.y * 100.0 + uTime * 2.0));
                    
                    // Grid effect
                    float grid = step(0.98, fract(vUv.x * 200.0)) + step(0.98, fract(vUv.y * 100.0));
                    
                    vec3 finalColor = uColor * land * (0.3 + scan * 0.1 + grid * 0.4);
                    
                    // Fresnel glow
                    float fresnel = pow(1.0 - dot(vNormal, vec3(0,0,1.0)), 3.0);
                    finalColor += uColor * fresnel * 0.5;
                    
                    gl_FragColor = vec4(finalColor, land * 0.8 + fresnel);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending
        });

        const earth = new THREE.Mesh(new THREE.SphereGeometry(GLOBE_RADIUS, 128, 128), tacticalMat);
        earthGroup.add(earth);

        // --- ATMOSPHERE ---
        const atmosphereMat = new THREE.ShaderMaterial({
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vNormal;
                void main() {
                    float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 6.0);
                    gl_FragColor = vec4(0.06, 0.72, 0.5, 1.0) * intensity; 
                }
            `,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            transparent: true
        });
        const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(GLOBE_RADIUS + 0.8, 64, 64), atmosphereMat);
        earthGroup.add(atmosphere);

        // --- COORDINATE UTILS ---
        function latLonToVector3(lat, lon, radius) {
            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (lon + 180) * (Math.PI / 180);
            const x = -(radius * Math.sin(phi) * Math.cos(theta));
            const z = (radius * Math.sin(phi) * Math.sin(theta));
            const y = (radius * Math.cos(phi));
            return new THREE.Vector3(x, y, z);
        }

        // --- THE GOLDEN THREAD (CAREER ARCS) ---
        const pathGroup = new THREE.Group();
        earthGroup.add(pathGroup);
        const arcItems = [];

        DESTINATIONS.forEach((loc, i) => {
            if (i === 0) return;
            const prev = DESTINATIONS[i - 1];
            const startP = latLonToVector3(prev.lat, prev.lon, GLOBE_RADIUS);
            const endP = latLonToVector3(loc.lat, loc.lon, GLOBE_RADIUS);

            const dist = startP.distanceTo(endP);
            const midP = startP.clone().add(endP).multiplyScalar(0.5).normalize().setLength(GLOBE_RADIUS + (dist * 0.2));

            const curve = new THREE.QuadraticBezierCurve3(startP, midP, endP);
            const points = curve.getPoints(100);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);

            const material = new THREE.LineBasicMaterial({
                color: 0x10b981,
                transparent: true,
                opacity: 0,
                blending: THREE.AdditiveBlending
            });
            const line = new THREE.Line(geometry, material);
            pathGroup.add(line);

            // Particle for arc
            const pGeo = new THREE.SphereGeometry(0.02, 8, 8);
            const pMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
            const particle = new THREE.Mesh(pGeo, pMat);
            particle.visible = false;
            pathGroup.add(particle);

            arcItems.push({ line, particle, curve, id: i });
        });

        // --- HUD RETICLES ---
        const markerGroup = new THREE.Group();
        earthGroup.add(markerGroup);
        const markers = [];

        DESTINATIONS.forEach((loc, i) => {
            const pos = latLonToVector3(loc.lat, loc.lon, GLOBE_RADIUS);
            const mContainer = new THREE.Group();
            mContainer.position.copy(pos);
            mContainer.lookAt(new THREE.Vector3(0, 0, 0));

            // Central Dot
            const dot = new THREE.Mesh(
                new THREE.SphereGeometry(0.04, 16, 16),
                new THREE.MeshBasicMaterial({ color: 0x10b981 })
            );
            mContainer.add(dot);

            // Rotating Reticle
            const ringGeo = new THREE.RingGeometry(0.08, 0.1, 4, 1);
            const ringMat = new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            mContainer.add(ring);

            markers.push({ group: mContainer, ring, id: i });
            markerGroup.add(mContainer);
        });

        // --- SCROLL ANIMATION ---
        let activeIndex = -1;
        const ctx = gsap.context(() => {
            const sections = document.querySelectorAll('.military-dest-section');
            sections.forEach((section, i) => {
                const loc = DESTINATIONS[i];
                const isEven = i % 2 === 0;
                const xPos = isEven ? 4.0 : -4.0;

                const parallax = Math.atan2(xPos, 18);
                const targetRotY = -1 * (loc.lon * (Math.PI / 180)) - (Math.PI / 2) + parallax;
                const targetRotX = (loc.lat * (Math.PI / 180));

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        scroller: '[data-scroll-container]',
                        start: 'top 70%',
                        end: 'bottom 30%',
                        scrub: 1.5,
                        onEnter: () => { activeIndex = i; },
                        onEnterBack: () => { activeIndex = i; },
                        onLeave: () => { if (activeIndex === i) activeIndex = -1; },
                        onLeaveBack: () => { if (activeIndex === i) activeIndex = -1; }
                    }
                });

                tl.to(earthGroup.rotation, { y: targetRotY, x: targetRotX, ease: "power2.inOut" }, "move")
                    .to(earthGroup.position, { x: xPos, ease: "power2.inOut" }, "move");

                // Arc Tracing
                if (i > 0) {
                    const arc = arcItems[i - 1];
                    tl.to(arc.line.material, { opacity: 0.6, duration: 0.5 }, "move");
                }
            });
        });

        // --- ANIMATION LOOP ---
        let frameId;
        const animate = (time) => {
            frameId = requestAnimationFrame(animate);
            tacticalMat.uniforms.uTime.value = time * 0.001;

            markers.forEach((m, i) => {
                const isActive = i === activeIndex;
                m.ring.rotation.z += 0.02;
                m.ring.scale.setScalar(isActive ? 2.5 + Math.sin(time * 0.01) * 0.5 : 1.0);

                const labelDiv = labelContainerRef.current?.children[i];
                if (labelDiv) {
                    const screenPos = m.group.position.clone();
                    earthGroup.localToWorld(screenPos);
                    screenPos.project(camera);

                    const x = (screenPos.x * 0.5 + 0.5) * w;
                    const y = (-(screenPos.y * 0.5 - 0.5)) * h;

                    const towardCamera = m.group.getWorldPosition(new THREE.Vector3()).normalize().dot(camera.position.clone().normalize());

                    labelDiv.style.transform = `translate(-50%, -100%) translate(${x}px, ${y}px)`;
                    labelDiv.style.opacity = (isActive && towardCamera > 0.05) ? 1 : 0;
                }
            });

            // Arcs & Particles
            arcItems.forEach((arc, i) => {
                if (i < activeIndex) {
                    arc.line.material.opacity = 0.5;
                    arc.particle.visible = true;
                    const pTime = (time * 0.001 + i) % 1.0;
                    arc.particle.position.copy(arc.curve.getPoint(pTime));
                } else if (i === activeIndex && activeIndex > 0) {
                    // Active arc particle follow logic could go here
                } else {
                    arc.line.material.opacity = 0;
                    arc.particle.visible = false;
                }
            });

            composer.render();
        };
        animate(0);

        // --- CLEANUP ---
        const handleResize = () => {
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            composer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(frameId);
            ctx.revert();
            renderer.dispose();
            tacticalMat.dispose();
            atmosphereMat.dispose();
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full min-h-[600px] relative cursor-crosshair">
            <div ref={labelContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                {DESTINATIONS.map((dest, i) => (
                    <div key={i} className="absolute opacity-0 transition-opacity duration-500 will-change-transform">
                        <div className="flex flex-col items-center">
                            <div className="bg-black/90 backdrop-blur-2xl border border-emerald-500/40 px-5 py-3 rounded-none shadow-[0_0_40px_rgba(16,185,129,0.2)] whitespace-nowrap">
                                <div className="flex justify-between items-center mb-1 gap-4">
                                    <span className="text-[9px] text-emerald-400 font-mono tracking-widest">DATA_NODE // 0{i + 1}</span>
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                </div>
                                <span className="text-white font-black tracking-tight text-2xl italic uppercase leading-none block">
                                    {dest.city}
                                </span>
                                <div className="h-px w-full bg-emerald-500/30 my-2" />
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] text-slate-400 font-mono italic uppercase">{dest.name}</span>
                                    <span className="text-[10px] text-emerald-500 font-mono ml-4">{dest.year}</span>
                                </div>
                            </div>
                            <div className="w-[1px] h-12 bg-gradient-to-t from-emerald-500/50 to-transparent" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MilitaryHistoryGlobe;
