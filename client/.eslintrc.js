module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    'no-shadow': 1,
    'no-unused-vars': 1,
    'no-console': 1,
    'import/prefer-default-export': 0,
    'arrow-parens': ['error', 'as-needed'],
    'import/no-cycle': 0,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['root', './src'],
          ['assets', './src/assets'],
          ['store', './src/store'],
          ['components', './src/components'],
          ['containers', './src/containers'],
          ['utils', './src/utils'],
          ['theme', '../src/theme'],
          ['i18n', './src/i18n'],
          ['mocks', './src/mocks'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
};
