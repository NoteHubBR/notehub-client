interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: React.ElementType;
    title: string;
    desc: string;
}

export const Dialog = ({ icon: Icon, title, desc, ...rest }: DialogProps) => (
    <div
        role="dialog"
        aria-labelledby="dialogTitle"
        aria-describedby="dialogDesc"
        className="flex flex-1 items-center justify-center gap-3"
        {...rest}
    >
        <figure className="w-fit p-2 border-2 dark:border-neutral-500 border-neutral-400 rounded-full">
            <Icon size={33} className="dark:text-neutral-500 text-neutral-400" />
        </figure>
        <section>
            <h2 id="dialogTitle" className="text-lg dark:text-lighter/75 text-darker/75">
                {title}
            </h2>
            <p id="dialogDesc" className="text-sm dark:text-lighter/50 text-darker/50">
                {desc}
            </p>
        </section>
    </div>
)