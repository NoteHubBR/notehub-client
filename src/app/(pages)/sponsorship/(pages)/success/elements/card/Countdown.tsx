import { clsx } from "clsx";

interface CountdownProps extends React.HTMLAttributes<HTMLParagraphElement> {
    isPending: boolean;
    hasSucceeded: boolean;
    hasFailed: boolean;
    successfulCountdown: number;
    failCountdown: number;
}

export const Countdown = ({ isPending, hasSucceeded, hasFailed, successfulCountdown, failCountdown, ...rest }: CountdownProps) => (
    <p
        className={clsx(
            'relative w-full h-[20px] rounded',
            'font-medium text-sm',
            'transition-colors ease-linear duration-500',
            isPending
                ? 'overflow-hidden dark:bg-middark bg-midlight'
                : 'overflow-visible bg-transparent',
        )}
        {...rest}
    >
        <span
            aria-hidden='true'
            className={clsx(
                'select-none pointer-events-none',
                'absolute inset-0',
                'bg-gradient-to-r from-transparent via-white/35 to-transparent',
                'animate-shiny',
                isPending ? 'opacity-100' : 'opacity-0'
            )}
        />
        <span
            aria-hidden={!hasSucceeded}
            className={clsx(
                'center w-full',
                'text-center dark:text-secondary text-primary',
                'transition-opacity ease-linear duration-500',
                hasSucceeded ? 'opacity-100' : 'opacity-0'
            )}
        >
            Você será redirecionado ao inícios em {successfulCountdown}s...
        </span>
        <span
            aria-hidden={!hasFailed}
            className={clsx(
                'center w-full',
                'text-center dark:text-yellow-500 text-yellow-500',
                'transition-opacity ease-linear duration-500',
                hasFailed ? 'opacity-100' : 'opacity-0'
            )}
        >
            {hasFailed && failCountdown > 0
                ? `Faça uma nova requisição após ${failCountdown}s...`
                : 'Consulte novamente'
            }
        </span>
    </p>
)