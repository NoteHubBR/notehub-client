'use client';

import { Form } from '@/components/forms';
import { IconBook, IconFlame, IconNotes } from '@tabler/icons-react';
import { Layout } from './layout';
import { LowDetailUser, User } from '@/core';
import { Section } from '../Section';
import { Template } from '@/components/templates';
import { Toggle } from '@/components/buttons';
import { useParams } from 'next/navigation';
import { useRef } from 'react';
import { useUser } from '@/data/hooks';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    user: User | LowDetailUser;
    history: string[];
}

export const Header = ({ user, history, ...rest }: HeaderProps) => {

    const { user: currentUser } = useUser();

    const params = useParams<{ username: string }>();

    const triggerRef = useRef<HTMLButtonElement>(null);
    const childRef = useRef<HTMLFormElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    if (user) return (
        <header {...rest}>
            <Section className="overflow-hidden">
                <Layout.Banner user={user} history={history} />
                <div className="pr-4 inlg:pr-2 pl-36 inlg:pl-32 flex items-center gap-6 inlg:gap-1 justify-between">
                    <Layout.Nav>
                        <Layout.Li href={`/${user.username}`}><IconBook />Visão Geral</Layout.Li>
                        <Layout.Li href={`/${user.username}/notes`}><IconNotes />Notas</Layout.Li>
                        <Layout.Li href={`/${user.username}/flames`}><IconFlame fill="#7c3aed" color="#7c3aed" />Chamas</Layout.Li>
                    </Layout.Nav>
                    {currentUser && params.username === currentUser.username
                        ?
                        <>
                            <Layout.Link ref={triggerRef}>Editar</Layout.Link>
                            <Template.Portal triggerRef={triggerRef} childRef={childRef} closeRef={closeRef}>
                                <Form.Update ref={childRef} closeRef={closeRef} />
                            </Template.Portal>
                        </>
                        : currentUser && <Toggle.Follow user={user} useText className="!m-0" />
                    }
                </div>
            </Section>
        </header>
    )

}