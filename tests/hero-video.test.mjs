import test from 'node:test';
import assert from 'node:assert/strict';
import { isEmptyVideoFrame, precedingKeyframe } from '../src/lib/heroVideoFallback.js';

test('empty-frame detection ignores alpha but preserves real dark picture detail', () => {
    assert.equal(isEmptyVideoFrame(new Uint8ClampedArray([0, 0, 0, 255, 1, 2, 0, 255])), true);
    assert.equal(isEmptyVideoFrame(new Uint8ClampedArray([0, 0, 0, 255, 0, 3, 0, 255])), false);
});

test('software playback resumes at a preceding keyframe after seeking and looping', () => {
    const samples = Array.from({ length: 9 }, (_, i) => ({ cts: i * 1000, timescale: 1000, is_sync: i % 3 === 0 }));
    assert.equal(precedingKeyframe(samples, 0), 0);
    assert.equal(precedingKeyframe(samples, 2.9), 0);
    assert.equal(precedingKeyframe(samples, 3), 3);
    assert.equal(precedingKeyframe(samples, 5.9), 3);
    assert.equal(precedingKeyframe(samples, 8), 6);
    assert.equal(precedingKeyframe(samples, 0.02), 0);
});
