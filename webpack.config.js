const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  devServer: {
    historyApiFallback: true,
    open: true,
    proxy: {
      "/api": "http://localhost:3000",
    },
    static: {
      directory: path.join(__dirname, "public"),
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/public",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/, //either .js or .jsx
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              ["@babel/preset-react", { targets: "defaults" }],
            ],
          },
        },
      },
    ],
  },
};
