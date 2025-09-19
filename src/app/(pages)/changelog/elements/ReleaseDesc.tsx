import Link from "next/link";

interface ReleaseDescProps extends React.HTMLAttributes<HTMLParagraphElement> {
    pr: number;
    hash: string;
}

export const ReleaseDesc = ({ pr, hash, children, ...rest }: ReleaseDescProps) => (
    <li>
        <p
            className="font-semibold text-sm dark:text-lighter text-darker"
            {...rest}
        >
            <Link
                className="mr-1 dark:text-secondary text-primary"
                href={`https://github.com/NoteHubBR/notehub-api/pull/${pr}/commits/${hash}`}
            >
                [#{hash.substring(0, 7)}]
            </Link>
            {children}
        </p>
    </li>
)