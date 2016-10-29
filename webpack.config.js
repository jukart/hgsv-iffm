var path = require('path');
var webpack = require('webpack');

var isProduction = !!(process.argv.filter(function(a) { return a === '-p';})).length;

var plugins = [];

if (isProduction) {
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }));
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    }
  }));
}

var SRC_DIR = path.resolve(__dirname, 'client');

module.exports = {
  entry: path.resolve(__dirname, 'client', 'index'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.bundle.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  devtool: 'source-map',
  plugins: 'plugins'
}
