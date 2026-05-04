import { renderMarkdown } from '@/core';
import { clsx } from 'clsx';

type MarkdownProps = React.HTMLAttributes<HTMLElement> & {
    markdown: string;
}

export const Markdown = ({ markdown, ...rest }: MarkdownProps) => (
    <article
        aria-labelledby='md-title'
        className={clsx(
            'prose dark:prose-invert',
            'max-w-none flex-1 min-h-0 p-4',
            'overflow-y-scroll overscroll-contain inmd:overscroll-auto',
            'scrollbar-desktop inmd:scrollbar-mobile',
            'bg-transparent'
        )}
        dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
        {...rest}
    />
)