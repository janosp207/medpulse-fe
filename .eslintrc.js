module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'overrides': [
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest'
  },
  'plugins': [
    'react',
    '@typescript-eslint'
  ],
  'rules': {
    'camelcase': 'off',
    'indent': [
      'warn',
      2,
      { 'SwitchCase': 1 }
    ],
    'arrow-parens': [
      'warn',
      'as-needed'
    ],
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': [
      'warn',
      'unix'
    ],
    'quotes': [
      'warn',
      'single'
    ],
    'space-before-function-paren': ['error', { 'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always' }],
    'object-curly-spacing': [
      'warn',
      'always'
    ],
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/space-before-function-paren': ['error', { 'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always' }],
    '@typescript-eslint/no-unused-vars': ['error', { 'ignoreRestSiblings': true }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': ['error', { allowArgumentsExplicitlyTypedAsAny: true }]
  }
};
