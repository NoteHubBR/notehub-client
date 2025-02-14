import { IconCornerRightUp, IconX } from "@tabler/icons-react";
import { useCallback } from "react";
import { useStore, useUser } from "@/data/hooks";
import Link from "next/link";

interface SearchProps extends React.HTMLAttributes<HTMLDivElement> {
    query: string;
    setter: (query: string) => void;
    inputRef: React.RefObject<HTMLInputElement>;
}

export const Search = ({ query, setter, inputRef, ...rest }: SearchProps) => {

    const { searches, setActions } = useStore();

    const { user } = useUser();

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
        setActions({ searches: [query, ...searches(user).filter(q => q !== query)] }, user?.username)
        return setter(query);
    }

    const remove = useCallback((query: string): void => {
        return setActions({ searches: searches(user).filter(q => q !== query) }, user?.username);
    }, [searches])

    return (
        <div
            className="p-1 flex items-center justify-end
            hover:dark:bg-neutral-50/10 hover:bg-neutral-900/10
            transition-all"
            {...rest}
        >
            <Link
                href={`/search?q=${query}`}
                className="overflow-hidden whitespace-nowrap text-ellipsis w-full pl-3"
                onClick={() => navigate(inputRef, query)}
            >
                <span className="text-sm">{query}</span>
            </Link>
            <Button aria-label="Remover pesquisa" onClick={() => remove(query)}>
                <IconX size={18} />
            </Button>
            <Button aria-label="Aplicar pesquisa" onClick={() => setter(query)}>
                <IconCornerRightUp size={18} />
            </Button>
        </div>
    )

}