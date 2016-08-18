CleanWebpackPlugin = require "clean-webpack-plugin"
ExtractTextPlugin = require "extract-text-webpack-plugin"
KssWebpackPlugin = require 'kss-webpack-plugin'
path = require "path"
PathRewriterPlugin = require "webpack-path-rewriter"
webpack = require "webpack"

KssConfig = {
	source: "stylus"
	destination: "stylus/styleguide"
	css: "../../../dist/styles/main.min.css"
}
module.exports =
	entry: [
		"webpack/hot/dev-server"
		"webpack-dev-server/client?http://localhost:8080"
		path.resolve(__dirname, "coffeescript/main")
		path.resolve(__dirname, "jade/index.jade")
	],
	output:
		filename: "main.min.js"
		path: path.join(__dirname, "../dist/scripts")
		publicPath: "/"
	module: loaders: [
		test: /\.coffee$/
		loaders: ["coffee", "cjsx"]
	,
		test: /\.styl$/
		loader: ExtractTextPlugin.extract "style-loader", "css-loader?sourceMap!autoprefixer-loader?browsers=last 2 versions!stylus-loader?sourceMap"
	,
		test: /\.jade$/
		loader: PathRewriterPlugin.rewriteAndEmit
			name: "../[name].html"
			loader: "jade-html?" + JSON.stringify pretty: true
	,
		test: /\.(jpe?g|png|gif|svg)$/i
		loaders: [
			"file?hash=sha512&digest=hex&name=../images/[name].[ext]",
			"image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false"
		]
	]
	plugins: [
		new CleanWebpackPlugin ["dist"]
		new ExtractTextPlugin "../styles/main.min.css",
			allChunks: true
		new PathRewriterPlugin()
		new webpack.HotModuleReplacementPlugin()
		new KssWebpackPlugin(KssConfig)
	]
	resolve:
		extensions: ["", ".js", ".coffee", ".json", ".jsx", ".cjsx"]