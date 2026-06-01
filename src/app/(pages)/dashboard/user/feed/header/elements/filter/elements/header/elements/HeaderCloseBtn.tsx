import { clsx } from 'clsx';
import { forwardRef } from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ElementType;
    onClose: () => void;
}

export const HeaderCloseBtn = forwardRef<HTMLButtonElement, Props>(({ icon: Icon, onClose, ...rest }, ref) => (
    <button
        ref={ref}
        onClick={onClose}
        className={clsx(
            'dark:text-neutral-500 text-neutral-400',
            'focus-visible:dark:text-midlight focus-visible:text-middark',
            'hover:dark:text-midlight hover:text-middark',
            'transition-colors duration-300'
        )}
        {...rest}
    >
        <Icon strokeWidth={3} size={15} />
    </button>
))