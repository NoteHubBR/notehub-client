import { editUserFormSchema } from "@/core";
import { useFormContext } from "react-hook-form";

interface AvatarErrorProps extends React.HTMLAttributes<HTMLSpanElement> {
    field: keyof typeof editUserFormSchema.shape;
}

export const AvatarError = ({ field, ...rest }: AvatarErrorProps) => {

    const { formState: { errors } } = useFormContext();

    const error = errors[field]?.message;

    if (error) return (
        <span
            className="font-medium text-sm text-red-500"
            {...rest}
        >
            {error.toString()}
        </span>
    )

}