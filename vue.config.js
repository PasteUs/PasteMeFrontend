const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 取消用 tag 来区分版本
// const version = require("./build.config").version;
const version = 'master';
const useCDN = false;

let webPath = 'https://fastly.jsdelivr.net/gh/PasteUs/CDN@' + version + '/pasteme/';

const cdn = {
    // 开发环境
    dev: {
        css: [
            "https://shadow.elemecdn.com/npm/katex@0.11.0/dist/katex.min.css",
            "https://cdn.staticfile.org/github-markdown-css/3.0.1/github-markdown.min.css",
            "https://shadow.elemecdn.com/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css",
            "https://shadow.elemecdn.com/npm/bootstrap-vue@2.0.0-rc.28/dist/bootstrap-vue.min.css"
        ],
        js: [
            "https://fastly.jsdelivr.net/gh/highlightjs/cdn-release@9.15.9/build/highlight.min.js"
        ]
    },
    // 生产环境
    build: {
        css: [
            "https://shadow.elemecdn.com/npm/katex@0.11.0/dist/katex.min.css",
            "https://cdn.staticfile.org/github-markdown-css/3.0.1/github-markdown.min.css",
            "https://shadow.elemecdn.com/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css",
            "https://shadow.elemecdn.com/npm/bootstrap-vue@2.0.0-rc.28/dist/bootstrap-vue.min.css"
        ],
        js: [
            'https://shadow.elemecdn.com/npm/vue@2.6.10/dist/vue.runtime.min.js',
            'https://shadow.elemecdn.com/npm/vue-router@3.1.2/dist/vue-router.min.js',
            'https://shadow.elemecdn.com/npm/vuex@3.1.1/dist/vuex.min.js',
            'https://shadow.elemecdn.com/npm/axios@0.19.0/dist/axios.min.js',
            'https://shadow.elemecdn.com/npm/katex@0.11.0/dist/katex.min.js',
            "https://shadow.elemecdn.com/npm/mermaid@8.2.3/dist/mermaid.min.js",
            "https://fastly.jsdelivr.net/gh/highlightjs/cdn-release@9.15.9/build/highlight.min.js",
            "https://fastly.jsdelivr.net/npm/d3@5.9.7/dist/d3.min.js",
            "https://shadow.elemecdn.com/npm/bootstrap-vue@2.0.0-rc.28/dist/bootstrap-vue.min.js",
            "https://fastly.jsdelivr.net/npm/markdown-it@9.1.0/dist/markdown-it.min.js",
            "https://fastly.jsdelivr.net/npm/unorm@1.6.0/lib/unorm.min.js",
            "https://fastly.jsdelivr.net/npm/@chenfengyuan/vue-qrcode@1.0.1/dist/vue-qrcode.min.js",
            "https://fastly.jsdelivr.net/npm/vue-i18n@8.14.0/dist/vue-i18n.min.js"
        ]
    }
};

module.exports = {
    devServer: {
        proxy: {
            "/api/v3/": {
                secure: false,
                target: "http://beta.pasteme.lucien.ink/",
                // target: "http://localhost:8000/",
                changeOrigin: true
            }
        }
    },
    publicPath: (process.env.NODE_ENV === 'production' && useCDN) ? webPath : '/',
    outputDir: 'pasteme',
    productionSourceMap: false,
    configureWebpack: config => { // eslint-disable-line
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(new BundleAnalyzerPlugin({
                analyzerMode: "static"
            }));
            config.externals = {
                "vue": "Vue",
                "vuex": "Vuex",
                "vue-router": "VueRouter",
                "katex": "katex",
                "axios": "axios",
                "mermaid": "mermaid",
                "highlight.js": "hljs",
                "d3": "d3",
                "bootstrap-vue": "BootstrapVue",
                "markdown-it": "markdownit",
                "unorm": "unorm",
                "@chenfengyuan/vue-qrcode": "VueQrcode",
                "vue-i18n": "VueI18n"
            };
        }
        return {
            output: {
                libraryExport: 'default',
                jsonpFunction: 'jsonpFunction'
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
