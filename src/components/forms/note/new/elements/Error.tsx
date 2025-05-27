import { createNoteFormSchema } from "@/core";
import { useFormContext } from "react-hook-form";

interface ErrorProps extends React.HTMLAttributes<HTMLSpanElement> {
    field: keyof typeof createNoteFormSchema.shape;
}

export const Error = ({ field, ...rest }: ErrorProps) => {

    const { formState: { errors } } = useFormContext();

    const error = errors[field]?.message;

    if (error) return (
        <p
            className="pl-1 text-sm font-medium text-red-600"
            {...rest}
        >
            {error.toString()}
        </p>
    )

}