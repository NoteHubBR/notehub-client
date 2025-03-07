export const Input = (props: React.HTMLAttributes<HTMLInputElement>) => {
    return (
        <input
            type="text"
            className="peer outline-none
            w-full px-2 py-1 pt-6
            dark:font-light
            border border-neutral-700/70 rounded
            dark:bg-black bg-white
            focus:border-violet-600
            invalid:border-red-500
            transition-all"
            required
            {...props}
        />
    )
}