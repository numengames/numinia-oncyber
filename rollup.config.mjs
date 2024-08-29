/* eslint-disable no-undef */
import { readdirSync, statSync } from 'fs';
import { join, basename, dirname } from 'path';

import terser from '@rollup/plugin-terser';
import sucrase from 'rollup-plugin-sucrase';
import replace from 'rollup-plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

async function getInputs(spaceName) {
  const folderPath = 'src/spaces';
  const inputs = [];

  function findIndexFiles(folderPath) {
    const files = readdirSync(folderPath);

    for (const file of files) {
      const filePath = join(folderPath, file);
      const stats = statSync(filePath);

      if (stats.isDirectory()) {
        findIndexFiles(filePath);
      } else if (file === 'index.ts') {
        const folderName = basename(dirname(filePath));

        if (spaceName === undefined || (spaceName && spaceName === folderName)) {
          inputs.push({
            input: filePath,
            output: {
              esModule: true,
              file: `spaces/${folderName}.ts`,
              format: 'es',
              sourcemap: false,
              banner: 'import { Display } from "./Display";',
            },
          });
        }
      }
    }
  }

  findIndexFiles(folderPath);

  return inputs;
}

export default async function generateRollupConfig() {
  const spaceName = process.env.SPACE_NAME;
  const inputs = await getInputs(spaceName);

  const rollupConfig = inputs.map(({ input, output }) => ({
    input,
    output,
    plugins: [
      resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
      commonjs(),
      typescript(),
      sucrase({
        exclude: ['node_modules/**'],
        transforms: ['typescript', 'jsx'],
      }),
      replace({
        '// @': '@',
        'console.log': process.env.NODE_ENV === 'production' ? '(()=>{})' : 'console.log',
      }),
      process.env.NODE_ENV === 'production' && terser(),
    ],
    external: ['@oo/scripting', 'react', 'three', '@dimforge/rapier3d'],
  }));

  return rollupConfig;
}