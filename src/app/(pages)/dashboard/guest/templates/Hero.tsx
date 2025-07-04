export const Hero = ({ children, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className="flex items-center justify-center" {...rest}>
        {children}
    </div>
)