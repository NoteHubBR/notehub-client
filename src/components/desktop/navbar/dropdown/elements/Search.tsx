import { IconCornerRightUp, IconX } from "@tabler/icons-react";
import { useCallback } from "react";
import { useStore } from "@/data/hooks";
import Link from "next/link";

interface SearchProps extends React.HTMLAttributes<HTMLDivElement> {
    search: string;
    setter: (query: string) => void;
    inputRef: React.RefObject<HTMLInputElement>;
}

export const Search = ({ search, setter, inputRef, ...rest }: SearchProps) => {

    const { store: { searches }, setStore } = useStore();

    const Button = (props: React.HTMLAttributes<HTMLButtonElement>) => {
        return <button
            type="button"
            className="p-1 rounded-md hover:dark:bg-neutral-50/10 hover:bg-neutral-900/10"
            {...props}
        />
    }

    const navigate = (ref: React.RefObject<HTMLInputElement>, query: string): string | void => {
        if (!ref.current) return;
        ref.current.blur();
        return ref.current.value = query;
    }

    const remove = useCallback((search: string): void => {
        return setStore({ searches: searches.filter(s => s !== search) });
    }, [searches])

    return (
        <div
            className="p-1 flex items-center justify-end
            hover:dark:bg-neutral-50/10 hover:bg-neutral-900/10
            transition-all"
            {...rest}
        >
            <Link
                href={`/search?q=${search}`}
                className="overflow-hidden whitespace-nowrap text-ellipsis w-full pl-3"
                onClick={() => navigate(inputRef, search)}
            >
                <span className="text-sm">{search}</span>
            </Link>
            <Button aria-label="Remover pesquisa" onClick={() => remove(search)}>
                <IconX size={18} />
            </Button>
            <Button aria-label="Aplicar pesquisa" onClick={() => setter(search)}>
                <IconCornerRightUp size={18} />
            </Button>
        </div>
    )

}