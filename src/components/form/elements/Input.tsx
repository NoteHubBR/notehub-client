import { InputHTMLAttributes, useState } from "react";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
};

const Input = ({ icon, type = "text", ...rest }: InputProps) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const toggleFieldVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); setIsPasswordVisible(!isPasswordVisible);
    };

    const inputType = (type === "password" && isPasswordVisible) ? "text" : type;

    return (
        <div className="flex items-center justify-between">
            <input
                type={inputType}
                className="
                    outline-none
                    peer
                    w-full py-1 px-2
                    text-md text-violet-500 font-semibold
                    border-2 dark:border-violet-600/40 border-violet-600/40 rounded-s-md
                    dark:bg-neutral-900 bg-neutral-100
                    dark:focus:border-violet-600 dark:valid:border-violet-600
                    focus:border-violet-600 valid:border-violet-600
                "
                {...rest}
            />
            {type !== "password"
                ?
                <div className="
                    p-1 
                    text-slate-100
                    border-2 border-transparent rounded-e-md 
                    dark:bg-violet-600/25 bg-violet-600/35
                    dark:peer-focus:bg-violet-600 dark:peer-valid:bg-violet-600
                    peer-focus:bg-violet-600 peer-valid:bg-violet-600
                ">
                    {icon}
                </div>
                :
                <button className="
                    p-1 
                    text-slate-100
                    border-2 border-transparent rounded-e-md 
                    dark:bg-violet-600/25 bg-violet-600/35
                    dark:peer-focus:bg-violet-600 dark:peer-valid:bg-violet-600 dark:focus-visible:bg-violet-600
                    peer-focus:bg-violet-600 peer-valid:bg-violet-600 focus-visible:bg-violet-600
                " onClick={toggleFieldVisibility} >
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