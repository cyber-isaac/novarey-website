import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

test('public pages contain their own content and exactly one canonical before JavaScript', () => {
    for (const route of ['', 'work', 'about', 'contact', 'idrive', 'ai-strategy', 'services', 'services/web', 'services/brand', 'services/marketing', 'services/ai']) {
        const html = readFileSync(join('dist', route, 'index.html'), 'utf8');
        assert.match(html, /<h1[\s>]/, `Missing heading: ${route}`);
        assert.equal((html.match(/rel="canonical"/g) || []).length, 1, route);
        assert.match(html, new RegExp(`href="https://novarey.netlify.app${route ? '/' + route : ''}"`));
        assert.doesNotMatch(html, /data-static-seo|https:\/\/www\.novarey\.us/);
    }
});

test('rendered image and document references survive production pruning', () => {
    const scan = dir => readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? scan(join(dir,e.name)) : [join(dir,e.name)]);
    for (const file of scan('dist').filter(f => f.endsWith('.html'))) {
        const html = readFileSync(file, 'utf8');
        for (const match of html.matchAll(/(?:src|poster|href)="(\/[^"$]+\.(?:png|webp|jpg|pdf|mp4))"/g)) {
            if (match[1].startsWith('//')) continue;
            assert.ok(existsSync(join('dist',match[1])), `${file}: missing ${match[1]}`);
        }
    }
});

test('portfolio PDF and original autoplay hero film are present', () => {
    assert.equal(readFileSync('dist/portfolio/Isaac-Reyes-Portfolio.pdf').subarray(0,5).toString(), '%PDF-');
    const html = readFileSync('dist/index.html','utf8');

    const hero = html.match(/<video[^>]*title="NovaRey Hero Video"[^>]*>/)?.[0];
    assert.ok(hero, 'Original hero film must remain present');
    assert.match(hero, /69795dc011ec7dfcb9832b4f\/main\.mp4/);
    for (const attr of ['autoPlay', 'muted', 'loop', 'playsInline']) assert.match(hero, new RegExp(attr, 'i'));
    assert.match(hero, /h-full w-full object-cover/);
    assert.ok(existsSync('dist/hero-film-compat.mp4'), 'Software decoder film must survive production pruning');
    assert.match(html, /data-hero-software-video/);
    assert.match(html, /name="project-inquiry"/);
    assert.match(html, /name="bot-field"/);
});

test('work is canonical and portfolio redirects preserve asset paths', () => {
    const redirects = readFileSync('dist/_redirects', 'utf8').trim().split('\n');
    assert.deepEqual(redirects.slice(0,2), ['/portfolio /work 301!', '/portfolio/ /work 301!']);
    assert.equal(redirects.at(-1), '/* /app.html 200');
    assert.ok(!redirects.some(line => line.startsWith('/portfolio/*')));
    const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
    assert.match(sitemap, /\/work<\/loc>/);
    assert.doesNotMatch(sitemap, /\/portfolio<\/loc>/);
    const work = readFileSync('dist/work/index.html', 'utf8');
    assert.match(work, /SunTiff website/);
    assert.doesNotMatch(work, /Cosmic Drift|Neon Pulse Identity|Future UI Glitch|Lumiere Photography|Skunkworks OS|100\+/);
    assert.doesNotMatch(readFileSync('dist/index.html','utf8'), /LIVE VAULT CONNECTION|FEED: STUDIO_ARCHIVE|STATUS: READY|Alpha Sector/i);
});
