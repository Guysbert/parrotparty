var webpack = require('webpack');

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
            },

        ]
    }
};

module.exports = config;