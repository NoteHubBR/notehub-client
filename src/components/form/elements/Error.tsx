import { HTMLAttributes } from "react";

const Error = (props: HTMLAttributes<HTMLParagraphElement>) => {
    return <p className="px-1 text-sm font-bold text-rose-500" {...props} />;
};

export default Error;