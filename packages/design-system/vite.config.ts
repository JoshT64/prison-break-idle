import { defineConfig, UserConfig } from 'vite';
import { resolve, join, dirname, sep, basename } from 'path';
import { writeFileSync } from 'fs';
import prettier from 'prettier';
import chokidar from 'chokidar';
import { globby } from 'globby';
import { fileURLToPath } from 'url';

// Cypress workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

type ViteConfig = UserConfig;

// @todo- Need to import this from @pypestream/utils (Need to check why that import fails currently)
const isProduction = process.env.NODE_ENV === 'production';
// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    teardownTimeout: 1000,
    setupFiles: ['vitest.setup.ts'],
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
    https: !process.env?.VITEST,
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['../..'],
    },
  },
  plugins: [
    {
      name: 'watch-external', // https://stackoverflow.com/questions/63373804/rollup-watch-include-directory/63548394#63548394
      async buildStart(options) {
        const SvgMap = new Map();

        if (isProduction) {
          const paths = await globby([
            join(resolve(__dirname, 'src/components/icon'), '**/*.svg').replace(
              /\\/g,
              '/'
            ),
          ]);

          paths.forEach((path) => {
            const fileName = `'${basename(path).replace('.svg', '')}'`;

            if (!SvgMap.has(fileName)) {
              SvgMap.set(fileName, fileName);
            }
          });

          const result: string[] = Object.keys(Object.fromEntries(SvgMap)).map(
            (icon) => `${icon} = ${icon}`
          );

          writeFileSync(
            join(resolve(__dirname, 'src/components/icon'), 'icon.types.ts'),
            prettier.format(
              `
              // do not manually modify this auto-generated file!!
              export enum Icons {
                ${result.join(',')}
              }

              export type IconName = keyof typeof Icons;
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
            join(resolve(__dirname, 'src/components/icon'), '**/*.svg').replace(
              /\\/g,
              '/'
            )
          );

          watcher.on('all', (eventName, path) => {
            const fileName = `'${basename(path).replace('.svg', '')}'`;

            if (eventName === 'add' && !SvgMap.has(fileName)) {
              SvgMap.set(fileName, fileName);
            } else if (eventName === 'unlink' && SvgMap.has(fileName)) {
              SvgMap.delete(fileName);
            }

            if (eventName === 'add' || eventName === 'unlink') {
              const result: string[] = Object.keys(
                Object.fromEntries(SvgMap)
              ).map((icon) => `${icon} = ${icon}`);

              writeFileSync(
                join(
                  resolve(__dirname, 'src/components/icon'),
                  'icon.types.ts'
                ),
                prettier.format(
                  `
              // do not manually modify this auto-generated file!!
              export enum Icons {
                ${result.join(',')}
              }

              export type IconName = keyof typeof Icons;
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
