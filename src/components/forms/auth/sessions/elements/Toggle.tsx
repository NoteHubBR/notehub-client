import { IconEye, IconEyeClosed } from "@tabler/icons-react";

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    inputType: "text" | "password";
    setInputType: React.Dispatch<React.SetStateAction<"text" | "password">>
}

export const Toggle = ({ inputType, setInputType, ...rest }: ToggleProps) => {

    const toggleType = () => setInputType(prev => prev === "text" ? "password" : "text");

    return (
        <button
            tabIndex={1}
            type="button"
            onMouseDown={e => e.preventDefault()}
            onClick={toggleType}
            className="z-10 pl-1
            dark:text-midlight/75 text-middark/75"
            {...rest}
        >
            {inputType === "text" && <IconEye size={24} />}
            {inputType === "password" && <IconEyeClosed size={24} />}
        </button>
    )

}