import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { useLocation } from 'react-router-dom';

const UnifiedBackground = () => {
    const mountRef = useRef(null);
    const particlesMeshRef = useRef(null);
    const particlesMaterialRef = useRef(null);
    const bloomPassRef = useRef(null);
    const cameraRef = useRef(null);
    const sceneRef = useRef(null);
    const scrollProgressRef = useRef(0);
    const [isReady, setIsReady] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (!mountRef.current) return;

        // --- Core Setup ---
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050608, 0.028);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ReinhardToneMapping;
        mountRef.current.appendChild(renderer.domElement);

        // --- Post Processing ---
        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            2.0, 0.6, 0.9
        );
        bloomPass.threshold = 0;
        bloomPass.strength = 2.0;
        bloomPass.radius = 0.8;
        bloomPassRef.current = bloomPass;

        const composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        // --- Lights ---
        const ambientLight = new THREE.AmbientLight(0x20242b, 0.6);
        scene.add(ambientLight);

        const spotlight1 = new THREE.SpotLight(0x1fb6ff, 35);
        spotlight1.position.set(6, 6, 6);
        spotlight1.angle = 0.25;
        spotlight1.penumbra = 0.6;
        scene.add(spotlight1);

        const spotlight2 = new THREE.SpotLight(0xff8a4c, 20);
        spotlight2.position.set(-6, -4, 4);
        spotlight2.angle = 0.3;
        spotlight2.penumbra = 0.7;
        scene.add(spotlight2);

        // --- Particles ---
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1500;
        const scatterPositions = new Float32Array(particlesCount * 3);
        const targetPositions = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            scatterPositions[i3] = (Math.random() - 0.5) * 20;
            scatterPositions[i3 + 1] = (Math.random() - 0.5) * 20;
            scatterPositions[i3 + 2] = (Math.random() - 0.5) * 20;

            // Target shape: sphere-like cluster to "reform" into.
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            const radius = 2.2 * Math.cbrt(Math.random());

            targetPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            targetPositions[i3 + 1] = radius * Math.cos(phi);
            targetPositions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(scatterPositions.slice(), 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.065,
            color: 0xffffff,
            transparent: true,
            opacity: 0.7,
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        particlesMesh.position.y = -2; // Adjusted height
        scene.add(particlesMesh);
        particlesMeshRef.current = particlesMesh;
        particlesMaterialRef.current = particlesMaterial;
        sceneRef.current = scene;
        setIsReady(true);

        const morph = { t: 0 };
        const morphTween = gsap.to(morph, {
            t: 1,
            duration: 7,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
        });

        const base = {
            particleY: -2,
            particleScale: 1,
            opacity: 0.45,
            color: { r: 1, g: 1, b: 1 },
            cameraZ: 5,
            cameraRotZ: 0,
            fogDensity: 0.028,
            bloomStrength: 1.6,
            bloomRadius: 0.8,
        };
        const target = {
            particleY: 0.6,
            particleScale: 2.6,
            opacity: 0.9,
            color: { r: 0, g: 0.95, b: 1 },
            cameraZ: 6.9,
            cameraRotZ: 0.22,
            fogDensity: 0.06,
            bloomStrength: 2.6,
            bloomRadius: 1.1,
        };

        let scroller = document.querySelector('[data-scroll-container]');
        const getScrollProgress = () => {
            if (!scroller || !scroller.isConnected) {
                scroller = document.querySelector('[data-scroll-container]');
            }
            if (scroller) {
                const maxScroll = Math.max(1, scroller.scrollHeight - scroller.clientHeight);
                return Math.min(1, Math.max(0, scroller.scrollTop / maxScroll));
            }
            const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            return Math.min(1, Math.max(0, window.scrollY / maxScroll));
        };

        // --- Animation Loop ---
        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            const time = Date.now() * 0.001;
            const scrollBoost = getScrollProgress();
            const p = Math.min(scrollBoost * 1.4, 1);
            const waveAmplitude = 0.12 + p * 0.6;
            scrollProgressRef.current = scrollBoost;

            // Scatter -> Reform morph with a subtle wave
            const positions = particlesGeometry.attributes.position.array;
            const t = morph.t;
            for (let i = 0; i < particlesCount; i++) {
                const i3 = i * 3;
                const sx = scatterPositions[i3];
                const sy = scatterPositions[i3 + 1];
                const sz = scatterPositions[i3 + 2];
                const tx = targetPositions[i3];
                const ty = targetPositions[i3 + 1];
                const tz = targetPositions[i3 + 2];

                const x = sx + (tx - sx) * t;
                const z = sz + (tz - sz) * t;
                positions[i3] = x;
                positions[i3 + 2] = z;
                positions[i3 + 1] = sy + (ty - sy) * t + Math.sin(time + x * 0.35) * waveAmplitude - 2;
            }
            particlesGeometry.attributes.position.needsUpdate = true;

            // Gentle rotation + cinematic drift
            particlesMesh.rotation.y = time * (0.03 + p * 0.08);
            particlesMesh.rotation.x = Math.sin(time * 0.12) * 0.04;

            const accent = getComputedStyle(document.documentElement)
                .getPropertyValue('--page-accent')
                .trim();
            const targetColor = accent ? new THREE.Color(accent) : null;

            particlesMesh.position.y = base.particleY + (target.particleY - base.particleY) * p;
            const scale = base.particleScale + (target.particleScale - base.particleScale) * p;
            particlesMesh.scale.set(scale, scale, scale);
            particlesMaterial.opacity = base.opacity + (target.opacity - base.opacity) * p + Math.sin(time * 1.1) * 0.04;
            if (targetColor) {
                particlesMaterial.color.lerp(targetColor, 0.2 + p * 0.6);
            } else {
                particlesMaterial.color.setRGB(
                    base.color.r + (target.color.r - base.color.r) * p,
                    base.color.g + (target.color.g - base.color.g) * p,
                    base.color.b + (target.color.b - base.color.b) * p
                );
            }
            camera.position.z = base.cameraZ + (target.cameraZ - base.cameraZ) * p;
            camera.rotation.z = base.cameraRotZ + (target.cameraRotZ - base.cameraRotZ) * p;
            scene.fog.density = base.fogDensity + (target.fogDensity - base.fogDensity) * p;
            bloomPass.strength = base.bloomStrength + (target.bloomStrength - base.bloomStrength) * p;
            bloomPass.radius = base.bloomRadius + (target.bloomRadius - base.bloomRadius) * p;

            composer.render();
        };

        animate();

        // --- Resize ---
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // --- Cleanup ---
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            morphTween.kill();
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            // Dispose
            renderer.dispose();
            composer.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            particlesMeshRef.current = null;
            particlesMaterialRef.current = null;
            bloomPassRef.current = null;
            cameraRef.current = null;
            sceneRef.current = null;
            setIsReady(false);
        };
    }, []);

    useEffect(() => {
        // Keep this effect to re-sync on route changes.
        if (!isReady) return;
        scrollProgressRef.current = 0;
    }, [isReady, location.pathname]);

    return (
        <div
            ref={mountRef}
            className="fixed inset-0 pointer-events-none -z-10" // Global background
        />
    );
};

export default UnifiedBackground;
