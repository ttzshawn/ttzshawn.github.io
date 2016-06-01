var path = require('path');
var webpack = require('webpack');

var distName = path.join(__dirname, 'dist/')
module.exports = {
    entry: './src/main.js',
    output: { path: distName, filename: 'bundle.js' },
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