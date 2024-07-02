import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WepbackDevServerConfiguration } from 'webpack-dev-server';
// import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import Dotenv from 'dotenv-webpack';

interface Configuration extends WebpackConfiguration {
  xdevServer?: WepbackDevServerConfiguration;
}

const config: Configuration = {
  entry: './src/client/index.tsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript', // separate TypeScript preset
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
      {
        test: /\.s?css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: {
      publicPath: '/',
      directory: path.resolve(__dirname, './client/assets'),
    },
    historyApiFallback: true,
    proxy: [
      {
        context: [
          '/auth/**',
          '/logs/**',
        ],
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    ],
    port: 8080,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
    }),
    new Dotenv(),
  ],
};

export default config;
