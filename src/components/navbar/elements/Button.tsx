interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    tooltip?: string;
    children?: React.ReactNode;
}

export const Button = (props: ButtonProps) => {

    const { tooltip, children, ...rest } = props;

    return (
        <button className="relative group p-1 rounded-full hover:dark:bg-neutral-50/10 hover:bg-neutral-900/10 transition-colors" {...rest}>
            {tooltip &&
                <span
                    className="
                        pointer-events-none
                        group-hover:opacity-100 group-hover:visible transition-all
                        invisible opacity-0 
                        absolute break-keep top-[150%] left-1/2 -translate-x-1/2
                        w-max p-1 
                        rounded-md 
                        text-sm 
                        bg-neutral-500 text-white
                    "
                >
                    {tooltip}
                </span>
            }
            {children}
        </button>
    )

}