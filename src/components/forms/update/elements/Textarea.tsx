import { clsx } from "clsx";
import { Counter } from "./Counter";
import { getSchemaStringConstraints, editUserFormSchema } from "@/core";
import { useFormContext, useWatch } from "react-hook-form";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: keyof typeof editUserFormSchema.shape;
}

export const Textarea = ({ name, ...rest }: TextareaProps) => {

    const { register, formState: { errors } } = useFormContext();
    const { max } = getSchemaStringConstraints(editUserFormSchema, name);
    const hasError = errors[name];

    const value: string = useWatch({ name, defaultValue: rest.defaultValue }) ?? "";

    return (
        <>
            <textarea
                id={name}
                {...register(name)}
                maxLength={max}
                className={clsx(
                    'resize-none peer outline-none dark:font-light',
                    'w-full px-2 py-1 pt-6',
                    'text-md',
                    'border border-neutral-700/70 rounded',
                    'dark:bg-black bg-white',
                    'selection:!bg-violet-600 selection:!text-white',
                    'focus:border-violet-600',
                    'invalid:border-red-500',
                    hasError && '!font-medium !text-red-500 !border-red-500 selection:!bg-red-600',
                    'transition-all'
                )}
                {...rest}
            />
            <Counter current={value.length} max={max} />
        </>
    )

}