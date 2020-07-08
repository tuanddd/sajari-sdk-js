// Override webpack config defaults
export default {
  webpack(config, env, helpers) {
    // Remove PostCSS config
    const postcssLoader = helpers.getLoadersByName(config, 'postcss-loader');
    postcssLoader.forEach(({ loader }) => delete loader.options);
  },
};
