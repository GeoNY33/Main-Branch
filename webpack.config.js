const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './client/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      { 
        test: /\.jsx?/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      // {
      //   test: /\.(js|jsx|ts|tsx)$/,
      //   exclude: /node_modules/,
      //   use: ['ts-loader'],
      // },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader', 'css-loader'
        ]
      }
    ]
  },
  resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  devServer: {
    historyApiFallback: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname)
    },
    port: 8080, 
    compress: true,
    hot: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
};