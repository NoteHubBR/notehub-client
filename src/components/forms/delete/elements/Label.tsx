import { DeleteUserFormData } from "@/core";
import { IconTrash } from "@tabler/icons-react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    name: keyof DeleteUserFormData
}

export const Label = ({ name, ...rest }: LabelProps) => (
    <label
        htmlFor={name}
        className="px-2 text-white"
        {...rest}
    >
        <IconTrash size={20} />
    </label>
)