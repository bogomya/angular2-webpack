const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const METADATA = webpackMerge(commonConfig.metadata, {
    host: HOST,
    port: PORT,
    ENV: ENV
});

module.exports = webpackMerge(commonConfig, {
    debug: false,
    devtool: 'source-map',
    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].bundle.js',
        sourceMapFilename: '[name].[chunkhash].bundle.map',
        chunkFilename: '[id].[chunkhash].chunk.js'
    },

    plugins: [
        // For replacing a standard webpack chunkhash with md5.
        new WebpackMd5Hash(),
        // Prevents the inclusion of duplicate code into your bundle
        new DedupePlugin(),
        // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
        new DefinePlugin({
            'ENV': JSON.stringify(METADATA.ENV)
        }),

        // Minimize all JavaScript output of chunks.
        new UglifyJsPlugin({
            beautify: false,
            mangle: { screw_ie8 : true, keep_fnames: true }, // keep_fnames=false issue https://github.com/angular/angular/issues/10618
            compress: { screw_ie8: true },
            comments: false
        })
    ],

    tslint: {
        emitErrors: true,
        failOnHint: true,
        resourcePath: 'src'
    }
});
