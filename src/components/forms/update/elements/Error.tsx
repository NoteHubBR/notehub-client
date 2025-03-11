import { useFormContext } from "react-hook-form";

interface ErrorProps extends React.HTMLAttributes<HTMLSpanElement> {
    className?: string;
    field: string;
}

export const Error = ({ className, field, ...rest }: ErrorProps) => {

    const { formState: { errors } } = useFormContext();

    const error = errors[field]?.message;

    if (error) return (
        <span
            className={`absolute top-[105%] left-6 font-medium text-sm text-red-500 ${className}`}
            {...rest}
        >
            {error.toString()}
        </span>
    )

}