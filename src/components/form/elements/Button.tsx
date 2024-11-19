interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    isRequesting?: boolean;
}

const Button = ({ isRequesting, ...rest }: ButtonProps) => {
    return (
        <button
            className={`
                ease-in-out transition-all duration-500
                ${isRequesting && "cursor-not-allowed"}
                ${!isRequesting && "request-btn"}
                ${!isRequesting && "relative active:top-[1px]"}
                w-full m-auto py-1
                rounded-md
                text-md text-slate-100 font-semibold 
                ${isRequesting ? "dark:bg-white/25 bg-black/25" : "dark:bg-slate-100/5 bg-neutral-900/25"}
            `}
            type="submit"
            disabled={isRequesting}
            {...rest}
        />
    );
};

export default Button;