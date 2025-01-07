'use client';

import { Button } from "./elements/Button";
import { Field } from "./elements/Field";
import { IconArrowRight, IconChevronDown, IconFlame, IconHome, IconNotes, IconPlus, IconUserCircle, IconUsers } from "@tabler/icons-react";
import { Input } from "./elements/Input";
import { Link } from "./elements/Link";
import { Note } from "./elements/Note";
import { Section } from "./elements/Section";
import { Shortcut } from "./elements/Shortcut";
import { useMenu } from "@/data/hooks";
import { User } from "./elements/User";

export const Sidebar = (props: React.HTMLAttributes<HTMLDivElement>) => {

    const { isOpen } = useMenu();

    const Minimized = () => {
        return (
            <aside className="overflow-y-scroll w-fit h-screen inmd:h-svh p-2 flex flex-col bg-neutral-900">
                <Shortcut href="/" icon={<IconHome size={27} />} text="Início" />
                <Shortcut href="/" icon={<IconUserCircle size={27} />} text="Você" />
                <Shortcut href="/" icon={<IconNotes size={27} />} text="Notas" />
                <Shortcut href="/" icon={<IconUsers size={27} />} text="Seguindo" />
            </aside>
        )
    }

    const Maximized = () => {
        return (
            <aside className="overflow-y-scroll w-fit h-screen inmd:h-svh p-4 flex flex-col gap-3 bg-neutral-900" {...props} >
                <Section>
                    <Field><Link href={'/'} icon={<IconHome size={27} />} text="Início" strong /></Field>
                </Section>
                <Section>
                    <Field><Link href={'/'} icon={<IconArrowRight size={20} />} text="Você" strong reverse /></Field>
                    <Field><Link href={'/'} icon={<IconNotes size={27} />} text="Suas notas" /></Field>
                    <Field><Link href={'/'} icon={<IconFlame size={27} />} text="Notas com &quot;chama&quot;" /></Field>
                </Section>
                <Section>
                    <Field><Link href={'/'} text="Seguindo" strong reverse /></Field>
                    <Field><User avatar="/imgs/avatar.png" username="Lucas Aguiar de Moraes" /></Field>
                    <Field><Button icon={<IconChevronDown size={27} />} text="Mostrar mais" /></Field>
                </Section>
                <Section>
                    <Field><Link href={'/'} icon={<IconPlus size={24} />} text="Nova nota" strong /></Field>
                    <Input type="text" required />
                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>

                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>
                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>
                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>
                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>
                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>
                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>
                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>
                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>
                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>
                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>
                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>
                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>
                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>
                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>
                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>
                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>
                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>
                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>
                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>
                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>
                    <Field><Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" /></Field>

                    <Button text="Mostrar mais" className="w-fit flex items-center gap-3 py-1 cursor-pointer hover:text-violet-500 transition-colors" />
                </Section>
            </aside>
        )
    }

    return <>{isOpen ? <Maximized /> : <Minimized />}</>

}