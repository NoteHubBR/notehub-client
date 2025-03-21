import { Input } from "./elements/Input";
import Image from "next/image";
import Link from "next/link";

export const Navbar = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <nav
      className="sticky top-0 z-[997]
      w-screen max-w-full h-[8vh] inmd:h-[8svh] p-4
      flex items-center justify-between gap-4
      dark:bg-neutral-950 bg-neutral-50"
      {...props}
    >
      <div className="pl-2 flex gap-4 w-fit">
        <Link href={'/'} className="flex items-center justify-center">
          <Image src={'/imgs/logo.png'} width={99} height={0} alt="Logo" className="px-2" />
        </Link>
      </div>
      <Input type="text" placeholder="Pesquisar" />
      <div className="pr-2 flex items-center justify-center gap-8 w-fit">
        <Link href={'/explore'} className="underline-onhover font-semibold hover:text-violet-600 transition-colors">Explorar</Link>
        <Link href={'/signin'} className="underline-onhover font-semibold hover:text-violet-600 transition-colors">Entrar</Link>
      </div>
    </nav>
  )
}