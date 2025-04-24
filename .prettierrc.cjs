module.exports = {
  useTabs: false,
  tabWidth: 2,
  printWidth: 120,
  jsxSingleQuote: false,
  singleQuote: true,
  endOfLine: 'lf',
  semi: true,
  trailingComma: 'es5',
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-vue'],
  overrides: [
    { files: '*.svelte', options: { parser: 'svelte' } },
    { files: '*.vue', options: { parser: 'vue' } }
  ],
};
