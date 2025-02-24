import NextLink, { LinkProps } from "next/link";

export const Link = (props: LinkProps) => {
    return (
        <NextLink
            className="w-28 inlg:w-24 py-2 flex items-center justify-center
            rounded-3xl
            text-md inlg:text-sm font-medium
            dark:bg-white bg-black
            dark:text-black text-white
            hover:opacity-65
            transition-all duration-150"
            {...props}
        >
            Perfil
        </NextLink>
    )
}