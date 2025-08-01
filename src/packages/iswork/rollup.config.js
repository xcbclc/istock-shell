const typescript = require('@rollup/plugin-typescript');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const dts = require('rollup-plugin-dts');

module.exports = [
  // ES Modules build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: true,
    },
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        declarationMap: false,
      }),
    ],
    external: ['reflect-metadata', 'idb', 'qs', '@istock-shell/command-parser', '@istock-shell/util'],
  },
  // CommonJS build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        declarationMap: false,
      }),
    ],
    external: ['reflect-metadata', 'idb', 'qs', '@istock-shell/command-parser', '@istock-shell/util'],
  },
  // Type definitions
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [dts.default()],
    external: ['reflect-metadata', 'idb', 'qs', '@istock-shell/command-parser', '@istock-shell/util'],
  },
];
