import { ChangeThemeDropdown } from './options/ChangeTheme';
import { Component } from '@/components';
import { Field } from '../elements/Field';
import { Header } from '../elements/Header';
import { IconHelp, IconLogout, IconMessageReport, IconSettings, IconUsers, IconYinYangFilled } from '@tabler/icons-react';
import { Section } from '../elements/Section';
import { usePref, useUser } from '@/data/hooks';
import { User } from '@/core';
import { useState } from 'react';

export const MenuDropdown = ({ user }: { user: User }) => {

    const { pref: { useDarkTheme } } = usePref();

    const { clearUser } = useUser();

    const [isChangingTheme, setIsChangingTheme] = useState<boolean>(false);

    if (isChangingTheme) return <ChangeThemeDropdown setterToClose={() => { return setIsChangingTheme(false) }} />

    return (
        <div className='w-[300px]'>
            <Header user={user}>
                <Component.Photo user={user} size={50} className="self-start" />
            </Header>
            <Section>
                <Field.Link href={'/signin'} text="Mudar de conta"><IconUsers /></Field.Link>
                <Field.Button text="Sair" onClick={() => clearUser()}><IconLogout /></Field.Button>
            </Section>
            <Section>
                <Field.Button
                    text={`Aparência: ${useDarkTheme ? 'escura' : ' clara'}`} useChevron
                    onClick={() => setIsChangingTheme(true)}
                >
                    <IconYinYangFilled />
                </Field.Button>
                <Field.Link href={'/settings/account'} text="Configurações"><IconSettings /></Field.Link>
            </Section>
            <Section>
                <Field.Link href="/help" text="Ajuda">
                    <IconHelp />
                </Field.Link>
                <Field.Link href="mailto:contato@notehub.com.br" text="Enviar feedback">
                    <IconMessageReport />
                </Field.Link>
            </Section>
        </div>
    )

}