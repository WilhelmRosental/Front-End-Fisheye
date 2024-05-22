const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devServer: {
        static: {
          directory: path.join(__dirname, 'build'),
        },
        compress: true,
        port: 3000,
        open: true,
        hot: true,
        liveReload: true,
    },
    entry: {
        index: './src/App.js',
        photographer: './src/pages/photographer.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js',
        assetModuleFilename: 'assets/[hash][ext][query]'
    },
    module: {
        rules: [
        {
            test: /\.css$/,
            use: [
                process.env.NODE_ENV !== 'production'
                ? 'style-loader'
                : MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        },
        {
            test: /\.html$/,
            loader: 'html-loader'
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.(mp4|mp3|wav|webm)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.json$/i,
            type: 'json',
            use: 'json-loader'
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['index']
        }),
        new HtmlWebpackPlugin({
        template: './src/photographer.html',
        filename: 'photographer.html',
        chunks: ['photographer']
        }),
        new MiniCssExtractPlugin({
            filename: './src/styles/[name].[contenthash].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
              { from: 'src/data', to: 'data' }
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
              { from: 'src/assets/medias', to: 'assets/medias' }
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
              { from: 'src/assets/photographers', to: 'assets/photographers' }
            ]
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    mode: 'development'
};