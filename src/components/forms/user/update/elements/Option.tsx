import { editUserFormSchema } from "@/core";
import { IconChevronUp } from "@tabler/icons-react";
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
                className="w-full p-1 flex items-center gap-3"
                {...rest}
            >
                <figure >
                    {icon}
                </figure>
                <div className="flex-1 text-start flex flex-col">
                    <span className="font-medium text-sm">{title}</span>
                    <span className="insm:hidden font-medium text-xs">{description}</span>
                </div>
                <IconChevronUp size={20} />
            </button>
        </div>
    )

}