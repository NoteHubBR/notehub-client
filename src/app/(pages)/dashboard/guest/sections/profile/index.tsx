import { Component } from "@/components";
import { Edit, Li, Nav, Title } from "./elements";
import { IconBook, IconEdit, IconFlame, IconNotes } from "@tabler/icons-react";
import { useState } from "react";

export const Profile = (props: React.HTMLAttributes<HTMLDivElement>) => {

    const [active, setActive] = useState<number>(0);

    return (
        <div
            style={{ backgroundImage: 'url(/imgs/athame.png)' }}
            className="relative py-10 bg-cover bg-no-repeat bg-center"
            {...props}
        >
            <div className="pointer-events-none absolute inset-0 dark:bg-d-gradient bg-l-gradient" />
            <section className="relative z-10 flex flex-col items-center gap-3">
                <Component.Mock src="/imgs/luazul.png" size={111} className="cursor-pointer drop-shadow-alpha-d-sm" />
                <div className="w-full px-3 flex items-center justify-center gap-3">
                    <Title>Lua Azul</Title>
                    <Edit icon={IconEdit} tooltip="Editar" />
                </div>
                <Nav>
                    <Li index={0} active={active} setActive={setActive} icon={IconBook} tooltip="Visão geral" />
                    <Li index={1} active={active} setActive={setActive} icon={IconNotes} tooltip="Notas" />
                    <Li index={2} active={active} setActive={setActive} icon={IconFlame} tooltip="Chamas" />
                </Nav>
            </section >
        </div >
    )

}