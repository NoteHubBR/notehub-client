import { clsx } from 'clsx';
import { LowDetailNote } from '@/core';
import { useRef, useState } from 'react';

interface Props extends React.HTMLAttributes<HTMLElement> {
    note: LowDetailNote;
}

export const Article = ({ note, className, ...rest }: Props) => {

    const [isHidden, setIsHidden] = useState<boolean>(note.hidden);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const longPressRef = useRef(false);

    const toggleVisibility = () => {
        if (note.hidden) setIsHidden(prev => !prev);
    }

    const startPress = () => {
        longPressRef.current = false;
        timeoutRef.current = setTimeout(() => {
            longPressRef.current = true;
            toggleVisibility();
        }, 222);
    }

    const cancelPress = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (longPressRef.current) {
            event.preventDefault();
            event.stopPropagation();
            longPressRef.current = false;
        }
    }

    return (
        <article
            onPointerDown={startPress}
            onPointerUp={cancelPress}
            onPointerLeave={cancelPress}
            onPointerCancel={cancelPress}
            onClick={handleClick}
            onContextMenu={(event) => event.preventDefault()}
            className={clsx(
                'relative',
                'w-full p-3',
                'flex flex-col gap-3',
                'transition-all duration-[333ms] ease-in-out',
                'transform-gpu',
                'group-hover:scale-95',
                'group-focus-within:scale-95',
                isHidden
                    ? '[&>*]:pointer-events-none [&>*]:select-none blur'
                    : '[&>*]:pointer-events-auto [&>*]:select-auto blur-none',
                className,
            )}
            {...rest}
        />
    )

}