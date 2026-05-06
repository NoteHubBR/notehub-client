import { clsx } from 'clsx';
import { useMarkdown } from './hook';

type MarkdownProps = React.HTMLAttributes<HTMLElement> & {
    isEditing: boolean;
    isPreviewing: boolean;
    markdown: string;
}

export const MdPreview = ({ isEditing, isPreviewing, markdown, ...rest }: MarkdownProps) => (
    <article
        aria-labelledby='md-title'
        className={clsx(
            // base
            'prose',
            'max-w-none min-h-0 p-6 flex-1',
            'overflow-y-auto overscroll-contain inmd:overscroll-auto',
            'scrollbar-desktop inmd:scrollbar-mobile',
            !isEditing || isPreviewing ? 'block' : 'hidden',
            'bg-transparent',
            // headings
            'prose-h1:border-b prose-h2:border-b prose-h3:border-b',
            'prose-h1:pb-3 prose-h2:pb-3 prose-h3:pb-3',
            'dark:prose-h1:border-middark/50 prose-h1:border-midlight/50',
            'dark:prose-h2:border-middark/50 prose-h2:border-midlight/50',
            'dark:prose-h3:border-middark/50 prose-h3:border-midlight/50',
            'dark:prose-h1:text-semilight prose-h1:text-semidark prose-h1:text-3xl',
            'dark:prose-h2:text-semilight prose-h2:text-semidark prose-h2:text-2xl',
            'dark:prose-h3:text-semilight prose-h3:text-semidark prose-h3:text-xl',
            'dark:prose-h4:text-midlight prose-h4:text-middark prose-h4:text-lg',
            'dark:prose-h5:text-midlight prose-h5:text-middark prose-h5:text-md',
            'dark:prose-h6:text-midlight prose-h6:text-middark prose-h6:text-sm',
            // text
            'dark:prose-p:text-midlight prose-p:text-middark',
            'dark:prose-strong:text-lighter prose-strong:text-darker',
            'prose-a:text-primary',
            // lists
            'dark:prose-ol:text-light prose-ol:text-dark',
            'dark:prose-ul:text-light prose-ul:text-dark',
            'dark:prose-li:text-semilight prose-li:text-semidark',
            'dark:[&_li::marker]:text-midlight [&_li::marker]:text-middark',
            // blockquote
            'dark:prose-blockquote:border-middark/50 prose-blockquote:border-midlight/50',
            // code
            'prose-code:px-1 prose-code:py-0.5 prose-code:rounded',
            'dark:prose-code:text-light prose-code:text-dark',
            'dark:prose-code:bg-middark/50 prose-code:bg-midlight/50',
            // pre
            '[&_pre]:whitespace-pre-wrap [&_pre]:break-words',
            'dark:prose-pre:bg-semidark/50 prose-pre:bg-semilight/50',
            'dark:[&_pre_code]:text-semilight [&_pre_code]:text-semidark',
            '[&_pre_code]:bg-transparent dark:[&_pre_code]:bg-transparent',
            // hr
            'dark:prose-hr:border-middark/50 prose-hr:border-midlight/50',
            // table
            'dark:[&_th]:text-lighter [&_th]:text-darker',
            'dark:prose-table:text-midlight prose-table:text-middark',
            'dark:prose-thead:border-middark/50 prose-thead:border-midlight/50',
            'dark:[&_th]:border-middark/50 [&_th]:border-midlight/50',
            'dark:[&_td]:border-middark/50 [&_td]:border-midlight/50',
            'dark:[&_tr]:border-middark/50 [&_tr]:border-midlight/50',
            // misc
            'prose-img:rounded prose-img:max-w-full prose-img:h-auto',
            'prose-img:!inline prose-img:!align-middle',
            '[&_p:has(img)]:!inline [&_p:has(img)]:!align-middle',
            '[&_picture]:inline [&_picture]:align-middle',
            '[&_picture_img]:!inline [&_picture_img]:!align-middle',
            '[&_.footnotes_img]:block',
            '[&_p:has(img)_br]:hidden',
            // definition list
            'dark:[&_dt]:text-lighter [&_dt]:text-darker [&_dt]:font-semibold',
            'dark:[&_dd]:text-semilight [&_dd]:text-semidark',
            // mark
            '[&_mark]:bg-primary/75 [&_mark]:text-lighter',
            '[&_mark]:p-1 [&_mark]:rounded',
            // containers
            '[&_.warning]:border-l-2 [&_.warning]:border-yellow-500 [&_.warning]:bg-yellow-500/10 [&_.warning]:px-4 [&_.warning]:py-2 [&_.warning]:rounded',
            '[&_.info]:border-l-2 [&_.info]:border-primary [&_.info]:bg-primary/10 [&_.info]:px-4 [&_.info]:py-2 [&_.info]:rounded',
            '[&_.danger]:border-l-2 [&_.danger]:border-red-500 [&_.danger]:bg-red-500/10 [&_.danger]:px-4 [&_.danger]:py-2 [&_.danger]:rounded',
            // footnote
            '[&_.footnote-ref]:text-primary [&_.footnote-ref]:text-sm',
            'dark:[&_.footnotes]:border-light/10 [&_.footnotes]:border-dark/10',
            'dark:[&_.footnotes]:text-midlight [&_.footnotes]:text-middark [&_.footnotes]:text-sm',
            '[&_.footnote-backref]:text-primary',
        )}
        dangerouslySetInnerHTML={{ __html: useMarkdown(markdown) }}
        {...rest}
    />
)