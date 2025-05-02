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
        className="py-6
        rounded flex flex-1 items-center justify-center gap-3 
        dark:bg-dark bg-light
        dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm"
        {...rest}
    >
        <figure className="w-fit">
            <Icon size={50} className="dark:text-neutral-500 text-neutral-400" />
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