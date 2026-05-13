import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ConstellationBackground = ({ color }) => {
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const scrollProgressRef = useRef(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0b0b12, 0.035);

        const camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 6;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        const particlesCount = 140;
        const maxConnections = 4;
        const connectDist = 2.8;
        const bounds = 5.5;

        const positions = new Float32Array(particlesCount * 3);
        const velocities = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * bounds * 2;
            positions[i3 + 1] = (Math.random() - 0.5) * bounds * 2;
            positions[i3 + 2] = (Math.random() - 0.5) * bounds * 2;

            velocities[i3] = (Math.random() - 0.5) * 0.0006;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.0006;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.0006;
        }

        const pointGeometry = new THREE.BufferGeometry();
        pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const pointMaterial = new THREE.PointsMaterial({
            size: 0.045,
            color: 0xff4d9d,
            transparent: true,
            opacity: 0.7
        });

        const points = new THREE.Points(pointGeometry, pointMaterial);
        scene.add(points);

        const maxSegments = particlesCount * maxConnections;
        const linePositions = new Float32Array(maxSegments * 2 * 3);
        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        lineGeometry.setDrawRange(0, 0);

        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xff4d9d,
            transparent: true,
            opacity: 0.22
        });

        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lines);

        const applyThemeColor = () => {
            if (color) {
                pointMaterial.color = new THREE.Color(color);
                lineMaterial.color = new THREE.Color(color);
                return;
            }

            const accent = getComputedStyle(document.documentElement)
                .getPropertyValue('--page-accent')
                .trim();
            if (accent) {
                pointMaterial.color = new THREE.Color(accent);
                lineMaterial.color = new THREE.Color(accent);
            }
        };

        applyThemeColor();
        const observer = new MutationObserver(applyThemeColor);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] });

        const mouse = new THREE.Vector2(0, 0);
        let frame = 0;
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

        const handleMouseMove = (event) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            mouse.set(x, y);
        };
        window.addEventListener('mousemove', handleMouseMove);
        const updateLines = () => {
            const connections = new Array(particlesCount).fill(0);
            let idx = 0;
            for (let i = 0; i < particlesCount; i++) {
                const i3 = i * 3;
                for (let j = i + 1; j < particlesCount; j++) {
                    if (connections[i] >= maxConnections && connections[j] >= maxConnections) {
                        continue;
                    }
                    const j3 = j * 3;
                    const dx = positions[i3] - positions[j3];
                    const dy = positions[i3 + 1] - positions[j3 + 1];
                    const dz = positions[i3 + 2] - positions[j3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                    if (dist < connectDist) {
                        linePositions[idx++] = positions[i3];
                        linePositions[idx++] = positions[i3 + 1];
                        linePositions[idx++] = positions[i3 + 2];
                        linePositions[idx++] = positions[j3];
                        linePositions[idx++] = positions[j3 + 1];
                        linePositions[idx++] = positions[j3 + 2];
                        connections[i] += 1;
                        connections[j] += 1;
                    }
                }
            }
            lineGeometry.setDrawRange(0, idx / 3);
            lineGeometry.attributes.position.needsUpdate = true;
        };

        const animate = () => {
            animationRef.current = requestAnimationFrame(animate);
            frame += 1;

            const scrollBoost = getScrollProgress();
            const easedScroll = scrollProgressRef.current + (scrollBoost - scrollProgressRef.current) * 0.015;
            scrollProgressRef.current = easedScroll;
            const drift = 0.0006;
            const mouseInfluence = 0.035;
            const time = Date.now() * 0.00008;

            points.rotation.y = time * 0.05;
            points.rotation.x = Math.sin(time * 0.12) * 0.015;
            lines.rotation.y = points.rotation.y;
            lines.rotation.x = points.rotation.x;
            pointMaterial.opacity = 0.65 + easedScroll * 0.1;
            lineMaterial.opacity = 0.18 + easedScroll * 0.1;

            for (let i = 0; i < particlesCount; i++) {
                const i3 = i * 3;
                positions[i3] += velocities[i3];
                positions[i3 + 1] += velocities[i3 + 1];
                positions[i3 + 2] += velocities[i3 + 2];

                const pullX = mouse.x * mouseInfluence;
                const pullY = mouse.y * mouseInfluence;
                positions[i3] += pullX * drift;
                positions[i3 + 1] += pullY * drift;

                if (positions[i3] > bounds || positions[i3] < -bounds) velocities[i3] *= -1;
                if (positions[i3 + 1] > bounds || positions[i3 + 1] < -bounds) velocities[i3 + 1] *= -1;
                if (positions[i3 + 2] > bounds || positions[i3 + 2] < -bounds) velocities[i3 + 2] *= -1;
            }

            pointGeometry.attributes.position.needsUpdate = true;
            if (frame % 24 === 0) {
                updateLines();
            }

            renderer.render(scene, camera);
        };

        updateLines();
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            observer.disconnect();
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            pointGeometry.dispose();
            lineGeometry.dispose();
            pointMaterial.dispose();
            lineMaterial.dispose();
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

export default ConstellationBackground;
