'use client';

import { Bell } from "./elements/Bell";
import { Button } from "./elements/Button";
import { IconPlus } from "@tabler/icons-react";
import { Input } from "./elements/Input";
import { Menu } from "./elements/Menu";
import { Picture } from "./elements/Picture";
import { shouldUseUserContext } from "@/core";
import { useLoading, useUser } from "@/data/hooks"
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {

    const pathname = usePathname();

    const shouldRender = shouldUseUserContext(pathname);

    const { isLoaded } = useLoading();

    const { user } = useUser();
    
    if (!isLoaded || !shouldRender) return null;

    return (
        <nav className="
            sticky top-0 
            w-screen max-w-full h-[8vh] inmd:h-[8svh] p-4 
            flex items-center justify-between gap-4 
            dark:bg-neutral-900 bg-neutral-50
        ">
            {user
                ?
                <>
                    <div className="pl-2 flex gap-4 w-fit">
                        <Menu />
                        <Link href={'/'}><Image src={'/imgs/logo.png'} width={125} height={0} alt="Logo" className="px-2" /></Link>
                    </div>
                    <div>
                        <Input type="text" placeholder="Pesquisar" required />
                    </div>
                    <div className="pr-2 flex gap-4 w-fit">
                        <Button tooltip="Criar nova nota"><Link href={'/'}><IconPlus size={27} /></Link></Button>
                        <Button tooltip="Ver notificações"><Bell user={user} /></Button>
                        <Button><Picture user={user} /></Button>
                    </div>
                </>
                :
                <>
                    <div className="pl-2 flex gap-4 w-fit">
                        <Link href={'/'}><Image src={'/imgs/logo.png'} width={125} height={0} alt="Logo" className="px-2" /></Link>
                    </div>
                    <div>
                        <Input type="text" placeholder="Pesquisar" required />
                    </div>
                    <div className="pr-2 flex gap-8 w-fit">
                        <Link href={'/x'} className="resize-btn font-semibold">Explorar</Link>
                        <Link href={'/signin'} className="resize-btn font-semibold">Entrar</Link>
                        <Link href={'/signup'} className="resize-btn font-semibold">Cadastrar</Link>
                    </div>
                </>
            }
        </nav>
    )

}