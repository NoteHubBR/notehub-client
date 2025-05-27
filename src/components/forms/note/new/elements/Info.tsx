import { CreateNoteFormData } from "@/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useWatch } from "react-hook-form";

interface InfoProps extends React.HTMLAttributes<HTMLHeadingElement> {
    name: keyof CreateNoteFormData;
}

export const Info = ({ name }: InfoProps) => {

    const isHidden = useWatch({ name }) === "true";

    return (
        <h3
            className="flex items-center gap-1 text-sm dark:text-midlight/65 text-middark/65"
        >
            <IconInfoCircle /> Você está criando uma nota {isHidden ? "privada" : "pública"}.
        </h3>
    )

}