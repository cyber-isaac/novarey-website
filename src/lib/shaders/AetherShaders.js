// ── Shader Code ──────────────────────────────────────────────
export function getVertexShader(particleCount) {
    return `
        uniform float uTime;
        uniform float uMode;
        uniform float uAudio;
        uniform float uBass;
        uniform float uMid;
        uniform float uTreble;
        uniform float uIntensity;
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

        vec3 getPosCross(float idx) {
            float norm = idx / ${particleCount}.0;
            // Precise allocation: 40% for the crossbar, 60% for the vertical stem
            float isHorizontal = step(0.60, aRandom.x);
            
            // Divine Proportions for a traditional cross (using Golden Ratio roughly)
            float stemHeight = 40.0;
            float barWidth = 24.0;
            float thickness = 0.5; // Very thin depth so it remains sharp from the front
            float beamWidth = 3.0; // The actual width of the intersecting bars

            // To make the particles evenly distribute and form a solid structure,
            // we use the particle's index to map across the surface area.
            vec3 pos;
            
            if (isHorizontal > 0.5) {
                // Horizontal crossbar
                // Map position evenly along the X axis
                float xPos = mix(-barWidth/2.0, barWidth/2.0, aRandom.y);
                float yPos = 6.0 + (aRandom.z - 0.5) * beamWidth; // Placed at upper third
                pos = vec3(xPos, yPos, (aRandom.x - 0.5) * thickness);
            } else {
                // Vertical stem
                // Map position evenly along the Y axis
                float xPos = (aRandom.y - 0.5) * beamWidth;
                float yPos = mix(-stemHeight/2.0, stemHeight/2.0, aRandom.z);
                pos = vec3(xPos, yPos, (aRandom.x - 0.5) * thickness);
            }

            // Scatter just the very edges to give it a slight radiant/ethereal fringe,
            // but keep the solid core intact.
            float fringe = aRandom.z * aRandom.y * 1.5;
            pos += vec3(fringe - 0.75, fringe - 0.75, (aRandom.x - 0.5) * 0.5);

            // Ascension animation - continuous slow rise with clean wrap-around
            // We use 'norm' instead of random for the lift so the entire cross moves as one solid piece,
            // rather than particles swirling upward chaotically.
            float ascendTime = fract(uTime * 0.05);
            pos.y += (ascendTime * 30.0 - 15.0); // Drift within a 30-unit vertical space
            
            return pos;
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
            vec3 pLattice = getPosCross(aIndex);
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
            // Intentionally omit pLattice (Cross) from global noise displacement so it holds its shape
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

            // Audio reactivity: bass expands mass, mids move form, treble sharpens detail.
            float audioMass = uBass * 0.72 + uAudio * 0.22;
            float midMotion = uMid * 1.35;
            float trebleSpark = uTreble * 2.2;
            pos *= (1.0 + audioMass * uIntensity);
            pos += normalize(pos + vec3(0.001)) * midMotion * (0.35 + aRandom.x);
            pos += noiseBase * trebleSpark * 0.75;

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
            gl_PointSize = (1.25 + aRandom.y * 2.2 + uBass * 5.5 + uTreble * 3.0) * (30.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;

            vDist = length(pos);
            float depthFade = smoothstep(60.0, 10.0, -mvPosition.z);
            vAlpha = depthFade * (0.2 + aRandom.z * 0.58 + uTreble * 0.22);
            vColor = pos;

            // Make the Cross much brighter
            if (m > 1.0 && m <= 2.0) {
                vColor *= 2.5; // Boost color intensity
                vAlpha *= 1.5; // Make the cross itself more dense
            }
        }
    `;
}

export const FRAGMENT_SHADER = `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform float uParticleShape;
    uniform float uTreble;
    varying vec3 vColor;
    varying float vAlpha;
    varying float vDist;

    void main() {
        vec2 center = gl_PointCoord - 0.5;
        vec2 p = center * 2.0;
        float circle = length(center);
        float diamond = (abs(p.x) + abs(p.y)) * 0.5;
        float spark = min(abs(p.x), abs(p.y)) + length(p) * 0.18;
        float ring = abs(length(center) - 0.32);
        float shard = max(abs(p.x) * 0.34 + abs(p.y) * 0.9, abs(p.x - p.y * 0.35) * 0.52);

        float shapeDist = circle;
        shapeDist = mix(shapeDist, diamond, step(0.5, uParticleShape));
        shapeDist = mix(shapeDist, spark, step(1.5, uParticleShape));
        shapeDist = mix(shapeDist, ring, step(2.5, uParticleShape));
        shapeDist = mix(shapeDist, shard, step(3.5, uParticleShape));

        float cutoff = uParticleShape > 2.5 && uParticleShape < 3.5 ? 0.12 : 0.5;
        if (shapeDist > cutoff) discard;

        float glow = 1.0 - smoothstep(0.0, cutoff, shapeDist);
        glow = pow(glow, 1.35 + uTreble * 0.9);

        vec3 col = mix(uColor1, uColor2, smoothstep(-20.0, 20.0, vColor.x + vColor.y));
        col += uTreble * 0.22;

        gl_FragColor = vec4(col, vAlpha * glow);
    }
`;

export const OUTPUT_SHADER = {
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
