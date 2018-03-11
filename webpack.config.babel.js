import webpack from 'webpack'
import path from 'path'
import webpackNodeExternals from 'webpack-node-externals'

const resolve = dir => path.resolve(__dirname, dir)

const config = {
  entry: [
    'babel-polyfill',
    './src/server.js'
  ],
  output: {
    path: resolve('build'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      '@': resolve('src')
    },
    extensions: ['.js']
  },
  target: 'node',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            'env',
            'stage-2',
            { plugins: ['transform-class-properties'] }
          ]
        }
      }
    ]
  },
  plugins: [new webpack.optimize.UglifyJsPlugin()],
  externals: webpackNodeExternals()
}

export default config
