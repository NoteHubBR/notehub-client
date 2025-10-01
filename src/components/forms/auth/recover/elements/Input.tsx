import { InputHTMLAttributes } from "react";
import { RecoverFormData } from "@/core";
import { useFormContext } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: keyof RecoverFormData;
    icon?: React.ReactNode;
};

const Input = ({ name, icon, ...rest }: InputProps) => {

    const { register } = useFormContext();

    return (
        <div className="flex items-center justify-between">
            <input
                id={name}
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
                autoComplete="off"
                {...register(name)}
                className="outline-none
                    peer
                    w-full py-1 px-2
                    text-md text-primary font-semibold
                    border-2 dark:border-primary/40 border-primary/40 rounded-s-md
                    dark:bg-dark bg-light
                    dark:focus:border-primary dark:valid:border-primary
                    focus:border-primary valid:border-primary"
                {...rest}
            />
            <div
                className="p-1
                text-slate-100
                border-2 border-transparent rounded-e-md
                dark:bg-primary/25 bg-primary/35
                dark:peer-focus:bg-primary dark:peer-valid:bg-primary
                peer-focus:bg-primary peer-valid:bg-primary"
            >
                {icon}
            </div>
        </div>
    )

}

export default Input;