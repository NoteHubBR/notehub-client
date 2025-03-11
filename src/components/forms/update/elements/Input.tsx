import { clsx } from "clsx";
import { Counter } from "./Counter";
import { getSchemaStringConstraints, editUserFormSchema } from "@/core";
import { useFormContext, useWatch } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: keyof typeof editUserFormSchema.shape;
}

export const Input = ({ name, ...rest }: InputProps) => {

    const { register, formState: { errors } } = useFormContext();
    const { max } = getSchemaStringConstraints(editUserFormSchema, name);
    const hasError = errors[name];

    const value: string = useWatch({ name, defaultValue: rest.defaultValue }) ?? "";

    return (
        <>
            <input
                id={name}
                {...register(name)}
                maxLength={max}
                className={clsx(
                    'peer outline-none',
                    'w-full px-2 py-1 pt-6',
                    'dark:font-light',
                    'text-md',
                    'border border-neutral-700/70 rounded',
                    'dark:bg-black bg-white',
                    'selection:!bg-violet-600 selection:!text-white',
                    'focus:border-violet-600',
                    'invalid:border-red-500',
                    hasError && '!font-medium !text-red-500 !border-red-500 selection:!bg-red-600',
                    'transition-all',
                )}
                required
                {...rest}
            />
            <Counter current={value.length} max={max} />
        </>
    )

}