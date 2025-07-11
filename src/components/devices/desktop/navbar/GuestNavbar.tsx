import { clsx } from "clsx";
import { Icon } from "@/components/icons";
import { Input } from "./elements/Input";
import { Toggle } from "@/components/buttons";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Navbar = (props: React.HTMLAttributes<HTMLElement>) => {

  const pathname = usePathname();

  const onRoot = pathname === "/" || pathname === "/dashboard";

  return (
    <nav
      className={clsx(
        'z-[997]',
        'top-0 left-0',
        'w-screen max-w-full h-[8vh] inmd:h-[8svh] p-4',
        'flex items-center justify-between gap-4',
        onRoot ? 'absolute' : 'sticky',
        onRoot ? 'bg-transparent' : 'dark:bg-darker bg:lighter'
      )}
      {...props}
    >
      <div className="pl-2 flex gap-4 w-fit">
        <Link href="/" className="flex items-center justify-center">
          <Icon.Logo width={99} height={0} className="px-2" />
        </Link>
      </div>
      <Input type="text" placeholder="Pesquisar" />
      <div className="pr-2 flex items-center justify-center gap-6 w-fit">
        <Toggle.Theme />
        <Link href="/search" className="group opaque-button bg-middark after:bg-middark/50">
          <span className="inline-block group-hover:scale-[0.85] transition-transform duration-300">
            Explorar
          </span>
        </Link>
        <Link href="/signin" className="group gradient-button">
          <span className="inline-block group-hover:scale-[0.85] transition-transform duration-300">
            Entrar
          </span>
        </Link>
      </div>
    </nav>
  )

}