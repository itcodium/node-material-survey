const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const common = require('./webpack.common.js');


module.exports =merge(common, {
	mode: 'development', 
	entry: {
		app:['./public_src/index.js','webpack-hot-middleware/client'],
	},
	module: {
		rules: [
		{ 
			test: /\.html$/, 
			use: {
				loader:'raw-loader',
				options:{
					name: '[name].[ext]',
					outputPath:'assets/components/',
					publicPath:'assets/components/'}
				}
		},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Development'
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
   ],
	output: {
		path: path.resolve(__dirname, 'dist'),
	},
    devtool: 'inline-source-map',
});