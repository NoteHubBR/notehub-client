import { clsx } from "clsx";

export const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {

    return (
        <button
            type="submit"
            className={clsx(
                'w-full px-2 py-3 rounded',
                'text-sm',
                'dark:bg-middark/25 bg-midlight/25',
                'dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm',
                props.disabled ? '!bg-primary text-light' : 'request-btn'
            )}
            {...props}
        />
    )

}