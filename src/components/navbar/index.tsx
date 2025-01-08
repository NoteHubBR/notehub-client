'use client';

import { Bell } from "./elements/Bell";
import { Button } from "./elements/Button";
import { IconPlus } from "@tabler/icons-react";
import { Menu } from "./elements/Menu";
import { Picture } from "./elements/Picture";
import { shouldUseUserContext } from "@/core";
import { usePathname } from "next/navigation";
import { useUser } from "@/data/hooks"
import Image from "next/image";
import Link from "next/link";
import { Input } from "./elements/Input";

export const Navbar = () => {

    const pathname = usePathname();

    const shouldRender = shouldUseUserContext(pathname);

    const { user } = useUser();

    return (
        <>
            {shouldRender &&
                <nav className="sticky top-0 w-screen max-w-full p-4 flex items-center justify-between gap-4 bg-neutral-900">
                    {user &&
                        <>
                            <div className="pl-2 flex gap-4 w-fit">
                                <Menu />
                                <Link href={'/'}><Image src={'/imgs/logo.png'} width={125} height={0} alt="Logo" className="px-2" /></Link>
                            </div>
                            <div>
                                <Input type="text" required/>
                            </div>
                            <div className="pr-2 flex gap-4 w-fit">
                                <Button tooltip="Criar nova nota"><Link href={'/'}><IconPlus size={27} /></Link></Button>
                                <Button tooltip="Ver notificações"><Bell user={user} /></Button>
                                <Button><Picture user={user} /></Button>
                            </div>
                        </>
                    }
                </nav>
            }
        </>
    )

}