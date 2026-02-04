import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TransitionGlobe = ({
    accentColor = '#f59e0b',
    cities = [
        { lat: 40.71, lon: -74.00, name: 'New York' },
        { lat: 51.50, lon: -0.12, name: 'London' },
        { lat: 35.68, lon: 139.69, name: 'Tokyo' },
        { lat: -33.86, lon: 151.20, name: 'Sydney' },
        { lat: 25.20, lon: 55.27, name: 'Dubai' },
        { lat: 34.55, lon: 69.17, name: 'Kabul' }, // Afghanistan focus
        { lat: 14.59, lon: 120.98, name: 'Manila' },
        { lat: 13.75, lon: 100.50, name: 'Bangkok' }
    ],
    className = ""
}) => {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // --- SCENE SETUP ---
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050A14, 0.02);
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(45, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 100);
        camera.position.set(0, 0, 15);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // --- GROUPS ---
        const universeGroup = new THREE.Group();
        const globeGroup = new THREE.Group();
        universeGroup.add(globeGroup);
        scene.add(universeGroup);

        // --- 1. STARS BACKGROUND ---
        const starsGeometry = new THREE.BufferGeometry();
        const starsCount = 1500;
        const posArray = new Float32Array(starsCount * 3);
        for (let i = 0; i < starsCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 80;
        }
        starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const starsMaterial = new THREE.PointsMaterial({
            size: 0.05,
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        });
        const starMesh = new THREE.Points(starsGeometry, starsMaterial);
        universeGroup.add(starMesh);

        // --- 2. EARTH ---
        const geometry = new THREE.SphereGeometry(5, 64, 64);
        const textureLoader = new THREE.TextureLoader();

        // Use night textures for high contrast
        const earthTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
        const specTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg');
        const normalTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg');
        const lightsTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png');
        const cloudsTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png');

        const material = new THREE.MeshPhongMaterial({
            map: earthTexture,
            specularMap: specTexture,
            normalMap: normalTexture,
            emissiveMap: lightsTexture,
            emissive: new THREE.Color(accentColor),
            emissiveIntensity: 0.6,
            color: 0x152030,
            specular: 0x555555,
            shininess: 10
        });
        const globe = new THREE.Mesh(geometry, material);
        globeGroup.add(globe);

        // --- 3. CLOUDS ---
        const cloudGeo = new THREE.SphereGeometry(5.08, 64, 64);
        const cloudMat = new THREE.MeshLambertMaterial({
            map: cloudsTexture,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide
        });
        const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
        globeGroup.add(cloudMesh);

        // --- 4. ATMOSPHERE ---
        const atmosphereGeo = new THREE.SphereGeometry(5.2, 64, 64);
        const atmosphereMat = new THREE.ShaderMaterial({
            uniforms: {
                glowColor: { value: new THREE.Color(accentColor) }
            },
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vNormal;
                uniform vec3 glowColor;
                void main() {
                    float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 3.0);
                    gl_FragColor = vec4(glowColor, 1.0) * intensity * 1.5;
                }
            `,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            transparent: true
        });
        const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
        globeGroup.add(atmosphere);

        // --- 5. CONNECTIONS ---
        const connectionsGroup = new THREE.Group();
        globeGroup.add(connectionsGroup);
        const trafficParticles = [];

        function latLonToVector3(lat, lon, radius) {
            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (lon + 180) * (Math.PI / 180);
            const x = -(radius * Math.sin(phi) * Math.cos(theta));
            const z = (radius * Math.sin(phi) * Math.sin(theta));
            const y = (radius * Math.cos(phi));
            return new THREE.Vector3(x, y, z);
        }

        function createArc(startLat, startLon, endLat, endLon) {
            const start = latLonToVector3(startLat, startLon, 5);
            const end = latLonToVector3(endLat, endLon, 5);
            const dist = start.distanceTo(end);
            const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(5 + (dist * 0.2));

            const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
            const points = curve.getPoints(50);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);

            const material = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 });
            const line = new THREE.Line(geometry, material);
            connectionsGroup.add(line);

            const particleGeo = new THREE.SphereGeometry(0.06, 8, 8);
            const particleMat = new THREE.MeshBasicMaterial({ color: accentColor });
            const particle = new THREE.Mesh(particleGeo, particleMat);
            connectionsGroup.add(particle);

            trafficParticles.push({
                mesh: particle,
                curve: curve,
                progress: Math.random()
            });
        }

        // Cities & Connections
        for (let i = 0; i < cities.length; i++) {
            const pos = latLonToVector3(cities[i].lat, cities[i].lon, 5.01);
            const markerGeo = new THREE.RingGeometry(0.06, 0.08, 32);
            const markerMat = new THREE.MeshBasicMaterial({ color: accentColor, side: THREE.DoubleSide });
            const marker = new THREE.Mesh(markerGeo, markerMat);
            marker.position.copy(pos);
            marker.lookAt(0, 0, 0);
            globeGroup.add(marker);

            // Connect to random-ish cities
            if (i > 0) {
                createArc(cities[i - 1].lat, cities[i - 1].lon, cities[i].lat, cities[i].lon);
            }
        }

        // --- LIGHTING ---
        const ambientLight = new THREE.AmbientLight(0x050505);
        scene.add(ambientLight);
        const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
        sunLight.position.set(10, 5, 10);
        scene.add(sunLight);
        const rimLight = new THREE.SpotLight(accentColor, 8);
        rimLight.position.set(-10, 10, -5);
        rimLight.lookAt(0, 0, 0);
        scene.add(rimLight);

        // --- SCROLL ANIMATION ---
        globeGroup.rotation.x = 0.2;
        globeGroup.rotation.y = 4.5;

        // Find the scroller (data-scroll-container) or default to body
        const scroller = document.querySelector('[data-scroll-container]') || "body";

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scroller,
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });

        tl.to(globeGroup.position, { x: 3.5, z: -2, duration: 5 }, "phase1")
            .to(globeGroup.rotation, { y: "+=1.5", x: 0.4, duration: 5 }, "phase1")

            .to(globeGroup.position, { x: -3.5, y: 0, z: -1, duration: 5 }, "phase2")
            .to(globeGroup.rotation, { y: "+=1.2", x: -0.2, duration: 5 }, "phase2")

            .to(globeGroup.position, { x: 0, y: -5, z: 2, duration: 5 }, "phase3")
            .to(globeGroup.rotation, { y: "+=1.0", x: 0.5, duration: 5 }, "phase3");

        // --- INTERACTION ---
        let mouseX = 0;
        let mouseY = 0;
        const handleMouseMove = (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // --- ANIMATION LOOP ---
        let animationId;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            globe.rotation.y += 0.0005;
            cloudMesh.rotation.y += 0.0007;
            cloudMesh.rotation.x += 0.0001;
            atmosphere.rotation.y += 0.0005;
            trafficParticles.forEach(p => {
                p.progress += 0.004;
                if (p.progress > 1) p.progress = 0;
                p.mesh.position.copy(p.curve.getPoint(p.progress));
            });
            starMesh.rotation.y -= 0.0002;

            gsap.to(universeGroup.rotation, {
                x: mouseY * 0.1,
                y: mouseX * 0.1,
                duration: 1,
                ease: "power2.out"
            });

            renderer.render(scene, camera);
        };
        animate();

        // --- RESIZE ---
        const handleResize = () => {
            if (!containerRef.current) return;
            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener('resize', handleResize);

        // --- CLEANUP ---
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            cloudGeo.dispose();
            cloudMat.dispose();
            atmosphereGeo.dispose();
            atmosphereMat.dispose();
            starsGeometry.dispose();
            starsMaterial.dispose();
            ScrollTrigger.getAll().forEach(t => t.kill());
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, [accentColor, cities]);

    return (
        <div
            ref={containerRef}
            className={`w-full h-full relative ${className}`}
            style={{ background: 'transparent' }}
        />
    );
};

export default TransitionGlobe;
