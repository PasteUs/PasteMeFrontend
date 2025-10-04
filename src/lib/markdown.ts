import MarkdownIt from 'markdown-it';
import markdownItHighlightjs from 'markdown-it-highlightjs';
// @ts-ignore
import markdownItKatex from '@ryanlee2014/markdown-it-katex';
// @ts-ignore
import markdownItAnchor from 'markdown-it-anchor';
// @ts-ignore
import markdownItTaskCheckbox from 'markdown-it-task-checkbox';
// @ts-ignore
import uslug from 'uslug';

const uslugify = (s: string) => uslug(s);

// Create markdown-it instance
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
});

// Add plugins
md.use(markdownItKatex);
md.use(markdownItHighlightjs);
md.use(markdownItAnchor, {
  slugify: uslugify
});
md.use(markdownItTaskCheckbox, {
  disabled: true,
  divWrap: false,
  divClass: 'checkbox',
  idPrefix: 'cbx_',
  ulClass: 'task-list',
  liClass: 'task-list-item'
});

// Add mermaid support
const defaultFence = md.renderer.rules.fence?.bind(md.renderer.rules) || (() => '');

md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const content = token.content.trim();
  const info = token.info.trim();

  if (info === 'mermaid') {
    return `<div class="mermaid">${content}</div>`;
  }

  const firstLine = content.split(/\n/)[0].trim();
  if (firstLine === 'gantt' ||
      firstLine === 'sequenceDiagram' ||
      firstLine.match(/^graph (?:TB|BT|RL|LR|TD);?$/)) {
    return `<div class="mermaid">${content}</div>`;
  }

  return defaultFence(tokens, idx, options, env, self);
};

export const markdown = md;
export default md;
