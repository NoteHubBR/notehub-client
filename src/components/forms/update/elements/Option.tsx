import { editUserFormSchema } from "@/core";
import { IconCheck } from "@tabler/icons-react";
import { useFormContext } from "react-hook-form";

interface OptionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    name: keyof typeof editUserFormSchema.shape;
    val: boolean;
    icon: React.ReactNode;
    title: string;
    description: string;
}

export const Option = ({ name, val, icon, title, description, onClick, ...rest }: OptionProps) => {

    const { register, setValue } = useFormContext();

    setValue(name, val);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setValue(name, !val);
        if (onClick) onClick(e);
    }

    return (
        <div role="menuitem">
            <input type="hidden" {...register(name)} />
            <button
                type="button"
                onClick={handleClick}
                className="group w-full p-1
                flex items-center gap-3
                rounded border border-neutral-700/70
                transition-colors"
                {...rest}
            >
                <figure className="dark:text-neutral-400 text-neutral-600">
                    {icon}
                </figure>
                <div className="flex-1 text-start flex flex-col">
                    <span className="font-medium text-sm dark:text-neutral-400 text-neutral-600">{title}</span>
                    <span className="insm:hidden font-medium text-xs dark:text-neutral-400 text-neutral-600">{description}</span>
                </div>
                <IconCheck
                    size={16}
                    className="opacity-0 dark:text-neutral-400 text-neutral-600
                    group-hover:opacity-100"
                />
            </button>
        </div>
    )

}