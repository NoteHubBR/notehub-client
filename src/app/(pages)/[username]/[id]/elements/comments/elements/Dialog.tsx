import Link from "next/link";

export const Dialog = ({ children, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        role="dialog"
        aria-describedby="dialogMsg"
        className="w-full px-2 py-8"
        {...rest}
    >
        <p id="dialogMsg" className="text-center">
            {children}
            <Link
                href={"/signin"}
                className="p-1 font-medium text-primary request-btn"
            >
                Faça login.
            </Link>
        </p>
    </div>
)