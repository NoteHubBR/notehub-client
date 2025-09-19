import Link from "next/link";

interface ReleaseTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    tag: string;
}

export const ReleaseTitle = ({ tag, children, ...rest }: ReleaseTitleProps) => (
    <h2 className="font-semibold text-2xl dark:text-lighter text-darker" {...rest}>
        <Link
            href={`https://github.com/NoteHubBR/notehub-api/releases/tag/${tag}`}
            className="underline w-fit"
        >
            {tag.replace('v', '')}
        </Link>
        <span className="ml-3">{children}</span>
    </h2>
)