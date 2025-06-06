interface TagsListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    tag: string;
    selectedTags: string[];
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
    setInput: React.Dispatch<React.SetStateAction<string>>;
}

export const TagsListItem = ({ tag, selectedTags, setSelectedTags, setInput, ...rest }: TagsListItemProps) => {

    const handleClick = () => {
        if (!selectedTags.includes(tag)) setSelectedTags((prev) => [...prev, tag]);
        setInput("");
        return;
    }

    return (
        <li
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleClick}
            className="cursor-pointer px-4 py-1
                hover:!text-white hover:dark:bg-secondary hover:bg-primary"
            {...rest}
        >
            {tag}
        </li>
    )

}