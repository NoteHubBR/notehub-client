import { clsx } from "clsx";

interface CountdownProps extends React.HTMLAttributes<HTMLParagraphElement> {
    status: 'pending' | 'success' | 'failed' | 'none';
    countdown: { success: number, failed: number };
}

export const Countdown = ({ status, countdown, ...rest }: CountdownProps) => (
    <p
        className={clsx(
            'relative w-full h-[20px] rounded',
            'font-medium text-sm',
            'transition-colors ease-linear duration-500',
            status === 'pending'
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
                status === 'pending' ? 'opacity-100' : 'opacity-0'
            )}
        />
        <span
            aria-hidden={status !== 'success'}
            className={clsx(
                'center w-full',
                'text-center dark:text-secondary text-primary',
                'transition-opacity ease-linear duration-500',
                status === 'success' ? 'opacity-100' : 'opacity-0'
            )}
        >
            Você será redirecionado ao inícios em {countdown.success}s...
        </span>
        <span
            aria-hidden={status !== 'failed'}
            className={clsx(
                'center w-full',
                'text-center dark:text-yellow-500 text-yellow-500',
                'transition-opacity ease-linear duration-500',
                status === 'failed' ? 'opacity-100' : 'opacity-0'
            )}
        >
            {status === 'failed' && countdown.failed > 0
                ? `Faça uma nova requisição após ${countdown.failed}s...`
                : 'Consulte novamente'
            }
        </span>
    </p>
)