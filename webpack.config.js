const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/pages/index.js',
    auth: './src/pages/auth.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/[name].[hash].js',
    publicPath: '',
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: 'babel-loader',
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: { importLoaders: 1 },
        },
        'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: './src/auth.html',
      filename: 'auth.html',
      chunks: ['auth'],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
