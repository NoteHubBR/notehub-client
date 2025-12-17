import { editUserFormSchema } from "@/core";
import { useFormContext } from "react-hook-form";

interface UploadErrorProps extends React.HTMLAttributes<HTMLSpanElement> {
    fields: Array<keyof typeof editUserFormSchema.shape>;
}

export const UploadError = ({ fields, ...rest }: UploadErrorProps) => {

    const { formState: { errors } } = useFormContext();

    const error = fields
        .map(field => errors[field]?.message)
        .find(msg => msg !== undefined);

    if (error) return (
        <span
            className="font-medium text-sm text-red-500"
            {...rest}
        >
            {error.toString()}
        </span>
    )

}