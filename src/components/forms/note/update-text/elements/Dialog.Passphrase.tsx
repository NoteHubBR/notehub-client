import { clsx } from 'clsx';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';
import { UpdateNotePassphraseFormData } from '@/core';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    onEnter?: () => void;
}

export const Passphrase = ({ onEnter, ...rest }: Props) => {

    const [type, setType] = useState<'text' | 'password'>('password');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { register } = useFormContext<UpdateNotePassphraseFormData>();
    const { ref, ...registerRest } = register('passphrase');

    const handleClick = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        return setType(prev => prev === 'text' ? 'password' : 'text');
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            if (onEnter) onEnter();
        }
    }

    useEffect(() => {
        if (inputRef.current) {
            const input = inputRef.current;
            const start = input.selectionStart;
            const end = input.selectionEnd;
            setTimeout(() => { input.setSelectionRange(start, end) }, 0);
        }
    }, [type])

    return (
        <div className='border-y dark:border-middark/50 border-midlight/50 flex'>
            <input
                {...rest}
                ref={(element) => {
                    ref(element);
                    inputRef.current = element;
                }}
                id='passphrase'
                type={type}
                {...registerRest}
                autoFocus
                autoComplete='off'
                autoCorrect='off'
                spellCheck={false}
                onKeyDown={handleKeyDown}
                className={clsx(
                    'w-full px-2 py-1',
                    'text-sm',
                    'bg-transparent',
                )}
            />
            <button
                type='button'
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleClick}
                className={clsx(
                    'px-1',
                    'border-l dark:border-middark/50 border-midlight/50',
                    'dark:text-midlight/50 text-middark/50',
                    'dark:hover:text-midlight hover:text-middark',
                    'dark:hover:bg-black hover:bg-semilight',
                    'dark:focus-visible:text-midlight focus-visible:text-middark',
                    'dark:focus-visible:bg-black focus-visible:bg-semilight',
                    'transition-colors',
                )}
            >
                {
                    type === 'text'
                        ? <IconEye size={24} />
                        : type === 'password'
                            ? <IconEyeClosed size={24} />
                            : null
                }
            </button>
        </div>
    )

}