const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		vendor: ['angular'],
	},
	devServer: {
		contentBase: './dist'
	},
	module: {
		rules: [
		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
			exclude: /node_modules/
		},
		{	test: /\.(png|svg|jpg|gif)$/,
			use:{
					loader:'file-loader',
					options:{
						name: '[name].[ext]',
						outputPath:'assets/icons/',
						publicPath:'assets/icons/'
					}
				}
		},
		{ test: /\.(woff|woff2|eot|ttf|otf)$/,use: ['file-loader']},
		{ test: /\.js$/,
			loader: ['babel-loader'],        
			exclude: /node_modules/
		},  
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new webpack.ProvidePlugin({
			_: "underscore",
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		  })
		
   ],
   output: {
		filename: '[name].bundle.js',
		publicPath: '/js/'
	},
	optimization: {
		minimize: false,
		runtimeChunk: {
			name: 'vendor'
		},
		splitChunks: {
			cacheGroups: {
				default: false,
				commons: {
					test: /node_modules/,
					name: "vendor",
					chunks: "initial",
					minSize: 1
				}
			}
		}
	},
}; 


 