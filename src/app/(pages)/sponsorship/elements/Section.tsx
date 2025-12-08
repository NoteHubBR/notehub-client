import { clsx } from 'clsx';

export const Section = ({ className, ...rest }: React.HTMLAttributes<HTMLElement>) => (
    <section
        className={clsx('w-full h-full flex items-center justify-center', className)}
        {...rest}
    />
)