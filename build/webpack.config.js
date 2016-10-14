var path = require('path')
var projectRoot = path.resolve('__dirname', '../')
const config = require('./config');
const to = require('to-case')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: config.projectName.projectName + '.js',
    library: to.pascal(config.projectName),
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['latest'],
          plugins: ['transform-runtime']
        }
      }
    ]
  }
};