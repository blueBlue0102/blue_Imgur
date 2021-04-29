const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public/js"),
  },
  // Easy way to also bundle the dropzone css.
  module: { rules: [{ test: /\.css$/, use: ["style-loader", "css-loader"] }] },
};