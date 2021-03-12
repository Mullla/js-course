const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'dev-bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    mode: 'development',
    devServer: {
        open: true,
        port: 8080,
        hot: false,
        writeToDisk: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                }
            }
        ]
    },

};