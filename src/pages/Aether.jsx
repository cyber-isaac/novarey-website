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
];

const VIZ_MODES = [
    { name: 'Nebula', code: 'NEBULA CLOUD' },
    { name: 'Torus', code: 'QUANTUM TORUS' },
    { name: 'Lattice', code: 'CYBER LATTICE' },
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

// ── Generative Audio Engine ──────────────────────────────────
class GenerativeAudio {
    constructor() {
        this.ctx = null;
        this.analyser = null;
        this.gainNode = null;
        this.nodes = []; // all stoppable nodes
        this.timers = []; // scheduled timeouts
        this.playing = false;
        this.audioEl = null; // <audio> element for URL-based tracks
        this.mediaSource = null; // MediaElementSourceNode
    }

    init() {
        if (this.ctx) return;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 256;
        this.analyser.smoothingTimeConstant = 0.8;
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.value = 0;
        this.gainNode.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
    }

    stopAll() {
        this.nodes.forEach(n => { try { n.stop(); } catch (e) { } });
        this.nodes = [];
        this.timers.forEach(t => clearTimeout(t));
        this.timers = [];
        this.playing = false;
        if (this.gainNode && this.ctx) {
            this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
            this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
            this.gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.3);
        }
        // Stop any playing audio element
        if (this.audioEl) {
            this.audioEl.pause();
            this.audioEl.currentTime = 0;
        }
    }

    // Helper: play a single note with attack/release envelope
    _note(freq, type, startTime, duration, vol = 0.08, destination = null) {
        const dest = destination || this.gainNode;
        const osc = this.ctx.createOscillator();
        osc.type = type;
        osc.frequency.value = freq;

        const env = this.ctx.createGain();
        env.gain.setValueAtTime(0, startTime);
        env.gain.linearRampToValueAtTime(vol, startTime + Math.min(0.3, duration * 0.3));
        env.gain.linearRampToValueAtTime(vol * 0.6, startTime + duration * 0.7);
        env.gain.linearRampToValueAtTime(0, startTime + duration);

        osc.connect(env);
        env.connect(dest);
        osc.start(startTime);
        osc.stop(startTime + duration + 0.1);
        this.nodes.push(osc);
        return osc;
    }

    // Helper: schedule a looping note sequence
    _sequence(notes, type, loopDuration, vol, filterFreq = null) {
        const dest = filterFreq ? this._makeFilter(filterFreq) : this.gainNode;
        const scheduleLoop = () => {
            if (!this.playing) return;
            const now = this.ctx.currentTime;
            notes.forEach(([freq, start, dur]) => {
                this._note(freq, type, now + start, dur, vol, dest);
            });
            const tid = setTimeout(() => scheduleLoop(), loopDuration * 1000);
            this.timers.push(tid);
        };
        scheduleLoop();
    }

    // Helper: create a filtered destination
    _makeFilter(freq, q = 3) {
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = freq;
        filter.Q.value = q;
        filter.connect(this.gainNode);
        // Sweep the filter slowly
        const lfo = this.ctx.createOscillator();
        lfo.frequency.value = 0.08;
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.value = freq * 0.4;
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();
        this.nodes.push(lfo);
        return filter;
    }

    // Helper: ambient pad that slowly evolves between chords
    _evolvingPad(chords, cycleSec, vol = 0.04) {
        const numVoices = chords[0].length;
        const oscs = [];
        for (let v = 0; v < numVoices; v++) {
            const osc = this.ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = chords[0][v];
            const g = this.ctx.createGain();
            g.gain.value = vol / (v + 1);
            osc.connect(g);
            g.connect(this.gainNode);
            osc.start();
            this.nodes.push(osc);
            oscs.push(osc);
        }
        let chordIdx = 0;
        const shift = () => {
            if (!this.playing) return;
            chordIdx = (chordIdx + 1) % chords.length;
            const now = this.ctx.currentTime;
            oscs.forEach((osc, v) => {
                osc.frequency.linearRampToValueAtTime(chords[chordIdx][v], now + cycleSec * 0.8);
            });
            const tid = setTimeout(shift, cycleSec * 1000);
            this.timers.push(tid);
        };
        const tid = setTimeout(shift, cycleSec * 1000);
        this.timers.push(tid);
    }

    playTrack(trackId, volume = 0.3) {
        this.init();
        this.stopAll();
        this.playing = true;

        const now = this.ctx.currentTime;
        this.gainNode.gain.setValueAtTime(0, now);
        this.gainNode.gain.linearRampToValueAtTime(volume, now + 2.0);

        const presets = {
            'ethereal-drift': () => {
                // Evolving pad cycling through Cmaj7 → Am9 → Fmaj7 → G7sus4
                this._evolvingPad([
                    [130.81, 164.81, 196.00, 246.94], // Cmaj7
                    [110.00, 164.81, 196.00, 261.63], // Am9
                    [87.31, 130.81, 164.81, 220.00],  // Fmaj7
                    [98.00, 146.83, 196.00, 261.63],  // G7sus4
                ], 8, 0.06);

                // Slow arpeggio — ascending notes with reverb-like delays
                const arpNotes = [
                    [261.63, 0, 3], [329.63, 2, 3], [392.00, 4, 3],
                    [523.25, 6, 3], [392.00, 8, 3], [329.63, 10, 3],
                    [293.66, 12, 2.5], [349.23, 14, 3],
                ];
                this._sequence(arpNotes, 'sine', 16, 0.05);

                // High sparkle hits
                const sparkle = [
                    [1046.50, 1, 1.5], [1318.51, 5, 1.2], [1567.98, 9, 1.8],
                    [1174.66, 13, 1.5],
                ];
                this._sequence(sparkle, 'sine', 16, 0.015);
            },

            'deep-resonance': () => {
                // Sub-bass pulse that shifts between notes
                this._evolvingPad([
                    [41.20, 61.74, 82.41],   // E1-B1-E2
                    [36.71, 55.00, 73.42],   // D1-A1-D2
                    [32.70, 49.00, 65.41],   // C1-G1-C2
                    [38.89, 58.27, 77.78],   // Eb1-Bb1-Eb2
                ], 10, 0.08);

                // Rhythmic pulse — filtered triangle wave hits
                const pulse = [
                    [82.41, 0, 0.8], [82.41, 1.5, 0.6], [110.00, 3, 1.0],
                    [82.41, 5, 0.8], [73.42, 6.5, 0.6], [65.41, 8, 1.2],
                ];
                this._sequence(pulse, 'triangle', 10, 0.06, 200);

                // Distant harmonics
                const harmonics = [
                    [329.63, 2, 4], [293.66, 7, 3.5],
                ];
                this._sequence(harmonics, 'sine', 10, 0.02, 500);
            },

            'crystal-rain': () => {
                // Rapid descending arpeggios like raindrops
                const rain1 = [
                    [1567.98, 0, 0.4], [1318.51, 0.3, 0.4], [1046.50, 0.6, 0.5],
                    [783.99, 0.9, 0.5], [659.26, 1.3, 0.6],
                    [1396.91, 2, 0.4], [1174.66, 2.3, 0.4], [987.77, 2.6, 0.5],
                    [880.00, 3.0, 0.6], [783.99, 3.5, 0.8],
                ];
                this._sequence(rain1, 'sine', 5, 0.04);

                // Second voice — offset and different notes
                const rain2 = [
                    [2093.00, 0.5, 0.3], [1760.00, 0.9, 0.3], [1480.00, 1.2, 0.4],
                    [2349.32, 3, 0.3], [1975.53, 3.3, 0.3], [1661.22, 3.6, 0.5],
                ];
                this._sequence(rain2, 'sine', 5, 0.02);

                // Warm pad underneath
                this._evolvingPad([
                    [261.63, 329.63, 392.00, 523.25], // C
                    [220.00, 277.18, 329.63, 440.00], // A
                    [246.94, 311.13, 369.99, 493.88], // B → Eb
                    [293.66, 349.23, 440.00, 587.33], // D
                ], 10, 0.03);
            },

            'void-current': () => {
                // Dark filtered bass drone that shifts
                this._evolvingPad([
                    [32.70, 49.00, 98.00],  // C0-G0-G1
                    [30.87, 46.25, 92.50],  // B-1
                    [27.50, 41.20, 82.41],  // A-1
                    [29.14, 43.65, 87.31],  // Bb-1
                ], 12, 0.07);

                // Slow, sparse metallic hits
                const hits = [
                    [110.00, 0, 2.5], [146.83, 4, 2], [98.00, 8, 3],
                    [130.81, 14, 2],
                ];
                this._sequence(hits, 'sawtooth', 18, 0.03, 250);

                // Ghost whisper — high filtered noise-like tones
                const ghost = [
                    [2637.02, 3, 3], [2349.32, 9, 2.5], [1975.53, 15, 3],
                ];
                this._sequence(ghost, 'sine', 18, 0.008);

                // Rumble pulse
                const rumble = [
                    [36.71, 0, 1.5], [36.71, 6, 1], [32.70, 12, 2],
                ];
                this._sequence(rumble, 'triangle', 18, 0.05, 120);
            },
        };

        if (presets[trackId]) {
            presets[trackId]();
        }
    }

    // Play audio from a local file URL (e.g. /audio/siren.mp3)
    playUrl(fileUrl, volume = 0.3) {
        this.init();
        // Stop generative nodes but don't touch audioEl yet
        this.nodes.forEach(n => { try { n.stop(); } catch (e) { } });
        this.nodes = [];
        this.timers.forEach(t => clearTimeout(t));
        this.timers = [];
        this.playing = true;

        // Cancel any previous gain scheduling & set volume immediately
        this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
        this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);

        // Resume AudioContext (required after user gesture)
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        // Reuse existing <audio> element or create a new one
        if (!this.audioEl) {
            this.audioEl = new Audio();
            this.audioEl.crossOrigin = 'anonymous';
            this.audioEl.loop = true;
            // Create MediaElementSource only once per element
            this.mediaSource = this.ctx.createMediaElementSource(this.audioEl);
            this.mediaSource.connect(this.gainNode);
        }

        this.audioEl.src = fileUrl;
        this.audioEl.volume = 1; // volume is controlled by gainNode
        this.audioEl.play().catch(err => {
            console.warn('Audio playback failed:', err);
        });
    }

    setVolume(v) {
        if (this.gainNode && this.ctx) {
            this.gainNode.gain.linearRampToValueAtTime(v, this.ctx.currentTime + 0.1);
        }
    }

    getAnalyser() {
        return this.analyser;
    }

    destroy() {
        this.stopAll();
        if (this.audioEl) {
            this.audioEl.pause();
            this.audioEl.src = '';
            this.audioEl = null;
            this.mediaSource = null;
        }
        if (this.ctx) {
            this.ctx.close().catch(() => { });
            this.ctx = null;
        }
    }
}

