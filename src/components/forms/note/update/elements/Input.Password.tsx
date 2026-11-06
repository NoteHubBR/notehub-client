import { clsx } from 'clsx';
import { Count } from './Count';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';
import { NoteUpdateFormData, NoteUpdateFormSchema } from '@/core';
import { useEffect, useRef, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: keyof NoteUpdateFormSchema['shape'];
}

export const InputPassword = ({ name, defaultValue, ...rest }: Props) => {

    const [type, setType] = useState<'text' | 'password'>('password');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { register, resetField, formState: { errors } } = useFormContext<NoteUpdateFormData>();
    const { ref, ...registerRest } = register(name);
    const hasError = errors[name];

    const disabled = useWatch<NoteUpdateFormData>({ name: 'encrypted' }) === false;
    const value: string = useWatch({ name, defaultValue: defaultValue ?? '' });

    const handleClick = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        return setType(prev => prev === 'text' ? 'password' : 'text');
    }

    useEffect(() => {
        if (inputRef.current) {
            const input = inputRef.current;
            const start = input.selectionStart;
            const end = input.selectionEnd;
            setTimeout(() => { input.setSelectionRange(start, end) }, 0);
        }
    }, [type])

    useEffect(() => {
        if (disabled) resetField('passphrase');
    }, [disabled])

    return (
        <>
            <div className='peer my-2 flex'>
                <input
                    {...rest}
                    ref={(element) => {
                        ref(element);
                        inputRef.current = element;
                    }}
                    {...registerRest}
                    id='passphrase'
                    disabled={disabled}
                    type={type}
                    value={disabled ? '' : value}
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className={clsx(
                        'peer w-full px-2 py-1',
                        'rounded-s-md border-l border-y',
                        'text-sm',
                        'transition-colors',
                        disabled
                            ? [
                                'dark:bg-semidark bg-semilight',
                                'dark:border-semidark border-semilight',
                            ]
                            : [
                                'dark:bg-transparent bg-transparent',
                                'dark:border-middark border-midlight',
                            ],
                        hasError
                            ? [
                                'dark:text-red-500 text-red-600',
                                'dark:focus:border-red-500 focus:border-red-600',
                                'dark:focus-visible:border-red-500 focus-visible:border-red-600',
                                'dark:selection:!bg-red-500 selection:!bg-red-600',
                            ]
                            : [
                                'dark:selection:bg-secondary selection:bg-primary',
                                'dark:focus:border-secondary focus:border-primary',
                                'dark:focus-visible:border-secondary focus-visible:border-primary',
                            ],
                    )}
                />
                <button
                    disabled={disabled}
                    type='button'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleClick}
                    className={clsx(
                        'p-1 rounded-e-md',
                        'transition-colors',
                        disabled
                            ? [
                                'dark:text-semidark text-semilight',
                                'dark:bg-semidark bg-semilight',
                                'dark:border-semidark border-semilight',
                                'dark:hover:text-semidark hover:text-semilight',
                                'dark:hover:bg-semidark hover:bg-semilight',
                            ]
                            : [
                                'dark:text-midlight text-middark',
                                'dark:bg-middark bg-midlight',
                                'dark:border-middark border-midlight',
                                'dark:hover:text-light hover:text-light',
                                'dark:focus-visible:text-light focus-visible:text-light',
                                'dark:peer-focus-within:text-light peer-focus-within:text-light',
                            ],
                        hasError
                            ? [
                                'dark:hover:bg-red-500 hover:bg-red-600',
                                'dark:hover:border-red-500 hover:border-red-600',
                                'dark:focus-visible:bg-red-500 focus-visible:bg-red-600',
                                'dark:focus-visible:border-red-500 focus-visible:border-red-600',
                                'dark:peer-focus-within:bg-red-500 peer-focus-within:bg-red-600',
                                'dark:peer-focus-within:border-red-500 peer-focus-within:border-red-600',
                            ]
                            : [
                                'dark:hover:bg-secondary hover:bg-primary',
                                'dark:hover:border-secondary hover:border-primary',
                                'dark:focus-visible:bg-secondary focus-visible:bg-primary',
                                'dark:focus-visible:border-secondary focus-visible:border-primary',
                                'dark:peer-focus-within:bg-secondary peer-focus-within:bg-primary',
                                'dark:peer-focus-within:border-secondary peer-focus-within:border-primary',
                            ],
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
            <Count
                current={value.length}
                max={undefined}
                className={clsx(
                    'right-0',
                    hasError && 'dark:text-red-500 text-red-600'
                )}
            />
        </>
    )

}