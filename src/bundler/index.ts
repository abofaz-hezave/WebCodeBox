import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let isEsbuildInitialized: boolean;
const bundle = async (rawCode: string) => {
  if (!isEsbuildInitialized) {
    await esbuild
      .initialize({
        worker: true,
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.13/esbuild.wasm',
      })
      .then(() => (isEsbuildInitialized = true));
  }

  try {
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
      jsxFactory: 'Cell_React.createElement',
      jsxFragment: 'Cell_React.Fragment',
    });
    return { success: true, code: result?.outputFiles?.[0]?.text, message: '' };
  } catch (error) {
    return { success: false, code: '', message: (error as Error).message };
  }
};

export default bundle;
