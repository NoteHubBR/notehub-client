import { clsx } from "clsx";

interface EditingTitleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isPreviewing: boolean;
    isEditing: boolean;
}

export const EditingTitle = ({ isPreviewing, isEditing, children, ...rest }: EditingTitleProps) => (
    <button
        type="button"
        className={clsx(
            'relative',
            'py-3',
            'font-medium dark:text-secondary text-primary',
            'after:pointer-events-none after:absolute after:top-full after:h-full after:border-t-2 after:border-primary',
            isEditing
                ? 'block visible opacity-100'
                : 'insm:hidden invisible opacity-0',
            isPreviewing
                ? 'after:left-0 after:right-0 after:w-0'
                : 'after:left-0 after:w-full',
            'transition-all duration-300',
            'after:transition-all after:duration-300'
        )}
        {...rest}
    >
        <span
            className={clsx(
                'p-2 rounded-lg insm:rounded-none',
                isPreviewing
                    ? 'dark:hover:bg-semilight/15 hover:bg-semidark/15'
                    : 'dark:bg-primary/25 bg-primary/15',
                'transition-colors'
            )}
        >
            {children}
        </span>
    </button>
)