// ── Shader Code ──────────────────────────────────────────────
function getVertexShader(particleCount) {
    return `
        uniform float uTime;
        uniform float uMode;
        uniform float uAudio;
        uniform vec3 uMouse;

        attribute vec3 aRandom;
        attribute float aIndex;

        varying vec3 vColor;
        varying float vAlpha;
        varying float vDist;

        // Simplex Noise
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i  = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute(permute(permute(
                        i.z + vec4(0.0, i1.z, i2.z, 1.0))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ * ns.x + ns.yyyy;
            vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
            vec3 p0 = vec3(a0.xy,h.x);
            vec3 p1 = vec3(a0.zw,h.y);
            vec3 p2 = vec3(a1.xy,h.z);
            vec3 p3 = vec3(a1.zw,h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
            p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }

        // Shapes
        vec3 getPosSphere(float idx) {
            float phi = acos(-1.0 + (2.0 * idx) / ${particleCount}.0);
            float theta = sqrt(${particleCount}.0 * 3.1415926) * phi;
            float r = 12.0 + aRandom.x * 2.0;
            return vec3(r * sin(phi) * cos(theta), r * sin(phi) * sin(theta), r * cos(phi));
        }

        vec3 getPosTorus(float idx) {
            float t = idx * 0.1;
            float r = 10.0 + aRandom.y * 3.0;
            float tube = 3.0 + aRandom.x * 2.0;
            float angle = (idx / ${particleCount}.0) * 6.28 * 15.0;
            return vec3(
                (r + tube * cos(angle)) * cos(t),
                (r + tube * cos(angle)) * sin(t),
                tube * sin(angle)
            );
        }

        vec3 getPosLattice(float idx) {
            float size = 25.0;
            float step = pow(${particleCount}.0, 1.0/3.0);
            float x = mod(idx, step);
            float y = mod(floor(idx/step), step);
            float z = floor(idx/(step*step));
            return (vec3(x, y, z) / step - 0.5) * size;
        }

        vec3 getPosVortex(float idx) {
            float r = (idx / ${particleCount}.0) * 18.0;
            float ang = r * 3.0;
            float h = (aRandom.x - 0.5) * 8.0 * (1.0 - r/20.0);
            return vec3(r * cos(ang), r * sin(ang), h);
        }

        vec3 getPosPyramid(float idx) {
            float norm = idx / ${particleCount}.0;
            float height = 14.0;
            float bh = 8.0;

            vec3 apex = vec3(0.0, height * 0.5, 0.0);
            vec3 c0 = vec3(-bh, -height * 0.5, -bh);
            vec3 c1 = vec3( bh, -height * 0.5, -bh);
            vec3 c2 = vec3( bh, -height * 0.5,  bh);
            vec3 c3 = vec3(-bh, -height * 0.5,  bh);

            float sq = sqrt(aRandom.x);
            float bu = 1.0 - sq;
            float bv = aRandom.y * sq;
            float bw = 1.0 - bu - bv;

            float face = mod(idx, 5.0);

            vec3 f0 = apex * bu + c0 * bv + c1 * bw;
            vec3 f1 = apex * bu + c1 * bv + c2 * bw;
            vec3 f2 = apex * bu + c2 * bv + c3 * bw;
            vec3 f3 = apex * bu + c3 * bv + c0 * bw;
            vec3 fb = vec3(mix(-bh, bh, aRandom.x), -height * 0.5, mix(-bh, bh, aRandom.y));

            vec3 pt = f0;
            pt = mix(pt, f1, step(1.0, face));
            pt = mix(pt, f2, step(2.0, face));
            pt = mix(pt, f3, step(3.0, face));
            pt = mix(pt, fb, step(4.0, face));

            float onEdge = step(0.85, aRandom.z);
            float edgeT = fract(norm * 8.0);
            float ei = mod(idx, 8.0);
            vec3 ep = mix(apex, c0, edgeT);
            ep = mix(ep, mix(apex, c1, edgeT), step(1.0, ei));
            ep = mix(ep, mix(apex, c2, edgeT), step(2.0, ei));
            ep = mix(ep, mix(apex, c3, edgeT), step(3.0, ei));
            ep = mix(ep, mix(c0, c1, edgeT), step(4.0, ei));
            ep = mix(ep, mix(c1, c2, edgeT), step(5.0, ei));
            ep = mix(ep, mix(c2, c3, edgeT), step(6.0, ei));
            ep = mix(ep, mix(c3, c0, edgeT), step(7.0, ei));

            pt = mix(pt, ep, onEdge);
            pt += aRandom * 0.15;
            return pt;
        }

        vec3 getPosDNA(float idx) {
            float norm = idx / ${particleCount}.0;
            float strand = step(0.5, fract(idx * 0.5)); // 0 or 1
            float ht = (norm - 0.5) * 30.0;
            float ang = norm * 25.0;
            float rad = 5.0;
            float off = strand * 3.14159;

            // Unzip cycle: 0..1..0 over ~8 seconds
            float cycle = sin(uTime * 0.12) * 0.5 + 0.5; // 0 to 1
            // Separation grows from center outward
            float centerDist = abs(norm - 0.5) * 2.0; // 0 at center, 1 at ends
            float unzip = smoothstep(0.0, 0.8, cycle - centerDist * 0.5);
            // Push strands apart when unzipping
            float separation = unzip * 6.0;
            float strandDir = (strand - 0.5) * 2.0; // -1 or +1

            vec3 strandP = vec3(
                rad * cos(ang + off) + strandDir * separation + aRandom.x * 0.4,
                ht,
                rad * sin(ang + off) + aRandom.z * 0.4
            );

            // Rungs dissolve when unzipped
            float rungT = aRandom.x;
            vec3 rungP = vec3(
                mix(rad * cos(ang), rad * cos(ang + 3.14159), rungT) + aRandom.y * 0.2,
                ht,
                mix(rad * sin(ang), rad * sin(ang + 3.14159), rungT) + aRandom.z * 0.2
            );

            // Rungs fade out during unzip, scattered particles drift away
            float isRung = step(0.9, fract(norm * 50.0));
            float rungAlive = 1.0 - unzip;
            // When rungs break, particles scatter outward
            vec3 scatter = vec3(
                aRandom.x * 8.0 - 4.0,
                ht + aRandom.y * 3.0 - 1.5,
                aRandom.z * 8.0 - 4.0
            );
            vec3 rungFinal = mix(rungP, scatter, unzip);

            return mix(strandP, rungFinal, isRung * rungAlive + isRung * unzip * 0.3);
        }

        vec3 getPosShip(float idx) {
            float norm = idx / ${particleCount}.0;
            // Divide particles into sections: UFO hull, dome, ring, beam, abductee, stars
            float section = norm * 7.0;

            // === UFO SAUCER (flat disc) ===
            float discAng = fract(idx * 0.618034) * 6.28318;
            float discR = sqrt(aRandom.x) * 10.0;
            vec3 hull = vec3(
                discR * cos(discAng) + aRandom.y * 0.3,
                (aRandom.z - 0.5) * 0.4,  // thin disc
                discR * sin(discAng) + aRandom.y * 0.3
            );

            // === DOME on top ===
            float dPhi = acos(clamp(1.0 - aRandom.x * 2.0, -1.0, 1.0)) * 0.5;
            float dTheta = fract(idx * 0.618034) * 6.28318;
            float domeR = 3.5;
            vec3 dome = vec3(
                domeR * sin(dPhi) * cos(dTheta),
                max(domeR * 0.7 * cos(dPhi) + 1.5, 1.2),
                domeR * sin(dPhi) * sin(dTheta)
            );

            // === GLOWING RING around saucer edge ===
            float rAng = norm * 6.28318 * 40.0;
            vec3 ring = vec3(
                10.2 * cos(rAng),
                sin(rAng * 8.0) * 0.15,
                10.2 * sin(rAng)
            );

            // === TRACTOR BEAM (cone of particles streaming down) ===
            float beamT = fract(aRandom.y + uTime * 0.08); // animate upward
            float beamR = mix(0.5, 6.0, beamT * beamT);
            float bAng = fract(idx * 0.618034) * 6.28318;
            vec3 beam = vec3(
                beamR * cos(bAng) * (0.6 + aRandom.x * 0.4),
                mix(-18.0, -1.5, beamT),
                beamR * sin(bAng) * (0.6 + aRandom.z * 0.4)
            );

            // === COW SILHOUETTE (being beamed up, cycles position) ===
            float cowCycle = fract(uTime * 0.06 + aRandom.x * 0.3);
            float cowY = mix(-18.0, -4.0, cowCycle); // rising
            // Body (ellipsoid)
            float cowBody = aRandom.x;
            float cowAng2 = aRandom.z * 6.28318;
            vec3 cow;
            if (cowBody < 0.5) {
                // Main body oval
                cow = vec3(
                    cos(cowAng2) * 2.5 * aRandom.y,
                    cowY + sin(cowAng2) * 0.8 * aRandom.z,
                    sin(cowAng2) * 1.2 * aRandom.y
                );
            } else if (cowBody < 0.7) {
                // Head (smaller sphere offset)
                cow = vec3(
                    2.2 + aRandom.y * 0.8,
                    cowY + 0.3 + aRandom.z * 0.6,
                    aRandom.y * 0.6 - 0.3
                );
            } else {
                // Legs (4 thin lines going down)
                float legIdx = floor(aRandom.z * 4.0);
                float legX = mix(-1.5, 1.5, legIdx / 3.0);
                cow = vec3(
                    legX + aRandom.y * 0.15,
                    cowY - 0.8 - aRandom.x * 1.2,
                    aRandom.z * 0.15 - 0.07
                );
            }

            // === SHEEP SILHOUETTE (offset, different cycle) ===
            float sheepCycle = fract(uTime * 0.05 + 0.5 + aRandom.z * 0.2);
            float sheepY = mix(-18.0, -5.0, sheepCycle);
            float sheepBody = aRandom.y;
            vec3 sheep;
            if (sheepBody < 0.55) {
                // Fluffy body (rounder)
                float sa = aRandom.z * 6.28318;
                sheep = vec3(
                    cos(sa) * 1.8 * aRandom.x - 4.0,
                    sheepY + sin(sa) * 1.0 * aRandom.y,
                    sin(sa) * 1.0 * aRandom.x
                );
            } else if (sheepBody < 0.75) {
                // Head
                sheep = vec3(
                    -2.3 + aRandom.y * 0.6,
                    sheepY - 0.2 + aRandom.z * 0.5,
                    aRandom.x * 0.5 - 0.25
                );
            } else {
                // Legs
                float sLegIdx = floor(aRandom.x * 4.0);
                float sLegX = mix(-5.2, -2.8, sLegIdx / 3.0);
                sheep = vec3(
                    sLegX + aRandom.z * 0.1,
                    sheepY - 1.0 - aRandom.y * 0.9,
                    aRandom.x * 0.1 - 0.05
                );
            }

            // === BACKGROUND STARS (scattered far out) ===
            float starAng1 = fract(idx * 0.381966) * 6.28318;
            float starAng2 = acos(1.0 - 2.0 * aRandom.y);
            float starR = 25.0 + aRandom.z * 15.0;
            vec3 stars = vec3(
                starR * sin(starAng2) * cos(starAng1),
                starR * cos(starAng2) * 0.6 + aRandom.x * 5.0,
                starR * sin(starAng2) * sin(starAng1)
            );
            // Stars twinkle via time
            stars *= 1.0 + sin(uTime * 0.3 + idx * 0.1) * 0.03;

            // Assemble: hull -> dome -> ring -> beam -> cow -> sheep -> stars
            vec3 pt = hull;
            pt = mix(pt, dome, step(1.0, section));
            pt = mix(pt, ring, step(2.0, section));
            pt = mix(pt, beam, step(2.8, section));
            pt = mix(pt, cow, step(4.0, section));
            pt = mix(pt, sheep, step(5.0, section));
            pt = mix(pt, stars, step(6.0, section));
            return pt;
        }

        vec3 getPosJelly(float idx) {
            float norm = idx / ${particleCount}.0;
            float section = norm * 5.0;

            // Pulse cycle for the bell
            float pulse = sin(uTime * 0.4) * 0.5 + 0.5; // 0..1 breathing

            // === BELL (dome shape, contracts and expands) ===
            float bPhi = acos(1.0 - aRandom.x) * (0.7 + pulse * 0.15);
            float bTheta = fract(idx * 0.618034) * 6.28318;
            float bellR = 8.0 - pulse * 1.5;
            vec3 bell = vec3(
                bellR * sin(bPhi) * cos(bTheta) + aRandom.y * 0.2,
                bellR * 0.7 * cos(bPhi) + 4.0,
                bellR * sin(bPhi) * sin(bTheta) + aRandom.z * 0.2
            );

            // === BELL RIM (glowing ring at the bottom edge) ===
            float rimAng = norm * 6.28318 * 25.0;
            float rimR = bellR * 0.95 + aRandom.x * 0.3;
            float rimWobble = sin(rimAng * 4.0 + uTime * 0.6) * 0.3;
            vec3 rim = vec3(
                rimR * cos(rimAng),
                rimWobble - 0.5,
                rimR * sin(rimAng)
            );

            // === TENTACLES (8 flowing tendrils hanging down) ===
            float tentIdx = floor(aRandom.x * 8.0); // which tentacle
            float tentAng = tentIdx * 0.785398; // 2PI / 8
            float tentT = aRandom.y; // position along tentacle 0..1
            float tentLen = 14.0 + aRandom.z * 4.0;
            float sway = sin(uTime * 0.3 + tentIdx * 0.8 + tentT * 2.0) * (2.0 + tentT * 3.0);
            float swayZ = cos(uTime * 0.25 + tentIdx * 1.1 + tentT * 1.5) * (1.5 + tentT * 2.0);
            float tentR = 5.0 - tentT * 3.0; // narrows toward tip
            vec3 tent = vec3(
                tentR * cos(tentAng) + sway + aRandom.x * 0.3,
                -tentT * tentLen - 1.0,
                tentR * sin(tentAng) + swayZ + aRandom.z * 0.3
            );

            // === ORAL ARMS (4 shorter, thicker tendrils near center) ===
            float armIdx = floor(aRandom.z * 4.0);
            float armAng = armIdx * 1.5708 + 0.4; // offset from tentacles
            float armT = aRandom.x;
            float armSway = sin(uTime * 0.35 + armIdx * 1.5 + armT * 3.0) * (1.0 + armT * 2.0);
            float armR = 2.5 - armT * 1.5;
            vec3 arms = vec3(
                armR * cos(armAng) + armSway + aRandom.y * 0.4,
                -armT * 8.0 - 0.5,
                armR * sin(armAng) + cos(uTime * 0.3 + armIdx) * 1.5 + aRandom.z * 0.4
            );

            // === BIOLUMINESCENT SPOTS (scattered inside bell, glow) ===
            float spotPhi = acos(1.0 - aRandom.y * 0.8) * 0.6;
            float spotTheta = aRandom.x * 6.28318;
            float spotR = bellR * 0.7 + sin(uTime * 0.5 + idx * 0.02) * 0.5;
            vec3 spots = vec3(
                spotR * sin(spotPhi) * cos(spotTheta),
                spotR * 0.6 * cos(spotPhi) + 3.5,
                spotR * sin(spotPhi) * sin(spotTheta)
            );

            // Assemble
            vec3 pt = bell;
            pt = mix(pt, rim, step(1.5, section));
            pt = mix(pt, tent, step(2.2, section));
            pt = mix(pt, arms, step(3.8, section));
            pt = mix(pt, spots, step(4.5, section));
            return pt;
        }

        void main() {
            float t = uTime * 0.15;
            vec3 pos = vec3(0.0);

            float m = uMode;
            vec3 pSphere = getPosSphere(aIndex);
            vec3 pTorus = getPosTorus(aIndex);
            vec3 pLattice = getPosLattice(aIndex);
            vec3 pVortex = getPosVortex(aIndex);
            vec3 pPyramid = getPosPyramid(aIndex);
            vec3 pDNA = getPosDNA(aIndex);
            vec3 pShip = getPosShip(aIndex);
            vec3 pJelly = getPosJelly(aIndex);

            vec3 noiseBase = vec3(
                snoise(vec3(aIndex*0.01, t*0.2, 0.0)),
                snoise(vec3(aIndex*0.01, 0.0, t*0.2)),
                snoise(vec3(0.0, aIndex*0.01, t*0.2))
            );

            pSphere += noiseBase * 4.0;
            pTorus += noiseBase * 2.0;
            pLattice += noiseBase * 1.5;
            pVortex += noiseBase * 2.0;
            pPyramid += noiseBase * 1.0;
            pDNA += noiseBase * 1.0;
            pShip += noiseBase * 0.6;
            pJelly += noiseBase * 0.8;

            float c = cos(t*0.3); float s = sin(t*0.3);
            pTorus.xy = mat2(c, -s, s, c) * pTorus.xy;
            pTorus.xz = mat2(c, -s, s, c) * pTorus.xz;

            float va = t * 1.0 - length(pVortex.xy)*0.2;
            float vc = cos(va); float vs = sin(va);
            pVortex.xy = mat2(vc, -vs, vs, vc) * pVortex.xy;

            // Slow rotation for pyramid and ship
            float hr = t * 0.2;
            float hc = cos(hr); float hs = sin(hr);
            pPyramid.xz = mat2(hc, -hs, hs, hc) * pPyramid.xz;
            pShip.xz = mat2(hc, -hs, hs, hc) * pShip.xz;
            // Ship also bobs gently
            pShip.y += sin(t * 0.5) * 1.5;
            // Jellyfish drifts and bobs
            float jr = t * 0.15;
            float jc = cos(jr); float js = sin(jr);
            pJelly.xz = mat2(jc, -js, js, jc) * pJelly.xz;
            pJelly.y += sin(t * 0.3) * 2.0;
            pJelly.x += sin(t * 0.12) * 3.0;
            // DNA spins around Y axis
            float dr = t * 0.4;
            float dc = cos(dr); float ds = sin(dr);
            pDNA.xz = mat2(dc, -ds, ds, dc) * pDNA.xz;

            if(m <= 0.0) pos = pSphere;
            else if(m <= 1.0) pos = mix(pSphere, pTorus, m);
            else if(m <= 2.0) pos = mix(pTorus, pLattice, m - 1.0);
            else if(m <= 3.0) pos = mix(pLattice, pVortex, m - 2.0);
            else if(m <= 4.0) pos = mix(pVortex, pPyramid, m - 3.0);
            else if(m <= 5.0) pos = mix(pPyramid, pDNA, m - 4.0);
            else if(m <= 6.0) pos = mix(pDNA, pShip, m - 5.0);
            else if(m <= 7.0) pos = mix(pShip, pJelly, m - 6.0);
            else pos = pJelly;

            // Audio reactivity — particles breathe with the sound
            pos *= (1.0 + uAudio * 0.5);

            // Mouse interaction — push particles away from cursor
            if (uMouse.z > -90.0) {
                float mouseDist = distance(pos, uMouse);
                float mouseInfluence = smoothstep(15.0, 0.0, mouseDist);
                vec3 pushDir = normalize(pos - uMouse + vec3(0.001));
                pos += pushDir * mouseInfluence * 6.0;
                // Add a swirl around the cursor
                float swirlAngle = mouseInfluence * 2.0;
                float sc = cos(swirlAngle); float ss = sin(swirlAngle);
                vec3 localPos = pos - uMouse;
                localPos.xy = mat2(sc, -ss, ss, sc) * localPos.xy;
                pos = uMouse + mix(pos - uMouse, localPos, mouseInfluence * 0.4);
            }

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = (1.5 + aRandom.y * 2.0 + uAudio * 6.0) * (30.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;

            vDist = length(pos);
            float depthFade = smoothstep(60.0, 10.0, -mvPosition.z);
            vAlpha = depthFade * (0.2 + aRandom.z * 0.6);
            vColor = pos;
        }
    `;
}

