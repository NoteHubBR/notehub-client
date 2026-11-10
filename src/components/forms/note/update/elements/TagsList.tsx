import { clsx } from 'clsx';

interface TagsListProps extends React.HTMLAttributes<HTMLUListElement> {
    filteredTags: string[];
}

export const TagsList = ({ filteredTags, ...rest }: TagsListProps) => (
    <ul
        className={clsx(
            'z-10 overflow-y-auto absolute top-full left-1/2 -translate-x-1/2',
            'scrollbar-mobile',
            'w-full max-h-[188px] rounded',
            'border',
            'opacity-0 peer-focus-within:opacity-100',
            filteredTags.length > 0
                ? [
                    'dark:bg-darker bg-lighter ',
                    'dark:border-middark/50 border-midlight/50',
                ]
                : [
                    'dark:bg-transparent bg-transparent',
                    'dark:border-transparent border-transparent'
                ],
        )}
        {...rest}
    />
)