import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import flow from 'rollup-plugin-flow'

export default {
  input: 'src/index.js',
  output: {
    name: 'ReactTVNavigation',
    file: 'dist/bundle.umd.js',
    format: 'umd',
  },
  plugins: [
    flow(),
    babel({
      exclude: 'node_modules/**',
      externalHelpers: false,
    }),
    commonjs(),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
  ],
}
