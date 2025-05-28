import { CreateNoteFormData } from "@/core";
import { useFormContext } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: keyof CreateNoteFormData;
}

export const InputRadio = ({ name, ...rest }: InputProps) => {

    const { register } = useFormContext();

    return (
        <input
            {...register(name)}
            type="radio"
            onMouseDown={(e: React.MouseEvent<HTMLInputElement>) => e.preventDefault()}
            className="cursor-pointer
            align-middle w-4 h-4
            dark:accent-secondary accent-primary
            focus-visible:dark:accent-white focus-visible:accent-black"
            {...rest}
        />
    )

}