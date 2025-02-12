import { IconCornerRightUp, IconX } from "@tabler/icons-react";

interface SearchProps extends React.HTMLAttributes<HTMLDivElement> {
    search: string;
    setter: (query: string) => void;
}

export const Search = ({ search, setter, ...rest }: SearchProps) => {

    const Button = (props: React.HTMLAttributes<HTMLButtonElement>) => {
        return <button className="p-1 rounded-md hover:dark:bg-neutral-50/10 hover:bg-neutral-900/10" {...props} />
    }

    return (
        <div className="cursor-pointer
            p-1 flex items-center justify-end gap-3
            hover:dark:bg-neutral-50/10 hover:bg-neutral-900/10"
            {...rest}
        >
            <span className="overflow-hidden whitespace-nowrap text-ellipsis w-full pl-3 text-sm">
                {search}
            </span>
            <Button onClick={() => console.log('X')}>
                <IconX size={18} />
            </Button>
            <Button onClick={() => setter(search)}>
                <IconCornerRightUp size={18} />
            </Button>
        </div>
    )

}