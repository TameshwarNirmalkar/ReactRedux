const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const rulesloader = require('./webpack.loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: {
        "app": path.resolve(__dirname, "src/index.jsx")
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "build"),
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".json", ".css", ".scss"]
    },
    module: {
        rules: rulesloader
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.ProvidePlugin({
            "React": "react",
            "$": "jquery",
            "jQuery": "jquery"
        }),
        new ExtractTextPlugin('./src/assets/css/app.bundle.css')
    ]
};