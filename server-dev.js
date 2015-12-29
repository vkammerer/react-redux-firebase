import path from 'path';
import express from 'express';
import webpack from 'webpack';
import config from './webpack.config.dev';

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	stats: {
		chunks: false,
		colors: true
	},
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('static'));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.listen(8080, 'localhost', (err) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log('Listening at http://localhost:8080');
});
