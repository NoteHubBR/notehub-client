import { clsx } from "clsx";
import { Count } from "./Count";
import { createNoteFormSchema, getSchemaStringConstraints } from "@/core";
import { useFormContext, useWatch } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: keyof typeof createNoteFormSchema.shape;
    countPosition: "half" | "full";
}

export const InputText = ({ name, countPosition, className, ...rest }: InputProps) => {

    const { register, formState: { errors } } = useFormContext();
    const { max } = getSchemaStringConstraints(createNoteFormSchema, name);
    const hasError = errors[name];

    const value: string = useWatch({ name, defaultValue: rest.defaultValue ?? "" });

    return (
        <>
            <input
                id={name}
                {...register(name)}
                maxLength={max}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                type="text"
                className={clsx(
                    'peer',
                    'my-2 px-2 py-1 rounded-md',
                    'border dark:border-middark border-midlight',
                    'text-sm',
                    'bg-transparent',
                    'focus:!border-primary',
                    'transition-colors',
                    hasError ? '!font-medium !text-red-600 selection:!bg-red-600' : 'selection:!bg-primary',
                    className
                )}
                {...rest}
            />
            <Count
                current={value.length}
                max={max!}
                className={clsx(
                    countPosition === "half" && 'right-1/2',
                    countPosition === "full" && 'right-0',
                    'insm:right-0',
                    hasError && 'text-red-500'
                )}
            />
        </>
    )

}