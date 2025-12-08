import { clsx } from "clsx";

export const H3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
        className={clsx(
            'saturate-200',
            'w-fit',
            'font-firacode font-medium -tracking-wider text-xl text-transparent bg-clip-text',
            'bg-gradient-to-r',
            'dark:from-secondary dark:to-inverted',
            'from-primary to-inverted',
        )}
        {...props}
    />
)