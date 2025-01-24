import NextLink, { LinkProps as NextLinkProps } from "next/link";

interface LinkProps extends NextLinkProps {
    icon?: React.ReactNode;
    text: string;
    strong?: boolean;
    reverse?: boolean;
}

export const Link = (props: LinkProps) => {

    const { icon, text, strong, reverse, ...rest } = props;

    return (
        <NextLink className="py-1 px-2 flex items-center gap-3 "{...rest}>
            {!reverse
                ?
                <>
                    {icon && icon}
                    {strong
                        ?
                        <strong><span className="text-center text-md">{text}</span></strong>
                        :
                        <span className="text-center text-sm">{text}</span>
                    }
                </>
                :
                <>
                    {strong
                        ?
                        <strong><span className="text-center text-md">{text}</span></strong>
                        :
                        <span className="text-center text-sm">{text}</span>
                    }
                    {icon && icon}
                </>
            }
        </NextLink>
    )

}