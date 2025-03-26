import { Button } from "../desktop/layout/Button";
import { Form } from "@/components/forms/update";
import { IconBook, IconEdit, IconFlame, IconNotes } from "@tabler/icons-react";
import { Layout } from "./layout";
import { LowDetailUser, User } from "@/core";
import { Photo } from "@/components/Photo";
import { PicturePortal } from "@/components/PicturePortal";
import { Portal } from "@/components/template/Portal";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { useUser } from "@/data/hooks";

export const Header = ({ user, ...rest }: { user: User | LowDetailUser } & React.HTMLAttributes<HTMLElement>) => {

    const { user: currentUser } = useUser();

    const params = useParams<{ username: string }>();

    const photoRef = useRef<HTMLImageElement>(null);
    const upscaledPhotoRef = useRef<HTMLImageElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const childRef = useRef<HTMLFormElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    const isCurrentUserProfile = currentUser && currentUser.username === params.username;

    return (
        <header
            style={{ backgroundImage: `url('${user.banner ?? '/imgs/banner.png'}')` }}
            className="relative py-5 bg-cover bg-no-repeat bg-center"
            {...rest}
        >
            <div className="pointer-events-none absolute inset-0 dark:bg-d-gradient bg-l-gradient" />
            <section className="relative z-10 flex flex-col items-center gap-3 ">
                <Photo ref={photoRef} user={user} size={111} className="cursor-pointer drop-shadow-alpha-d-sm" />
                <Portal triggerRef={photoRef} childRef={upscaledPhotoRef} useDefaultClose>
                    <PicturePortal ref={upscaledPhotoRef} user={user} size={270} className="rounded-full" />
                </Portal>
                <div className="w-full px-3 overflow-hidden flex items-center justify-center gap-3">
                    <Layout.Title>{user.display_name}</Layout.Title>
                    {isCurrentUserProfile &&
                        <>
                            <Layout.Link ref={triggerRef}>
                                <IconEdit size={20} />
                            </Layout.Link>
                            <Portal triggerRef={triggerRef} childRef={childRef} closeRef={closeRef}>
                                <Form ref={childRef} closeRef={closeRef} />
                            </Portal>
                        </>
                    }
                </div>
                {!isCurrentUserProfile && <Button user={user} />}
                <Layout.Nav>
                    <Layout.Li href={`/${user.username}`}><IconBook size={30} /></Layout.Li>
                    <Layout.Li href={`/${user.username}/notes`}><IconNotes size={30} /></Layout.Li>
                    <Layout.Li href={`/${user.username}/flames`}><IconFlame size={30} /></Layout.Li>
                </Layout.Nav>
            </section>
        </header>
    )

}