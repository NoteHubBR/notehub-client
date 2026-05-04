import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
})

export const renderMarkdown = (markdown: string) => {
    const rendered = md.render(markdown);
    return DOMPurify.sanitize(rendered);
}