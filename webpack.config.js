const {resolve} = require("path");
const webpack = require("webpack");
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const configFileEnv = (env) => {
    if(env.prod){
        return "production";
    }else if(env.stag){
        return "staging";
    }else if(env.dev){
        return "development";
    }
};

module.exports = (env = {}) => {
    // const envString = configFileEnv(env);
    // const config = configFile(envString);
    return {
        entry: {
            vendor: ["babel-polyfill","react","react-dom","react-router","redux","react-router-redux","axios" ,"lodash"], //vendor refrence file(s)
            app: "./app" //application code
        },
        output:{
            path: resolve(__dirname, "public"),
            filename: "[name].[chunkhash].js",
            pathinfo: true,
            chunkFilename: "[name].[chunkhash].js",
            publicPath: '/'
        },
        context: resolve(__dirname, "client"),
        devtool: true? 'source-map' : 'eval',
        bail: env.prod,
        module:{
            loaders: [
                {test: /\.js$/, loader: "babel-loader!eslint-loader", exclude: /node_modules/},
                {test: /\.css$/, loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader'})},
                {test: /\.scss$/i, loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader!sass-loader'})},
                {test: /\.(ttf|eot|svg|png|jpg)$/, loader: 'file-loader'}
            ]
        },
        plugins: [
            new ExtractTextPlugin({ filename: '[name].[hash].css', allChunks: true}),
            new webpack.optimize.CommonsChunkPlugin({
                name: ["vendor", "manifest"], // vendor libs + extracted manifest
                minChunks: Infinity,
            }),
            env.prod ? new webpack.HashedModuleIdsPlugin() : new webpack.NamedModulesPlugin(),
            new WebpackChunkHash(),
            new ChunkManifestPlugin({
                filename: "chunk-manifest.json",
                manifestVariable: "webpackManifest"
            }),
            new ManifestPlugin({
              fileName: 'manifest.json'
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('development')
                }
            })
        ],

    };
};
