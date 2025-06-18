import { clsx } from "clsx";
import { EmailChangeFormData } from "@/core";
import { useFormContext } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: keyof EmailChangeFormData;
}

export const Input = ({ name, ...rest }: InputProps) => {

    const { register, formState: { errors } } = useFormContext();
    
    const hasError = errors[name];

    return (
        <input
            id={name}
            {...register(name)}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className={clsx(
                'peer outline-none z-10 relative w-full mt-4 flex-1 bg-transparent',
                hasError && 'text-red-600 selection:bg-red-600'
            )}
            required
            {...rest}
        />
    )

}