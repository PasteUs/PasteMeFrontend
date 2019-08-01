<template>
    <b-row>
        <b-col md="1"></b-col>
        <b-col md="10">
            <div v-if="$parent.lang === 'markdown'">
                <b-card no-body>
                    <b-card-header>
                        <b-row>
                            <b-col md="6">
                                <div>
                                    <a>{{ linesCount }} 行</a>
                                    <a>&nbsp;|&nbsp;</a>
                                    <a>{{ $t('lang.view.lang.' + $parent.lang) }}</a>
                                </div>
                            </b-col>
                            <b-col md="6" style="text-align: right;">
                                <b-check-group switches>
                                    <b-checkbox v-model="raw">源码</b-checkbox>
                                    <b-link class="clipboard-btn" :data-clipboard-text="$parent.content">
                                        {{ $t('lang.view.copy.' +
                                        (copy_btn_status > 0 ? 'success' : (copy_btn_status === 0 ?  'copy' : 'fail')))  }}
                                    </b-link>
                                </b-check-group>
                            </b-col>
                        </b-row>
                    </b-card-header>
                    <b-card-body style="padding-bottom: 0" v-hljs v-show="raw.length === 1">
                        <pre><code v-bind:class="'line-numbers ' + $parent.lang" v-text="this.$parent.content"></code></pre>
                    </b-card-body>
                    <b-card-body style="padding-bottom: 0" v-hljs v-show="raw.length === 0">
                        <div class="markdown-body">
                            <div v-html="markdown.render($parent.content)"></div>
                            <script type="text/x-mathjax-config">
                                MathJax.Hub.Config({
                                    showProcessingMessages: false,
                                    messageStyle: "none",
                                    extensions: ["tex2jax.js"],
                                    jax: ["input/TeX", "output/HTML-CSS"],
                                    tex2jax: {
                                        inlineMath: [ ['$','$'], ["\\(","\\)"] ],
                                        displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
                                        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre','code','a'],
                                        ignoreClass:"comment-content"
                                    },
                                    "HTML-CSS": {
                                        availableFonts: ["STIX","TeX"],
                                        showMathMenu: false
                                    }
                                });
                                MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
                                </script>
                            <remote-js src="https://cdn.bootcss.com/mathjax/2.7.4/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></remote-js>
                        </div>
                    </b-card-body>
                </b-card>
            </div>
            <div v-else>
                <b-card no-body>
                    <b-card-header>
                        <b-row>
                            <b-col md="6">
                                <div>
                                    <a>{{ linesCount }} 行</a>
                                    <a>&nbsp;|&nbsp;</a>
                                    <a>{{ $t('lang.view.lang.' + $parent.lang) }}</a>
                                </div>
                            </b-col>
                            <b-col md="6" style="text-align: right">
                                <b-link href="#" class="clipboard-btn" data-clipboard-target=".hljs">
                                    {{ $t('lang.view.copy.' +
                                    (copy_btn_status > 0 ? 'success' : (copy_btn_status === 0 ?  'copy' : 'fail')))  }}
                                </b-link>
                            </b-col>
                        </b-row>
                    </b-card-header>
                    <b-card-body style="padding-bottom: 0" v-hljs>
                        <pre><code v-bind:class="'line-numbers ' + $parent.lang" v-text="this.$parent.content"></code></pre>
                    </b-card-body>
                </b-card>
            </div>
        </b-col>
        <b-col md="1"></b-col>
    </b-row>
</template>

<script>
    import 'github-markdown-css/github-markdown.css'
    export default {
        name: "PasteView",
        data() {
            return {
                copy_btn_status: 0,
                raw: []
            }
        },
        mounted() {
            let clipboard = new this.clipboard('.clipboard-btn');
            let cur = this;
            clipboard.on('success', function() {
                cur.copy_btn_status = 1;
                window.getSelection().removeAllRanges();
                window.setTimeout(function () {
                    cur.copy_btn_status = 0;
                }, 2000);
            });
            clipboard.on('error', function() {
                cur.copy_btn_status = -1;
                window.setTimeout(function () {
                    cur.copy_btn_status = 0;
                }, 2000);
            });
        },
        computed: {
            linesCount: function() {
                let BREAK_LINE_REGEXP = /\r\n|\r|\n/g;
                return (this.$parent.content.trim().match(BREAK_LINE_REGEXP) || []).length + 1;
            }
        },
        components: {
            'remote-js': {
                render(createElement) {
                    return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
                },
            }
        }
    }
</script>

<style scoped>
    .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
    }

    .markdown-body pre {
        padding-left: 1em;
    }

    @media (max-width: 767px) {
        .markdown-body {
            padding: 15px;
        }
    }
</style>
