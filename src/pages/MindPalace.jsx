import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════
   MIND PALACE — Castlevania-Inspired 3D Castle Exploration
   ═══════════════════════════════════════════════════════════════ */

// ── Room / Zone definitions ──────────────────────────────────
const ZONES = [
    {
        id: 'throne',
        label: 'Throne Room',
        subtitle: 'About & Brand',
        icon: '👑',
        color: 0x7c3aed,
        hex: '#7c3aed',
        x: 0, z: -60,
        content: {
            title: 'Isaac Reyes',
            subtitle: 'Green Beret · Design Operator · AI Studio Lead',
            body: 'Strategy is the design of a mission. Design is the strategy of commerce. I fuse Special Forces precision with award-winning creative direction to build brands, products, and AI-forward systems that scale.',
        },
    },
    {
        id: 'gallery',
        label: 'The Gallery',
        subtitle: 'Projects & Portfolio',
        icon: '🖼️',
        color: 0x10b981,
        hex: '#10b981',
        x: 40, z: -30,
        content: {
            title: 'Project Showroom',
            subtitle: 'Selected Works',
            body: 'Brand systems, product interfaces, marketing campaigns, and AI-enhanced creative work — crafted with operational discipline and modern visual craft.',
        },
    },
    {
        id: 'library',
        label: 'The Library',
        subtitle: 'Blog & i-Drive',
        icon: '📚',
        color: 0x3b82f6,
        hex: '#3b82f6',
        x: -40, z: -30,
        content: {
            title: 'The Archives',
            subtitle: 'Field Notes & Research',
            body: 'Tactical write-ups, design thinking essays, AI workflow guides, and operational insights from the intersection of Special Forces and creative technology.',
        },
    },
    {
        id: 'warroom',
        label: 'War Room',
        subtitle: 'Military History',
        icon: '⚔️',
        color: 0xef4444,
        hex: '#ef4444',
        x: 0, z: 30,
        content: {
            title: 'Career Ops Log',
            subtitle: '17.5 Years Special Forces',
            body: 'Camp Casey → Fort Bragg → Philippines → Afghanistan → Qatar → Texas. From Fire Direction Specialist to Green Beret Communications Sergeant to Counter-Terrorism Task Force Director.',
        },
    },
];

// ── Castle Geometry Helpers ──────────────────────────────────
const STONE_DARK = 0x2a2535;
const STONE_MID = 0x3d3650;
const STONE_LIGHT = 0x504868;
const FLOOR_COLOR = 0x1e1a28;
const TORCH_COLOR = 0xff8c42;

function createWall(w, h, d, x, y, z, color = STONE_MID) {
    const geo = new THREE.BoxGeometry(w, h, d);
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.1 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}

function createTorch(scene, x, y, z) {
    // Pole
    const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 1.2, 6),
        new THREE.MeshStandardMaterial({ color: 0x3d2b1f })
    );
    pole.position.set(x, y, z);
    scene.add(pole);

    // Flame glow (sphere)
    const flame = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xffaa55 })
    );
    flame.position.set(x, y + 0.7, z);
    scene.add(flame);

    // Inner glow halo
    const halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.45, 8, 8),
        new THREE.MeshBasicMaterial({ color: TORCH_COLOR, transparent: true, opacity: 0.25 })
    );
    halo.position.set(x, y + 0.7, z);
    scene.add(halo);

    // Point light — much brighter and farther reach
    const light = new THREE.PointLight(TORCH_COLOR, 3.5, 25);
    light.position.set(x, y + 0.8, z);
    scene.add(light);

    return { flame, light };
}

function createArch(scene, x, z, rotation = 0, width = 5, height = 5) {
    const group = new THREE.Group();
    // Left pillar
    group.add(createWall(0.8, height, 0.8, -width / 2 + 0.4, height / 2, 0, STONE_LIGHT));
    // Right pillar
    group.add(createWall(0.8, height, 0.8, width / 2 - 0.4, height / 2, 0, STONE_LIGHT));
    // Top beam
    group.add(createWall(width, 1, 0.9, 0, height - 0.5, 0, STONE_LIGHT));

    group.position.set(x, 0, z);
    group.rotation.y = rotation;
    scene.add(group);
}

