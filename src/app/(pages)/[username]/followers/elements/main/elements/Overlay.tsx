import { clsx } from 'clsx';

export const Overlay = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={clsx(
            'pointer-events-none absolute inset-0',
            'rounded border dark:border-light/15 border-dark/15',
            'dark:bg-[rgba(0,0,0,.666)] bg-[rgba(255,255,255,.6)]'
        )}
        {...props}
    />
)