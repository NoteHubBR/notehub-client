import Link from "next/link";

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
    useLoginLink?: boolean;
}

export const Dialog = ({ useLoginLink, children, ...rest }: DialogProps) => (
    <div
        id="comment-wrapper"
        role="dialog"
        aria-describedby="dialogMsg"
        className="scroll-mt-[8vh] inmd:scroll-mt-0 w-full px-2 py-8"
        {...rest}
    >
        <p id="dialogMsg" className="text-center">
            {children}
            {useLoginLink &&
                <Link
                    href={"/signin"}
                    className="p-1 font-medium text-primary request-btn"
                >
                    Faça login.
                </Link>
            }
        </p>
    </div>
)