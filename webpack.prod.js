 const merge = require('webpack-merge');
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
 const webpack = require('webpack');
 const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'production',
	entry: {
		app: './public_src/index.js'
	},
	module: {
		rules: [
			{ 
				test: /\.html$/, 
				use:{
					loader:'html-loader'
					}
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Production'
		}),
		new UglifyJSPlugin({
			sourceMap: false
		})
	 ],
	 output: {
		path: path.resolve(__dirname, 'public/js'),
	},
});
