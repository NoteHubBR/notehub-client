import { Icon } from "@/components/icons";
import { clsx } from "clsx";

interface SubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    amount: string;
}

export const Submit = ({ amount, ...rest }: SubmitProps) => {

    const isValid: boolean = parseInt(amount.replace(/\D/g, ''), 10) > 0;

    return (
        <button
            type="submit"
            className={clsx(
                'z-0 group relative overflow-hidden disabled:pointer-events-none',
                'p-2 rounded-md',
                'font-semibold dark:text-light text-dark',
                'transition-all ease-linear',
                'active:top-[1px]',
                'disabled:bg-gradient-to-b disabled:dark:from-semidark disabled:dark:via-dark disabled:dark:to-dark disabled:from-semilight disabled:via-light disabled:to-light',
                isValid
                    ? '!text-light bg-gradient-to-r dark:from-secondary dark:to-inverted from-primary to-inverted'
                    : 'bg-gradient-to-b dark:from-semidark dark:via-dark dark:to-dark from-semilight via-light to-light hover:opacity-75 focus-visible:opacity-50'
            )}
            {...rest}
        >
            <span className={clsx(
                'opacity-100 drop-shadow-alpha-d-sm',
                'transition-opacity duration-500 ease-linear',
                'group-disabled:opacity-0'
            )}>
                Confirmar
            </span>
            <div
                aria-hidden='true'
                className={clsx(
                    'select-none pointer-events-none',
                    'absolute inset-0',
                    'bg-gradient-to-r from-transparent via-white/35 to-transparent',
                    'animate-shiny',
                    'group-disabled:block',
                    isValid ? 'hidden group-hover:block group-focus-visible:block group-disabled:block' : 'hidden'
                )}
            />
            <div
                aria-hidden='true'
                className={clsx(
                    'absolute left-0 top-0 inset-0',
                    'origin-center transition-all duration-500 ease-linear',
                    'opacity-0 scale-0 group-disabled:opacity-100 group-disabled:scale-100'
                )}
            >
                <Icon.Dots />
            </div>
        </button>
    )

}