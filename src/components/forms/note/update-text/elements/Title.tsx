import { clsx } from "clsx";

interface TitleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isPreviewing: boolean;
}

export const Title = ({ isPreviewing, children, ...rest }: TitleProps) => (
    <button
        type="button"
        className={clsx(
            'relative insm:truncate',
            'min-w-0 flex-1 py-3',
            'after:pointer-events-none after:absolute after:top-full after:h-full after:border-t-2 after:border-primary',
            isPreviewing
                ? 'cursor-default after:right-0 after:w-full'
                : 'cursor-pointer after:right-0 after:w-0',
            'transition-all duration-300',
            'after:transition-all after:duration-300'
        )}
        {...rest}
    >
        <span
            className={clsx(
                'w-fit p-2 rounded-lg insm:rounded-none',
                isPreviewing
                    ? 'dark:bg-semilight/15 bg-semidark/15'
                    : 'dark:hover:bg-semilight/15 hover:bg-semidark/15',
                'transition-colors'
            )}
        >
            {children}
        </span>
    </button>
)