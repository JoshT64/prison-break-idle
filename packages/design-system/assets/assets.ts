type ModuleType = typeof import('./assets.types');

const allAssets: Record<string, () => Promise<ModuleType>> = import.meta.glob(
  './*.png'
);

export const assets: Record<string, () => Promise<ModuleType>> = {};

Object.keys(allAssets).forEach((asset) => {
  const simpleAssetName = asset
    .substring(asset.lastIndexOf('/') + 1)
    .replace('.png', '');

  const value = allAssets[asset];

  assets[simpleAssetName] = value;
});
