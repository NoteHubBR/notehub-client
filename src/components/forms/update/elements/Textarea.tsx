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
                autoComplete="on"
                autoCorrect="on"
                spellCheck
                className={clsx(
                    'peer resize-none outline-none z-10 relative',
                    'w-full mt-4',
                    'dark:font-light text-md',
                    'bg-transparent',
                    'selection:!bg-violet-600 selection:!text-white',
                    hasError && '!font-medium !text-red-500 selection:!bg-red-600',
                    'transition-all'
                )}
                {...rest}
            />
            <Counter current={value.length} max={max} />
        </>
    )

}