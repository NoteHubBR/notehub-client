import { LabelHTMLAttributes } from "react";
import { IconQuestionMark } from "@tabler/icons-react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    tooltip?: React.ReactNode;
}

const Label = ({ tooltip, ...rest }: LabelProps) => {
    return (
        <div className="flex items-center gap-1 px-1 ">
            <label className="text-md dark:text-slate-100 text-neutral-900" {...rest} />
            {tooltip &&
                <div className="group relative">
                    <IconQuestionMark size={17} className="text-slate-100 rounded-full dark:bg-slate-300/50 bg-neutral-500" />
                    <p className="
                        cursor-help invisible opacity-0 group-hover:opacity-100 group-hover:visible
                        transition-opacity duration-500
                        absolute top-1/2 -translate-y-1/2 left-[125%]
                        insm:left-1/2 -translate-x-1/2
                        w-[150px] p-1
                        rounded-md 
                        text-sm  text-slate-100
                        dark:bg-gray-500 bg-neutral-500 
                    ">
                        {tooltip}
                    </p>
                </div>}
        </div>
    )
};

export default Label;