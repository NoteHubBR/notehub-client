import { clsx } from "clsx";
import { PasswordUpdateFormData } from "@/core";
import { useFormContext } from "react-hook-form";

interface StrengthProps extends React.HTMLAttributes<HTMLDivElement> {
    field: keyof PasswordUpdateFormData;
}

export const Strength = ({ field, ...rest }: StrengthProps) => {

    const { watch } = useFormContext();

    const password: string = watch(field) || '';

    const regex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

    const isPasswordStrong = regex.test(password);

    const getStrength = (value: string) => {
        if (value.length < 4 || value.length > 8) return 'w-0 border-transparent';
        if (value.length <= 6 && !isPasswordStrong) return 'w-1/4 dark:border-red-500 border-rose-500';
        return isPasswordStrong ? 'w-full border-emerald-400' : 'w-3/4 border-amber-400';
    }

    return (
        <div
            className={clsx(
                'absolute bottom-[110%] left-0',
                'border-2 rounded-md',
                getStrength(password),
                'transition-all duration-300'
            )}
            {...rest}
        />
    )

}