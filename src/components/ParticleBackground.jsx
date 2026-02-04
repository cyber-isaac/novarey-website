import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
    const containerRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // --- SCENE SETUP ---
        const scene = new THREE.Scene();
        // Subtle fog for depth - dark blueish/black
        scene.fog = new THREE.FogExp2(0x020205, 0.002);

        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            1,
            2000
        );
        camera.position.z = 100; // Far back to see the field
        camera.rotation.x = Math.PI / 2; // Look "up" or into the depth depending on orientation

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // --- STARFIELD ---
        // 1. Core Stars (Bright, focused)
        const starGeo = new THREE.BufferGeometry();
        const starCount = 4000;
        const posArray = new Float32Array(starCount * 3);
        const velocityArray = new Float32Array(starCount); // For twinkle or movement speed

        for (let i = 0; i < starCount * 3; i += 3) {
            // Random sphere distribution
            const r = 400 + Math.random() * 400; // Distance from center
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);

            posArray[i] = r * Math.sin(phi) * Math.cos(theta);     // x
            posArray[i + 1] = r * Math.sin(phi) * Math.sin(theta);   // y
            posArray[i + 2] = r * Math.cos(phi);                     // z

            velocityArray[i / 3] = Math.random();
        }

        starGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.7,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });

        const starMesh = new THREE.Points(starGeo, starMaterial);
        scene.add(starMesh);

        // 2. Background Dust (Dimmer, more numerous)
        const dustGeo = new THREE.BufferGeometry();
        const dustCount = 2000;
        const dustPos = new Float32Array(dustCount * 3);

        for (let i = 0; i < dustCount * 3; i++) {
            dustPos[i] = (Math.random() - 0.5) * 1500; // Wide spread box
        }
        dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
        const dustMat = new THREE.PointsMaterial({
            color: 0x88ccff, // Slight blue tint for atmosphere
            size: 0.4,
            transparent: true,
            opacity: 0.4,
            sizeAttenuation: true
        });
        const dustMesh = new THREE.Points(dustGeo, dustMat);
        scene.add(dustMesh);


        // --- ANIMATION LOOP ---
        const animate = () => {
            animationRef.current = requestAnimationFrame(animate);

            // Slow rotation of the entire universe
            starMesh.rotation.y += 0.0002;
            starMesh.rotation.x += 0.00005;

            dustMesh.rotation.y += 0.0001;

            renderer.render(scene, camera);
        };
        animate();

        // --- RESIZE ---
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // --- CLEANUP ---
        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            starGeo.dispose();
            starMaterial.dispose();
            dustGeo.dispose();
            dustMat.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 -z-10 pointer-events-none"
            style={{
                background: 'radial-gradient(circle at center, #0B0B0E 0%, #000000 100%)'
            }}
        />
    );
};

export default ParticleBackground;
