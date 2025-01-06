import { Button } from "./elements/Button";
import { Field } from "./elements/Field";
import { FinderField } from "./elements/FinderField";
import { IconArrowRight, IconChevronDown, IconFlame, IconHome, IconNotes, IconUserCircle, IconUsers } from "@tabler/icons-react";
import { Link } from "./elements/Link";
import { Section } from "./elements/Section";
import { User } from "./elements/User";

export const Aside = (props: React.HTMLAttributes<HTMLDivElement>) => {

    const open = true;

    return (
        <>{open ?
            <aside className="w-fit p-2 flex flex-col gap-3 bg-neutral-900" {...props} >
                <Section>
                    <Field><Link href={'/'} icon={<IconHome size={27} />} text="Início" strong /></Field>
                </Section>
                <Section>
                    <Field><Link href={'/'} icon={<IconArrowRight size={20} />} text="Você" strong reverse /></Field>
                    <Field><Link href={'/'} icon={<IconNotes size={27} />} text="Suas notas" /></Field>
                    <Field><Link href={'/'} icon={<IconFlame size={27} />} text="Notas com &quot;chama&quot;" /></Field>
                </Section>
                <Section>
                    <Field><Link href={'/'} text="Seguindo" strong reverse /></Field>
                    <Field><User avatar="/imgs/avatar.png" username="Lucas Aguiar de Moraes" /></Field>
                    <Field><Button icon={<IconChevronDown size={27} />} text="Mostrar mais" /></Field>
                </Section>
                <Section>
                    <FinderField></FinderField>
                </Section>
            </aside>
            :
            <aside className="w-fit p-2 flex flex-col">
                <div className="flex flex-col items-center gap-1 py-3 px-1 hover:bg-neutral-50/15 rounded-xl transition-colors cursor-pointer">
                    <IconHome size={27} />
                    <span className="text-center text-sm">Início</span>
                </div>
                <div className="flex flex-col items-center gap-1 py-3 px-1 hover:bg-neutral-50/15 rounded-xl transition-colors cursor-pointer">
                    <IconUserCircle size={27} />
                    <span className="text-center text-sm">Você</span>
                </div>
                <div className="flex flex-col items-center gap-1 py-3 px-1 hover:bg-neutral-50/15 rounded-xl transition-colors cursor-pointer">
                    <IconNotes size={27} />
                    <span className="text-center text-sm">Notas</span>
                </div>
                <div className="flex flex-col items-center gap-1 py-3 px-1 hover:bg-neutral-50/15 rounded-xl transition-colors cursor-pointer">
                    <IconUsers size={27} />
                    <span className="text-center text-sm">Seguindo</span>
                </div>
            </aside>
        }</>
    )

}