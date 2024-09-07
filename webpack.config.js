const path = require('path');

module.exports = {
  entry: './src/index.js',  // Entry point (where Webpack starts bundling)
  output: {
    filename: 'bundle.js',  // Output bundle filename
    path: path.resolve(__dirname, 'dist'),  // Output directory
  },
  mode: 'development', // Change to 'production' for optimized builds

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  // Path to your HTML file
    }),
  ],
  
  rules: [
    {
      test: /\.css$/,  // Regex to match CSS files
      use: ['style-loader', 'css-loader'],  // Loaders to use for CSS
    },
  ],
};