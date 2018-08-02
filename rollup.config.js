import resolve from 'rollup-plugin-node-resolve';
import {
	uglify
} from 'rollup-plugin-uglify';
import cjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/ec.min.js',
		format: 'umd',
		name: 'EC', //ErrorCapture
		sourcemap: true,
		strict: false,
		env: 'development',
		banner: '/*头部待定*/'
	},
	plugins: [
		resolve(),
		cjs(),
		babel({
			exclude: 'node_modules/**' // 不编译node_modules中的代码
		}),
		uglify()
	],
	watch: {
		chokidar: true,
		include: 'src/**',
		exclude: 'node_modules/**'
	}
};