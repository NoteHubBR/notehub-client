import { DeleteUserFormData } from "@/core";
import { useFormContext } from "react-hook-form";

interface ErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
    name: keyof DeleteUserFormData;
}

export const Error = ({ name, ...rest }: ErrorProps) => {

    const { formState: { errors } } = useFormContext();

    const error = errors[name]?.message;

    if (error) return (
        <p className="font-medium text-sm text-red-600" {...rest}>
            {error.toString()}
        </p>
    )

}