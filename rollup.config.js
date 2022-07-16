import babel from 'rollup-plugin-babel'

export default {
  input: './src/index.js',

  output: {
    file: './dist/copy-to-clipboard.js',
    format: 'umd',
    name: 'copyToClipboard'
  },
  
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}