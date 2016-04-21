import path from 'path';
import webpack from 'webpack';

export default {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'static', 'scripts'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		}),
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
