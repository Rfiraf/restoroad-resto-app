const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const ImageminWebpackPlugin = require("imagemin-webpack-plugin").default;
const ImageminMozjpeg = require("imagemin-mozjpeg");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/scripts/index.js"),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      "...",
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: "~",
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/templates/index.html"),
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),

    new MiniCssExtractPlugin(),

    new WorkboxWebpackPlugin.GenerateSW({
      swDest: "./sw.bundle.js",
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.href.startsWith("https://restaurant-api.dicoding.dev/list"),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "dicoding-restaurant-list",
          },
        },
        {
          urlPattern: ({ url }) => url.href.startsWith("https://restaurant-api.dicoding.dev/detail/"),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "dicoding-restaurant-detail",
          },
        },
        {
          urlPattern: ({ url }) => url.href.startsWith("https://restaurant-api.dicoding.dev/images/"),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "dicoding-restaurant-images",
          },
        },
        {
					urlPattern: ({ url }) => url.href.startsWith("https://kit.fontawesome.com/741f26e0eb.js"),
					handler: "StaleWhileRevalidate",
					options: {
						cacheName: "fontawesome",
					},
				},
        {
					urlPattern: /^https:\/\/fonts\.gstatic\.com/,
					handler: "CacheFirst",
					options: {
						cacheName: "google-fonts",
					},
				},
      ],
    }),
    
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),
  ],
};
