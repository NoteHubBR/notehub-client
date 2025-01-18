'use client';

import { Field } from "./elements/Field";
import { FollowingScope } from "./elements/FollowingScope";
import { IconArrowRight, IconCompass, IconFlame, IconHome, IconNotes, IconPlus, IconUserCircle, IconUsers } from "@tabler/icons-react";
import { Link } from "./elements/Link";
import { NotesScope } from "./elements/NotesScope";
import { Section } from "./elements/Section";
import { Shortcut } from "./elements/Shortcut";
import { shouldUseUserContext } from "@/core";
import { useLoading, useUser } from "@/data/hooks";
import { usePathname } from "next/navigation";

export const Sidebar = (props: React.HTMLAttributes<HTMLDivElement>) => {

    const pathname = usePathname();

    const shouldRender = shouldUseUserContext(pathname);

    const { isLoaded } = useLoading();

    const { store: { isMenuOpen }, user } = useUser();

    if (!isLoaded || !shouldRender || !user) return null;

    const Minimized = () => {
        return (
            <aside className="
                fixed 
                w-[88px] h-[92vh] inmd:h-[92svh] p-2 
                flex flex-col gap-2 
                dark:bg-neutral-900 bg-neutral-50
            ">
                <Shortcut href="/" icon={<IconHome size={27} />} text="Início" />
                <Shortcut href={`/${user.username}`} icon={<IconUserCircle size={27} />} text="Você" />
                <Shortcut href={`/${user.username}/following`} icon={<IconUsers size={27} />} text="Seguindo" />
                <Shortcut href="/explore" icon={<IconCompass size={27} />} text="Explorar" />
            </aside>
        )
    }

    const Maximized = () => {
        return (
            <aside className="
                fixed overflow-y-auto scrollbar 
                w-[240px] h-[92vh] inmd:h-[92svh] p-4 
                flex flex-col gap-3 
                dark:bg-neutral-900 bg-neutral-50
            " {...props}
            >
                <Section>
                    <Field href={'/'}>
                        <Link href={'/'} icon={<IconHome size={27} />} text="Início" strong />
                    </Field>
                </Section>
                <Section>
                    <Field href={`/${user.username}`}>
                        <Link href={`/${user.username}`} icon={<IconArrowRight size={20} />} text="Você" strong reverse />
                    </Field>
                    <Field href={`/${user.username}/notes`}>
                        <Link href={`/${user.username}/notes`} icon={<IconNotes size={27} />} text="Suas notas" />
                    </Field>
                    <Field href={`/${user.username}/flames`}>
                        <Link href={`/${user.username}/flames`} icon={<IconFlame size={27} />} text="Notas com &quot;chama&quot;" />
                    </Field>
                </Section>
                <Section>
                    <Field href={`/${user.username}/following`}>
                        <Link href={`/${user.username}/following`} text="Seguindo" strong reverse />
                    </Field>
                    <FollowingScope />
                </Section>
                <Section>
                    <Field href={'/new'}>
                        <Link href={'/new'} icon={<IconPlus size={24} />} text="Nova nota" strong />
                    </Field>
                    <NotesScope />
                </Section>
            </aside>
        )
    }

    return <>{isMenuOpen ? <Maximized /> : <Minimized />}</>;

}