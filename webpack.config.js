var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

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

plugins.push(new CopyWebpackPlugin([
  {
    from: 'screens/main/index.html'
  }
]));

var SRC_DIR = path.resolve(__dirname, 'client');

module.exports = {
  context: path.join(__dirname, 'client'),
  entry: path.resolve(__dirname, 'client', 'bundle'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.bundle.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]!extract-loader!html-loader'
      }
    ]
  },
  devtool: 'source-map',
  plugins: 'plugins'
};
