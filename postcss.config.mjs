export default {
  plugins: {
    'postcss-import-ext-glob': {},
    'postcss-import': {},
    '@tailwindcss/postcss': {},
    'postcss-lightningcss': {
      lightningcssOptions: {
        minify: true,
        drafts: { customMedia: true }
      }
    },
  },
};