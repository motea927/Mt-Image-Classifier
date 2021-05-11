module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended',
    'prettier',
  ],
  plugins: ['vue'],
  parserOptions: {
    sourceType: 'module',
  },
}
