const webpack = require('webpack');
const helpers = require('./helpers');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const METADATA = {
    title: 'Angular2 Webpack Starter',
    baseUrl: '/'
};

module.exports = {
    metadata: METADATA,
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'main': './src/main.ts'
    },
    resolve: {
        extensions: ['', '.ts', '.js'],
        root: helpers.root('src'),
        modulesDirectories: ['node_modules']
    },
    module: {
        preLoaders: [
            // { test: /\.ts$/, loader: 'tslint', exclude: [ helpers.root('node_modules') ] },
        ],
        loaders: [
            // Transform .ts into .js
            {test: /\.ts$/, loader: 'ts', exclude: /\/node_modules\//},

            // Inline CSS into components (returns file content as string)
            {test: /\.css$/, loaders: ['to-string', 'css'], exclude: /\/node_modules\//},
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css'),
                include: /\/node_modules\//
            },

            // Add CSS as style tag to index.html
            {test: /\.scss$/, loaders: ['to-string', 'css', 'resolve-url', 'sass?sourceMap'], exclude: /\/node_modules\//},
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap'),
                include: /\/node_modules\//
            },
            
            // Returns file content as string
            {test: /\.html$/, loader: 'raw', exclude: [helpers.root('src/index.html')]},
            
            // Url loader for supporting images and fonts, for example in CSS files
            {
                test: /\.(jpg|png|gif|svg|ttf|eot|woff|woff2)$/,
                loader: 'url?name=[path][name].[ext]&limit=4096'
            }
        ]

    },
    plugins: [
        // Do type checking in a separate process, so webpack don't need to wait.
        new ForkCheckerPlugin(),
        // Varies the distribution of the ids to get the smallest id length
        new webpack.optimize.OccurenceOrderPlugin(true),
        // Shares common code between the pages
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'polyfills']
        }),
        // Copy files and directories in webpack.
        new CopyWebpackPlugin([{
            from: 'src/assets',
            to: 'assets'
        }]),
        
        // Simplifies creation of HTML files to serve your webpack bundles.
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunksSortMode: 'dependency'
        }),
        // Extract all CSS in a file
        new ExtractTextPlugin('[name].[chunkhash].css', {allChunks: true})
    ]
};
