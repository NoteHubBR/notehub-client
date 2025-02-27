export const Nav = (props: React.HTMLAttributes<HTMLUListElement>) => {
    return (
        <nav>
            <ul className="flex items-center gap-6 inlg:gap-1" {...props} />
        </nav>
    )
}