import { Reply } from "@/core";

interface ReferenceProps extends React.HTMLAttributes<HTMLParagraphElement> {
    reply: Reply;
}

export const Reference = ({ reply, ...rest }: ReferenceProps) => {

    if (reply.to_user) return (
        <p
            className="truncate py-1 px-2 rounded-md
            font-medium text-xs
            dark:text-neutral-400 text-neutral-600
            dark:bg-semilight/15 bg-semidark/15"
            {...rest}
        >
            &gt; {reply.to_user}
        </p>
    )

}