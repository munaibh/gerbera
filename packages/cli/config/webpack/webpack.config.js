/**
 * Import Dependencies
 */
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const babelConfig = require('./babelConfig')

/**
 * Configure CSS Extraction
 * Extract style.css for both editor and frontend styles.
 */
const extractFrontendStyles = new ExtractTextPlugin({ filename: 'style.build.css' })
const extractEditorStyles = new ExtractTextPlugin({ filename: 'editor.build.css' })
const extractConfig = {
	use: [
    { loader: 'css-loader' },
		{
			loader: 'sass-loader',
			options: {
				data: '@import "./client/common/common.scss";\n',
				outputStyle: 'nested',
			}
		}
	]
}

/**
 * Export Configuration
 * Export the configuration object to be consumed by webpack.
 */
module.exports = {
  mode: "development",
  context: __dirname,
	entry: [
    'webpack/hot/dev-server',
    process.cwd() + '/client/blocks.js'
  ],
	output: {
		chunkFilename: 'block.[chunkhash].js',
    filename: 'block.build.js',
    path: process.cwd() + '/build',
    publicPath: "http://localhost:9000/"
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  watch: false,
  stats: "errors-only",
	module: {
		rules: [
			{
				test: /\.(js|jsx|mjs)$/,
				exclude: /(node_modules)/,
				use: {
          loader: 'babel-loader',
          options: babelConfig,
				},
			},
			{
				test: /style\.(css|sass|scss)$/,
				exclude: /(node_modules)/,
				use: extractFrontendStyles.extract(extractConfig),
			},
			{
				test: /editor\.(css|sass|scss)$/,
				exclude: /(node_modules)/,
				use: extractEditorStyles.extract(extractConfig),
			}
		]
	},
	plugins: [
    extractFrontendStyles, 
    extractEditorStyles,
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
