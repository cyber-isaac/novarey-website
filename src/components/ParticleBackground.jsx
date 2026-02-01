import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleBackground = ({ color }) => {
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const scrollProgressRef = useRef(0);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0D0C12, 0.02);

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2500;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 25;
        }

        particlesGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(posArray, 3)
        );

        // Particle color (default theme-based, or custom color prop)
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.04,
            color: color || 0xdc2626,
            transparent: true,
            opacity: 0.7,
            sizeAttenuation: true,
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        particlesMesh.position.y = -2;
        scene.add(particlesMesh);

        const applyThemeColor = () => {
            const root = document.querySelector('.theme-dark, .theme-light, .theme-amber');
            const themeClass = root ? Array.from(root.classList).find((cls) => cls.startsWith('theme-')) : 'theme-dark';

            const themeMap = {
                'theme-light': 0x0f1115,
                'theme-dark': 0xdc2626, // Red accent
                'theme-amber': 0xf59e0b
            };

            const fogMap = {
                'theme-light': 0xffffff, // White fog for light mode
                'theme-dark': 0x0D0C12,
                'theme-amber': 0x0c0a06
            };

            if (color) {
                particlesMaterial.color = new THREE.Color(color);
            } else {
                particlesMaterial.color = new THREE.Color(themeMap[themeClass] || 0xdc2626);
            }

            if (scene.fog) {
                scene.fog.color.setHex(fogMap[themeClass] !== undefined ? fogMap[themeClass] : 0x0D0C12);
            }
        };

        applyThemeColor();

        const rootObserverTarget = document.querySelector('.theme-dark, .theme-light, .theme-amber');
        const observer = new MutationObserver(applyThemeColor);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] });
        if (rootObserverTarget) {
            observer.observe(rootObserverTarget, { attributes: true, attributeFilter: ['class'] });
        }

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

        // Animation
        const animate = () => {
            animationRef.current = requestAnimationFrame(animate);

            const time = Date.now() * 0.001;
            const progress = getScrollProgress();
            scrollProgressRef.current = progress;
            const scrollBoost = Math.min(progress * 0.7, 0.7);
            const waveBoost = 0.45 + scrollBoost * 0.9;

            // Wave animation
            const positions = particlesGeometry.attributes.position.array;
            for (let i = 0; i < particlesCount; i++) {
                const x = positions[i * 3];
                const z = positions[i * 3 + 2];
                positions[i * 3 + 1] =
                    Math.sin(time + x * 0.5) * waveBoost +
                    Math.cos(time + z * 0.3) * (0.3 + scrollBoost * 0.2);
            }
            particlesGeometry.attributes.position.needsUpdate = true;

            // Slow rotation
            particlesMesh.rotation.y += 0.0003 + scrollBoost * 0.0007;
            particlesMaterial.opacity = 0.82 - scrollBoost * 0.16 + Math.sin(time * 1.2) * 0.035;

            renderer.render(scene, camera);
        };
        animate();

        // Resize handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            observer.disconnect();
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
        };
    }, [color]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 -z-10 pointer-events-none"
            style={{ background: 'transparent' }}
        />
    );
};

export default ParticleBackground;
