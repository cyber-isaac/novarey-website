import { build } from 'esbuild';
import { loadEnv } from 'vite';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { gzipSync, brotliCompressSync } from 'node:zlib';

// Render the actual React pages at build time; there is no server to run in production.
const routes = ['/', '/work', '/portfolio', '/about', '/contact', '/idrive', '/ai-strategy', '/services', '/services/web', '/services/brand', '/services/marketing', '/services/ai'];
const env = loadEnv('production', process.cwd(), 'VITE_');
await mkdir('node_modules/.cache', { recursive: true });
const serverPath = resolve('node_modules/.cache/novarey-ssr.cjs');
await build({ entryPoints: ['src/entry-server.jsx'], outfile: serverPath, bundle: true, platform: 'node', format: 'cjs',
    define: { 'import.meta.env': JSON.stringify({ ...env, SSR: true, PROD: true }), 'process.env.NODE_ENV': '"production"' },
    plugins: [{ name: 'raw-assets', setup(builder) { builder.onLoad({ filter: /\?raw$/ }, async ({ path }) => ({ contents: await readFile(path.replace(/\?raw$/, ''), 'utf8'), loader: 'text' })); } }],
    loader: { '.svg': 'dataurl', '.png': 'dataurl', '.webp': 'dataurl', '.jpg': 'dataurl', '.css': 'empty' },
});
const { render } = createRequire(import.meta.url)(serverPath);
const SITE_URL = (env.VITE_SITE_URL || 'https://novarey.netlify.app').replace(/\/+$/, '');
{
    const original = await readFile('dist/index.html', 'utf8');
    const template = original.replace(/<title>[\s\S]*?<\/title>/g, '')
        .replace(/<(?:meta|link)\b[^>]*data-static-seo="true"[^>]*>/g, '');
    // The SPA shell remains available for interactive routes that are not prerendered.
    await writeFile('dist/app.html', original);
    for (const route of routes) {
        const { html, helmet } = await render(route);
        const head = [helmet.title, helmet.priority, helmet.meta, helmet.link, helmet.script].map(item => item.toString()).join('\n');
        const page = template.replace('</head>', `${head}\n</head>`).replace('<div id="root"></div>', () => `<div id="root">${html}</div>`);
        const directory = join('dist', route);
        await mkdir(directory, { recursive: true });
        const path = join(directory, 'index.html');
        await writeFile(path, page);
        await writeFile(`${path}.gz`, gzipSync(page));
        await writeFile(`${path}.br`, brotliCompressSync(page));
        console.log(`Prerendered ${route}`);
    }
    await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route => `  <url><loc>${SITE_URL}${route}</loc></url>`).join('\n')}\n</urlset>\n`);
    await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
}
