import { clsx } from 'clsx';
import { Count } from './Count';
import { createNoteFormSchemaShape, getSchemaStringConstraints } from '@/core';
import { useFormContext, useWatch } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: keyof typeof createNoteFormSchemaShape.shape;
}

export const InputText = ({ name, className, ...rest }: InputProps) => {

    const { register, formState: { errors } } = useFormContext();
    const { max } = getSchemaStringConstraints(createNoteFormSchemaShape, name);
    const hasError = errors[name];

    const value: string = useWatch({ name, defaultValue: rest.defaultValue ?? '' });

    return (
        <>
            <input
                id={name}
                {...register(name)}
                maxLength={max}
                autoComplete='off'
                autoCorrect='off'
                spellCheck={false}
                type='text'
                className={clsx(
                    'peer',
                    'w-full px-2 py-1 rounded-md',
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
            <Count
                current={value.length}
                max={max}
                className={clsx(
                    'right-0',
                    hasError && 'dark:text-red-500 text-red-600'
                )}
            />
        </>
    )

}