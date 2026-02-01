import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Globe from 'three-globe';

const PIN_LOCATIONS = [
    { name: 'Boerne, TX', lat: 29.7947, lng: -98.7319 },
    { name: 'Lacey, WA', lat: 47.0343, lng: -122.8232 }
];

const buildPointCloud = (count) => {
    return Array.from({ length: count }, () => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        size: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.6 ? 'rgba(125,211,252,0.55)' : 'rgba(255,255,255,0.35)'
    }));
};

const GLOBE_RADIUS = 100;

const latLngToVec3 = (lat, lng, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
};

const buildArc = (start, end, radius) => {
    const startVec = latLngToVec3(start.lat, start.lng, radius);
    const endVec = latLngToVec3(end.lat, end.lng, radius);
    const midVec = startVec.clone().add(endVec).multiplyScalar(0.5);
    midVec.setLength(radius * 1.35);
    const curve = new THREE.CatmullRomCurve3([startVec, midVec, endVec]);
    const points = curve.getPoints(64);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
        color: 0x7dd3fc,
        transparent: true,
        opacity: 0.65
    });
    return new THREE.Line(geometry, material);
};

const GlobePins = () => {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const globeRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const frameRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        camera.position.z = 280;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        rendererRef.current = renderer;
        sceneRef.current = scene;
        cameraRef.current = camera;

        const globe = new Globe()
            .globeImageUrl('/globe.png')
            .atmosphereColor('rgba(99, 102, 241, 0.6)')
            .atmosphereAltitude(0.18)
            .pointsData(buildPointCloud(1400))
            .pointColor((d) => d.color)
            .pointAltitude(0.01)
            .pointRadius((d) => d.size * 0.4)
            .labelsData(PIN_LOCATIONS)
            .labelText('name')
            .labelSize(1.2)
            .labelDotRadius(0.6)
            .labelColor(() => 'rgba(255,255,255,0.9)')
            .labelAltitude(0.04);

        globe.scale.setScalar(GLOBE_RADIUS / 100);
        globeRef.current = globe;
        scene.add(globe);

        const globeMaterial = globe.globeMaterial();
        globeMaterial.color = new THREE.Color('#0b1020');
        globeMaterial.emissive = new THREE.Color('#1f2a44');
        globeMaterial.emissiveIntensity = 0.6;
        globeMaterial.shininess = 4;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        const directionalLight = new THREE.DirectionalLight(0x9fb5ff, 0.9);
        directionalLight.position.set(200, 200, 200);
        scene.add(ambientLight, directionalLight);

        const wireframeSphere = new THREE.Mesh(
            new THREE.SphereGeometry(GLOBE_RADIUS * 1.01, 36, 18),
            new THREE.MeshBasicMaterial({
                color: 0x8ab4ff,
                wireframe: true,
                transparent: true,
                opacity: 0.18
            })
        );
        scene.add(wireframeSphere);

        if (PIN_LOCATIONS.length >= 2) {
            const arcLine = buildArc(PIN_LOCATIONS[0], PIN_LOCATIONS[1], GLOBE_RADIUS);
            scene.add(arcLine);
        }

        const starsGeometry = new THREE.BufferGeometry();
        const starCount = 600;
        const starPositions = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount * 3; i += 3) {
            const radius = 700 + Math.random() * 400;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
            starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            starPositions[i + 2] = radius * Math.cos(phi);
        }
        starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 1.1,
            transparent: true,
            opacity: 0.5
        });
        const stars = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(stars);

        const handleResize = () => {
            if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
            const { clientWidth, clientHeight } = containerRef.current;
            rendererRef.current.setSize(clientWidth, clientHeight);
            cameraRef.current.aspect = clientWidth / clientHeight;
            cameraRef.current.updateProjectionMatrix();
        };

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(containerRef.current);
        handleResize();

        renderer.setClearColor(0x000000, 0);
        containerRef.current.appendChild(renderer.domElement);

        const animate = () => {
            if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !globeRef.current) return;
            globeRef.current.rotation.y += 0.0015;
            globeRef.current.rotation.x = Math.sin(Date.now() * 0.0002) * 0.04;
            wireframeSphere.rotation.y = globeRef.current.rotation.y;
            wireframeSphere.rotation.x = globeRef.current.rotation.x;
            stars.rotation.y += 0.00025;
            stars.rotation.x += 0.00015;
            rendererRef.current.render(sceneRef.current, cameraRef.current);
            frameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
            resizeObserver.disconnect();
            if (rendererRef.current) {
                rendererRef.current.dispose();
                rendererRef.current.domElement.remove();
            }
            starsGeometry.dispose();
            starsMaterial.dispose();
        };
    }, []);

    return <div ref={containerRef} className="w-full h-full" />;
};

export default GlobePins;
