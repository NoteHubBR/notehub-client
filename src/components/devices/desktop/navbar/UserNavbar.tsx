import { Bell } from "./elements/Bell";
import { BellDropdown } from "./dropdown/contents/BellDropdown";
import { Button } from "./elements/Button";
import { Dropdown } from "./dropdown";
import { Icon } from "@/components/icons";
import { IconPlus } from "@tabler/icons-react";
import { Input } from "./elements/Input";
import { Menu } from "./elements/Menu";
import { MenuDropdown } from "./dropdown/contents/MenuDropdown";
import { Photo } from "@/components";
import { User } from "@/core";
import { useRef } from "react";
import Link from "next/link";

export const Navbar = ({ user, ...rest }: { user: User } & React.HTMLAttributes<HTMLElement>) => {
    const menuButton = useRef<HTMLButtonElement>(null);
    const bellButton = useRef<HTMLButtonElement>(null);
    return (
        <nav
            aria-label='Navegação principal'
            className="sticky top-0 z-[997]
            w-screen max-w-full h-[8vh] inmd:h-[8svh] p-4
            flex items-center justify-between gap-4
            dark:bg-darker bg-lighter"
            {...rest}
        >
            <div className="pl-2 flex gap-4 w-fit">
                <Menu aria-label='Abrir menu' />
                <Link aria-label='Início' href={'/'} className="flex items-center justify-center">
                    <Icon.Logo width={99} height={0} className="px-2" />
                </Link>
            </div>
            <Input type="text" placeholder="Pesquisar" />
            <div className="pr-2 flex gap-4 w-fit">
                <Button aria-label='Criar nota' tooltip="Criar nova nota">
                    <Link href={'/new'}><IconPlus size={27} /></Link>
                </Button>
                <Button aria-label='Ler notificações' ref={bellButton} tooltip="Ver notificações">
                    <Bell />
                    <Dropdown
                        role='list'
                        aria-label='Notificações'
                        buttonRef={bellButton}
                    >
                        <BellDropdown />
                    </Dropdown>
                </Button>
                <Button aria-label='Mais opções' ref={menuButton}>
                    <Photo user={user} size={27} />
                    <Dropdown
                        role='menu'
                        aria-label='Opções'
                        buttonRef={menuButton}
                    >
                        <MenuDropdown user={user} />
                    </Dropdown>
                </Button>
            </div>
        </nav>
    )
}