import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import encode from 'rollup-plugin-encoding'
import typescript from 'rollup-plugin-typescript2'

export default [
  'importNames',
  'importQueries',
  'exportNames',
  'exportQueries',
].map((name) => {
  return {
    input: `src/wsh/${name}.ts`,
    output: {
      file: `dist/wsh/${name}.js`,
      format: 'es',
      banner: 'Object.defineProperty=function(o,p,d){o[p]=d.value};',
    },
    plugins: [
      // tsconfig.jsonに従って、TypeScriptがトランスパイルされます。
      typescript({
        tsconfig: 'src/wsh/tsconfig.json',
      }),

      // .babelrcに従って、ES3へトランスパイルされます。
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.ts'],
      }),

      // CommonJSモジュールをES Modulesに揃えます。
      commonjs(),

      encode({
        //dist: `dist/${name}_sjis.js`,
        encodingTo: 'SHIFT_JIS',
      }),
    ],
  }
})
