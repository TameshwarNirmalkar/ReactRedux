const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const loadersassets = require('./webpack.loaders');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './src/index.html'),
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: {
        app: path.resolve(__dirname, "src/index.jsx")
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "/build"),
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".json", ".css", ".scss"]
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, exclude: [path.resolve(__dirname, '/node_modules/')], loader: 'react-hot-loader!babel-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(jpe?g|png|gif|svg)$/i, loader: "file-loader?name=/assets/images/[name].[ext]" }
        ]
    },
    plugins: [
        HtmlWebpackPluginConfig,

        new webpack.ProvidePlugin({
            "React": "react",
            "$": "jquery",
            "jQuery": "jquery"
        }),
    ]
};