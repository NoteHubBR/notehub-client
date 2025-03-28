import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { InputHTMLAttributes, useState } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ReactNode;
};

const Input = ({ name, icon, type = "text", ...rest }: InputProps) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const inputType = (type === "password" && isPasswordVisible) ? "text" : type;

    const { register } = useFormContext();

    return (
        <div className="flex items-center justify-between">
            <input
                id={name}
                type={inputType}
                {...register(name)}
                className="outline-none
                    peer
                    w-full py-1 px-2
                    text-md text-primary font-semibold
                    border-2 dark:border-primary/40 border-primary/40 rounded-s-md
                    dark:bg-dark bg-light
                    dark:focus:border-primary dark:valid:border-primary
                    focus:border-primary valid:border-primary"
                {...rest}
            />
            {type !== "password"
                ?
                <div className="p-1
                    text-slate-100
                    border-2 border-transparent rounded-e-md
                    dark:bg-primary/25 bg-primary/35
                    dark:peer-focus:bg-primary dark:peer-valid:bg-primary
                    peer-focus:bg-primary peer-valid:bg-primary"
                >
                    {icon}
                </div>
                :
                <button
                    tabIndex={1}
                    type="button"
                    className="p-1
                        text-slate-100
                        border-2 border-transparent rounded-e-md
                        dark:bg-primary/25 bg-primary/35
                        dark:peer-focus:bg-primary dark:peer-valid:bg-primary dark:focus-visible:bg-primary
                        peer-focus:bg-primary peer-valid:bg-primary focus-visible:bg-primary"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                    {isPasswordVisible
                        ?
                        <>
                            <IconEye title="Visível" />
                        </>
                        :
                        <>
                            <IconEyeClosed title="Oculto" />
                        </>
                    }
                </button>
            }
        </div>
    );

};

export default Input;