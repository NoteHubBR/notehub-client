export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {

    return (
        <input
            {...props}
            className="
                outline-none
                w-full py-1 px-2
                text-sm text-violet-500 font-semibold
                border-2 dark:border-violet-600/40 border-violet-600/40 rounded-md
                dark:focus:border-violet-600 dark:valid:border-violet-600
                dark:bg-neutral-900 bg-neutral-100
                focus:border-violet-600 valid:border-violet-600
            "
        />
    )

}