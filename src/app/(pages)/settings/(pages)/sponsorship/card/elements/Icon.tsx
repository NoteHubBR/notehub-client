import { clsx } from "clsx";

interface IconProps extends React.HTMLAttributes<React.ElementType> {
    icon: React.ElementType;
}

export const Icon = ({ icon: Icon, ...rest }: IconProps) => (
    <figure
        aria-hidden='true'
        className={clsx(
            'relative overflow-hidden',
            'w-10 h-10 rounded-full',
            'flex-none flex items-center justify-center',
            'bg-gradient-to-br from-lighter to-midlight',
            'dark:bg-gradient-to-br dark:from-darker dark:to-middark ',
            'dark:drop-shadow-alpha-l-md drop-shadow-alpha-d-md',
        )}
    >
        <div className={clsx(
            'absolute inset-0',
            'bg-gradient-to-r from-transparent via-black/25 to-transparent',
            'dark:bg-gradient-to-r dark:from-transparent dark:via-white/25 dark:to-transparent',
            'animate-shiny'
        )} />
        <Icon size={24} className="dark:fill-midlight fill-middark" {...rest} />
    </figure>
)