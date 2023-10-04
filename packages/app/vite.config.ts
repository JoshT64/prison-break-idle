import { defineConfig } from 'vite';
import { resolve, join, dirname, basename } from 'path';
import { writeFileSync } from 'fs';
import prettier from 'prettier';
import chokidar from 'chokidar';
import globby from 'globby';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
    browserField: false,
    mainFields: ['module', 'jsnext:main', 'jsnext'],
  },
  plugins: [
    {
      name: 'watch-external', // https://stackoverflow.com/questions/63373804/rollup-watch-include-directory/63548394#63548394
      async buildStart() {
        const AssetsMap = new Map();

        const assetDirectoryPath = join(
          resolve(__dirname, '../design-system/assets'),
          '**/*.png'
        ).replace(/\\/g, '/');

        if (isProduction) {
          const paths = await globby([assetDirectoryPath]);

          paths.forEach((path) => {
            const fileName = `${basename(path).replace('.png', '')}`;

            if (!AssetsMap.has(fileName)) {
              AssetsMap.set(fileName, fileName);
            }
          });

          // Generate imports
          const importStatements = [''];
          AssetsMap.forEach((path, fileName) => {
            console.log(fileName);
            const relativePath = path
              .replace(resolve(__dirname), '../')
              .replace(/\\/g, '/');
            importStatements.push(
              `import ${fileName} from '../../../design-system/assets/${relativePath}.png';`
            );
          });

          // Generate AssetMapping
          const assetMappingEntries = Array.from(AssetsMap.keys()).map(
            (asset) => `${asset},`
          );

          const content = await prettier.format(
            `
            ${importStatements.join('\n')}
            import { Assets } from '../../../design-system/assets/assets.types';

            type AssetMapping = {
              [key in Assets]: string;
            }



            export const assetMapping: AssetMapping = {
              ${assetMappingEntries.join('\n')}
            };
          `,
            {
              parser: 'babel-ts',
              jsxSingleQuote: true,
              filepath: 'foo.ts',
              singleQuote: true,
            }
          );

          writeFileSync(
            join(
              resolve(__dirname, '../design-system/assets'),
              '../../app/src/assets/assetMappings.ts'
            ),
            content
          );

          // watch the filestystem for changes + add or remove from Map to
        }
      },
    },
  ],
});
