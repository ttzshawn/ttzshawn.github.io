var path = require('path');
var webpack = require('webpack');

var dirName = path.join(__dirname, 'src/')
module.exports = {
    entry: './src/main.js',
    output: { path: dirName, filename: 'bundle.js' },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
};