const path = require('path') // resolve path
const HtmlWebpackPlugin = require('html-webpack-plugin') // create file.html
const { rspack } = require('@rspack/core');

module.exports = {
  mode: 'production',
  devtool: false,

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'] // import without .ts or .tsx etc....
  },
  entry: {
    index: './src/index.tsx'
  },

  output: {
    publicPath: '',
    path: path.resolve(__dirname, 'prod'),
    filename: '[name].[contenthash].bundle.js' // for production use [contenthash], for developement use [hash]
  },
  plugins: [
    new rspack.CopyRspackPlugin({
      patterns: [{
        from: "public",
        globOptions: {
          ignore: ["**/index.html"],
        },
      }]
    }),
    new rspack.CssExtractRspackPlugin({ filename: '[name].[contenthash].css', chunkFilename: '[name].[contenthash].css' }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html')
    }),
		new rspack.DefinePlugin({
			'process.env.BGM_CLIENT_ID': JSON.stringify('bgm335567222c211f226'),
			'process.env.BGM_REDIRECT_URL': JSON.stringify('https://service.chii.ai/auth/redirect')
		})
  ],

  optimization: {
    minimizer: [new rspack.SwcJsMinimizerRspackPlugin(), new rspack.LightningCssMinimizerRspackPlugin()],

    moduleIds: 'deterministic',
    runtimeChunk: 'single', // share same code bewteen js files
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
