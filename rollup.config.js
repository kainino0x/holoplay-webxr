/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';

const cfg = {
  input: 'src/LookingGlassWebXRPolyfill.js',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    resolve(),
    commonjs(),
    cleanup({
      comments: 'none',
    }),
  ],
}

export default [
  // Build as a library
  {
    ...cfg,
    output: {
      file: './build/looking-glass-webxr.js',
      format: 'umd',
      name: 'LookingGlassWebXRPolyfill',
    },
  },
  // Build as a WebExtension
  {
    ...cfg,
    output: {
      file: './build/extension/looking-glass-webxr-document_start.js',
      format: 'umd',
      name: 'LookingGlassWebXRPolyfill',
      // Note: These banner and footer are the trick to inject polyfill at document_start
      banner: `
        (() => {
          const fn = () => {
      `,
      footer: `
          };
          const script = document.createElement("script");
          script.textContent = '(' + fn.toString() +
            ')(); new LookingGlassWebXRPolyfill("LookingGlass WebXR extension overriding native WebXR API. Disable extension to stop.");';
          (document.head || document.documentElement).prepend(script);
          script.parentNode.removeChild(script);
        })();
      `
    },
  },
];
