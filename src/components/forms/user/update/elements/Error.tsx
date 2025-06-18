import { editUserFormSchema } from "@/core";
import { useFormContext } from "react-hook-form";

interface ErrorProps extends React.HTMLAttributes<HTMLSpanElement> {
    field: keyof typeof editUserFormSchema.shape;
}

export const Error = ({ field, ...rest }: ErrorProps) => {

    const { formState: { errors } } = useFormContext();

    const error = errors[field]?.message;

    if (error) return (
        <span
            className="absolute top-[105%] left-2 font-medium text-sm text-red-500"
            {...rest}
        >
            {error.toString()}
        </span>
    )

}