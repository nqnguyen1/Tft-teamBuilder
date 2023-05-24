const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  devServer: {
    open: true,
    proxy: {
      "/api": "http://localhost:3000",
    },
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?/, //either .js or .jsx
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
