import { clsx } from "clsx";

interface TagsListProps extends React.HTMLAttributes<HTMLUListElement> {
    filteredTags: string[];
}

export const TagsList = ({ filteredTags, ...rest }: TagsListProps) => (
    <ul
        className={clsx(
            "overflow-y-auto absolute top-full left-1/2 -translate-x-1/2",
            "scrollbar-mobile",
            "w-full max-h-[200px] rounded",
            "border",
            "dark:bg-darker bg-lighter",
            "opacity-0 peer-focus-within:opacity-100",
            filteredTags.length > 0
                ? "dark:border-middark/50 border-midlight/50"
                : "dark:border-transparent border-transparent",
            "transition-all"
        )}
        {...rest}
    />
)