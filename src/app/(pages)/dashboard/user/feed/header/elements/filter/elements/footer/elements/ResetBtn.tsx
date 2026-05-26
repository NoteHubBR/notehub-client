import { clsx } from 'clsx';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onReset: () => void;
}

export const ResetBtn = ({ onReset, ...rest }: Props) => (
    <button
        onClick={onReset}
        className={clsx(
            'py-1 px-2 rounded',
            'text-sm',
            'focus-visible:dark:bg-lighter/5 focus-visible:bg-darker/5',
            'hover:dark:bg-lighter/5 hover:bg-darker/5'
        )}
    >
        Redefinir
    </button>
)