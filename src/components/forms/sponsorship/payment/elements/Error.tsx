import { DonationFormData } from "@/core";
import { clsx } from "clsx";
import { useFormContext } from "react-hook-form";

export const Error = (props: React.HTMLAttributes<HTMLSpanElement>) => {

    const { formState: { errors } } = useFormContext<DonationFormData>();
    const error = errors.amount?.message;

    if (error) return (
        <p
            className={clsx(
                'absolute left-16 bottom-12',
                'pl-4 border-l dark:border-midlight border-middark',
                'font-medium text-sm dark:text-red-500 text-red-600'
            )}
            {...props}
        >
            {error}
        </p>
    )

    return (
        <p
            className={clsx(
                'absolute left-16 bottom-12',
                'pl-4 border-l dark:border-midlight border-middark',
                'font-medium text-sm dark:text-semilight/50 text-semidark/50'
            )}
            {...props}
        >
            Mínimo R$ 0,50.
        </p>
    )

}