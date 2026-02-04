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
    const [activeIndexState, setActiveIndexState] = useState(-1);

    useEffect(() => {
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

        // --- POST PROCESSING (Subtler Bloom) ---
        const renderPass = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 0.5, 0.4, 0.85); // Reduced bloom
        bloomPass.threshold = 0.25;
        bloomPass.strength = 0.5;
        bloomPass.radius = 0.4;

        const composer = new EffectComposer(renderer);
        composer.addPass(renderPass);
        composer.addPass(bloomPass);

        const earthGroup = new THREE.Group();
        earthGroup.rotation.order = 'YXZ';
        earthGroup.rotation.z = 23.5 * (Math.PI / 180);
        scene.add(earthGroup);

        // --- REFINED TACTICAL SHADER ---
        const GLOBE_RADIUS = 5;
        const loader = new THREE.TextureLoader();
        const earthMask = loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');

        const tacticalMat = new THREE.ShaderMaterial({
            uniforms: {
                uMask: { value: earthMask },
                uColor: { value: new THREE.Color(0x10b981) },
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
                    float land = mask.g; 
                    
                    float scan = smoothstep(0.48, 0.5, sin(vUv.y * 120.0 + uTime * 1.5));
                    float grid = step(0.992, fract(vUv.x * 240.0)) + step(0.99, fract(vUv.y * 120.0));
                    
                    vec3 landColor = uColor * (0.2 + scan * 0.1 + grid * 0.3); 
                    vec3 oceanColor = vec3(0.01, 0.02, 0.04); 
                    
                    vec3 baseColor = mix(oceanColor, landColor, land);
                    float fresnel = pow(1.0 - dot(vNormal, vec3(0,0,1.0)), 4.0);
                    baseColor += uColor * fresnel * 0.3;
                    
                    // Transparency: oceans are near-clear, land is solid glowing emerald
                    float alpha = mix(0.1, 0.8, land) + fresnel * 0.4;
                    gl_FragColor = vec4(baseColor, alpha);
                }
            `,
            transparent: true,
            blending: THREE.NormalBlending
        });

        const earth = new THREE.Mesh(new THREE.SphereGeometry(GLOBE_RADIUS, 128, 128), tacticalMat);
        earthGroup.add(earth);

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
                    float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 10.0);
                    gl_FragColor = vec4(0.06, 0.72, 0.5, 0.5) * intensity; 
                }
            `,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            transparent: true
        });
        const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(GLOBE_RADIUS + 0.6, 64, 64), atmosphereMat);
        earthGroup.add(atmosphere);

        function latLonToVector3(lat, lon, radius) {
            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (lon + 180) * (Math.PI / 180);
            const x = -(radius * Math.sin(phi) * Math.cos(theta));
            const z = (radius * Math.sin(phi) * Math.sin(theta));
            const y = (radius * Math.cos(phi));
            return new THREE.Vector3(x, y, z);
        }

        const markerGroup = new THREE.Group();
        earthGroup.add(markerGroup);
        const markers = [];

        DESTINATIONS.forEach((loc, i) => {
            const pos = latLonToVector3(loc.lat, loc.lon, GLOBE_RADIUS);
            const mContainer = new THREE.Group();
            mContainer.position.copy(pos);
            mContainer.lookAt(new THREE.Vector3(0, 0, 0));

            const dot = new THREE.Mesh(
                new THREE.SphereGeometry(0.04, 16, 16),
                new THREE.MeshBasicMaterial({ color: 0x10b981 })
            );
            mContainer.add(dot);

            const ring = new THREE.Mesh(
                new THREE.RingGeometry(0.08, 0.1, 4, 1),
                new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide })
            );
            mContainer.add(ring);

            markers.push({ group: mContainer, ring, id: i });
            markerGroup.add(mContainer);
        });

        const arcGroup = new THREE.Group();
        earthGroup.add(arcGroup);
        const arcs = [];
        DESTINATIONS.forEach((loc, i) => {
            if (i === 0) return;
            const prev = DESTINATIONS[i - 1];
            const start = latLonToVector3(prev.lat, prev.lon, GLOBE_RADIUS);
            const end = latLonToVector3(loc.lat, loc.lon, GLOBE_RADIUS);
            const dist = start.distanceTo(end);
            const mid = start.clone().add(end).multiplyScalar(0.5).normalize().setLength(GLOBE_RADIUS + (dist * 0.2));
            const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
            const pts = curve.getPoints(50);
            const geo = new THREE.BufferGeometry().setFromPoints(pts);
            const mat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0 });
            const line = new THREE.Line(geo, mat);
            arcGroup.add(line);
            arcs.push({ line, id: i });
        });

        let activeIdx = -1;
        const ctx = gsap.context(() => {
            const scroller = document.querySelector('[data-scroll-container]') || window;
            const sections = document.querySelectorAll('.military-dest-section');

            sections.forEach((section, i) => {
                const loc = DESTINATIONS[i];
                const isEven = i % 2 === 0;
                const xPos = isEven ? 4.5 : -4.5;
                const parallax = Math.atan2(xPos, 18);
                const targetRotY = -1 * (loc.lon * (Math.PI / 180)) - (Math.PI / 2) + parallax;
                const targetRotX = (loc.lat * (Math.PI / 180));

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        scroller: scroller,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        scrub: 1.5, // Smoother follow
                        onEnter: () => { activeIdx = i; setActiveIndexState(i); },
                        onEnterBack: () => { activeIdx = i; setActiveIndexState(i); },
                        onLeave: () => { if (activeIdx === i) { activeIdx = -1; setActiveIndexState(-1); } },
                        onLeaveBack: () => { if (activeIdx === i) { activeIdx = -1; setActiveIndexState(-1); } }
                    }
                });

                tl.to(earthGroup.rotation, { y: targetRotY, x: targetRotX, ease: "sine.inOut" }, "sync")
                    .to(earthGroup.position, { x: xPos, ease: "sine.inOut" }, "sync");

                if (i > 0) {
                    const arc = arcs[i - 1];
                    tl.to(arc.line.material, { opacity: 0.5, duration: 0.5 }, "sync");
                }
            });
        });

        let frameId;
        const animate = (time) => {
            frameId = requestAnimationFrame(animate);
            tacticalMat.uniforms.uTime.value = time * 0.001;

            markers.forEach((m, i) => {
                const active = i === activeIdx;
                m.ring.rotation.z += 0.02;
                m.ring.scale.setScalar(active ? 2.5 + Math.sin(time * 0.01) * 0.5 : 1.0);

                const div = labelContainerRef.current?.children[i];
                if (div) {
                    const p = m.group.position.clone();
                    earthGroup.localToWorld(p);
                    p.project(camera);
                    const x = (p.x * 0.5 + 0.5) * w;
                    const y = (-(p.y * 0.5 - 0.5)) * h;
                    const dot = m.group.getWorldPosition(new THREE.Vector3()).normalize().dot(camera.position.clone().normalize());
                    div.style.transform = `translate(-50%, -100%) translate(${x}px, ${y}px)`;
                    div.style.opacity = (active && dot > 0.1) ? 1 : 0;
                }
            });

            composer.render();
        };
        animate(0);

        const handleResize = () => {
            if (!containerRef.current) return;
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
                            <div className="bg-black/90 backdrop-blur-2xl border border-emerald-500/40 px-5 py-3 rounded-none shadow-[0_0_40px_rgba(16,185,129,0.1)] whitespace-nowrap">
                                <div className="flex justify-between items-center mb-1 gap-4">
                                    <span className="text-[9px] text-emerald-400 font-mono tracking-widest uppercase">NODE_{i + 1}</span>
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                </div>
                                <span className="text-white font-black tracking-tight text-2xl italic uppercase leading-none block">
                                    {dest.city}
                                </span>
                                <div className="h-px w-full bg-emerald-500/20 my-2" />
                                <div className="flex justify-between items-center">
                                    <span className="text-[9px] text-slate-500 font-mono uppercase">{dest.name}</span>
                                    <span className="text-[9px] text-emerald-500 font-mono ml-4">{dest.year}</span>
                                </div>
                            </div>
                            <div className="w-[1px] h-10 bg-gradient-to-t from-emerald-500/30 to-transparent" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MilitaryHistoryGlobe;
