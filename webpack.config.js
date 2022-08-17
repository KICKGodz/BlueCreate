const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	mode: 'development',
	entry: './src-ui/index.ts',
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		port: 8080,
		open: true,
		hot: true,
		compress: true,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				include: [path.resolve(__dirname, 'src-ui')],
				use: 'ts-loader',
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	devtool: 'eval-source-map',
	output: {
		// publicPath: "dist",
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'CPU Monitor',
			filename: 'index.html',
			template: 'src-ui/template.html',
		}),
	],
};
