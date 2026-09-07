import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PassThrough } from 'node:stream';
import { Website } from './App';

export function render(url) {
    const context = {};
    return new Promise((resolve, reject) => {
        let html = '';
        let error;
        const output = new PassThrough();
        output.on('data', chunk => { html += chunk.toString(); });
        output.on('end', () => error ? reject(error) : resolve({ html, helmet: context.helmet }));
        const stream = renderToPipeableStream(
            <HelmetProvider context={context}><StaticRouter location={url}><Website /></StaticRouter></HelmetProvider>,
            {
                onAllReady() { stream.pipe(output); },
                onShellError: reject,
                onError(err) { error = err; },
            }
        );
    });
}
