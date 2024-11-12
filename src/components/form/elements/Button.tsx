import { HTMLAttributes } from "react";

const Button = (props: HTMLAttributes<HTMLButtonElement>) => {
    return (
        <button className="
            request-btn
            relative active:top-[1px]
            w-full m-auto py-1
            rounded-md
            text-md text-slate-100 font-semibold 
            dark:bg-slate-100/5 bg-neutral-900/25
            " {...props} />
    );
};

export default Button;