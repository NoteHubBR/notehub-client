const Button = (props: React.HTMLAttributes<HTMLButtonElement>) => {
    return (
        <button className="
                request-btn
                relative active:top-[1px]
                w-full m-auto py-1
                rounded-md
                text-md text-slate-100 font-semibold 
                dark:bg-slate-100/5 bg-neutral-900/25"
            type="submit"
            {...props}
        />
    );
};

export default Button;