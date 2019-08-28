module.exports = {
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y', 'import'],
  globals: {
    document: 1
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    semi: [2, 'never']
  },
  parser: 'babel-eslint',
  env: {
    browser: 1
  }
}
