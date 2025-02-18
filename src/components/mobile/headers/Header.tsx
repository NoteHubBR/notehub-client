import { useScreen } from "@/data/hooks"
import { IconBell, IconSearch } from "@tabler/icons-react"
import Image from "next/image"
import NextLink, { LinkProps } from "next/link"

export const Header = (props: React.HTMLAttributes<HTMLHeadingElement>) => {

    const { onMobile } = useScreen();

    const Link = ({ children, ...rest }: { children: React.ReactNode } & LinkProps) => {
        return (
            <NextLink
                className="p-1 rounded-full hover:dark:bg-neutral-50/10 hover:bg-neutral-900/10 transition-colors"
                {...rest}
            >
                {children}
            </NextLink>
        )
    }

    if (!onMobile) return null;

    return (
        <header
            className="py-2 px-4 flex items-center justify-end gap-4 dark:bg-neutral-900 bg-neutral-50"
            {...props}
        >
            <Image src={'/imgs/logo.png'} width={77} height={0} alt="Logo" className="mr-auto" />
            <Link href='/m/notifications'><IconBell/></Link>
            <Link href={'/m/search'}><IconSearch/></Link>
        </header>
    )

}