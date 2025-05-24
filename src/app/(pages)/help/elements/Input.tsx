import { IconSearch } from "@tabler/icons-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const Input = ({ query, setQuery, ...rest }: InputProps) => (
    <div className="group w-2/3 insm:w-full m-auto flex flex-row-reverse items-center">
        <input
            id="query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            required
            className="peer
            w-full pr-4 py-2 rounded-e-full
            border-2 border-l-0 dark:border-middark/50 border-midlight/50
            bg-transparent
            focus:dark:border-middark focus:border-midlight
            valid:dark:border-middark valid:border-midlight
            transition-colors"
            {...rest}
        />
        <label
            htmlFor="query"
            className="px-4 py-2 rounded-s-full
            border-2 border-r-0 dark:border-middark/50 border-midlight/50
            peer-focus:dark:border-middark peer-focus:border-midlight
            peer-valid:dark:border-middark peer-valid:border-midlight
            transition-colors"
        >
            <IconSearch size={24} className="dark:text-middark text-midlight" />
        </label>
    </div>
)