import Vue from 'vue'
import hljs from 'highlight.js'
import register from './highlightjs-line-numbers'

register(hljs, window, document);

import cpp from 'highlight.js/lib/languages/cpp'
import python from 'highlight.js/lib/languages/python'
import plaintext from 'highlight.js/lib/languages/plaintext'

import 'highlight.js/styles/github-gist.css'
import '../css/highlightjs-line-numbers.css'

hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('python', python);
hljs.registerLanguage('plaintext', plaintext);

Vue.directive('hljs', el => {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach(function (block) {
        hljs.highlightBlock(block);
        hljs.lineNumbersBlock(block, {
            singleLine: true
        });
        // document.querySelectorAll('.hljs-ln-code').forEach(function(each) {each.setAttribute('style', 'padding-left: 1em;')})
    });
    // Array.prototype.forEach.call(blocks, hljs.highlightBlock);
    // Array.prototype.forEach.call([{singleLine: true}], hljs.lineNumbersBlock);
});