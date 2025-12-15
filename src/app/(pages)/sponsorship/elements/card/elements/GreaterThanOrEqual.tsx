import { clsx } from "clsx";

export const GreaterThanOrEqual = (props: React.HTMLAttributes<HTMLSpanElement>) => (
    <span
        aria-hidden='true'
        className={clsx(
            'saturate-200',
            '-ml-2',
            'font-firacode text-4xl  ',
            'text-transparent bg-clip-text bg-gradient-to-r',
            'dark:from-secondary dark:to-inverted',
            'from-primary to-inverted',
        )}
        {...props}
    >
        {'>='}
    </span>
)