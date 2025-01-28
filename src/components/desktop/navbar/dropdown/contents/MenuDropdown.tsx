import { Field } from '../elements/Field';
import { Header } from '../elements/Header';
import { IconBrandGithub, IconBrandGoogleFilled, IconHelp, IconLogout, IconMessageReport, IconMoon, IconSettings, IconUsers } from '@tabler/icons-react';
import { Picture } from '../../elements/Picture';
import { Section } from '../elements/Section';
import { User } from '@/core';

export const MenuDropdown = ({ user }: { user: User }) => {
    return (
        <>
            <Section>
                <Header user={user}>
                    <Picture user={user} size={50} className="self-start" />
                </Header>
            </Section>
            <Section>
                <Field.Link href={'https://myaccount.google.com'} target="_blank" text="Conta do Google"><IconBrandGoogleFilled size={20} /></Field.Link>
                <Field.Link href={'https://github.com/settings/admin'} target="_blank" text="Conta do GitHub"><IconBrandGithub size={20} /></Field.Link>
                <Field.Button text="Mudar de conta" useChevron><IconUsers /></Field.Button>
                <Field.Button text="Sair"><IconLogout /></Field.Button>
            </Section>
            <Section>
                <Field.Button text="Aparência: escura" useChevron><IconMoon /></Field.Button>
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