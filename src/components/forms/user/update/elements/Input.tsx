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
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                className={clsx(
                    'peer outline-none z-10 relative',
                    'w-full mt-4',
                    'dark:font-light',
                    'text-md',
                    'bg-transparent',
                    'selection:!text-white',
                    hasError ? '!font-medium !text-red-500 selection:!bg-red-600' : 'selection:!bg-primary',
                )}
                required
                {...rest}
            />
            <Counter current={value.length} max={max} />
        </>
    )

}