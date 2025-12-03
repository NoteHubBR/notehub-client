import { clsx } from "clsx";
import { IconGiftFilled } from "@tabler/icons-react";

interface SubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    amount: string;
}

export const Submit = ({ amount, ...rest }: SubmitProps) => {

    const isValid: boolean = parseInt(amount.replace(/\D/g, ''), 10) > 0;

    return (
        <button
            tabIndex={0}
            aria-label="Resgatar"
            type="submit"
            className={clsx(
                'relative overflow-hidden p-2 rounded-e-md',
                'border-y border-r dark:border-middark/50 border-midlight/50',
                'transition-all ease-linear',
                isValid
                    ? 'bg-primary hover:opacity-75 focus-visible:opacity-75'
                    : 'dark:bg-middark/50 bg-midlight/50 dark:focus-visible:bg-red-500/50 focus-visible:bg-red-500'
            )}
            {...rest}
        >
            <IconGiftFilled
                aria-hidden='true'
                size={24}
                className={clsx(
                    'drop-shadow-alpha-d-xs',
                    'transition-colors ease-linear',
                    isValid ? 'fill-lighter' : 'dark:fill-midlight/75 fill-middark/75'
                )}
            />
            <div
                aria-hidden='true'
                className={clsx(
                    'select-none pointer-events-none',
                    'absolute inset-0',
                    'bg-gradient-to-r from-transparent via-white/35 to-transparent',
                    'animate-shiny',
                    isValid ? 'block' : 'hidden'
                )} />
        </button>
    )

}