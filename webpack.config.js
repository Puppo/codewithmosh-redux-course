const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Redux Course",
    }),
  ],
};
