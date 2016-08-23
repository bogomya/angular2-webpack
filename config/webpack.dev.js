const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

const DefinePlugin = require('webpack/lib/DefinePlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

const METADATA = webpackMerge(commonConfig.metadata, {
    host: HOST,
    port: PORT,
    ENV: ENV
});

module.exports = webpackMerge(commonConfig, {
    //metadata: METADATA, // Merged metadata from webpack.common.js for index.html
    debug: true, // Switch loaders to debug mode.
    devtool: 'cheap-module-source-map',
    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
        //library: 'ac_[name]', // Export entry to variable
    },
    plugins: [
        // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
        new DefinePlugin({
            'ENV': JSON.stringify(METADATA.ENV)
        })
    ],

    tslint: {
        emitErrors: false,
        failOnHint: false,
        resourcePath: 'src'
    },
    
    devServer: {
        contentBase: helpers.root('src'),
        port: METADATA.port,
        host: METADATA.host,
        historyApiFallback: true
    }
});


