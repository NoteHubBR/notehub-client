import { Bell } from "./elements/Bell";
import { BellDropdown } from "./dropdown/contents/BellDropdown";
import { Button } from "./elements/Button";
import { Component } from "@/components";
import { Dropdown } from "./dropdown";
import { IconPlus } from "@tabler/icons-react";
import { Input } from "./elements/Input";
import { Menu } from "./elements/Menu";
import { MenuDropdown } from "./dropdown/contents/MenuDropdown";
import { User } from "@/core";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = ({ user, ...rest }: { user: User } & React.HTMLAttributes<HTMLElement>) => {
    const menuButton = useRef<HTMLButtonElement>(null);
    const bellButton = useRef<HTMLButtonElement>(null);
    return (
        <nav
            className="sticky top-0 z-[997]
            w-screen max-w-full h-[8vh] inmd:h-[8svh] p-4
            flex items-center justify-between gap-4
            dark:bg-darker bg-lighter"
            {...rest}
        >
            <div className="pl-2 flex gap-4 w-fit">
                <Menu />
                <Link href={'/'} className="flex items-center justify-center">
                    <Image src={'/imgs/logo.png'} width={99} height={0} alt="Logo" className="px-2" />
                </Link>
            </div>
            <Input type="text" placeholder="Pesquisar" />
            <div className="pr-2 flex gap-4 w-fit">
                <Button tooltip="Criar nova nota"><Link href={'/'}><IconPlus size={27} /></Link></Button>
                <Button ref={bellButton} tooltip="Ver notificações">
                    <Bell />
                    <Dropdown buttonRef={bellButton}><BellDropdown /></Dropdown>
                </Button>
                <Button ref={menuButton}>
                    <Component.Photo user={user} size={27} />
                    <Dropdown buttonRef={menuButton} ><MenuDropdown user={user} /></Dropdown>
                </Button>
            </div>
        </nav>
    )
}