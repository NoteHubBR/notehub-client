interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: React.ElementType;
    title: string;
    desc: string;
}

export const Dialog = ({ icon: Icon, title, desc, ...rest }: DialogProps) => {
    return (
        <>
            <figure className="w-fit p-2 border-2 dark:border-light/25 border-dark/25 rounded-full" {...rest}>
                <Icon size={33} className="dark:text-light/25 text-dark/25" />
            </figure>
            <div role="dialog" aria-labelledby="dialogTitle" aria-describedby="dialogDesc">
                <h2 id="dialogTitle" className="text-lg dark:text-lighter/75 text-darker/75">
                    {title}
                </h2>
                <p id="dialogDesc" className="text-sm dark:text-lighter/50 text-darker/50">
                    {desc}
                </p>
            </div>
        </>
    )
}