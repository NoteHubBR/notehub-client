import { full as emoji } from 'markdown-it-emoji';
import abbr from 'markdown-it-abbr';
import container from 'markdown-it-container';
import deflist from 'markdown-it-deflist';
import DOMPurify from 'dompurify';
import footnote from 'markdown-it-footnote';
import hljs from 'highlight.js';
import ins from 'markdown-it-ins';
import mark from 'markdown-it-mark';
import MarkdownIt from 'markdown-it';
import sub from 'markdown-it-sub';
import sup from 'markdown-it-sup';

export const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
    highlight: (str, lang): string => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre><code class="hljs">${hljs.highlight(str, { language: lang }).value}</code></pre>`;
            } catch { }
        }
        return `<pre><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`;
    }
})
    .use(emoji)
    .use(sub)
    .use(sup)
    .use(ins)
    .use(mark)
    .use(footnote)
    .use(deflist)
    .use(abbr)
    .use(container, 'warning')
    .use(container, 'info')
    .use(container, 'danger');

export const useMarkdown = (markdown: string) => {
    const rendered = md.render(markdown);
    return DOMPurify.sanitize(rendered);
}