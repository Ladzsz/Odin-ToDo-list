const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',  // Entry point (where Webpack starts bundling)
  output: {
    filename: 'bundle.js',  // Output bundle filename
    path: path.resolve(__dirname, 'dist'),  // Output directory
  },
  mode: 'development', // Change to 'production' for optimized builds

  module: {
    rules: [
      {
        test: /\.css$/,  // Regex to match CSS files
        use: [
          'style-loader',  // Injects CSS into the DOM
          'css-loader'     // Resolves CSS imports
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  // Path to your HTML file
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,  // Port number where the server will run
    open: true
  },
};
