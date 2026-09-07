import test from 'node:test';
import assert from 'node:assert/strict';
import { submitBrief } from '../src/lib/submitBrief.js';

test('submits a brief with the Netlify form name and intact special characters', async () => {
    const data = new FormData();
    data.set('name', 'Test & Review');
    data.set('email', 'test@example.com');
    data.set('message', 'Web + brand\nBudget: $5,000');
    await submitBrief(data, async (url, options) => {
        assert.equal(url, '/');
        assert.equal(options.method, 'POST');
        assert.equal(options.headers['Content-Type'], 'application/x-www-form-urlencoded');
        const body = new URLSearchParams(options.body);
        assert.equal(body.get('form-name'), 'project-inquiry');
        assert.equal(body.get('name'), 'Test & Review');
        assert.equal(body.get('message'), 'Web + brand\nBudget: $5,000');
        return { ok: true, text: async () => 'Accepted' };
    });
});

test('does not report success for rejected submissions or the SPA fallback', async () => {
    await assert.rejects(submitBrief(new FormData(), async () => ({ ok: false })));
    await assert.rejects(submitBrief(new FormData(), async () => ({ ok: true, text: async () => '<div id="root"></div>' })));
});

test('propagates network failures so the user can retry', async () => {
    await assert.rejects(submitBrief(new FormData(), async () => { throw new Error('Offline'); }), /Offline/);
});
