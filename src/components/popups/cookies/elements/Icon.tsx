import { clsx } from 'clsx';

export const Icon = ({ icon: Icon }: { icon: React.ElementType }) => (
    <Icon
        size={36}
        className={clsx(
            'flex-none self-center ',
            'dark:fill-middark fill-midlight'
        )}
    />
)