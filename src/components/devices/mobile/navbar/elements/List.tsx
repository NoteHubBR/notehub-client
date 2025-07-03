export const List: React.FC<React.HTMLAttributes<HTMLUListElement>> = ({ children, ...rest }) => (
    <ul
        className="w-full h-full px-2 flex items-center justify-between insm:justify-between"
        {...rest}
    >
        {children}
    </ul>
)