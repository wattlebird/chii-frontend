require('dotenv').config();
const path = require('path') // resolve path
const { rspack } = require('@rspack/core');
const HtmlWebpackPlugin = require('html-webpack-plugin') // create file.html

module.exports = {
	mode: 'development',
	devtool: 'eval-cheap-source-map',
	devServer: {
		static: path.join(__dirname, 'prod'),
		port: 3000,
		hot: true,
		historyApiFallback: true,
		proxy: [{
			context: ['/api'],
      target: 'http://localhost:3001',
		}, {
			context: ['/bapi/*'],
			target: 'https://api.bgm.tv',
			secure: false,
			changeOrigin: true,
			pathRewrite: { '^/bapi': '' },
		}, {
			context: ['/graphql'],
			target: 'https://chiitest.azurewebsites.net/graphql',
			secure: false,
			changeOrigin: true
		}],
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
		new rspack.CssExtractRspackPlugin({ filename: '[name].[contenthash].css', chunkFilename: '[id].[contenthash].css' }),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './public/index.html')
		}),
    new rspack.DefinePlugin({
      'process.env.BGM_CLIENT_ID': JSON.stringify(
        process.env.BGM_CLIENT_ID || 'bgm558869942605d02b9'
      ),
      'process.env.BGM_REDIRECT_URL': JSON.stringify(
        process.env.BGM_REDIRECT_URL || 'https://chiitest.azurewebsites.net/auth/redirect'
      )
    })
	],

	optimization: {
		minimizer: [new rspack.SwcJsMinimizerRspackPlugin(), new rspack.LightningCssMinimizerRspackPlugin()],

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
					rspack.CssExtractRspackPlugin.loader,
					'css-loader',
					'sass-loader',
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
