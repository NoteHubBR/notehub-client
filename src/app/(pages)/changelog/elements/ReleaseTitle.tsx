import { clsx } from 'clsx';
import Link from "next/link";

interface ReleaseTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    scope: 'server' | 'client' | 'server & client';
    tag: string;
}

export const ReleaseTitle = ({ scope, tag, children, ...rest }: ReleaseTitleProps) => (
    <h2 className="font-semibold text-2xl dark:text-lighter text-darker" {...rest}>
        <Link
            href={scope === 'client'
                ? `https://github.com/NoteHubBR/notehub-client/releases/tag/${tag}`
                : `https://github.com/NoteHubBR/notehub-api/releases/tag/${tag}`
            }
            className="underline w-fit"
        >
            {tag.replace('v', '')}
        </Link>
        <span className="ml-3">{children}</span>
        <span className={clsx(
            'align-middle ml-3 px-1 py-0.5 rounded',
            'uppercase tracking-wider text-xs dark:text-lighter text-darker ',
            'dark:bg-lighter/15 bg-darker/15'
        )}>
            {scope}
        </span>
    </h2>
)