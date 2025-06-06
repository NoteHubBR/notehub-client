import { IconX } from "@tabler/icons-react";

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
    tags: string[];
    tag: string;
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Tag = ({ tags, tag, setSelectedTags, ...rest }: TagProps) => {

    const handleClick = (): void => setSelectedTags(tags.filter((t) => t !== tag));

    return (
        <div
            className="whitespace-nowrap w-fit pl-2 rounded-full
            flex items-center gap-1
            border dark:border-secondary/25 border-primary
            font-semibold text-xs dark:text-secondary text-primary
            dark:bg-secondary/25 bg-primary/10
            hover:!text-white dark:hover:bg-secondary hover:bg-primary"
            {...rest}
        >
            <span className="cursor-default">
                {tag}
            </span>
            <button
                type="button"
                onClick={handleClick}
                className="p-1 rounded-full text-white dark:bg-secondary bg-primary"
            >
                <IconX size={15} />
            </button>
        </div>
    )

}