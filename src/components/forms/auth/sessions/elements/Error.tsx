import { FindSessionsFormData } from "@/core";
import { useFormContext } from "react-hook-form";

interface ErrorProps extends React.HTMLAttributes<HTMLSpanElement> {
    name: keyof FindSessionsFormData;
}

export const Error = ({ name, ...rest }: ErrorProps) => {

    const { formState: { errors } } = useFormContext();

    const error = errors[name]?.message;

    if (error) return (
        <span className="font-medium text-sm text-red-600" {...rest}>
            {error.toString()}
        </span>
    )

}