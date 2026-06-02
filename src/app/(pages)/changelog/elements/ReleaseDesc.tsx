import Link from "next/link";

interface ReleaseDescProps extends React.HTMLAttributes<HTMLParagraphElement> {
    scope: 'server' | 'client' | 'server & client';
    pr: number;
    merged?: boolean;
    hash: string;
}

export const ReleaseDesc = ({ scope, pr, merged, hash, children, ...rest }: ReleaseDescProps) => (
    <li>
        <p
            className="whitespace-pre-wrap font-semibold text-sm dark:text-lighter text-darker"
            {...rest}
        >
            <Link
                className="mr-1 dark:text-secondary text-primary"
                href={merged
                    ? scope === 'client'
                        ? `https://github.com/NoteHubBR/notehub-client/commit/${hash}`
                        : `https://github.com/NoteHubBR/notehub-api/commit/${hash}`
                    : scope === 'client'
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