function createRoom(scene, cx, cz, w, d, wallH = 6, openings = []) {
    const halfW = w / 2;
    const halfD = d / 2;

    // Floor
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(w, d),
        new THREE.MeshStandardMaterial({ color: FLOOR_COLOR, roughness: 0.95 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(cx, 0.01, cz);
    floor.receiveShadow = true;
    scene.add(floor);

    // Ceiling
    const ceil = new THREE.Mesh(
        new THREE.PlaneGeometry(w, d),
        new THREE.MeshStandardMaterial({ color: STONE_DARK, roughness: 0.9, side: THREE.DoubleSide })
    );
    ceil.rotation.x = Math.PI / 2;
    ceil.position.set(cx, wallH, cz);
    scene.add(ceil);

    const sides = [
        { dir: 'north', wx: w, wz: 0.6, px: cx, pz: cz - halfD },
        { dir: 'south', wx: w, wz: 0.6, px: cx, pz: cz + halfD },
        { dir: 'east', wx: 0.6, wz: d, px: cx + halfW, pz: cz },
        { dir: 'west', wx: 0.6, wz: d, px: cx - halfW, pz: cz },
    ];

    sides.forEach(s => {
        if (!openings.includes(s.dir)) {
            scene.add(createWall(s.wx, wallH, s.wz, s.px, wallH / 2, s.pz));
        } else {
            // Two half-walls with a gap in the middle for archway
            const isNS = (s.dir === 'north' || s.dir === 'south');
            if (isNS) {
                const segW = (w - 5) / 2;
                scene.add(createWall(segW, wallH, 0.6, cx - halfW + segW / 2, wallH / 2, s.pz));
                scene.add(createWall(segW, wallH, 0.6, cx + halfW - segW / 2, wallH / 2, s.pz));
                // Lintel above opening
                scene.add(createWall(5, 1, 0.6, cx, wallH - 0.5, s.pz, STONE_LIGHT));
            } else {
                const segD = (d - 5) / 2;
                scene.add(createWall(0.6, wallH, segD, s.px, wallH / 2, cz - halfD + segD / 2));
                scene.add(createWall(0.6, wallH, segD, s.px, wallH / 2, cz + halfD - segD / 2));
                scene.add(createWall(0.6, 1, 5, s.px, wallH - 0.5, cz, STONE_LIGHT));
            }
        }
    });
}

function createCorridor(scene, startX, startZ, endX, endZ, width = 5, height = 5) {
    const dx = endX - startX;
    const dz = endZ - startZ;
    const length = Math.sqrt(dx * dx + dz * dz);
    const angle = Math.atan2(dx, dz);
    const midX = (startX + endX) / 2;
    const midZ = (startZ + endZ) / 2;

    // Floor
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(width, length),
        new THREE.MeshStandardMaterial({ color: FLOOR_COLOR, roughness: 0.95 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.rotation.z = -angle;
    floor.position.set(midX, 0.02, midZ);
    floor.receiveShadow = true;
    scene.add(floor);

    // Ceiling
    const ceil = floor.clone();
    ceil.position.y = height;
    ceil.material = new THREE.MeshStandardMaterial({ color: STONE_DARK, roughness: 0.9, side: THREE.DoubleSide });
    scene.add(ceil);

    // Walls along the corridor
    const halfW = width / 2;
    const perpX = Math.cos(angle);
    const perpZ = -Math.sin(angle);

    // Left wall
    const lWall = createWall(0.6, height, length, 0, height / 2, 0);
    lWall.position.set(midX - perpX * halfW, height / 2, midZ - perpZ * halfW);
    lWall.rotation.y = angle;
    scene.add(lWall);

    // Right wall
    const rWall = createWall(0.6, height, length, 0, height / 2, 0);
    rWall.position.set(midX + perpX * halfW, height / 2, midZ + perpZ * halfW);
    rWall.rotation.y = angle;
    scene.add(rWall);

    // Torches along corridor
    const torches = [];
    const steps = Math.max(2, Math.floor(length / 10));
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const tx = startX + dx * t;
        const tz = startZ + dz * t;
        if (i % 2 === 0) {
            torches.push(createTorch(scene, tx + perpX * (halfW - 0.4), 2.5, tz + perpZ * (halfW - 0.4)));
        } else {
            torches.push(createTorch(scene, tx - perpX * (halfW - 0.4), 2.5, tz - perpZ * (halfW - 0.4)));
        }
    }
    return torches;
}

function createTower(scene, x, z, radius = 3, height = 12) {
    const geo = new THREE.CylinderGeometry(radius, radius + 0.3, height, 12);
    const mat = new THREE.MeshStandardMaterial({ color: STONE_MID, roughness: 0.85 });
    const tower = new THREE.Mesh(geo, mat);
    tower.position.set(x, height / 2, z);
    tower.castShadow = true;
    scene.add(tower);

    // Battlement ring
    const batCount = 8;
    for (let i = 0; i < batCount; i++) {
        const a = (i / batCount) * Math.PI * 2;
        const bx = x + Math.cos(a) * (radius + 0.2);
        const bz = z + Math.sin(a) * (radius + 0.2);
        scene.add(createWall(1.2, 1.5, 0.5, bx, height + 0.75, bz, STONE_LIGHT));
    }

    // Cone roof
    const roof = new THREE.Mesh(
        new THREE.ConeGeometry(radius + 0.5, 4, 12),
        new THREE.MeshStandardMaterial({ color: 0x2d1f3d, roughness: 0.7 })
    );
    roof.position.set(x, height + 2, z);
    scene.add(roof);
}

function createCharacter() {
    const group = new THREE.Group();

    // Body
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.9, 0.35),
        new THREE.MeshStandardMaterial({ color: 0x1a1a2e, roughness: 0.6 })
    );
    body.position.y = 1.1;
    body.castShadow = true;
    group.add(body);

    // Head
    const head = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.35, 0.35),
        new THREE.MeshStandardMaterial({ color: 0xd4a574, roughness: 0.8 })
    );
    head.position.y = 1.8;
    head.castShadow = true;
    group.add(head);

    // Cape
    const cape = new THREE.Mesh(
        new THREE.BoxGeometry(0.65, 0.85, 0.08),
        new THREE.MeshStandardMaterial({ color: 0x4c1d95, roughness: 0.5 })
    );
    cape.position.set(0, 1.1, 0.22);
    group.add(cape);

    // Left leg
    const lLeg = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.6, 0.25),
        new THREE.MeshStandardMaterial({ color: 0x1a1a2e })
    );
    lLeg.position.set(-0.15, 0.3, 0);
    lLeg.name = 'leftLeg';
    group.add(lLeg);

    // Right leg
    const rLeg = lLeg.clone();
    rLeg.position.set(0.15, 0.3, 0);
    rLeg.name = 'rightLeg';
    group.add(rLeg);

    // Left arm
    const lArm = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.7, 0.2),
        new THREE.MeshStandardMaterial({ color: 0x1a1a2e })
    );
    lArm.position.set(-0.42, 1.1, 0);
    lArm.name = 'leftArm';
    group.add(lArm);

    // Right arm
    const rArm = lArm.clone();
    rArm.position.set(0.42, 1.1, 0);
    rArm.name = 'rightArm';
    group.add(rArm);

    return group;
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
const MindPalace = () => {
    const containerRef = useRef(null);
    const cleanupRef = useRef(null);

    const buildScene = useCallback((container) => {
        const W = container.clientWidth;
        const H = container.clientHeight;

        // ── Core Three.js ──
        const scene = new THREE.Scene();
        const fogColor = new THREE.Color('#0e0a18');
        scene.background = fogColor;
        scene.fog = new THREE.Fog(fogColor, 20, 90);

        const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 200);
        const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.6;
        container.appendChild(renderer.domElement);

        // ── Lighting ──
        // Bright ambient so nothing is pitch-black
        const ambient = new THREE.HemisphereLight(0x4a3a6e, 0x1a1020, 1.0);
        scene.add(ambient);

        // General ambient fill
        const ambientFill = new THREE.AmbientLight(0x2a2040, 0.5);
        scene.add(ambientFill);

        const moonLight = new THREE.DirectionalLight(0x8888ff, 1.2);
        moonLight.position.set(30, 60, -40);
        moonLight.castShadow = true;
        moonLight.shadow.mapSize.width = 2048;
        moonLight.shadow.mapSize.height = 2048;
        moonLight.shadow.camera.near = 0.5;
        moonLight.shadow.camera.far = 150;
        moonLight.shadow.camera.left = -80;
        moonLight.shadow.camera.right = 80;
        moonLight.shadow.camera.top = 80;
        moonLight.shadow.camera.bottom = -80;
        scene.add(moonLight);

        // Second directional for fill from opposite side
        const fillLight = new THREE.DirectionalLight(0x6644aa, 0.6);
        fillLight.position.set(-30, 40, 30);
        scene.add(fillLight);

        // Character follow light — moves with the player
        const charLight = new THREE.PointLight(0xffd4a0, 2.5, 20);
        charLight.position.set(0, 3, 24);
        scene.add(charLight);

        // ── Ground plane ──
        const groundPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(300, 300),
            new THREE.MeshStandardMaterial({ color: 0x14101e, roughness: 0.95 })
        );
        groundPlane.rotation.x = -Math.PI / 2;
        groundPlane.receiveShadow = true;
        scene.add(groundPlane);

        // ══════════════════════════════════════════════
        // BUILD THE CASTLE
        // ══════════════════════════════════════════════
        const torches = [];

        // ── Courtyard (spawn area) ──
        createRoom(scene, 0, 20, 20, 16, 0.01, ['north']); // open-air
        // Courtyard walls (low)
        scene.add(createWall(20, 2, 0.5, 0, 1, 28, STONE_LIGHT)); // south wall
        scene.add(createWall(0.5, 2, 16, 10, 1, 20, STONE_LIGHT)); // east wall
        scene.add(createWall(0.5, 2, 16, -10, 1, 20, STONE_LIGHT)); // west wall
        // Gate
        createArch(scene, 0, 28, 0, 6, 4);
        torches.push(createTorch(scene, 4, 2, 28));
        torches.push(createTorch(scene, -4, 2, 28));
        torches.push(createTorch(scene, 8, 2, 20));
        torches.push(createTorch(scene, -8, 2, 20));

        // ── Grand Hall (central hub) ──
        createRoom(scene, 0, -5, 24, 20, 8, ['south', 'north', 'east', 'west']);
        // Pillars
        for (let i = -8; i <= 8; i += 4) {
            if (Math.abs(i) > 2) {
                scene.add(createWall(0.7, 8, 0.7, i, 4, -10, STONE_LIGHT));
                scene.add(createWall(0.7, 8, 0.7, i, 4, 0, STONE_LIGHT));
            }
        }
        // Torches on every pillar and wall
        torches.push(createTorch(scene, -11, 3, -12));
        torches.push(createTorch(scene, 11, 3, -12));
        torches.push(createTorch(scene, -11, 3, -8));
        torches.push(createTorch(scene, 11, 3, -8));
        torches.push(createTorch(scene, -11, 3, -2));
        torches.push(createTorch(scene, 11, 3, -2));
        torches.push(createTorch(scene, -11, 3, 2));
        torches.push(createTorch(scene, 11, 3, 2));
        // Hanging chandelier light in center of grand hall
        const chandelierLight = new THREE.PointLight(0xffc87a, 4, 30);
        chandelierLight.position.set(0, 7, -5);
        scene.add(chandelierLight);
        const chandelierGem = new THREE.Mesh(
            new THREE.SphereGeometry(0.3, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0xffc87a })
        );
        chandelierGem.position.set(0, 7, -5);
        scene.add(chandelierGem);

        // ── Corridor: Grand Hall → Throne Room (north) ──
        torches.push(...createCorridor(scene, 0, -15, 0, -45, 5, 6));

        // ── Throne Room (north) ──
        createRoom(scene, 0, -55, 18, 18, 8, ['south']);
        // Throne (big chair)
        scene.add(createWall(2.5, 4, 1, 0, 2, -62, 0x4c1d95));
        scene.add(createWall(3, 6, 0.5, 0, 3, -63, 0x3b0f7a));
        torches.push(createTorch(scene, -7, 3, -58));
        torches.push(createTorch(scene, 7, 3, -58));
        torches.push(createTorch(scene, -7, 3, -50));
        torches.push(createTorch(scene, 7, 3, -50));
        torches.push(createTorch(scene, -3, 3, -62));
        torches.push(createTorch(scene, 3, 3, -62));
        // Throne room chandelier
        const throneLight = new THREE.PointLight(0x9966ff, 3, 25);
        throneLight.position.set(0, 7, -55);
        scene.add(throneLight);

        // ── Corridor: Grand Hall → Gallery (east) ──
        torches.push(...createCorridor(scene, 12, -5, 30, -5, 5, 5));

        // ── Gallery Room (east) ──
        createRoom(scene, 42, -5, 20, 20, 6, ['west']);
        // Floating "painting" frames on walls
        const frameMat = new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0.15, roughness: 0.3 });
        for (let i = 0; i < 3; i++) {
            const frame = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 0.1), frameMat);
            frame.position.set(42 - 5 + i * 5, 3.5, -14.5);
            scene.add(frame);
        }
        for (let i = 0; i < 3; i++) {
            const frame = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 0.1), frameMat);
            frame.position.set(42 - 5 + i * 5, 3.5, 4.5);
            scene.add(frame);
        }
        torches.push(createTorch(scene, 34, 3, -12));
        torches.push(createTorch(scene, 50, 3, -12));
        torches.push(createTorch(scene, 34, 3, -5));
        torches.push(createTorch(scene, 50, 3, -5));
        torches.push(createTorch(scene, 34, 3, 2));
        torches.push(createTorch(scene, 50, 3, 2));
        // Gallery overhead light
        const galleryLight = new THREE.PointLight(0x10b981, 2.5, 25);
        galleryLight.position.set(42, 5.5, -5);
        scene.add(galleryLight);

        // ── Corridor: Grand Hall → Library (west) ──
        torches.push(...createCorridor(scene, -12, -5, -30, -5, 5, 5));

        // ── Library Room (west) ──
        createRoom(scene, -42, -5, 20, 20, 6, ['east']);
        // Bookshelves (tall boxes along walls)
        const shelfMat = new THREE.MeshStandardMaterial({ color: 0x2d1a0e, roughness: 0.9 });
        for (let i = 0; i < 4; i++) {
            const shelf = new THREE.Mesh(new THREE.BoxGeometry(3.5, 4.5, 0.8), shelfMat);
            shelf.position.set(-42 - 6 + i * 4, 2.5, -14.2);
            scene.add(shelf);
        }
        for (let i = 0; i < 4; i++) {
            const shelf = new THREE.Mesh(new THREE.BoxGeometry(3.5, 4.5, 0.8), shelfMat);
            shelf.position.set(-42 - 6 + i * 4, 2.5, 4.2);
            scene.add(shelf);
        }
        // Desk in the middle
        scene.add(createWall(3, 0.8, 2, -42, 0.9, -5, 0x3d2b1f));
        torches.push(createTorch(scene, -34, 3, -12));
        torches.push(createTorch(scene, -50, 3, -12));
        torches.push(createTorch(scene, -34, 3, -5));
        torches.push(createTorch(scene, -50, 3, -5));
        torches.push(createTorch(scene, -34, 3, 2));
        torches.push(createTorch(scene, -50, 3, 2));
        // Library warm overhead
        const libraryLight = new THREE.PointLight(0xffaa44, 2.5, 25);
        libraryLight.position.set(-42, 5.5, -5);
        scene.add(libraryLight);

        // ── Corridor: Courtyard → War Room (south) ──
        torches.push(...createCorridor(scene, 0, 28, 0, 45, 5, 5));

        // ── War Room (south) ──
        createRoom(scene, 0, 55, 18, 16, 6, ['north']);
        // War table
        scene.add(createWall(6, 0.8, 4, 0, 0.9, 55, 0x3d2b1f));
        // Map on table (green plane)
        const mapPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(5, 3),
            new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0.3 })
        );
        mapPlane.rotation.x = -Math.PI / 2;
        mapPlane.position.set(0, 1.35, 55);
        scene.add(mapPlane);
        torches.push(createTorch(scene, -7, 3, 50));
        torches.push(createTorch(scene, 7, 3, 50));
        torches.push(createTorch(scene, -7, 3, 60));
        torches.push(createTorch(scene, 7, 3, 60));
        torches.push(createTorch(scene, -3, 3, 55));
        torches.push(createTorch(scene, 3, 3, 55));
        // War room overhead
        const warLight = new THREE.PointLight(0xef4444, 2.5, 25);
        warLight.position.set(0, 5.5, 55);
        scene.add(warLight);

        // ── Corner Towers ──
        createTower(scene, -14, -17, 3, 14);
        createTower(scene, 14, -17, 3, 14);
        createTower(scene, -14, 10, 3, 10);
        createTower(scene, 14, 10, 3, 10);

        // ── Exterior battlements along grand hall ──
        for (let i = -10; i <= 10; i += 2.5) {
            scene.add(createWall(1.2, 1.5, 0.5, i, 8.75, -15.5, STONE_LIGHT));
        }

        // ══════════════════════════════════════════════
        // PARTICLE DUST
        // ══════════════════════════════════════════════
        const particleCount = 200;
        const particleGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 1] = Math.random() * 8;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
        }
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particles = new THREE.Points(
            particleGeo,
            new THREE.PointsMaterial({ color: 0x7c3aed, size: 0.06, transparent: true, opacity: 0.5 })
        );
        scene.add(particles);

        // ══════════════════════════════════════════════
        // CHARACTER
        // ══════════════════════════════════════════════
        const character = createCharacter();
        character.position.set(0, 0, 24);
        scene.add(character);

        // ══════════════════════════════════════════════
        // ZONE BEACONS
        // ══════════════════════════════════════════════
        ZONES.forEach(zone => {
            const beacon = new THREE.Mesh(
                new THREE.CylinderGeometry(0.08, 0.08, 10, 6),
                new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.15 })
            );
            beacon.position.set(zone.x, 5, zone.z);
            scene.add(beacon);

            const ring = new THREE.Mesh(
                new THREE.RingGeometry(2.5, 2.8, 24),
                new THREE.MeshBasicMaterial({ color: zone.color, side: THREE.DoubleSide, transparent: true, opacity: 0.5 })
            );
            ring.rotation.x = -Math.PI / 2;
            ring.position.set(zone.x, 0.05, zone.z);
            scene.add(ring);

            const pl = new THREE.PointLight(zone.color, 1.5, 18);
            pl.position.set(zone.x, 3, zone.z);
            scene.add(pl);
        });

        // ══════════════════════════════════════════════
        // GAME STATE & CONTROLS
        // ══════════════════════════════════════════════
        const state = {
            speed: 0,
            angle: Math.PI,
            keys: { w: false, a: false, s: false, d: false },
            activeZone: null,
            modalOpen: false,
            walkCycle: 0,
        };

        // ── Movement tuning (much more responsive) ──
        const ACCEL = 0.035;
        const FRICTION = 0.88;
        const MAX_SPEED = 0.32;
        const ROT_SPEED = 0.055;
        const PLAYER_RADIUS = 0.5; // collision padding

        // Keyboard
        const onKeyDown = (e) => {
            if (state.modalOpen) {
                if (e.key === 'Escape') closeModal();
                return;
            }
            const k = e.key.toLowerCase();
            if (state.keys.hasOwnProperty(k)) { state.keys[k] = true; e.preventDefault(); }
            if ((e.key === 'Enter' || e.key === ' ') && state.activeZone) { openModal(state.activeZone); e.preventDefault(); }
        };
        const onKeyUp = (e) => {
            const k = e.key.toLowerCase();
            if (state.keys.hasOwnProperty(k)) state.keys[k] = false;
        };
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);

        // Mobile controls
        const setupMobileBtn = (id, key) => {
            const btn = document.getElementById(id);
            if (!btn) return;
            const press = (e) => { e.preventDefault(); state.keys[key] = true; };
            const release = (e) => { e.preventDefault(); state.keys[key] = false; };
            btn.addEventListener('touchstart', press, { passive: false });
            btn.addEventListener('touchend', release);
            btn.addEventListener('mousedown', press);
            btn.addEventListener('mouseup', release);
        };
        setupMobileBtn('mp-btn-up', 'w');
        setupMobileBtn('mp-btn-down', 's');
        setupMobileBtn('mp-btn-left', 'a');
        setupMobileBtn('mp-btn-right', 'd');

        // ── UI element refs ──
        const alertEl = document.getElementById('mp-proximity-alert');
        const coordsEl = document.getElementById('mp-coords');
        const modalBg = document.getElementById('mp-modal-bg');
        const modalTitle = document.getElementById('mp-modal-title');
        const modalSub = document.getElementById('mp-modal-subtitle');
        const modalBody = document.getElementById('mp-modal-body');
        const modalColor = document.getElementById('mp-modal-color');
        const roomLabel = document.getElementById('mp-room-label');

        function openModal(zoneId) {
            const zone = ZONES.find(z => z.id === zoneId);
            if (!zone || !modalBg) return;
            state.modalOpen = true;
            state.speed = 0;
            modalTitle.textContent = zone.content.title;
            modalSub.textContent = zone.content.subtitle;
            modalBody.textContent = zone.content.body;
            modalColor.style.background = `linear-gradient(90deg, ${zone.hex}, transparent)`;
            modalBg.classList.remove('hidden');
            modalBg.classList.remove('opacity-0');
        }

        function closeModal() {
            if (!modalBg) return;
            modalBg.classList.add('opacity-0');
            setTimeout(() => {
                modalBg.classList.add('hidden');
                state.modalOpen = false;
            }, 300);
        }

        const closeBtn = document.getElementById('mp-modal-close');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (modalBg) modalBg.addEventListener('click', (e) => { if (e.target === modalBg) closeModal(); });

        // ══════════════════════════════════════════════
        // WALL COLLISION SYSTEM
        // ══════════════════════════════════════════════
        // Each wall is an AABB { minX, maxX, minZ, maxZ }
        // We inflate thin walls by PLAYER_RADIUS on each side
        const P = PLAYER_RADIUS;
        const walls = [];
        function addWallBox(cx, cz, halfW, halfD) {
            walls.push({ minX: cx - halfW - P, maxX: cx + halfW + P, minZ: cz - halfD - P, maxZ: cz + halfD + P });
        }

        // Helper: add wall segment with a doorway gap in the middle
        // orientation: 'h' = horizontal (long along X), 'v' = vertical (long along Z)
        function addWallWithDoor(cx, cz, totalLen, thickness, orientation, doorWidth = 5) {
            const segLen = (totalLen - doorWidth) / 2;
            const halfThick = thickness / 2;
            if (orientation === 'h') {
                // left segment
                addWallBox(cx - totalLen / 2 + segLen / 2, cz, segLen / 2, halfThick);
                // right segment
                addWallBox(cx + totalLen / 2 - segLen / 2, cz, segLen / 2, halfThick);
            } else {
                // top segment
                addWallBox(cx, cz - totalLen / 2 + segLen / 2, halfThick, segLen / 2);
                // bottom segment
                addWallBox(cx, cz + totalLen / 2 - segLen / 2, halfThick, segLen / 2);
            }
        }

        // ── Courtyard low walls ──
        // South wall with gate gap
        addWallWithDoor(0, 28, 20, 0.5, 'h', 6);
        // East wall
        addWallBox(10, 20, 0.25, 8);
        // West wall
        addWallBox(-10, 20, 0.25, 8);

        // ── Grand Hall (cx=0, cz=-5, w=24, d=20) ──
        // North wall (with door at center)
        addWallWithDoor(0, -15, 24, 0.6, 'h');
        // South wall (with door at center)
        addWallWithDoor(0, 5, 24, 0.6, 'h');
        // East wall (with door at center)
        addWallWithDoor(12, -5, 20, 0.6, 'v');
        // West wall (with door at center)
        addWallWithDoor(-12, -5, 20, 0.6, 'v');

        // ── Corridor: Grand Hall → Throne Room (x=0, z=-15 to z=-45, width=5) ──
        addWallBox(-2.5, -30, 0.3, 15);  // left wall
        addWallBox(2.5, -30, 0.3, 15);   // right wall

        // ── Throne Room (cx=0, cz=-55, w=18, d=18) ──
        // South wall (with door)
        addWallWithDoor(0, -46, 18, 0.6, 'h');
        // North wall (solid)
        addWallBox(0, -64, 9, 0.3);
        // East wall (solid)
        addWallBox(9, -55, 0.3, 9);
        // West wall (solid)
        addWallBox(-9, -55, 0.3, 9);
        // Throne furniture
        addWallBox(0, -62, 1.25, 0.5);

        // ── Corridor: Grand Hall → Gallery (x=12 to x=30, z=-5, width=5) ──
        addWallBox(21, -2.5, 9, 0.3);  // top wall
        addWallBox(21, -7.5, 9, 0.3);  // bottom wall

        // ── Gallery Room (cx=42, cz=-5, w=20, d=20) ──
        // West wall (with door)
        addWallWithDoor(32, -5, 20, 0.6, 'v');
        // North wall (solid)
        addWallBox(42, -15, 10, 0.3);
        // South wall (solid)
        addWallBox(42, 5, 10, 0.3);
        // East wall (solid)
        addWallBox(52, -5, 0.3, 10);

        // ── Corridor: Grand Hall → Library (x=-12 to x=-30, z=-5, width=5) ──
        addWallBox(-21, -2.5, 9, 0.3);  // top wall
        addWallBox(-21, -7.5, 9, 0.3);  // bottom wall

        // ── Library Room (cx=-42, cz=-5, w=20, d=20) ──
        // East wall (with door)
        addWallWithDoor(-32, -5, 20, 0.6, 'v');
        // North wall (solid)
        addWallBox(-42, -15, 10, 0.3);
        // South wall (solid)
        addWallBox(-42, 5, 10, 0.3);
        // West wall (solid)
        addWallBox(-52, -5, 0.3, 10);
        // Bookshelves
        for (let i = 0; i < 4; i++) {
            addWallBox(-42 - 6 + i * 4, -14.2, 1.75, 0.4);
            addWallBox(-42 - 6 + i * 4, 4.2, 1.75, 0.4);
        }
        // Desk
        addWallBox(-42, -5, 1.5, 1);

        // ── Corridor: Courtyard → War Room (x=0, z=28 to z=45, width=5) ──
        addWallBox(-2.5, 36.5, 0.3, 8.5);  // left wall
        addWallBox(2.5, 36.5, 0.3, 8.5);   // right wall

        // ── War Room (cx=0, cz=55, w=18, d=16) ──
        // North wall (with door)
        addWallWithDoor(0, 47, 18, 0.6, 'h');
        // South wall (solid)
        addWallBox(0, 63, 9, 0.3);
        // East wall (solid)
        addWallBox(9, 55, 0.3, 8);
        // West wall (solid)
        addWallBox(-9, 55, 0.3, 8);
        // War table
        addWallBox(0, 55, 3, 2);

        // ── Corner towers (cylindrical collision) ──
        const towerColliders = [
            { x: -14, z: -17, r: 3 },
            { x: 14, z: -17, r: 3 },
            { x: -14, z: 10, r: 3 },
            { x: 14, z: 10, r: 3 },
        ];

        function checkCollision(x, z) {
            // World bounds
            if (x < -55 || x > 55 || z < -68 || z > 68) return true;

            // AABB wall collision
            for (const w of walls) {
                if (x >= w.minX && x <= w.maxX && z >= w.minZ && z <= w.maxZ) return true;
            }

            // Tower collision (circle)
            for (const t of towerColliders) {
                const dx = x - t.x;
                const dz = z - t.z;
                if (dx * dx + dz * dz < (t.r + P) * (t.r + P)) return true;
            }

            return false;
        }

        // ══════════════════════════════════════════════
        // ANIMATION LOOP
        // ══════════════════════════════════════════════
        let animId;
        const clock = new THREE.Clock();

        function animate() {
            animId = requestAnimationFrame(animate);
            const dt = clock.getDelta();
            const elapsed = clock.elapsedTime;

            if (!state.modalOpen) {
                // ── Turning (always allowed, even while standing still) ──
                if (state.keys.a) state.angle += ROT_SPEED;
                if (state.keys.d) state.angle -= ROT_SPEED;

                // ── Forward / backward acceleration ──
                if (state.keys.w) state.speed += ACCEL;
                if (state.keys.s) state.speed -= ACCEL * 0.7;
                state.speed *= FRICTION;
                state.speed = Math.max(-MAX_SPEED * 0.5, Math.min(MAX_SPEED, state.speed));
                if (Math.abs(state.speed) < 0.003) state.speed = 0;

                const moveX = -Math.sin(state.angle) * state.speed;
                const moveZ = -Math.cos(state.angle) * state.speed;
                const newX = character.position.x + moveX;
                const newZ = character.position.z + moveZ;

                // Slide along walls: try full move, then X-only, then Z-only
                if (!checkCollision(newX, newZ)) {
                    character.position.x = newX;
                    character.position.z = newZ;
                } else if (!checkCollision(newX, character.position.z)) {
                    character.position.x = newX;
                    state.speed *= 0.5;
                } else if (!checkCollision(character.position.x, newZ)) {
                    character.position.z = newZ;
                    state.speed *= 0.5;
                } else {
                    state.speed = 0;
                }
                character.rotation.y = state.angle;

                // Walking animation
                if (Math.abs(state.speed) > 0.01) {
                    state.walkCycle += dt * 10;
                    const swing = Math.sin(state.walkCycle) * 0.4;
                    const lLeg = character.getObjectByName('leftLeg');
                    const rLeg = character.getObjectByName('rightLeg');
                    const lArm = character.getObjectByName('leftArm');
                    const rArm = character.getObjectByName('rightArm');
                    if (lLeg) lLeg.rotation.x = swing;
                    if (rLeg) rLeg.rotation.x = -swing;
                    if (lArm) lArm.rotation.x = -swing * 0.6;
                    if (rArm) rArm.rotation.x = swing * 0.6;
                } else {
                    // Reset pose
                    ['leftLeg', 'rightLeg', 'leftArm', 'rightArm'].forEach(name => {
                        const part = character.getObjectByName(name);
                        if (part) part.rotation.x *= 0.85;
                    });
                }

                // Camera follow
                const camOffset = new THREE.Vector3(0, 5, 8);
                camOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), state.angle);
                camOffset.add(character.position);
                camera.position.lerp(camOffset, 0.08);

                const lookTarget = new THREE.Vector3(0, 1.5, -5);
                lookTarget.applyAxisAngle(new THREE.Vector3(0, 1, 0), state.angle);
                lookTarget.add(character.position);
                camera.lookAt(lookTarget);

                // Move character follow light
                charLight.position.set(character.position.x, 3.5, character.position.z);
            }

            // Torch flicker
            torches.forEach(({ flame, light }, i) => {
                const flicker = 0.9 + Math.sin(elapsed * 8 + i * 2.3) * 0.15 + Math.sin(elapsed * 13 + i * 1.7) * 0.08;
                light.intensity = 3.5 * flicker;
                flame.scale.setScalar(0.9 + flicker * 0.25);
            });

            // Particle drift
            const pAttr = particleGeo.attributes.position;
            for (let i = 0; i < particleCount; i++) {
                pAttr.array[i * 3 + 1] += Math.sin(elapsed + i) * 0.002;
                if (pAttr.array[i * 3 + 1] > 8) pAttr.array[i * 3 + 1] = 0.5;
            }
            pAttr.needsUpdate = true;

            // Proximity detection
            let nearZone = null;
            let nearDist = Infinity;
            ZONES.forEach(zone => {
                const dist = Math.hypot(character.position.x - zone.x, character.position.z - zone.z);
                if (dist < 8 && dist < nearDist) {
                    nearZone = zone.id;
                    nearDist = dist;
                }
            });

            if (nearZone !== state.activeZone) {
                state.activeZone = nearZone;
                if (alertEl) {
                    alertEl.style.opacity = nearZone ? '1' : '0';
                    alertEl.style.transform = nearZone ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.9)';
                }
            }

            // Room label
            if (roomLabel) {
                const zone = ZONES.find(z => z.id === nearZone);
                if (zone) {
                    roomLabel.textContent = `${zone.icon} ${zone.label}`;
                    roomLabel.style.opacity = '1';
                    roomLabel.style.color = zone.hex;
                } else {
                    roomLabel.style.opacity = '0';
                }
            }

            // Coords
            if (coordsEl) {
                coordsEl.textContent = `X:${Math.round(character.position.x)} Z:${Math.round(character.position.z)}`;
            }

            renderer.render(scene, camera);
        }

        animate();

        // ── Resize ──
        const onResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', onResize);

        // ── Cleanup ──
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
            window.removeEventListener('resize', onResize);
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;
        cleanupRef.current = buildScene(containerRef.current);
        return () => { if (cleanupRef.current) cleanupRef.current(); };
    }, [buildScene]);

    return (
        <div className="flex-1 overflow-hidden h-full relative bg-[#0a0810]" data-scroll-container>
            {/* 3D Canvas container */}
            <div ref={containerRef} className="absolute inset-0 z-0" />

            {/* ── HUD Overlay ── */}
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-5">
                {/* Top bar */}
                <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col gap-1 pointer-events-auto">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                            <h1 className="text-xs font-bold tracking-widest text-white uppercase font-mono">
                                Mind Palace
                            </h1>
                        </div>
                        <div className="text-[10px] text-white/40 tracking-wider font-mono" id="mp-coords">
                            X:0 Z:24
                        </div>
                        <div
                            id="mp-room-label"
                            className="text-sm font-bold uppercase tracking-wider mt-1 transition-opacity duration-300"
                            style={{ opacity: 0 }}
                        />
                    </div>

                    {/* Controls hint (desktop) */}
                    <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-3 max-w-[180px] text-right pointer-events-auto hidden md:block">
                        <p className="text-[9px] uppercase text-white/40 tracking-widest mb-2 font-mono">
                            Walk Controls
                        </p>
                        <div className="flex justify-end gap-1 mb-1">
                            <div className="w-7 h-7 rounded bg-white/10 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/70">
                                W
                            </div>
                        </div>
                        <div className="flex justify-end gap-1">
                            <div className="w-7 h-7 rounded bg-white/10 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/70">
                                A
                            </div>
                            <div className="w-7 h-7 rounded bg-white/10 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/70">
                                S
                            </div>
                            <div className="w-7 h-7 rounded bg-white/10 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/70">
                                D
                            </div>
                        </div>
                    </div>
                </div>

                {/* Proximity prompt */}
                <div
                    id="mp-proximity-alert"
                    className="absolute top-2/3 left-1/2 flex flex-col items-center transition-all duration-300 pointer-events-none"
                    style={{ opacity: 0, transform: 'translate(-50%, -50%) scale(0.9)' }}
                >
                    <div className="bg-white text-black px-5 py-2.5 rounded-full text-xs font-bold tracking-wide flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                        <span className="animate-bounce">↵</span>
                        Press ENTER to Explore
                    </div>
                </div>

                {/* Mobile touch controls */}
                <div className="md:hidden flex justify-between items-end w-full pb-4 pointer-events-auto">
                    <div className="flex gap-3">
                        <button
                            id="mp-btn-left"
                            className="w-14 h-14 rounded-full bg-black/60 border border-white/10 active:bg-white/10 backdrop-blur flex items-center justify-center text-white text-lg"
                        >
                            ←
                        </button>
                        <button
                            id="mp-btn-right"
                            className="w-14 h-14 rounded-full bg-black/60 border border-white/10 active:bg-white/10 backdrop-blur flex items-center justify-center text-white text-lg"
                        >
                            →
                        </button>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button
                            id="mp-btn-up"
                            className="w-14 h-14 rounded-full bg-black/60 border border-white/10 active:bg-white/10 backdrop-blur flex items-center justify-center text-white text-lg"
                        >
                            ↑
                        </button>
                        <button
                            id="mp-btn-down"
                            className="w-14 h-14 rounded-full bg-black/60 border border-white/10 active:bg-white/10 backdrop-blur flex items-center justify-center text-white text-lg"
                        >
                            ↓
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Modal Overlay ── */}
            <div
                id="mp-modal-bg"
                className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md hidden flex items-center justify-center p-4 transition-opacity duration-300 cursor-pointer"
            >
                <div
                    className="w-full max-w-2xl bg-[#0d0b14] border border-white/10 rounded-xl shadow-2xl overflow-hidden cursor-default"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div id="mp-modal-color" className="h-1 w-full" />
                    <div className="p-8">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h2 id="mp-modal-title" className="text-xl font-bold text-white tracking-tight" />
                                <p id="mp-modal-subtitle" className="text-xs text-white/40 mt-1 uppercase tracking-widest font-mono" />
                            </div>
                            <button
                                id="mp-modal-close"
                                className="text-white/40 hover:text-white transition-colors text-xl pointer-events-auto"
                            >
                                ✕
                            </button>
                        </div>
                        <p id="mp-modal-body" className="text-sm text-white/60 leading-relaxed" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MindPalace;
