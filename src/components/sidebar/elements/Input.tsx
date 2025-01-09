export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {

    return (
        <input
            {...props}
            className="
                outline-none
                w-full py-1 px-2
                text-sm dark:text-neutral-50 text-neutral-900 font-semibold
                border-2 dark:border-neutral-50/15 border-neutral-900/15 rounded-md
                dark:focus:border-violet-600 dark:valid:border-violet-600
                dark:bg-neutral-900 bg-neutral-100
                focus:border-violet-600 valid:border-violet-600
                transition-colors
            "
        />
    )

}