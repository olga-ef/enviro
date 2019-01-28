const path = require("path");
const glob = require("glob");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const parts = require("./webpack.parts");


const PATHS = {
  app: path.join(__dirname, "src"),
  build: path.join(__dirname, "dist"),
};

const commonConfig = merge([
  {
    context: path.resolve(__dirname, 'src'),
  	entry: {
      main: [ './js/index.js', './scss/styles.scss'],
    },
    output: {
    	path: path.resolve(__dirname, './dist'),
    	filename: "js/[name].js",
    	chunkFilename: "js/[name].js"
    },
  },
  parts.loadHtml(),
  parts.loadJavaScript({ 
  	include: PATHS.app, 
  	options: {
      presets: ['env'],
      plugins: ["syntax-dynamic-import"]
    } 
  }),
  parts.generateSourceMaps({ type: "source-map" }),
]);

const productionConfig = merge([
	parts.clean(PATHS.build),
	parts.minifyJavaScript(),
	parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
      },
       parser: require('postcss-safe-parser'),
    },
  }),
  parts.extractCSS({
    use: ["css-loader", parts.autoprefix(), "sass-loader"],
  }),

  parts.loadImages({ 
    options: {
      name: "[path][name].[ext]",
    },
  }),
  parts.loadFonts({
  	options: {
  		name: "fonts/[name].[ext]",
  	}
  }),

  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "initial",
          },
        },
      },
      // runtimeChunk: {
      //   name: "manifest",
      // }
    },
  },
]);

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
  parts.loadImages(),
  parts.loadFonts(),
]);

module.exports = mode => {
const pages = [
    parts.page({template: './index.html', filename: 'index.html', chunks: ["main", "manifest", "vendor"]}),
    parts.page({template: './about.html', filename: 'about.html', chunks: ["main", "manifest", "vendor"]}),
    parts.page({template: './links.html', filename: 'links.html', chunks: ["main", "manifest", "vendor"]}),
    parts.page({template: './contacts.html', filename: 'contacts.html', chunks: ["main", "manifest", "vendor"]}),
    parts.page({template: './asbestos.html', filename: 'asbestos.html', chunks: ["main", "manifest", "vendor"]}),
  ];
  const config =
    mode === "production" ? productionConfig : developmentConfig;

  return merge([commonConfig, config, { mode }].concat(pages));

};