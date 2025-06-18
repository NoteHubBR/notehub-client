import { clsx } from "clsx";

export const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {

    return (
        <button
            type="submit"
            className={clsx(
                'p-2 rounded',
                'dark:bg-middark/25 bg-midlight/25',
                'dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm',
                props.disabled ? '!bg-primary' : 'request-btn'
            )}
            {...props}
        />
    )

}