const FRAGMENT_SHADER = `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec3 vColor;
    varying float vAlpha;
    varying float vDist;

    void main() {
        vec2 center = gl_PointCoord - 0.5;
        float dist = length(center);
        if (dist > 0.5) discard;

        float glow = 1.0 - smoothstep(0.0, 0.5, dist);
        glow = pow(glow, 1.5);

        vec3 col = mix(uColor1, uColor2, smoothstep(-20.0, 20.0, vColor.x + vColor.y));

        gl_FragColor = vec4(col, vAlpha * glow);
    }
`;

const OUTPUT_SHADER = {
    uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0 },
        uRGBShift: { value: 0.002 },
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uTime;
        uniform float uRGBShift;
        varying vec2 vUv;

        float random(vec2 p) {
            return fract(sin(dot(p.xy, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
            vec2 uv = vUv;
            float dist = distance(uv, vec2(0.5));
            vec2 offset = (uv - 0.5) * dist * uRGBShift;

            float r = texture2D(tDiffuse, uv + offset).r;
            float g = texture2D(tDiffuse, uv).g;
            float b = texture2D(tDiffuse, uv - offset).b;

            vec3 color = vec3(r, g, b);
            float noise = (random(uv + uTime) - 0.5) * 0.03;
            color += noise;

            gl_FragColor = vec4(color, 1.0);
        }
    `,
};

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
    const [volume, setVolume] = useState(0.3);
    const [showTrackList, setShowTrackList] = useState(false);
    const [showIntro, setShowIntro] = useState(true);

    // Refs for Three.js mutation from React callbacks
    const modeRef = useRef({ target: 0 });
    const paletteRef = useRef(0);

    const buildScene = useCallback((container) => {
        const W = container.clientWidth;
        const H = container.clientHeight;
        const isMobile = W < 768;
        const PARTICLE_COUNT = isMobile ? 65000 : 120000;

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
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
            mode: 0,
            cameraZ: isMobile ? 40 : 28,
        };

        // ── Animation Loop ──
        let animId;
        const clock = new THREE.Clock();
        const dataArray = new Uint8Array(64);

        function animate() {
            animId = requestAnimationFrame(animate);
            const delta = clock.getDelta();
            state.time += delta;

            // Audio level from analyser
            const analyser = audioEngine.getAnalyser();
            if (analyser && audioEngine.playing) {
                analyser.getByteFrequencyData(dataArray);
                const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
                state.audioLevel += (avg / 255 - state.audioLevel) * 0.12;
            } else {
                state.audioLevel *= 0.95;
            }
            material.uniforms.uAudio.value = state.audioLevel;

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
    const handlePlayPause = () => {
        const engine = audioEngineRef.current;
        if (!engine) return;
        if (isPlaying) {
            engine.stopAll();
            setIsPlaying(false);
        } else {
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
                            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-cyan-400/60 mb-4">
                                ✦ Immersive Experience ✦
                            </p>
                            <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-2"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                Aether
                            </h1>
                            <div className="w-12 h-px mx-auto bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mb-6" />

                            {/* Description */}
                            <p className="text-sm md:text-base text-white/50 leading-relaxed mb-3 font-light">
                                A space to breathe. Step away from the noise, reset your mental state,
                                and find a moment of calm through sound and light.
                            </p>
                            <p className="text-xs text-white/25 leading-relaxed mb-8 max-w-sm mx-auto">
                                Move your cursor through the particles. Play generative ambient audio.
                                Switch visualizations. Let the simulation respond to you.
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
            <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-4 md:p-6">
                {/* Top Bar */}
                <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col gap-2 pointer-events-auto">
                        <div className="flex items-center gap-3">
                            <div className="relative w-2 h-2">
                                <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-20" />
                                <div className="absolute inset-0 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                            </div>
                            <h1 className="text-xs md:text-sm font-medium tracking-tight uppercase text-white/90 font-mono">
                                Aether<span className="opacity-40">.OS</span>
                            </h1>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-mono text-white/40 tracking-wider">
                            <span className="text-white/70">{VIZ_MODES[activeMode].code}</span>
                            <span className="w-px h-2 bg-white/10 hidden sm:inline" />
                            <span className="opacity-60 hidden sm:inline">
                                {window.innerWidth < 768 ? '65K' : '120K'} NODES
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
