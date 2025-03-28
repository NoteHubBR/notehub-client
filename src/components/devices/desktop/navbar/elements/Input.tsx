import { IconSearch, IconX } from "@tabler/icons-react";
import { InputDropdown } from "../dropdown/contents/InputDropdown";
import { Search } from "../dropdown/elements/Search";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore, useUser } from "@/data/hooks";

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {

    const { searches, setActions } = useStore();
    const { user } = useUser();

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');

    const ref = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!query.trim() || !ref.current) return;
        ref.current.blur();
        setActions({ searches: [query, ...searches(user).filter(q => q !== query)] }, user?.username);
        return router.push(`/search?q=${query}`);
    }

    const handleBlur = (e: React.FocusEvent<HTMLFormElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsDropdownOpen(false);
        }
    }

    const handleFocus = () => {
        if (searches(user).length > 0) {
            setIsDropdownOpen(true);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        if (ref.current === document.activeElement) {
            setIsDropdownOpen(true);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            setIsDropdownOpen(false);
        }
    };

    return (
        <form onSubmit={onSubmit} onBlur={handleBlur} className="relative flex items-center justify-between">
            <input
                ref={ref}
                inputMode="search"
                className="outline-none
                    peer
                    inlg:w-[333px] w-[444px] py-[6px] pl-4 pr-9
                    text-sm dark:text-lighter text-dark
                    border-2 dark:border-semilight/10 border-semidark/10 rounded-s-3xl
                    dark:bg-dark bg-light
                    dark:focus:border-primary focus:border-primary
                    dark:placeholder:text-light/30
                    transition-colors"
                value={query}
                onFocus={handleFocus}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...props}
            />
            {query.length > 0 &&
                <button
                    aria-label="Apagar"
                    type="button"
                    className="absolute right-16 p-1 rounded-md hover:dark:bg-semilight/10 hover:bg-semidark/10"
                    onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
                    onClick={() => { setQuery(''); }}
                >
                    <IconX size={18} />
                </button>
            }
            <button
                aria-label="Consultar"
                type="submit"
                className="cursor-pointer
                    py-[6px] px-4
                    border-2 border-transparent rounded-e-3xl
                    dark:bg-semilight/15 bg-semidark/15
                    dark:peer-focus:bg-primary peer-focus:bg-primary
                    transition-colors"
            >
                <IconSearch size={20} className="text-white" />
            </button>
            {searches(user).length > 0 &&
                <InputDropdown isOpen={isDropdownOpen}>
                    <ul>
                        {searches(user).map((query, index) => (
                            <li key={index}>
                                <Search
                                    query={query}
                                    setter={() => { setQuery(query) }}
                                    inputRef={ref}
                                />
                            </li>
                        ))}
                    </ul>
                </InputDropdown>
            }
        </form>
    )

}