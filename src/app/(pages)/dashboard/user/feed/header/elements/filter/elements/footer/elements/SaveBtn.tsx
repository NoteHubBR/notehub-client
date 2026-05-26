import { clsx } from 'clsx';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onSave: () => void;
}

export const SaveBtn = ({ onSave, ...rest }: Props) => (
    <button
        onClick={onSave}
        className={clsx(
            'py-1 px-2 rounded',
            'text-sm text-light',
            'bg-primary',
            'focus-visible:bg-secondary',
            'hover:bg-secondary'
        )}
    >
        Definir
    </button>
)