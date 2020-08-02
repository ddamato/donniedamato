import multi from '@rollup/plugin-multi-entry';
import html from 'rollup-plugin-html';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './components/**/*.js',
  plugins: [
    multi(),
    html(),
    postcss({ inject: false }),
    terser(),
  ],
  output: {
      file: './_site/components.min.js',
      format: 'iife',
      name: 'components'
  }
}