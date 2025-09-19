import Link, { LinkProps } from "next/link";

interface ChangeProps extends Omit<LinkProps, 'href'> {
    toId: string;
    children: React.ReactNode;
}

export const Change = ({ toId, children, ...rest }: ChangeProps) => {

    const handleClick = (): void => {
        const element = document.getElementById(toId);
        if (element) return element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
    }

    return (
        <Link
            href='/changelog'
            onClick={handleClick}
            className="font-medium text-sm hover:underline hover:text-secondary"
            {...rest}
        >
            {children}
        </Link>
    )

}