interface MainProps extends React.HTMLAttributes<HTMLElement> {
    onPathname: boolean;
}

export const Main = ({ onPathname, children, ...rest }: MainProps) => {

    if (!onPathname) return (
        <main
            className="w-1/2 inlg:w-full p-4
            border-l inmd:border-none dark:border-middark border-midlight"
            {...rest}
        >
            {children}
        </main>
    )

}