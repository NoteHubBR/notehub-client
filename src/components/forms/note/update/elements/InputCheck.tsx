import { NoteUpdateFormData } from "@/core";
import { useFormContext } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: keyof NoteUpdateFormData;
}

export const InputCheck = ({ name, ...rest }: InputProps) => {

    const { register } = useFormContext();

    return (
        <input
            {...register(name)}
            id={name}
            type="checkbox"
            onMouseDown={(e: React.MouseEvent<HTMLInputElement>) => e.preventDefault()}
            className="align-middle w-4 h-4
            dark:accent-secondary accent-primary
            focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-secondary
            focus-visible:dark:accent-white focus-visible:accent-black"
            {...rest}
        />
    )

}