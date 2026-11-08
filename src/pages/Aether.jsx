import React, { useEffect, useRef, useCallback, useState } from 'react';
import { ArrowDown, Maximize2, Minimize2, Pause, Play, Camera, Volume2 } from 'lucide-react';
import '../styles/aether.css';
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
        duration: '8:00',
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
    const stageRef = useRef(null);
    const controlsRef = useRef(null);
    const captureRef = useRef(null);
    const audioEngineRef = useRef(null);
    const audioRequestRef = useRef(0);

    const [activeTrack, setActiveTrack] = useState(0);
    const [soundState, setSoundState] = useState('idle');
    const [audioError, setAudioError] = useState('');
    const [activeMode, setActiveMode] = useState(0);
    const [activePalette, setActivePalette] = useState(0);
    const [activeParticleShape, setActiveParticleShape] = useState(0);
    const [visualIntensity, setVisualIntensity] = useState(1.15);
    const [volume, setVolume] = useState(0.3);
    const [isTouring, setIsTouring] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [sceneError, setSceneError] = useState('');
    const [controlError, setControlError] = useState('');
    const [nodeCount, setNodeCount] = useState(0);
    const isPlaying = soundState === 'playing';
    const isLoadingAudio = soundState === 'loading';
    const soundStatus = audioError || (isLoadingAudio ? `Loading ${TRACKS[activeTrack].title}…` : '');

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
        setNodeCount(PARTICLE_COUNT);
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
                uPixelRatio: { value: renderer.getPixelRatio() },
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
        const audioEngine = audioEngineRef.current;

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
            const delta = Math.min(clock.getDelta(), 0.05);
            if (document.hidden) return;
            state.time += delta * (reducedMotion ? 0.2 : 1);

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

        // Map pointer interaction to the stage, including the sidebar offset.
        const stage = container.parentElement;
        const onPointerMove = (event) => {
            const rect = container.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            const halfHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
            mouseTarget.set(x * halfHeight * camera.aspect, y * halfHeight, 0);
        };
        const onPointerLeave = () => mouseTarget.set(100, 0, -100);
        stage.addEventListener('pointermove', onPointerMove);
        stage.addEventListener('pointerleave', onPointerLeave);
        stage.addEventListener('pointerup', onPointerLeave);

        // ── Resize ──
        const onResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            if (!w || !h) return;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            composer.setSize(w, h);
            state.cameraZ = w < 768 ? 40 : 28;
        };
        const resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(container);

        // ── Screenshot ──
        captureRef.current = () => {
            composer.render();
            const link = document.createElement('a');
            link.download = `aether-${Date.now()}.png`;
            link.href = renderer.domElement.toDataURL('image/png');
            link.click();
        };

        // ── Cleanup ──
        return () => {
            cancelAnimationFrame(animId);
            resizeObserver.disconnect();
            stage.removeEventListener('pointermove', onPointerMove);
            stage.removeEventListener('pointerleave', onPointerLeave);
            stage.removeEventListener('pointerup', onPointerLeave);
            captureRef.current = null;
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
        const engine = new GenerativeAudio();
        audioEngineRef.current = engine;
        let cleanupScene;
        try {
            if (containerRef.current) cleanupScene = buildScene(containerRef.current);
        } catch {
            setSceneError('The particle renderer could not start. Try reloading in a browser with WebGL enabled.');
        }
        return () => {
            audioRequestRef.current += 1;
            audioEngineRef.current = null;
            engine.destroy();
            cleanupScene?.();
        };
    }, [buildScene]);

    // ── Audio Controls ──
    const startTrack = async (idx) => {
        const engine = audioEngineRef.current;
        if (!engine) return;
        const track = TRACKS[idx];
        const request = ++audioRequestRef.current;
        const isCurrent = () => request === audioRequestRef.current;
        const reportError = () => {
            if (!isCurrent()) return;
            setSoundState('idle');
            setAudioError(`Couldn’t play ${track.title}. Try again or choose another track.`);
        };

        setAudioError('');
        setSoundState('loading');
        try {
            const started = track.type === 'url'
                ? await engine.playUrl(track.url, reportError)
                : await engine.playTrack(track.id);
            if (isCurrent() && started) setSoundState('playing');
        } catch {
            if (!isCurrent()) return;
            engine.stopAll();
            reportError();
        }
    };

    const handlePlayPause = () => {
        if (soundState === 'idle') {
            startTrack(activeTrack);
        } else {
            audioRequestRef.current += 1;
            audioEngineRef.current?.stopAll();
            setSoundState('idle');
        }
    };

    const handleTrackSelect = (idx) => {
        setActiveTrack(idx);
        if (soundState !== 'idle') startTrack(idx);
        else setAudioError('');
    };

    const handleModeSwitch = (idx) => {
        setIsTouring(false);
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

    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const onChange = () => { if (media.matches) setIsTouring(false); };
        onChange();
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, []);

    useEffect(() => {
        if (!isTouring || sceneError) return;
        const timer = setInterval(() => {
            if (document.hidden) return;
            setActiveMode(previous => {
                const next = (previous + 1) % VIZ_MODES.length;
                modeRef.current.target = next;
                return next;
            });
        }, 12000);
        return () => clearInterval(timer);
    }, [isTouring, sceneError]);

    useEffect(() => {
        const onChange = () => setIsFullscreen(document.fullscreenElement === stageRef.current);
        document.addEventListener('fullscreenchange', onChange);
        return () => document.removeEventListener('fullscreenchange', onChange);
    }, []);

    const toggleFullscreen = async () => {
        setControlError('');
        try {
            if (document.fullscreenElement) await document.exitFullscreen();
            else await stageRef.current.requestFullscreen();
        } catch { setControlError('Full screen is unavailable in this browser. The simulator still works here.'); }
    };

    const exploreControls = () => controlsRef.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
    });

    return (
        <div className="aether-page" data-scroll-container>
            <section ref={stageRef} className="aether-stage" aria-label="Aether particle simulator">
                <div ref={containerRef} className="aether-canvas" aria-hidden="true" />
                <div className="aether-stage-shade" />
                <header className="aether-introduction">
                    <p className="aether-eyebrow">NovaRey experiments / Interactive sound & light</p>
                    <h1>AETHER<span> / </span></h1>
                    <p className="aether-intro-copy">A living field of particles.<br />Shaped by motion. Moved by sound.</p>
                </header>
                <div className="aether-stage-actions">
                    <button type="button" onClick={() => captureRef.current?.()} disabled={!!sceneError} aria-label="Capture simulator image" title="Capture image"><Camera size={18} /></button>
                    <button type="button" onClick={toggleFullscreen} aria-label={isFullscreen ? 'Exit full screen' : 'Enter full screen'} title="Full screen">{isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}</button>
                </div>
                {sceneError && <p className="aether-render-error" role="alert">{sceneError}</p>}
                <div className="aether-stage-bottom">
                    <div className="aether-scene-caption">
                        <span className="aether-eyebrow">{isTouring ? 'Guided tour' : 'Your simulation'} · {String(activeMode + 1).padStart(2, '0')} / 08</span>
                        <h2 key={activeMode}>{VIZ_MODES[activeMode].name}</h2>
                        <p>Move your pointer or drag through the field.</p>
                    </div>
                    <div className="aether-stage-buttons">
                        <button type="button" onClick={() => setIsTouring(value => !value)} aria-pressed={isTouring} disabled={!!sceneError}>{isTouring ? <Pause size={16} /> : <Play size={16} />}{isTouring ? 'Pause tour' : 'Start tour'}</button>
                        <button type="button" onClick={handlePlayPause}><Volume2 size={16} />{isLoadingAudio ? 'Cancel sound' : isPlaying ? 'Stop sound' : 'Start sound'}</button>
                        {!isFullscreen && <button type="button" className="aether-primary-button" onClick={exploreControls}>Explore controls <ArrowDown size={16} /></button>}
                        {soundStatus && <p className="aether-stage-sound-status" aria-hidden="true">{soundStatus}</p>}
                    </div>
                </div>
            </section>

            <section ref={controlsRef} className="aether-controls" aria-labelledby="aether-controls-heading">
                <div className="aether-controls-heading">
                    <div><p className="aether-eyebrow">Make it your own</p><h2 id="aether-controls-heading">Shape the atmosphere.</h2></div>
                    <p>{nodeCount ? nodeCount.toLocaleString() : 'Loading'} particles · 8 formations · Sound starts only when you choose.</p>
                </div>
                {controlError && <p role="status" className="aether-control-error">{controlError}</p>}
                <div className="aether-control-grid">
                    <fieldset className="aether-control-card aether-formations">
                        <legend>01 / Formation</legend>
                        <p>Choose a form. The particles flow into place.</p>
                        <div className="aether-mode-grid">
                            {VIZ_MODES.map((mode, idx) => <button type="button" key={mode.name} onClick={() => handleModeSwitch(idx)} aria-pressed={activeMode === idx}><span>{String(idx + 1).padStart(2, '0')}</span>{mode.name}</button>)}
                        </div>
                    </fieldset>
                    <fieldset className="aether-control-card">
                        <legend>02 / Sound</legend>
                        <label htmlFor="aether-track">Soundtrack</label>
                        <select id="aether-track" value={activeTrack} onChange={event => handleTrackSelect(Number(event.target.value))}>
                            {TRACKS.map((track, idx) => <option key={track.id} value={idx}>{track.title}</option>)}
                        </select>
                        <p>{TRACKS[activeTrack].description}</p>
                        <button type="button" className="aether-audio-button" onClick={handlePlayPause}>{isPlaying || isLoadingAudio ? <Pause size={16} /> : <Play size={16} />}{isLoadingAudio ? 'Cancel audio' : isPlaying ? 'Stop audio' : 'Play audio'}</button>
                        <p role="status" className="aether-audio-status">{soundStatus}</p>
                        <label htmlFor="aether-volume" className="aether-range-label">Volume <output>{Math.round(volume / 0.6 * 100)}%</output></label>
                        <input id="aether-volume" type="range" min="0" max="0.6" step="0.01" value={volume} onChange={handleVolumeChange} />
                    </fieldset>
                    <fieldset className="aether-control-card">
                        <legend>03 / Color & texture</legend>
                        <div className="aether-palettes" aria-label="Color palette">
                            {PALETTES.map((pal, idx) => <button type="button" key={pal.name} onClick={() => handlePaletteSwitch(idx)} aria-pressed={activePalette === idx}><span style={{background: `linear-gradient(135deg, ${pal.c1}, ${pal.c2})`}} />{pal.name}</button>)}
                        </div>
                        <label htmlFor="aether-shape">Particle shape</label>
                        <select id="aether-shape" value={activeParticleShape} onChange={event => handleParticleShapeSwitch(Number(event.target.value))}>
                            {PARTICLE_SHAPES.map((shape, idx) => <option key={shape.name} value={idx}>{shape.name} — {shape.code}</option>)}
                        </select>
                        <label htmlFor="aether-intensity" className="aether-range-label">Reactivity <output>{visualIntensity.toFixed(2)}×</output></label>
                        <input id="aether-intensity" type="range" min="0.45" max="1.8" step="0.01" value={visualIntensity} onChange={handleIntensityChange} />
                    </fieldset>
                </div>
                <p className="aether-footnote">An interactive study in generative design, motion, and audio. Built by NovaRey.</p>
            </section>
        </div>
    );
};

export default Aether;
