export const List: React.FC<React.HTMLAttributes<HTMLUListElement>> = ({ children, ...rest }) => {

    return (
        <ul
            className="px-2 flex items-center justify-evenly insm:justify-between"
            {...rest}
        >
            {children}
        </ul>
    )

}