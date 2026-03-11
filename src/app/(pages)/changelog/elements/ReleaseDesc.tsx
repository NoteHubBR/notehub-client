import Link from "next/link";

interface ReleaseDescProps extends React.HTMLAttributes<HTMLParagraphElement> {
    scope: 'server' | 'client' | 'server & client';
    pr: number;
    hash: string;
}

export const ReleaseDesc = ({ scope, pr, hash, children, ...rest }: ReleaseDescProps) => (
    <li>
        <p
            className="font-semibold text-sm dark:text-lighter text-darker"
            {...rest}
        >
            <Link
                className="mr-1 dark:text-secondary text-primary"
                href={scope === 'client'
                    ? `https://github.com/NoteHubBR/notehub-client/pull/${pr}/commits/${hash}`
                    : `https://github.com/NoteHubBR/notehub-api/pull/${pr}/commits/${hash}`
                }
            >
                [#{hash.substring(0, 7)}]
            </Link>
            {children}
        </p>
    </li>
)