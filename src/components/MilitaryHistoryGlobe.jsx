import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

gsap.registerPlugin(ScrollTrigger);

// Military Operations & Career Timeline
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
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const labelContainerRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (!containerRef.current) return;

        // --------------------------------------------------------
        // THREE.JS SETUP
        // --------------------------------------------------------
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 1000);
        camera.position.set(0, 0, 18);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(renderer.domElement);

        rendererRef.current = renderer;

        // --- Post Processing ---
        const renderPass = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 1.5, 0.4, 0.85);
        bloomPass.threshold = 0.2;
        bloomPass.strength = 0.4;
        bloomPass.radius = 0.4;

        const composer = new EffectComposer(renderer);
        composer.addPass(renderPass);
        composer.addPass(bloomPass);

        const earthGroup = new THREE.Group();
        earthGroup.rotation.order = 'YXZ'; // Important for combining Lat/Lon correctly
        earthGroup.rotation.z = 23.5 * (Math.PI / 180);
        scene.add(earthGroup);

        // --- Earth ---
        const loader = new THREE.TextureLoader();
        const albedo = loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
        const bump = loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg');
        const lights = loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png');
        const cloudsMap = loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png');

        const GLOBE_RADIUS = 5;
        const earthMat = new THREE.MeshPhongMaterial({
            map: albedo,
            normalMap: bump,
            normalScale: new THREE.Vector2(0.85, 0.85),
            emissiveMap: lights,
            emissive: new THREE.Color(0xffffff),
            emissiveIntensity: 0.8,
            color: new THREE.Color(0x111111),
            specular: new THREE.Color(0x444444),
            shininess: 25,
        });
        const earth = new THREE.Mesh(new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64), earthMat);
        earthGroup.add(earth);

        const cloudMat = new THREE.MeshLambertMaterial({
            map: cloudsMap,
            transparent: true,
            opacity: 0.15,
            blending: THREE.AdditiveBlending,
        });
        const clouds = new THREE.Mesh(new THREE.SphereGeometry(GLOBE_RADIUS + 0.06, 64, 64), cloudMat);
        earthGroup.add(clouds);

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
                    float intensity = pow(0.55 - dot(vNormal, vec3(0, 0, 1.0)), 5.0);
                    gl_FragColor = vec4(0.2, 0.4, 0.8, 0.4) * intensity; 
                }
            `,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            transparent: true
        });
        const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(GLOBE_RADIUS + 0.9, 64, 64), atmosphereMat);
        earthGroup.add(atmosphere);

        // --- Markers ---
        const markerGroup = new THREE.Group();
        earthGroup.add(markerGroup);
        const markers = [];

        function latLonToVector3(lat, lon, radius) {
            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (lon + 180) * (Math.PI / 180);
            const x = -(radius * Math.sin(phi) * Math.cos(theta));
            const z = (radius * Math.sin(phi) * Math.sin(theta));
            const y = (radius * Math.cos(phi));
            return new THREE.Vector3(x, y, z);
        }

        const pointGeo = new THREE.SphereGeometry(0.04, 32, 32);
        const ringGeo = new THREE.RingGeometry(0.06, 0.08, 64);

        const lineMat = new THREE.LineBasicMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending
        });

        DESTINATIONS.forEach((loc, index) => {
            const pos = latLonToVector3(loc.lat, loc.lon, GLOBE_RADIUS);
            const mContainer = new THREE.Group();
            mContainer.position.copy(pos);
            mContainer.lookAt(new THREE.Vector3(0, 0, 0));

            const dot = new THREE.Mesh(pointGeo, new THREE.MeshBasicMaterial({ color: 0xFFC107 }));
            mContainer.add(dot);

            const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xFFC107, side: THREE.DoubleSide, transparent: true, opacity: 0.1 }));
            ring.position.z = -0.02;
            ring.userData = { id: index, type: 'marker' };
            mContainer.add(ring);

            const linePoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0.01)];
            const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
            const line = new THREE.Line(lineGeo, lineMat.clone());
            mContainer.add(line);

            markers.push({
                group: mContainer,
                ring: ring,
                dot: dot,
                line: line,
                id: index
            });
            markerGroup.add(mContainer);
        });

        // --- Interaction ---
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onGlobeClick = (event) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(markerGroup.children, true);

            if (intersects.length > 0) {
                const clicked = intersects.find(i => i.object.userData.type === 'marker' || i.object.parent?.userData.type === 'marker');
                if (clicked) {
                    const id = clicked.object.userData.id ?? clicked.object.parent.userData.id;
                    console.log('MISSION_TARGET_SELECTED:', DESTINATIONS[id]);
                }
            }
        };
        containerRef.current.addEventListener('click', onGlobeClick);

        // --- Lights ---
        const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
        sunLight.position.set(50, 5, 20);
        scene.add(sunLight);
        scene.add(new THREE.AmbientLight(0xffffff, 0.05));
        const rimLight = new THREE.SpotLight(0x4488ff, 2);
        rimLight.position.set(-20, 20, -10);
        scene.add(rimLight);

        // --- Animation Loop ---
        let activeMarkerIndex = -1;
        let frameId;

        const animate = () => {
            frameId = requestAnimationFrame(animate);

            if (clouds) clouds.rotation.y += 0.0003;
            if (earth) earth.rotation.y += 0.0001;

            const time = performance.now() * 0.003;

            markers.forEach((m, idx) => {
                const isActive = idx === activeMarkerIndex;
                const labelDiv = labelContainerRef.current?.children[idx];

                if (isActive) {
                    // PULSING RED
                    const scale = 1 + Math.sin(time) * 0.4;
                    m.ring.scale.set(scale * 4, scale * 4, 1);
                    m.ring.material.opacity = 0.8;
                    m.ring.material.color.setHex(0xff0000);
                    m.dot.material.color.setHex(0xff0000);
                    m.dot.scale.set(1.5, 1.5, 1.5);

                    const targetLen = 3.5;
                    const posAttr = m.line.geometry.attributes.position;
                    const currentLen = posAttr.array[5];
                    if (currentLen < targetLen) {
                        const newLen = THREE.MathUtils.lerp(currentLen, targetLen, 0.1);
                        m.line.geometry.setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, newLen)]);
                        m.line.material.opacity = 1;
                    }

                    if (labelDiv) {
                        const labelPos = new THREE.Vector3(0, 0, targetLen);
                        m.group.localToWorld(labelPos);
                        labelPos.project(camera);

                        const x = (labelPos.x * 0.5 + 0.5) * w;
                        const y = (-(labelPos.y * 0.5 - 0.5)) * h;

                        const globePos = new THREE.Vector3();
                        m.group.getWorldPosition(globePos);
                        const towardCamera = globePos.clone().normalize().dot(camera.position.clone().normalize());

                        labelDiv.style.transform = `translate(-50%, -100%) translate(${x}px, ${y}px)`;
                        labelDiv.style.opacity = towardCamera > 0.05 ? 1 : 0;
                    }

                } else {
                    // SUBDUED GOLD
                    m.ring.scale.set(1, 1, 1);
                    m.ring.material.opacity = 0.1;
                    m.ring.material.color.setHex(0xB38600);
                    m.dot.material.color.setHex(0xFFC107);
                    m.dot.scale.set(1, 1, 1);

                    const posAttr = m.line.geometry.attributes.position;
                    const currentLen = posAttr.array[5];
                    if (currentLen > 0.05) {
                        const newLen = THREE.MathUtils.lerp(currentLen, 0, 0.1);
                        m.line.geometry.setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, newLen)]);
                        m.line.material.opacity = newLen * 0.5;
                    }

                    if (labelDiv) labelDiv.style.opacity = 0;
                }
            });

            composer.render();
        };
        animate();

        // --- Scroller Logic ---
        const startY = -Math.PI / 2;
        earthGroup.rotation.y = startY;
        const sections = document.querySelectorAll('.military-dest-section');

        const ctx = gsap.context(() => {
            sections.forEach((section, i) => {
                if (i >= DESTINATIONS.length) return;
                const locData = DESTINATIONS[i];
                const isEven = i % 2 === 0;
                const xPos = isEven ? 3.0 : -3.0;

                // --- Calculate Precise Rotation ---
                // 1. Longitude Base (-PI/2 accounts for Texture/Marker offset)
                // 2. Parallax Correction: Factors in the Globe's X offset relative to Camera (z=18)
                const parallax = Math.atan2(xPos, 18);
                const targetRotY = -1 * (locData.lon * (Math.PI / 180)) - (Math.PI / 2) + parallax;
                const targetRotX = (locData.lat * (Math.PI / 180));

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        scroller: '[data-scroll-container]',
                        start: 'top 60%',
                        end: 'bottom 40%',
                        scrub: 1,
                        onEnter: () => { activeMarkerIndex = i; },
                        onEnterBack: () => { activeMarkerIndex = i; },
                        onLeave: () => { if (activeMarkerIndex === i) activeMarkerIndex = -1; },
                        onLeaveBack: () => { if (activeMarkerIndex === i) activeMarkerIndex = -1; }
                    }
                });

                tl.to(earthGroup.rotation, { y: targetRotY, x: targetRotX, ease: "sine.inOut" }, "move")
                    .to(earthGroup.position, { x: xPos, ease: "sine.inOut" }, "move");
            });
        });

        const handleResize = () => {
            if (!containerRef.current) return;
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            containerRef.current?.removeEventListener('click', onGlobeClick);
            cancelAnimationFrame(frameId);
            ctx.revert();
            if (rendererRef.current) rendererRef.current.dispose();
        };

    }, []);

    return (
        <div ref={containerRef} className="w-full h-full min-h-[600px] relative cursor-crosshair">
            <div ref={labelContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                {DESTINATIONS.map((dest, i) => (
                    <div key={i} className="absolute opacity-0 transition-opacity duration-300 will-change-transform">
                        <div className="flex flex-col items-center">
                            <div className="bg-black/80 backdrop-blur-xl border border-red-500/40 px-4 py-2 rounded-sm shadow-[0_0_30px_rgba(239,68,68,0.3)] whitespace-nowrap">
                                <div className="flex justify-between items-center mb-1 gap-4">
                                    <span className="text-[8px] text-red-500 font-mono tracking-widest">LOC_{i + 1}</span>
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                                </div>
                                <span className="text-white font-black tracking-tight text-xl italic uppercase leading-none block">
                                    {dest.city}
                                </span>
                                <div className="h-px w-full bg-red-500/30 my-2" />
                                <span className="text-[10px] text-slate-400 font-mono block text-center">{dest.name}</span>
                            </div>
                            <div className="w-2.5 h-2.5 bg-red-500 rotate-45 border border-white/20 -mt-1 shadow-[0_0_10px_#ef4444]" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MilitaryHistoryGlobe;
