import { IconMinus } from '@tabler/icons-react';
import { clsx } from 'clsx';

interface DisconnectProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

const Icon = ({ icon: Icon, reverse }: { icon: React.ElementType, reverse?: boolean }) => (
    <Icon className={clsx(
        'origin-center will-change-transform absolute',
        'text-light',
        'transition-transform ease-in-out duration-[333ms]',
        'group-disabled:rotate-0',
        reverse
            ? 'group-focus-visible:rotate-45 group-hover:rotate-45'
            : 'group-focus-visible:-rotate-45 group-hover:-rotate-45'
    )} />
)

export const Disconnect = (props: DisconnectProps) => (
    <button
        className={clsx(
            'group relative w-6 h-6 rounded-full',
            'self-center flex items-center justify-center',
            'dark:bg-midlight/50 bg-middark/50',
            'transition-colors duration-[333ms] ease-linear',
            'disabled:dark:bg-primary disabled:bg-primary disabled:animate-pulse',
            'focus-visible:dark:bg-red-500 focus-visible:bg-red-500',
            'hover:dark:bg-red-500 hover:bg-red-500',
        )}
        {...props}
    >
        <Icon icon={IconMinus} />
        <Icon icon={IconMinus} reverse />
    </button>
)