var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        app: './app/main.ts',
        vendor: './app/vendor.ts',
        polyfills: './app/polyfills.ts'
    },
    output: {
        filename: './prod/[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.ts', '.html']
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'ts'
        }, {
            test: /\.html$/,
            loader: 'file?name=prod/[name].[ext]?<[hash]&context=./app'
        }, {
            test: /\.scss$/,
            loaders: ['raw', 'sass']
        }, ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.template.ejs',
            inject: 'body',
        })
    ],
};

module.exports = config;