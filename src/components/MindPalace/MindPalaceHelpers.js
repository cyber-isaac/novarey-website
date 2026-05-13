import * as THREE from 'three';

export const ZONES = [
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
            body: 'Brand systems, product interfaces, marketing campaigns, and AI-enhanced creative work. Crafted with operational discipline and modern visual craft.',
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
export const STONE_DARK = 0x2a2535;
export const STONE_MID = 0x3d3650;
export const STONE_LIGHT = 0x504868;
export const FLOOR_COLOR = 0x1e1a28;
export const TORCH_COLOR = 0xff8c42;

export function createWall(w, h, d, x, y, z, color = STONE_MID) {
    const geo = new THREE.BoxGeometry(w, h, d);
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.1 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}

export function createTorch(scene, x, y, z) {
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

export function createArch(scene, x, z, rotation = 0, width = 5, height = 5) {
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

export function createRoom(scene, cx, cz, w, d, wallH = 6, openings = []) {
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

export function createCorridor(scene, startX, startZ, endX, endZ, width = 5, height = 5) {
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

export function createTower(scene, x, z, radius = 3, height = 12) {
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

export function createCharacter() {
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
