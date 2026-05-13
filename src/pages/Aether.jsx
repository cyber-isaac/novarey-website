import React, { useEffect, useRef, useCallback, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

/* ═══════════════════════════════════════════════════════════════
   AETHER — Audio-Reactive Meditation & Particle Visualization
   ═══════════════════════════════════════════════════════════════ */

// ── Track Library ────────────────────────────────────────────
// Replace URLs with your Gumlet meditation audio URLs
const TRACKS = [
    {
        id: 'ethereal-drift',
        title: 'Ethereal Drift',
        artist: 'Ambient',
        duration: '∞',
        // Generative tone — no external URL needed
        type: 'generative',
        description: 'Procedurally generated ethereal tones',
    },
    {
        id: 'deep-resonance',
        title: 'Deep Resonance',
        artist: 'Ambient',
        duration: '∞',
        type: 'generative',
        description: 'Low frequency meditative pulses',
    },
    {
        id: 'crystal-rain',
        title: 'Crystal Rain',
        artist: 'Ambient',
        duration: '∞',
        type: 'generative',
        description: 'High shimmering crystalline textures',
    },
    {
        id: 'void-current',
        title: 'Void Current',
        artist: 'Ambient',
        duration: '∞',
        type: 'generative',
        description: 'Deep space ambient flow',
    },
    {
        id: 'siren',
        title: 'Siren',
        artist: 'Novarey',
        duration: '5:18',
        type: 'url',
        url: '/sirens.mp4',
        description: 'Original composition, haunting melodic drift',
    },
    {
        id: 'ascension',
        title: 'Ascension',
        artist: 'Novarey',
        duration: '3:05',
        type: 'url',
        url: 'https://video.gumlet.io/64b781e9fccf18bce9351dee/699d75e757a7b7f9b08cdf3b/main.mp4',
        description: 'Soaring ambient track for the ascension cross',
    },
];

const VIZ_MODES = [
    { name: 'Nebula', code: 'NEBULA CLOUD' },
    { name: 'Torus', code: 'QUANTUM TORUS' },
    { name: 'Cross', code: 'ASCENSION CROSS' },
    { name: 'Vortex', code: 'WARP VORTEX' },
    { name: 'Pyramid', code: 'ANCIENT PRISM' },
    { name: 'DNA', code: 'HELIX STRAND' },
    { name: 'Abduction', code: 'CLOSE ENCOUNTER' },
    { name: 'Jellyfish', code: 'DEEP DRIFT' },
];

const PALETTES = [
    { name: 'Cosmic', c1: '#818cf8', c2: '#2dd4bf' },
    { name: 'Aurora', c1: '#f472b6', c2: '#60a5fa' },
    { name: 'Solar', c1: '#fb923c', c2: '#e11d48' },
    { name: 'Forest', c1: '#22c55e', c2: '#06b6d4' },
];

const PARTICLE_SHAPES = [
    { name: 'Orb', code: 'SOFT GLOW' },
    { name: 'Facet', code: 'DIAMOND' },
    { name: 'Spark', code: 'STAR FIELD' },
    { name: 'Halo', code: 'RING LIGHT' },
    { name: 'Shard', code: 'CRYSTAL' },
];

// ── Generative Audio Engine ──────────────────────────────────
import { GenerativeAudio } from '../lib/audio/GenerativeAudio';
import { getVertexShader, FRAGMENT_SHADER, OUTPUT_SHADER } from '../lib/shaders/AetherShaders';


// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
const Aether = () => {
    const containerRef = useRef(null);
    const cleanupRef = useRef(null);
    const audioEngineRef = useRef(null);

    const [activeTrack, setActiveTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeMode, setActiveMode] = useState(0);
    const [activePalette, setActivePalette] = useState(0);
    const [activeParticleShape, setActiveParticleShape] = useState(0);
    const [visualIntensity, setVisualIntensity] = useState(1.15);
    const [volume, setVolume] = useState(0.3);
    const [showTrackList, setShowTrackList] = useState(false);
    const [showIntro, setShowIntro] = useState(true);

    // Refs for Three.js mutation from React callbacks
    const modeRef = useRef({ target: 0 });
    const paletteRef = useRef(0);
    const particleShapeRef = useRef(0);
    const intensityRef = useRef(1.15);

    const buildScene = useCallback((container) => {
        const W = container.clientWidth;
        const H = container.clientHeight;
        const isMobile = W < 768;
        const PARTICLE_COUNT = isMobile ? 35000 : 60000;

        // ── Core ──
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x030305, 0.015);
        scene.background = new THREE.Color(0x030305);

        const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
        camera.position.z = isMobile ? 40 : 28;

        const renderer = new THREE.WebGLRenderer({
            antialias: false,
            powerPreference: 'high-performance',
            alpha: false,
            stencil: false,
            depth: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(W, H);
        renderer.toneMapping = THREE.CineonToneMapping;
        renderer.toneMappingExposure = 1.2;
        container.appendChild(renderer.domElement);

        // ── Post Processing ──
        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(W, H), 1.5, 0.4, 0.85);
        bloomPass.threshold = 0.1;
        bloomPass.strength = 1.0;
        bloomPass.radius = 0.8;

        const finalPass = new ShaderPass(OUTPUT_SHADER);
        const composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);
        composer.addPass(finalPass);

        // ── Particle Geometry ──
        const geometry = new THREE.BufferGeometry();
        const indices = new Float32Array(PARTICLE_COUNT);
        const randoms = new Float32Array(PARTICLE_COUNT * 3);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            indices[i] = i;
            randoms[i * 3] = Math.random();
            randoms[i * 3 + 1] = Math.random();
            randoms[i * 3 + 2] = Math.random();
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(PARTICLE_COUNT * 3).fill(0), 3));
        geometry.setAttribute('aIndex', new THREE.BufferAttribute(indices, 1));
        geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));

        const palettes = PALETTES.map(p => ({
            c1: new THREE.Color(p.c1),
            c2: new THREE.Color(p.c2),
        }));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uMode: { value: 0 },
                uAudio: { value: 0 },
                uBass: { value: 0 },
                uMid: { value: 0 },
                uTreble: { value: 0 },
                uIntensity: { value: 1.15 },
                uParticleShape: { value: 0 },
                uMouse: { value: new THREE.Vector3(100, 0, -100) },
                uColor1: { value: palettes[0].c1.clone() },
                uColor2: { value: palettes[0].c2.clone() },
            },
            vertexShader: getVertexShader(PARTICLE_COUNT),
            fragmentShader: FRAGMENT_SHADER,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // ── Audio Engine ──
        const audioEngine = new GenerativeAudio();
        audioEngineRef.current = audioEngine;

        // ── State ──
        const mouseTarget = new THREE.Vector3(100, 0, -100);
        const mouseSmooth = new THREE.Vector3(100, 0, -100);
        const state = {
            time: 0,
            audioLevel: 0,
            bass: 0,
            mid: 0,
            treble: 0,
            mode: 0,
            cameraZ: isMobile ? 40 : 28,
        };

        // ── Animation Loop ──
        let animId;
        const clock = new THREE.Clock();
        const dataArray = new Uint8Array(128);
        const averageBand = (start, end) => {
            let total = 0;
            const count = Math.max(1, end - start);
            for (let i = start; i < end; i++) total += dataArray[i] || 0;
            return total / count / 255;
        };

        function animate() {
            animId = requestAnimationFrame(animate);
            const delta = clock.getDelta();
            state.time += delta;

            // Audio level from analyser
            const analyser = audioEngine.getAnalyser();
            if (analyser && audioEngine.playing) {
                analyser.getByteFrequencyData(dataArray);
                const bass = averageBand(0, 10);
                const mid = averageBand(10, 44);
                const treble = averageBand(44, 96);
                const avg = bass * 0.5 + mid * 0.32 + treble * 0.18;
                state.audioLevel += (avg - state.audioLevel) * 0.12;
                state.bass += (bass - state.bass) * 0.16;
                state.mid += (mid - state.mid) * 0.14;
                state.treble += (treble - state.treble) * 0.18;
            } else {
                state.audioLevel *= 0.95;
                state.bass *= 0.94;
                state.mid *= 0.94;
                state.treble *= 0.94;
            }
            material.uniforms.uAudio.value = state.audioLevel;
            material.uniforms.uBass.value = state.bass;
            material.uniforms.uMid.value = state.mid;
            material.uniforms.uTreble.value = state.treble;
            material.uniforms.uIntensity.value += (intensityRef.current - material.uniforms.uIntensity.value) * 0.08;
            material.uniforms.uParticleShape.value += (particleShapeRef.current - material.uniforms.uParticleShape.value) * 0.14;
            bloomPass.strength += ((1.0 + state.bass * 0.75 + state.treble * 0.35) - bloomPass.strength) * 0.08;

            // Mode transition
            const target = modeRef.current.target;
            if (Math.abs(state.mode - target) > 0.001) {
                state.mode += (target - state.mode) * 0.05;
            } else {
                state.mode = target;
            }
            material.uniforms.uMode.value = state.mode;

            // Time
            material.uniforms.uTime.value = state.time;
            finalPass.uniforms.uTime.value = state.time;
            finalPass.uniforms.uRGBShift.value = 0.0015 + state.treble * 0.006;

            // Color transition
            const pi = paletteRef.current;
            const targetC1 = palettes[pi].c1;
            const targetC2 = palettes[pi].c2;
            material.uniforms.uColor1.value.lerp(targetC1, 0.05);
            material.uniforms.uColor2.value.lerp(targetC2, 0.05);

            // Mouse smooth lerp
            mouseSmooth.lerp(mouseTarget, 0.08);
            material.uniforms.uMouse.value.copy(mouseSmooth);

            // Camera sway
            const zTarget = state.cameraZ + Math.sin(state.time * 0.3) * 3;
            camera.position.z += (zTarget - camera.position.z) * 0.02;
            camera.position.x = Math.sin(state.time * 0.15) * 2;
            camera.position.y = Math.cos(state.time * 0.1) * 2;
            camera.lookAt(0, 0, 0);

            composer.render();
        }

        animate();

        // ── Mouse interaction ──
        const onMouseMove = (e) => {
            // Convert screen coords to normalized device coords
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            // Project into approximate world space
            mouseTarget.set(x * 25, y * 18, 0);
        };
        const onMouseLeave = () => {
            mouseTarget.set(100, 0, -100); // Move far off screen
        };
        // Touch support
        const onTouchMove = (e) => {
            if (e.touches.length > 0) {
                const t = e.touches[0];
                const x = (t.clientX / window.innerWidth) * 2 - 1;
                const y = -(t.clientY / window.innerHeight) * 2 + 1;
                mouseTarget.set(x * 25, y * 18, 0);
            }
        };
        const onTouchEnd = () => {
            mouseTarget.set(100, 0, -100);
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseleave', onMouseLeave);
        window.addEventListener('touchmove', onTouchMove, { passive: true });
        window.addEventListener('touchend', onTouchEnd);

        // ── Resize ──
        const onResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            composer.setSize(w, h);
            state.cameraZ = w < 768 ? 40 : 28;
        };
        window.addEventListener('resize', onResize);

        // ── Screenshot ──
        window.__aetherCapture = () => {
            composer.render();
            const link = document.createElement('a');
            link.download = `aether-${Date.now()}.png`;
            link.href = renderer.domElement.toDataURL('image/png');
            link.click();
        };

        // ── Cleanup ──
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseleave', onMouseLeave);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
            delete window.__aetherCapture;
            // Dispose composer render targets
            if (composer) {
                composer.passes.forEach(pass => {
                    if (pass.dispose) pass.dispose();
                });
                composer.dispose();
            }
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;
        cleanupRef.current = buildScene(containerRef.current);
        return () => {
            if (cleanupRef.current) cleanupRef.current();
            if (audioEngineRef.current) audioEngineRef.current.destroy();
        };
    }, [buildScene]);

    // ── Audio Controls ──
    const handlePlayPause = async () => {
        const engine = audioEngineRef.current;
        if (!engine) return;
        if (isPlaying) {
            engine.stopAll();
            setIsPlaying(false);
        } else {
            await engine.resume();
            const track = TRACKS[activeTrack];
            if (track.type === 'url') {
                engine.playUrl(track.url, volume);
            } else {
                engine.playTrack(track.id, volume);
            }
            setIsPlaying(true);
        }
    };

    const handleTrackSelect = (idx) => {
        setActiveTrack(idx);
        setShowTrackList(false);
        const engine = audioEngineRef.current;
        if (engine && isPlaying) {
            const track = TRACKS[idx];
            if (track.type === 'url') {
                engine.playUrl(track.url, volume);
            } else {
                engine.playTrack(track.id, volume);
            }
        }
    };

    const handleModeSwitch = (idx) => {
        setActiveMode(idx);
        modeRef.current.target = idx;
    };

    const handlePaletteSwitch = (idx) => {
        setActivePalette(idx);
        paletteRef.current = idx;
    };

    const handleParticleShapeSwitch = (idx) => {
        setActiveParticleShape(idx);
        particleShapeRef.current = idx;
    };

    const handleIntensityChange = (e) => {
        const next = parseFloat(e.target.value);
        setVisualIntensity(next);
        intensityRef.current = next;
    };

    const handleVolumeChange = (e) => {
        const v = parseFloat(e.target.value);
        setVolume(v);
        if (audioEngineRef.current) audioEngineRef.current.setVolume(v);
    };

    return (
        <div className="flex-1 overflow-hidden h-full relative bg-[#030305]" data-scroll-container>
            {/* WebGL Canvas */}
            <div ref={containerRef} className="absolute inset-0 z-0" />

            {/* Scanlines + Vignette */}
            <div
                className="absolute inset-0 z-10 pointer-events-none opacity-30"
                style={{
                    background: 'linear-gradient(to bottom, transparent, transparent 50%, rgba(0,0,0,0.06) 50%, rgba(0,0,0,0.06))',
                    backgroundSize: '100% 4px',
                    mixBlendMode: 'overlay',
                }}
            />
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.7) 120%)' }}
            />

            {/* ── Intro Overlay ── */}
            {showIntro && (
                <div
                    className="absolute inset-0 z-30 flex items-center justify-center pointer-events-auto transition-all duration-1000"
                    style={{ background: 'radial-gradient(ellipse at center, rgba(3,3,5,0.85) 0%, rgba(3,3,5,0.6) 60%, rgba(3,3,5,0.3) 100%)' }}
                >
                    <div className="max-w-lg mx-4 text-center">
                        {/* Ambient glow behind text */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-64 h-64 rounded-full opacity-15 blur-3xl"
                                style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.6), rgba(129,140,248,0.3), transparent)' }}
                            />
                        </div>

                        {/* Title */}
                        <div className="relative">
                            <p className="hero-kicker text-cyan-400/60 mb-4">
                                Immersive experience
                            </p>
                            <h1 className="hero-title-compact text-white mb-2">
                                Aether
                            </h1>
                            <div className="w-12 h-px mx-auto bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mb-6" />

                            {/* Description */}
                            <p className="hero-copy text-white/50 mb-3 font-light">
                                A generative sound and light chamber for slowing down, resetting focus, and exploring a living visual system.
                            </p>
                            <p className="text-xs text-white/25 leading-relaxed mb-8 max-w-sm mx-auto">
                                Move your cursor through the particles. Play generative ambient audio.
                                Switch visualizations, particle shapes, and reactivity.
                            </p>

                            {/* Divider */}
                            <div className="flex items-center gap-3 justify-center mb-6">
                                <div className="w-8 h-px bg-white/10" />
                                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/20">
                                    Interactive Demo
                                </span>
                                <div className="w-8 h-px bg-white/10" />
                            </div>

                            {/* Showcase note */}
                            <p className="text-[11px] text-white/30 leading-relaxed mb-8 max-w-sm mx-auto">
                                This is also a live example of the audio-reactive particle simulations
                                and WebGL effects that can be integrated into any website or brand experience.
                            </p>

                            {/* CTA */}
                            <button
                                onClick={() => setShowIntro(false)}
                                className="group relative px-8 py-3 rounded-full border border-white/10
                                    bg-white/[0.03] backdrop-blur-md
                                    hover:border-cyan-400/30 hover:bg-cyan-400/[0.05]
                                    transition-all duration-500"
                            >
                                <span className="text-xs font-medium tracking-widest uppercase text-white/70 group-hover:text-cyan-300 transition-colors">
                                    Enter Aether
                                </span>
                                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.1), inset 0 0 30px rgba(6, 182, 212, 0.05)' }}
                                />
                            </button>

                            {/* Scroll hint */}
                            <div className="mt-8 flex flex-col items-center gap-2 opacity-30">
                                <div className="w-4 h-6 rounded-full border border-white/20 flex items-start justify-center p-1">
                                    <div className="w-0.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── HUD ── */}
            <div className={`absolute inset-0 z-20 flex flex-col justify-between p-4 md:p-6 transition-opacity duration-700 ${showIntro ? 'pointer-events-none opacity-0' : 'pointer-events-none opacity-100'}`}>
                {/* Top Bar */}
                <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col gap-2 pointer-events-auto">
                        <div className="flex items-center gap-3">
                            <div className="relative w-2 h-2">
                                <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-20" />
                                <div className="absolute inset-0 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                            </div>
                            <h1 className="hero-kicker text-white/90">
                                Aether<span className="opacity-40">.OS</span>
                            </h1>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-mono text-white/40 tracking-wider">
                            <span className="text-white/70">{VIZ_MODES[activeMode].code}</span>
                            <span className="w-px h-2 bg-white/10 hidden sm:inline" />
                            <span className="opacity-60 hidden sm:inline">
                                {PARTICLE_SHAPES[activeParticleShape].code}
                            </span>
                            <span className="w-px h-2 bg-white/10 hidden sm:inline" />
                            <span className="opacity-60 hidden sm:inline">
                                {window.innerWidth < 768 ? '35K' : '60K'} NODES
                            </span>
                        </div>
                    </div>

                    {/* Capture button */}
                    <button
                        onClick={() => window.__aetherCapture?.()}
                        className="pointer-events-auto w-8 h-8 md:w-9 md:h-9 rounded-md flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all"
                        title="Capture Screenshot"
                    >
                        <svg className="w-3.5 h-3.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <circle cx="12" cy="12" r="10" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </button>
                </div>

                {/* Bottom Controls */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-4 pointer-events-auto">
                    {/* Left: Sim Mode + Audio */}
                    <div className="flex flex-col gap-3 w-full md:w-auto max-w-[320px]">
                        {/* Track Info + Play */}
                        <div className="bg-black/50 backdrop-blur-xl border border-white/[0.06] rounded-xl p-3">
                            <div className="flex items-center justify-between gap-3 mb-3">
                                <div
                                    className="flex-1 cursor-pointer min-w-0"
                                    onClick={() => setShowTrackList(!showTrackList)}
                                >
                                    <p className="text-xs font-medium text-white truncate">
                                        {TRACKS[activeTrack].title}
                                    </p>
                                    <p className="text-[10px] text-white/30 font-mono truncate">
                                        {TRACKS[activeTrack].description}
                                    </p>
                                </div>
                                <button
                                    onClick={handlePlayPause}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0
                                        ${isPlaying
                                            ? 'bg-white/10 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                                            : 'bg-white/5 border border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    {isPlaying ? (
                                        <svg className="w-3.5 h-3.5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                                            <rect x="6" y="5" width="4" height="14" rx="1" />
                                            <rect x="14" y="5" width="4" height="14" rx="1" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4 text-white/70 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {/* Volume */}
                            <div className="flex items-center gap-2">
                                <svg className="w-3 h-3 text-white/30 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                                </svg>
                                <input
                                    type="range"
                                    min="0"
                                    max="0.6"
                                    step="0.01"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="flex-1 h-1 appearance-none bg-white/10 rounded-full outline-none
                                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400
                                        [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(6,182,212,0.5)]
                                        [&::-webkit-slider-thumb]:cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Track List (dropdown) */}
                        {showTrackList && (
                            <div className="bg-black/60 backdrop-blur-xl border border-white/[0.06] rounded-xl p-2 space-y-0.5">
                                <p className="text-[9px] uppercase tracking-[0.25em] text-white/30 px-2 py-1 font-mono">
                                    Meditation Tracks
                                </p>
                                {TRACKS.map((track, idx) => (
                                    <button
                                        key={track.id}
                                        onClick={() => handleTrackSelect(idx)}
                                        className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-left transition-all
                                            ${idx === activeTrack
                                                ? 'bg-white/[0.08] border border-white/10'
                                                : 'hover:bg-white/5 border border-transparent'
                                            }`}
                                    >
                                        <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-mono
                                            ${idx === activeTrack ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-white/30'}`}
                                        >
                                            {String(idx + 1).padStart(2, '0')}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className={`text-[11px] font-medium truncate ${idx === activeTrack ? 'text-white' : 'text-white/60'}`}>
                                                {track.title}
                                            </p>
                                            <p className="text-[9px] text-white/25 font-mono truncate">
                                                {track.description}
                                            </p>
                                        </div>
                                        {idx === activeTrack && isPlaying && (
                                            <div className="flex gap-0.5 items-end h-3">
                                                {[1, 2, 3].map(i => (
                                                    <div
                                                        key={i}
                                                        className="w-0.5 bg-cyan-400 rounded-full animate-pulse"
                                                        style={{
                                                            height: `${6 + i * 3}px`,
                                                            animationDelay: `${i * 0.15}s`,
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Particle Shape + Reactivity */}
                        <div className="bg-black/50 backdrop-blur-xl border border-white/[0.06] rounded-xl p-3">
                            <div className="flex items-center justify-between gap-2 mb-2.5 px-0.5">
                                <span className="text-[10px] font-medium uppercase tracking-widest text-white/50">
                                    Particle Shape
                                </span>
                                <span className="text-[9px] font-mono text-cyan-300/70">
                                    {PARTICLE_SHAPES[activeParticleShape].code}
                                </span>
                            </div>
                            <div className="grid grid-cols-5 gap-1.5">
                                {PARTICLE_SHAPES.map((shape, idx) => (
                                    <button
                                        key={shape.name}
                                        onClick={() => handleParticleShapeSwitch(idx)}
                                        className={`h-8 rounded-lg border text-[9px] font-medium transition-all
                                            ${idx === activeParticleShape
                                                ? 'border-cyan-300/40 bg-cyan-300/10 text-white'
                                                : 'border-transparent bg-white/[0.03] text-white/40 hover:border-white/10 hover:text-white/70'
                                            }`}
                                        title={shape.code}
                                    >
                                        {shape.name}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                                <span className="text-[9px] font-mono uppercase tracking-widest text-white/30">React</span>
                                <input
                                    type="range"
                                    min="0.45"
                                    max="1.8"
                                    step="0.01"
                                    value={visualIntensity}
                                    onChange={handleIntensityChange}
                                    className="flex-1 h-1 appearance-none bg-white/10 rounded-full outline-none
                                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-300
                                        [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(6,182,212,0.55)]
                                        [&::-webkit-slider-thumb]:cursor-pointer"
                                />
                                <span className="w-8 text-right text-[9px] font-mono text-white/35">
                                    {visualIntensity.toFixed(1)}
                                </span>
                            </div>
                        </div>

                        {/* Viz Mode Selector */}
                        <div className="bg-black/50 backdrop-blur-xl border border-white/[0.06] rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-2.5 px-0.5">
                                <svg className="w-3 h-3 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <rect x="4" y="4" width="16" height="16" rx="2" />
                                    <path d="M9 9h6v6H9z" />
                                </svg>
                                <span className="text-[10px] font-medium uppercase tracking-widest text-white/50">
                                    Simulation
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5">
                                {VIZ_MODES.map((mode, idx) => (
                                    <button
                                        key={mode.name}
                                        onClick={() => handleModeSwitch(idx)}
                                        className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-all border
                                            ${idx === activeMode
                                                ? 'bg-white/[0.08] border-white/10'
                                                : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10'
                                            }`}
                                    >
                                        <span className={`text-[10px] font-medium ${idx === activeMode ? 'text-white' : 'text-white/50'}`}>
                                            {mode.name}
                                        </span>
                                        <span className="text-[9px] font-mono text-white/20">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Palette + Credits */}
                    <div className="flex flex-row md:flex-col items-center md:items-end gap-3">
                        <div className="bg-black/50 backdrop-blur-xl border border-white/[0.06] p-1.5 rounded-full flex md:flex-col gap-2">
                            {PALETTES.map((pal, idx) => (
                                <button
                                    key={pal.name}
                                    onClick={() => handlePaletteSwitch(idx)}
                                    className={`w-6 h-6 rounded-full transition-transform duration-300 hover:scale-110
                                        ${idx === activePalette ? 'ring-2 ring-white/40 scale-110' : 'ring-1 ring-white/10'}`}
                                    style={{
                                        background: `linear-gradient(135deg, ${pal.c1}, ${pal.c2})`,
                                    }}
                                    title={pal.name}
                                />
                            ))}
                        </div>
                        <div className="hidden md:block text-[9px] font-mono text-right text-white/15 leading-tight">
                            <p>AETHER ENGINE V1.0</p>
                            <p className="mt-0.5">NOVAREY STUDIO</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aether;
