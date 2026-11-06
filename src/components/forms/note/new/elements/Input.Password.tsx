import { clsx } from 'clsx';
import { Count } from './Count';
import { CreateNoteFormSchema } from '@/core';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: keyof CreateNoteFormSchema['shape'];
}

export const InputPassword = ({ name, className, ...rest }: InputProps) => {

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const { register, formState: { errors } } = useFormContext();
    const hasError = errors[name];

    const value: string = useWatch({ name, defaultValue: rest.defaultValue ?? '' });

    return (
        <>
            <div className='peer flex'>
                <input
                    id={name}
                    {...register(name)}
                    type={isVisible ? 'text' : 'password'}
                    className={clsx(
                        'peer',
                        'w-full px-2 py-1 rounded-s-md',
                        'border dark:border-middark border-midlight',
                        'text-sm',
                        'bg-transparent',
                        'dark:focus:border-secondary focus:border-primary',
                        'transition-colors',
                        hasError
                            ? '!font-medium !text-red-600 selection:!bg-red-600 dark:focus:border-red-500 focus:border-red-600'
                            : 'selection:!bg-primary',
                        className
                    )}
                    {...rest}
                />
                <button
                    type='button'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setIsVisible(prev => !prev)}
                    className={clsx(
                        'rounded-e-md',
                        'border dark:border-middark border-midlight',
                        'dark:text-midlight text-middark',
                        'dark:bg-middark bg-midlight',
                        'dark:focus-visible:border-secondary focus-visible:border-primary',
                        'focus-visible:text-white',
                        'dark:focus-visible:bg-secondary focus-visible:bg-primary',
                        'dark:peer-focus-within:border-secondary peer-focus-within:border-primary',
                        'peer-focus-within:text-white',
                        'dark:peer-focus-within:bg-secondary peer-focus-within:bg-primary',
                        'transition-colors',
                        className,
                    )}
                >
                    {isVisible ? <IconEye size={24} /> : <IconEyeClosed size={24} />}
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