'use client';

import { IconBook, IconFlame, IconNotes } from '@tabler/icons-react';
import { Layout } from '../layout';
import { Section } from '../Section';
import { useUser } from '@/data/hooks';

export const Header = (props: React.HTMLAttributes<HTMLHeadingElement>) => {

    const { user } = useUser();

    if (!user) return null;

    return (
        <header {...props}>
            <Section className='overflow-hidden mb-4'>
                <Layout.Cover user={user} />
                <div className="pr-4 inlg:pr-2 pl-36 inlg:pl-32 flex items-center gap-6 inlg:gap-1 justify-between">
                    <Layout.Nav>
                        <Layout.Li href={`/${user.username}`}><IconBook />Visão Geral</Layout.Li>
                        <Layout.Li href={`/${user.username}/notes`}><IconNotes />Notas</Layout.Li>
                        <Layout.Li href={`/${user.username}/flames`}><IconFlame fill="#7c3aed" color="#7c3aed" />Chamas</Layout.Li>
                    </Layout.Nav>
                    <Layout.Button isFollowing={true} />
                </div>
            </Section>
        </header>
    )

}