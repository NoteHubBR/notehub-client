import { Icon } from "@/components/icons";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
    isPending: boolean;
}

export const Footer = ({ isPending, ...rest }: FooterProps) => (
    <footer className="w-full py-6" {...rest}>
        <Icon.Loading hidden={!isPending} size={50} />
    </footer>
)