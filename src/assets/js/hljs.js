import Vue from 'vue'
let hljs = require('highlight.js/lib/highlight');
import register from './highlightjs-line-numbers'

import 'highlight.js/styles/github-gist.css'
import '../css/highlightjs-line-numbers.css'

register(hljs, window, document);

let langList = ['cpp', 'java', 'bash', 'http', 'python', 'markdown', 'plaintext'];

langList.forEach(function (lang) {
    hljs.registerLanguage(lang, require('highlight.js/lib/languages/' + lang));
});

Vue.directive('hljs', el => {
    let blocks = el.querySelectorAll('pre code');
    if (document.querySelectorAll('.hljs').length === 0) {
        blocks.forEach(function (block) {
            hljs.highlightBlock(block);
            if (block.getAttribute('class').split(' ').indexOf('line-numbers') > -1) {
                hljs.lineNumbersBlock(block, {
                    singleLine: true
                });
            }
        });
    }
});

export default hljs;
