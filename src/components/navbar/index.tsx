'use client'

import { Bell } from "./elements/Bell";
import { Button } from "./elements/Button";
import { Menu } from "./elements/Menu";
import { Picture } from "./elements/Picture";
import { useUser } from "@/data/hooks"
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {

    const { user } = useUser();

    return (
        <nav className="sticky w-screen max-w-full p-4 flex items-center justify-between gap-4 bg-neutral-900">
            {user &&
                <>
                    <div className="pl-2 flex gap-4 w-fit">
                        <Menu />
                        <Link href={'/'}><Image src={'/imgs/logo.png'} width={100} height={0} alt="Logo" className="px-2" /></Link>
                    </div>
                    <div className="flex gap-4 w-fit">
                        <Button tooltip="Ver notificações"><Bell user={user} /></Button>
                        <Button><Picture user={user} /></Button>
                    </div>
                </>
            }
        </nav>
    )

}