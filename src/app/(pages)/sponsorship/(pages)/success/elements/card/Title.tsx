import { clsx } from "clsx";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    status: 'pending' | 'success' | 'failed' | 'none';
}

export const Title = ({ status, ...rest }: TitleProps) => (
    <h1
        className="relative w-full h-[28px] font-semibold text-xl"
        {...rest}
    >
        <span
            aria-hidden={status !== 'pending'}
            className={clsx(
                'center w-full text-center dark:text-midlight text-middark',
                'transition-opacity ease-linear duration-500',
                status === 'pending' ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
        >
            Processando
        </span>
        <span
            aria-hidden={status !== 'success'}
            className={clsx(
                'center w-full text-center dark:text-secondary text-primary',
                'transition-opacity ease-linear duration-500',
                status === 'success' ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
        >
            Já era!
        </span>
        <span
            aria-hidden={status !== 'failed'}
            className={clsx(
                'center w-full text-center dark:text-yellow-600 text-yellow-500',
                'transition-opacity ease-linear duration-500',
                status === 'failed' ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
        >
            Deu ruim...
        </span>
    </h1>
)