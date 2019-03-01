const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public/dist');
const FRONTEND_DIR = path.resolve(__dirname, 'src');

const config = {
  mode: 'development',
  entry: `${FRONTEND_DIR}/index.js`,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [],
  devServer: {
    open: false,
    contentBase: './public',
    watchContentBase: true,
    writeToDisk: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    port: 8000,
  },
};

module.exports = config;
