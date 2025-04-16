import { IconSearch } from "@tabler/icons-react";

export const Filter = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        className="flex items-center
        border-y dark:border-neutral-700/50 border-dark/25
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
            className="outline-none py-2
            w-full
            text-sm dark:text-semilight text-semidark
            bg-transparent"
            {...props}
        />
    </form>
)