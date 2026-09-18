import { Icon } from "@/components/icons";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
    isPending: boolean;
}

export const Footer = ({ isPending, ...rest }: FooterProps) => {
    if (isPending) return (
        <footer className="w-full pt-4" {...rest}>
            <Icon.Loading size={50} />
        </footer>
    )
}