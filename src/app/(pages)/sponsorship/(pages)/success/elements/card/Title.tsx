import { clsx } from "clsx";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    isPending: boolean;
    hasSucceeded: boolean;
    hasFailed: boolean;
}

export const Title = ({ isPending, hasSucceeded, hasFailed, ...rest }: TitleProps) => (
    <h1
        className="relative w-full h-[28px] font-semibold text-xl"
        {...rest}
    >
        <span
            aria-hidden={!isPending}
            className={clsx(
                'center w-full text-center dark:text-midlight text-middark',
                'transition-opacity ease-linear duration-500',
                isPending ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
        >
            Processando
        </span>
        <span
            aria-hidden={!hasSucceeded}
            className={clsx(
                'center w-full text-center dark:text-secondary text-primary',
                'transition-opacity ease-linear duration-500',
                hasSucceeded ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
        >
            Já era!
        </span>
        <span
            aria-hidden={!hasFailed}
            className={clsx(
                'center w-full text-center dark:text-yellow-600 text-yellow-500',
                'transition-opacity ease-linear duration-500',
                hasFailed ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
        >
            Deu ruim...
        </span>
    </h1>
)