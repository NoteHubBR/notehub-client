'use client';

import { Form } from '@/components/forms/update';
import { IconBook, IconFlame, IconNotes } from '@tabler/icons-react';
import { Layout } from './layout';
import { LowDetailUser, User } from '@/core';
import { Portal } from '@/components/template/Portal';
import { Section } from '../Section';
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

    const buttonRef = useRef<HTMLButtonElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const closeFormButtonRef = useRef<HTMLButtonElement>(null);

    if (user) return (
        <header {...rest}>
            <Section className='overflow-hidden mb-4'>
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
                            <Layout.Link ref={buttonRef}>Editar</Layout.Link>
                            <Portal refElement={buttonRef} refChild={formRef} refChildCloseButton={closeFormButtonRef}>
                                <Form ref={formRef} headerRef={closeFormButtonRef} />
                            </Portal>
                        </>
                        : <Layout.Button user={user} />
                    }
                </div>
            </Section>
        </header>
    )

}