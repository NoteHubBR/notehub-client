'use client';

import { IconArrowRight, IconCompass, IconFlame, IconHome, IconNotes, IconPlus, IconUserCircle } from "@tabler/icons-react";
import { shouldUseUserContext, User } from "@/core";
import { Sidebar as Sb } from "./elements";
import { useLoading, useScreen, useStore, useUser } from "@/data/hooks";
import { usePathname } from "next/navigation";

const Minimized = ({ user }: { user: User }) => {
    return (
        <aside
            className="fixed
            w-[88px] h-[92vh] inmd:h-[92svh] p-2
            flex flex-col gap-2
            dark:bg-darker bg-lighter"
        >
            <Sb.Shortcut href="/" icon={<IconHome size={27} />} text="Início" />
            <Sb.Shortcut href={`/${user.username}`} icon={<IconUserCircle size={27} />} text="Você" />
            <Sb.Shortcut href={`/${user.username}/notes`} icon={<IconNotes size={27} />} text="Notas" />
            <Sb.Shortcut href="/explore" icon={<IconCompass size={27} />} text="Explorar" />
        </aside>
    )
}

const Maximized = ({ user, ...rest }: { user: User } & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <aside
            className="fixed overflow-y-auto scrollbar-desktop
            w-[240px] h-[92vh] inmd:h-[92svh] p-4
            flex flex-col gap-3
            dark:bg-darker bg-lighter"
            {...rest}
        >
            <Sb.Section>
                <Sb.Link href={'/'} icon={<IconHome size={27} />} text="Início" strong />
            </Sb.Section>
            <Sb.Section>
                <Sb.Link href={`/${user.username}`} icon={<IconArrowRight size={20} />} text="Você" strong reverse />
                <Sb.Link href={`/${user.username}/notes`} icon={<IconNotes size={27} />} text="Suas notas" />
                <Sb.Link href={`/${user.username}/flames`} icon={<IconFlame size={27} />} text="Notas com &quot;chama&quot;" />
            </Sb.Section>
            <Sb.Section>
                <Sb.Link href={`/${user.username}/following`} text="Seguindo" strong reverse />
                <Sb.FollowingScope />
            </Sb.Section>
            <Sb.Section>
                <Sb.Link href={'/new'} icon={<IconPlus size={24} />} text="Nova nota" strong />
                <Sb.NotesScope />
            </Sb.Section>
        </aside>
    )
}

export const Sidebar = () => {

    const pathname = usePathname();
    const shouldRender = shouldUseUserContext(pathname);

    const { onDesktop } = useScreen();
    const { isLoaded } = useLoading();
    const { isMenuOpen } = useStore();

    const { user } = useUser();

    if (!shouldRender || !onDesktop || !isLoaded || !user) return null;
    return <>{isMenuOpen(user) ? <Maximized user={user} /> : <Minimized user={user} />}</>;

}