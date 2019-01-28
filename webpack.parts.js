const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// devServer
exports.devServer = ({ host, port } = {}) => ({
	devServer: {
		stats: "errors-only",
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    open: true,
    overlay: true,
    hot: true
  },
  plugins: [
  new webpack.HotModuleReplacementPlugin(),
  ]
});

// cssLoader
exports.loadCSS = ({ include, exclude } = {}) => ({
	module: {
		rules: [
		{
			test: /\.scss$/,
			include,
			exclude,

			use: ["style-loader", "css-loader", "sass-loader"],
		},
		],
	},
});

// miniCssExtractPlugin
exports.extractCSS = ({ include, exclude, use = [] }) => {
	const plugin = new MiniCssExtractPlugin({
		filename: "css/[name].[hash:4].css",
	});

	return {
		module: {
			rules: [
			{
				test: /\.scss$/,
				include,
				exclude,

				use: [{
					loader: MiniCssExtractPlugin.loader,
					options: {
						publicPath: '../',
					}
				},].concat(use),
			},
			],
		},
		plugins: [plugin],
	};
};

//  purifyCSS
exports.purifyCSS = ({ paths }) => ({
	plugins: [new PurifyCSSPlugin({ paths })],
});

// autoprefixer
exports.autoprefix = () => ({
	loader: "postcss-loader",
	options: {
		plugins: () => [require("autoprefixer")()],
	},
});

// images
exports.loadImages = ({ include, exclude, options} = {}) => ({
	module: {
		rules: [
		{
			test: /\.(png|jpe?g|svg|gif)$/i,
			include,
			exclude,
			use: [{
				loader: "file-loader",
				options,
			},
			{
				loader: 'image-webpack-loader',
				options: {
					mozjpeg: {
						progressive: true,
						quality: 70
					}
				}
			}],
		},
		],
	},
});

// fonts
exports.loadFonts = ({ include, exclude, options } = {}) => ({
	module: {
		rules: [
		{
			test: /\.(ttf|eot|woff|woff2)$/,
			include,
			exclude,
			use: {
				loader: "file-loader",
				options,
			},
		},
		],
	},
});

// JS
exports.loadJavaScript = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: {
        	loader: "babel-loader",
        	options
        },
      },
    ],
  },
});

// SourceMaps
exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

// clean dist

exports.clean = path => ({
  plugins: [new CleanWebpackPlugin([path])],
});

// minimize js
exports.minifyJavaScript = () => ({
  optimization: {
    minimizer: [new UglifyWebpackPlugin({ sourceMap: true })],
  },
});

// minify CSS
exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false,
    }),
  ],
});

//  load html 
exports.loadHtml = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.html$/,
        include,
        exclude,
        use: {
        	loader: "html-loader",
        	options
        },
      },
    ],
  },
});



exports.page = ({template, filename, chunks} = {}) => ({
  plugins: [
    new HtmlWebpackPlugin({
      filename,
      template,
      chunks
    }),
  ],
});