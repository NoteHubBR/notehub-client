import { Icon } from "@/components/icons";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
    isPending: boolean;
}

export const Footer = ({ isPending, ...rest }: FooterProps) => {
    if (isPending) return (
        <footer className="w-full py-6" {...rest}>
            <Icon.Loading size={50} />
        </footer>
    )
}