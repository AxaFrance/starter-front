import postcssImport from 'postcss-import';
import postcssGlobalData from '@csstools/postcss-global-data';
import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';

export default {
  plugins: [
    postcssImport(),
    postcssGlobalData({
      files: ['./src/styles/custom-medias.css'],
    }),
    postcssPresetEnv({
      stage: 4,
      minimumVendorImplementations: 2,
      features: {
        'custom-media-queries': true,
        'custom-selectors': true,
        'blank-pseudo-class': true,
        'relative-color-syntax': true,
      },
    }),
    process.env.NODE_ENV === 'production' && cssnano,
  ],
};
