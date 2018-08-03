import resolve from 'rollup-plugin-node-resolve';
import {
	uglify
} from 'rollup-plugin-uglify';
// import cjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import timeStr from './src/common/getTime.js';
export default {
	input: 'src/index.js',
	output: {
		file: 'dist/ec.min.js',
		format: 'umd',
		name: 'Ec', //ErrorCapture
		sourcemap: true,
		strict: false,
		env: 'development',
		banner: `
/**诺诺金服前端团队
 *创建于${timeStr}
 * Released under the MIT License.
*/`
	},
	plugins: [
		resolve(),
		babel({
			exclude: 'node_modules/**' // 不编译node_modules中的代码
		}),
		// uglify()
	],
	watch: {
		chokidar: true,
		include: 'src/**',
		exclude: 'node_modules/**'
	}
};