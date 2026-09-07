import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

test('public pages contain their own content and exactly one canonical before JavaScript', () => {
    for (const route of ['', 'work', 'portfolio', 'about', 'contact', 'idrive', 'ai-strategy', 'services', 'services/web', 'services/brand', 'services/marketing', 'services/ai']) {
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

test('portfolio download is a PDF and homepage does not load a third-party player', () => {
    assert.equal(readFileSync('dist/portfolio/Isaac-Reyes-Portfolio.pdf').subarray(0,5).toString(), '%PDF-');
    const html = readFileSync('dist/index.html','utf8');
    assert.doesNotMatch(html, /<iframe/);
    assert.match(html, /name="project-inquiry"/);
    assert.match(html, /name="bot-field"/);
});
