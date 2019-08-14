const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let webPath = '/';

module.exports = {
    devServer: {
        disableHostCheck: true
    },
    publicPath: process.env.NODE_ENV === 'production' ? webPath : '/',
    outputDir: 'pasteme',
    productionSourceMap: false,
    configureWebpack: config => { // eslint-disable-line
        let output = {
            libraryExport: 'default',
            jsonpFunction: 'jsonpFunction'
        };
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.css/,
                        threshold: 0,
                        deleteOriginalAssets: false}),
                    new BundleAnalyzerPlugin()
                ],
                output
            }
        } else {
            return {
                output
            }
        }
    }
};
