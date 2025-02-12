import { IconSearch } from "@tabler/icons-react";
import { InputDropdown } from "../dropdown/contents/InputDropdown";
import { Search } from "../dropdown/elements/Search";
import { useState } from "react";

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {

    const [query, setQuery] = useState<string>('');

    return (
        <div className="relative flex items-center justify-between">
            <input
                {...props}
                className="outline-none
                    peer
                    inlg:w-[333px] w-[444px] py-[6px] px-4
                    text-sm dark:text-neutral-50 text-neutral-900
                    border-2 dark:border-neutral-50/15 border-neutral-900/15 rounded-s-3xl
                    dark:bg-neutral-900 bg-neutral-100
                    dark:focus:border-violet-600 dark:valid:border-violet-600
                    focus:border-violet-600 valid:border-violet-600
                    dark:placeholder:text-neutral-100/30
                    transition-colors"
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            />
            <button className="cursor-pointer
                    py-[6px] px-4
                    border-2 border-transparent rounded-e-3xl
                    dark:bg-neutral-50/15 bg-neutral-900/15
                    dark:peer-focus:bg-violet-600 dark:peer-valid:bg-violet-600
                    peer-focus:bg-violet-600 peer-valid:bg-violet-600
                    transition-colors"
            >
                <IconSearch size={20} className="text-white" />
            </button>
            <InputDropdown>
                <Search search="query" setter={() => { setQuery('query') }} />
            </InputDropdown>
        </div>
    )

}