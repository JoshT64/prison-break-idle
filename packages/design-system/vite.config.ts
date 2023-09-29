import { defineConfig, UserConfig } from 'vite';
import { resolve, join, dirname, basename } from 'path';
import { writeFileSync } from 'fs';
import prettier from 'prettier';
import chokidar from 'chokidar';
import { globby } from 'globby';
import { fileURLToPath } from 'url';

// Cypress workaround
/* @vite-ignore */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

type ViteConfig = UserConfig;

const isProduction = process.env.NODE_ENV === 'production';
// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    teardownTimeout: 1000,
    setupFiles: ['vitest.setup.ts'],
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  envPrefix: ['DS', 'FE'],
  build: {
    lib: {
      entry: './index.ts',
      formats: ['es'],
      fileName: 'design-system',
    },
    rollupOptions: {
      treeshake: true,
      // bundling @rjsf separately fixes the `vite build --watch` command from hanging!
      external: [/^@rjsf\/core/, 'react', 'react-dom'],
    },
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['../..'],
    },
  },
  plugins: [
    {
      name: 'watch-external', // https://stackoverflow.com/questions/63373804/rollup-watch-include-directory/63548394#63548394
      async buildStart() {
        const AssetsMap = new Map();

        if (isProduction) {
          const paths = await globby([
            join(resolve(__dirname, 'assets'), '**/*.png').replace(/\\/g, '/'),
          ]);

          paths.forEach((path) => {
            const fileName = `'${basename(path).replace('.png', '')}'`;

            if (!AssetsMap.has(fileName)) {
              AssetsMap.set(fileName, fileName);
            }
          });

          const result: string[] = Object.keys(
            Object.fromEntries(AssetsMap)
          ).map((asset) => `${asset} = ${asset}`);

          writeFileSync(
            join(resolve(__dirname, 'assets'), 'assets.types.ts'),
            prettier.format(
              `
              // auto gen
              export enum Assets {
                ${result.join(',')}
              }

              export type AssetName = keyof typeof Assets;
              `,
              {
                parser: 'babel-ts',
                jsxSingleQuote: true,
                filepath: 'foo.ts',
                singleQuote: true,
              }
            )
          );
        } else {
          // Initialize watcher.
          const watcher = chokidar.watch(
            join(resolve(__dirname, 'assets'), '**/*.png').replace(/\\/g, '/')
          );

          watcher.on('all', (eventName, path) => {
            const fileName = `'${basename(path).replace('.png', '')}'`;

            if (eventName === 'add' && !AssetsMap.has(fileName)) {
              AssetsMap.set(fileName, fileName);
            } else if (eventName === 'unlink' && AssetsMap.has(fileName)) {
              AssetsMap.delete(fileName);
            }

            if (eventName === 'add' || eventName === 'unlink') {
              const result: string[] = Object.keys(
                Object.fromEntries(AssetsMap)
              ).map((asset) => `${asset} = ${asset}`);

              writeFileSync(
                join(resolve(__dirname, 'assets'), 'assets.types.ts'),
                prettier.format(
                  `
              // auto gen
              export enum Assets {
                ${result.join(',')}
              }

              export type AssetName = keyof typeof Assets;
              `,
                  {
                    parser: 'babel-ts',
                    jsxSingleQuote: true,
                    filepath: 'foo.ts',
                    singleQuote: true,
                  }
                )
              );

              // watch the filestystem for changes + add or remove from Map to
            }
          });
        }
      },
    },
  ],
} as ViteConfig);
