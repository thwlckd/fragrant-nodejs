module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['import'],
  extends: ['airbnb-base', 'prettier', 'plugin:import/recommended'],
  rules: {
    'no-console': 'off',
    'no-alert': 'off',
    'no-param-reassign': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-absolute-path': 'off',
  },
};
