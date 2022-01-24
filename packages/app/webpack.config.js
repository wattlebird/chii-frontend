const path = require('path') // resolve path
const HtmlWebpackPlugin = require('html-webpack-plugin') // create file.html
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // extract css to files
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // minify css
const TerserPlugin = require('terser-webpack-plugin') // minify js
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer') // help tailwindcss to work

module.exports = {
	mode: 'development',
	devtool: 'eval-cheap-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'prod'),
		port: 3000,
		hot: true,
		historyApiFallback: true,
		proxy: {
      '/api': 'http://localhost:5000',
    },
	},

	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'] // import without .ts or .tsx etc....
	},
	entry: {
		index: path.join(__dirname, 'src/index.tsx')
	},

	output: {
		publicPath: '',
		path: path.resolve(__dirname, 'prod'),
		filename: '[name].[hash].bundle.js' // for production use [contenthash], for developement use [hash]
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: '[name].[contenthash].css', chunkFilename: '[id].[contenthash].css' }),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './public/index.html')
		})
	],

	optimization: {
		minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin({})],

		moduleIds: 'deterministic',
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	},

	module: {
		rules: [
			{
				test: /\.(css|scss|sass)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
					{
						loader: 'postcss-loader', // postcss loader needed for tailwindcss
						options: {
							postcssOptions: {
								ident: 'postcss',
								plugins: [tailwindcss, autoprefixer]
							}
						}
					}
				]
			},
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				type: 'asset/resource',
			},
			{
				test: /\.html$/,
				use: [{ loader: 'html-loader' }]
			},
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /(node_modules|bower_components|prod)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
						plugins: ['@babel/plugin-transform-runtime']
					}
				}
			}
		]
	}
}
