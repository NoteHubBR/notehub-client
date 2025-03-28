export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {

    return (
        <input
            {...props}
            className="outline-none
                w-full py-1 px-2
                text-sm dark:text-lighter text-dark font-semibold
                border-2 dark:border-semilight/10 border-semidark/10 rounded-md
                dark:focus:border-primary dark:valid:border-primary
                dark:bg-dark bg-light
                focus:border-primary valid:border-primary
                transition-colors"
        />
    )

}