<template>
    <b-row>
        <b-col md="1"></b-col>
        <b-col md="10">
            <div v-if="$parent.lang === 'markdown'">
                <b-card no-body>
                    <b-tabs card>
                        <b-tab :title="$t('lang.view.parsed')" active>
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
                        </b-tab>
                        <b-tab :title="$t('lang.view.raw')">
                            <pre class="font-md"><code v-bind:class="'language-' + $parent.lang + ' line-numbers'"
                                                           v-text="this.$parent.content"></code></pre>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>
            <pre class="font-md" v-else><code v-bind:class="'language-' + $parent.lang + ' line-numbers'"
                       v-text="this.$parent.content"></code></pre>
        </b-col>
        <b-col md="1"></b-col>
    </b-row>
</template>

<script>
    import 'github-markdown-css/github-markdown.css'
    export default {
        name: "PasteView",
        mounted() {
            this.prism.highlightAll();
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
    .font-md {
        font-size: .88em;
    }

    .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
    }

    @media (max-width: 767px) {
        .markdown-body {
            padding: 15px;
        }
    }
</style>
