import path from 'path';
import webpack from 'webpack';

export default {
	devtool: 'source-map',
	entry: [
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'static'),
		filename: 'bundle.js',
		publicPath: ''
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		})
	],
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	eslint: {
		configFile: '.eslintrc'
	},
	module: {
		preLoaders: [{
			test: /\.js|\.jsx$/,
			loaders: ['eslint-loader'],
			exclude: ['node_modules']
		}],
		loaders: [{
			test: /\.js|\.jsx$/,
			loaders: ['babel'],
			include: path.join(__dirname, 'src')
		}]
	}
};
