import { clsx } from 'clsx';

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> { }

export const Label = (props: Props) => (
    <label
        className={clsx(
            'cursor-pointer outline-none',
            'p-2 flex items-center gap-3',
            'focus-within:dark:bg-lighter/5 focus-within:bg-darker/5',
            'hover:dark:bg-lighter/5 hover:bg-darker/5'
        )}
        {...props}
    />
)