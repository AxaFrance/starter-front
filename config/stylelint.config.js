export default {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],
  overrides: [
    {
      files: ['**/*.css'],
      rules: {
        'scss/operator-no-unspaced': null,
      },
    },
  ],
  rules: {
    'at-rule-no-unknown': null,
    'no-empty-source': null,
  },
};
