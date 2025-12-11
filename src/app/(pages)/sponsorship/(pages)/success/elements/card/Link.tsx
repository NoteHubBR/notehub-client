import { clsx } from "clsx";
import Link, { LinkProps } from "next/link";

interface NavigarProps extends LinkProps {
    status: 'pending' | 'success' | 'failed' | 'none';
    countdown: number;
}

export const Navigator = ({ status, countdown, ...rest }: NavigarProps) => (
    <Link
        tabIndex={status === 'success' || (status === 'failed' && countdown === 0) ? 0 : -1}
        className={clsx(
            'group overflow-hidden relative w-[216px] h-[36px] px-4 py-2 rounded',
            'flex items-center justify-center',
            'font-medium text-sm',
            'transition-all ease-linear duration-500',
            status === 'success'
                ? 'hover:saturate-150 focus-visible:saturate-150 opacity-100 text-semilight dark:bg-secondary bg-primary'
                : status === 'failed' && countdown === 0
                    ? 'hover:saturate-150 focus-visible:saturate-150 opacity-100 text-semilight dark:bg-yellow-500 bg-yellow-500'
                    : 'select-none pointer-events-none text-transparent dark:bg-middark bg-midlight'
        )}
        {...rest}
    >
        <div
            aria-hidden='true'
            className={clsx(
                'select-none pointer-events-none',
                'absolute inset-0',
                'bg-gradient-to-r from-transparent via-white/35 to-transparent',
                'animate-shiny',
                status === 'pending' || countdown > 0 ? 'block' : 'hidden group-hover:block group-focus-visible:block'
            )}
        />
        <span className="drop-shadow-alpha-d-sm">
            {status === 'success' ? 'Início' : status === 'failed' ? 'Consultar' : ''}
        </span>
    </Link>
)