import { clsx } from "clsx";

interface ReleaseUListProps extends React.HTMLAttributes<HTMLUListElement> {
    isActive: boolean;
}

export const ReleaseUList = ({ isActive, ...rest }: ReleaseUListProps) => (
    <ul
        className={clsx(
            'pl-6',
            isActive
                ? 'border-l-4 dark:border-secondary border-primary'
                : 'border-l-2 dark:border-middark/50 border-midlight/50',
            'flex flex-col gap-6',
        )}
        {...rest}
    />
)