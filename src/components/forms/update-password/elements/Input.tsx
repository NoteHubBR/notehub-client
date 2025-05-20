import { clsx } from "clsx";
import { PasswordUpdateFormData } from "@/core";
import { Toggle } from "./Toggle";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: keyof PasswordUpdateFormData;
}

export const Input = ({ name, ...rest }: InputProps) => {

    const { register, formState: { errors } } = useFormContext();
    const { ref, ...registerRest } = register(name);

    const hasError = errors[name];

    const [type, setType] = useState<"text" | "password">("password");

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            const input = inputRef.current;
            const start = input.selectionStart;
            const end = input.selectionEnd;
            setTimeout(() => { input.setSelectionRange(start, end) }, 0);
        }
    }, [type])

    return (
        <>
            <input
                ref={(element) => {
                    ref(element);
                    inputRef.current = element;
                }}
                id={name}
                type={type}
                {...registerRest}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                className={clsx(
                    'peer outline-none z-10',
                    'relative w-full mt-4 flex-1 bg-transparent',
                    hasError && 'text-red-600 selection:bg-red-600'
                )}
                required
                {...rest}
            />
            <Toggle inputType={type} setInputType={setType} />
        </>
    )

}