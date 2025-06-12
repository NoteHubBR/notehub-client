import { CreateCommentFormData } from "@/core";
import { useFormContext } from "react-hook-form";

interface ErrorProps extends React.HTMLAttributes<HTMLSpanElement> {
    field: keyof CreateCommentFormData;
}

export const Error = ({ field, ...rest }: ErrorProps) => {

    const { formState: { errors } } = useFormContext();
    const error = errors[field]?.message;

    if (error) return (
        <p
            className="pl-1 text-sm font-medium dark:text-red-500 text-red-600"
            {...rest}
        >
            {error.toString()}
        </p>
    )

}