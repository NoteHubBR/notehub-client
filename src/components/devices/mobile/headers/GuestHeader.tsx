import { clsx } from "clsx";
import { Icon } from "@/components/icons";
import { Toggle } from "@/components/buttons";
import { usePathname } from "next/navigation";

export const Header = (props: React.HTMLAttributes<HTMLElement>) => {

    const pathname = usePathname();
    const onRoot = pathname === "/" || pathname === "/dashboard";

    return (
        <header
            className={clsx(
                'z-[997] top-0 left-0',
                'w-full py-2 px-4',
                'flex items-center justify-end gap-4',
                onRoot ? 'absolute' : 'static',
                onRoot ? 'bg-transparent' : 'dark:bg-darker bg-lighter'
            )}
            {...props}
        >
            <Icon.Logo width={77} height={0} className="mr-auto" />
            <Toggle.Theme />
        </header>
    )

}