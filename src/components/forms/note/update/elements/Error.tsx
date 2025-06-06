import { noteUpdateFormSchema } from "@/core";
import { useFormContext } from "react-hook-form";

interface ErrorProps extends React.HTMLAttributes<HTMLSpanElement> {
    field: keyof typeof noteUpdateFormSchema.shape;
}

export const Error = ({ field, ...rest }: ErrorProps) => {

    const { formState: { errors }, } = useFormContext();

    const fieldError = errors[field];

    if (fieldError && typeof fieldError.message === "string") {
        return (
            <p className="pl-1 text-sm font-medium dark:text-red-500 text-red-600" {...rest}>
                {fieldError.message}
            </p>
        )
    }

    if (fieldError && typeof fieldError === "object") {
        for (const key in fieldError) {
            if (Object.prototype.hasOwnProperty.call(fieldError, key) && (fieldError as any)[key]?.message) {
                return (
                    <p className="pl-1 text-sm font-medium dark:text-red-500 text-red-600" {...rest}>
                        {(fieldError as any)[key].message}
                    </p>
                )
            }
        }
    }

}