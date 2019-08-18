const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
let webPath = '/';

const cdn = {
    // 开发环境
    dev: {
        css: [
        ],
        js: [
        ]
    },
    // 生产环境
    build: {
        css: [

        ],
        js: [
            'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
            'https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js',
            'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
            'https://cdn.bootcss.com/axios/0.19.0/axios.min.js',
            'https://cdn.bootcss.com/KaTeX/0.10.1/katex.min.js',
            "https://cdn.bootcss.com/mermaid/8.2.3/mermaid.min.js",
            "https://cdn.bootcss.com/highlight.js/9.15.9/highlight.min.js",
            "https://cdn.bootcss.com/d3/5.9.7/d3.min.js"
        ]
    }
};

module.exports = {
    devServer: {
        proxy: {
            "/usr": {
                secure: false,
                target: "http://dev.pasteme.lucien.ink",
                changeOrigin: true
            },
            "/api": {
                secure: false,
                target: "http://dev.pasteme.lucien.ink",
                changeOrigin: true
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production' ? webPath : '/',
    outputDir: 'pasteme',
    productionSourceMap: false,
    configureWebpack: config => { // eslint-disable-line
        let output = {
            libraryExport: 'default',
            jsonpFunction: 'jsonpFunction'
        };
        let externals = {
            vue: "Vue",
            vuex: "Vuex",
            "vue-router": "VueRouter",
            katex: "katex",
            axios: "axios",
            mermaid: "mermaid",
            "highlight.js": "hljs",
            "d3": "d3"
        };
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }));
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.css/,
                        threshold: 0,
                        deleteOriginalAssets: false}),
                    new BundleAnalyzerPlugin()
                ],
                output,
                externals
            }
        } else {
            return {
                output
            }
        }
    },
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            if (process.env.NODE_ENV === 'production') {
                args[0].cdn = cdn.build
            }
            if (process.env.NODE_ENV === 'development') {
                args[0].cdn = cdn.dev
            }
            return args
        })
    }
};
