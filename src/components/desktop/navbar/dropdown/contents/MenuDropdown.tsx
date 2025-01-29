import { ChangeThemeDropdown } from './options/ChangeTheme';
import { Field } from '../elements/Field';
import { Header } from '../elements/Header';
import { IconBrandGithub, IconBrandGoogleFilled, IconHelp, IconLogout, IconMessageReport, IconSettings, IconUsers, IconYinYangFilled } from '@tabler/icons-react';
import { Picture } from '../../elements/Picture';
import { Section } from '../elements/Section';
import { User } from '@/core';
import { useState } from 'react';
import { useUser } from '@/data/hooks';

export const MenuDropdown = ({ user }: { user: User }) => {

    const { store: { isDarkModeUser }, clearUser } = useUser();

    const [isChangingTheme, setIsChangingTheme] = useState<boolean>(false);

    if (isChangingTheme) return <ChangeThemeDropdown setterToClose={() => { return setIsChangingTheme(false) }} />

    return (
        <>
            <Header user={user}>
                <Picture user={user} size={50} className="self-start" />
            </Header>
            <Section>
                {user.host === 'Google' &&
                    <Field.Link href={'https://myaccount.google.com'} target="_blank" text="Conta do Google">
                        <IconBrandGoogleFilled size={20} />
                    </Field.Link>
                }
                {user.host === 'GitHub' &&
                    <Field.Link href={'https://github.com/settings/admin'} target="_blank" text="Conta do GitHub">
                        <IconBrandGithub size={20} />
                    </Field.Link>
                }
                {/*                 
                    Carregar contas armazenadas na store em um sub dropdown
                    <Field.Button text="Mudar de conta" useChevron><IconUsers /></Field.Button> 
                */}
                <Field.Link href={'/signin'} text="Mudar de conta"><IconUsers /></Field.Link>
                <Field.Button text="Sair" onClick={clearUser}><IconLogout /></Field.Button>
            </Section>
            <Section>
                <Field.Button
                    text={`Aparência: ${isDarkModeUser ? 'escura' : ' clara'}`} useChevron
                    onClick={() => setIsChangingTheme(true)}
                >
                    <IconYinYangFilled />
                </Field.Button>
                <Field.Button text="Configurações"><IconSettings /></Field.Button>
            </Section>
            <Section>
                <a href="mailto:suporte@xisyz.xyz" className="w-full">
                    <Field.Button text="Ajuda"><IconHelp /></Field.Button>
                </a>
                <a href="mailto:contato@xisyz.xyz" className="w-full">
                    <Field.Button text="Enviar feedback"><IconMessageReport /></Field.Button>
                </a>
            </Section>
        </>
    )

}