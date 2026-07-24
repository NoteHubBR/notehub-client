import { IconSearch } from "@tabler/icons-react";

export const Filter = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        className="flex items-center
        border-y dark:border-light/10 border-dark/10
        focus-within:!border-primary
        transition-colors"
    >
        <label htmlFor="filter" className="pl-2 pr-3">
            <IconSearch size={15} />
        </label>
        <input
            id="filter"
            type="text"
            placeholder="Filtrar..."
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            className="outline-none py-2
            w-full
            text-sm dark:text-semilight text-semidark
            bg-transparent"
            {...props}
        />
    </form>
)