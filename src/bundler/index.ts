import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';

let isEsbuildInitialized: boolean;
export default async (rawCode: string) => {
    if (!isEsbuildInitialized) {
        await esbuild.initialize({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.13/esbuild.wasm',
        }).then(() => isEsbuildInitialized = true)
    }

    const result = await esbuild.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
        define: {
            'process.env.NODE_ENV': '"production"',
            global: 'window',
        },
    })
    return result?.outputFiles?.[0]?.text
}