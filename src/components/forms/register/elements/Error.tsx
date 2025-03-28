import { useFormContext } from "react-hook-form";

interface ErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
    field: string;
};

const Error = ({ field, ...rest }: ErrorProps) => {

    const { formState: { errors } } = useFormContext();

    const error = errors[field]?.message;

    if (!error) return null;

    return (
        <p className="px-1 text-sm font-bold dark:text-red-500 text-rose-500" {...rest} >
            {error.toString()}
        </p>
    )
};

export default Error;