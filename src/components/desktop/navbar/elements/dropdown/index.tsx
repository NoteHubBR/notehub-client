import { Field } from "./elements/Field";
import { Header } from "./elements/Header";
import { IconBrandGithub, IconBrandGoogleFilled, IconHelp, IconLogout, IconMessageReport, IconMoon, IconSettings, IconUsers } from "@tabler/icons-react";
import { Picture } from "../Picture";
import { Section } from "./elements/Section";
import { User } from "@/core";

interface DropdownProps {
    user: User
}

export const Dropdown = ({ user }: DropdownProps) => {
    return (
        <div className="absolute top-full right-0 w-[300px] rounded-xl dark:bg-neutral-800 bg-neutral-200">
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
                <Field.Link href={'mailto:suporte@xisyz.xyz'} text="Ajuda"><IconHelp /></Field.Link>
                <Field.Link href={'mailto:contato@xisyz.xyz'} text="Enviar feedback"><IconMessageReport /></Field.Link>
            </Section>
        </div>
    )
}