module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-themes',
  ],
  staticDirs: ['../assets'],

  core: {
    builder: '@storybook/builder-vite',
  },
  framework: '@storybook/react-vite',

  docs: {
    docsPage: true,
  },
};
