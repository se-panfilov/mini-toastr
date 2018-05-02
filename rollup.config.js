import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import uglify from 'rollup-plugin-uglify'
// import conditional from "rollup-plugin-conditional"
// import uglifyBundle from "./rollup-plugin-uglify-bundle"
// import stripCode from "./rollup-plugin-strip-code"
import stripCode from 'rollup-plugin-strip-code'
import filesize from 'rollup-plugin-filesize'

const pkg = require('./package.json')
const externalDeps = Object.keys(Object.assign({}, pkg.dependencies, pkg.peerDependencies))
const nodeDeps = ['path']
const external = externalDeps.concat(nodeDeps)
const libraryName = 'mini-toastr'
// const isProduction = process.env.buildTarget === 'production' || process.env.NODE_ENV === 'production'
const isProduction = true // TODO (S.Panfilov) temp

export default {
  input: `src/${libraryName}.ts`,
  output: [
    { file: pkg.main, name: camelCase(libraryName), format: 'umd' }, // TODO (S.Panfilov) test IIFE
    { file: pkg.module, format: 'es' }
  ],
  sourcemap: true,
  external: external || [],
  watch: {
    include: 'src/**'
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    stripCode({
      start_comment: 'START.TESTS_ONLY',
      end_comment: 'END.TESTS_ONLY'
    }),

    // Resolve source maps to the original source
    sourceMaps(),

    // conditional(isProduction, [
    // uglifyBundle(),
    // uglify(),
    // ]),

    (isProduction && uglify()),

    // conditional(!isProduction, [
    filesize()//,
    // watch()
    // ])
  ]
}
