import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

const Globe = ({ className = "" }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // --- Core Setup ---
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        const scene = new THREE.Scene();
        // Transparent scene, no fog necessary if isolated

        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        camera.position.z = 4;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ReinhardToneMapping;
        mountRef.current.appendChild(renderer.domElement);

        // --- Post Processing (Bloom) ---
        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(width, height),
            1.5, 0.4, 0.85
        );
        bloomPass.threshold = 0;
        bloomPass.strength = 2.5; // Strong glow for the globe
        bloomPass.radius = 0.8;

        const composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        // --- Globe (Sphere + Wireframe) ---
        const logoGroup = new THREE.Group();

        const material = new THREE.MeshStandardMaterial({
            color: 0x050505, // Dark core
            metalness: 0.9,
            roughness: 0.1,
            emissive: 0x001133,
            emissiveIntensity: 0.2
        });

        const edgeMaterial = new THREE.MeshBasicMaterial({
            color: 0x00F3FF,
            transparent: true,
            opacity: 0.5
        });

        const geometry = new THREE.SphereGeometry(1.2, 24, 24); // Lower poly for style
        const mesh = new THREE.Mesh(geometry, material);

        const wireframe = new THREE.LineSegments(
            new THREE.EdgesGeometry(geometry),
            edgeMaterial
        );
        mesh.add(wireframe);

        logoGroup.add(mesh);
        scene.add(logoGroup);

        // --- Lights ---
        const ambientLight = new THREE.AmbientLight(0x404040, 1.0);
        scene.add(ambientLight);

        const spotlight = new THREE.SpotLight(0x00F3FF, 50);
        spotlight.position.set(5, 5, 5);
        spotlight.angle = 0.5;
        spotlight.penumbra = 0.5;
        scene.add(spotlight);

        const blueLight = new THREE.PointLight(0x00F3FF, 5, 10);
        blueLight.position.set(-2, 2, 2);
        scene.add(blueLight);

        // --- Animation ---
        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            const time = Date.now() * 0.002;

            // Pulse Scale
            const scale = 1 + Math.sin(time * 2) * 0.02;
            logoGroup.scale.set(scale, scale, scale);

            // Rotate
            logoGroup.rotation.y += 0.003;
            logoGroup.rotation.x = Math.sin(time * 0.5) * 0.1;

            composer.render();
        };

        animate();

        // --- Resize ---
        const handleResize = () => {
            if (!mountRef.current) return;
            const w = mountRef.current.clientWidth;
            const h = mountRef.current.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            composer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        // --- Cleanup ---
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, []);

    return (
        <div ref={mountRef} className={`w-full h-full ${className}`} />
    );
};

export default Globe;
