var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: [
        './src/index.jsx' // Your appʼs entry point
    ],
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'public/build/'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: loaders
    },
    devServer: {
        contentBase: "./src",
        noInfo: true, //  --no-info option
        hot: true,
        inline: true
    },
    plugins: [
        new webpack.NoErrorsPlugin(),

        // reloads browser when the watched files change
        new BrowserSyncPlugin({
            // use existing Apache virtual host
            host: 'localhost',
            port: 8080,
            proxy: 'localhost',
            tunnel: true,
            files: ['public/build/*']
        }),

        // set node env
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        // minify
        /*        new webpack.optimize.UglifyJsPlugin({
        	      compress:{
        	        warnings: true
        	      }
        	    },
        	    {
        	      include: /\.min\.js$/,
        	      minimize: true
        	    })*/
    ]
};
