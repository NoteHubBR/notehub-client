import { DeleteUserFormData } from "@/core";
import { useFormContext } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: keyof DeleteUserFormData;
}

export const Input = ({ name, ...rest }: InputProps) => {

    const { register } = useFormContext();

    return (
        <input
            required
            id={name}
            {...register(name)}
            type="password"
            placeholder="Digite sua senha"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className="w-full px-2 py-1 dark:bg-darker bg-lighter placeholder:text-sm"
            {...rest}
        />
    )

}