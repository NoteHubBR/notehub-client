import { Field } from "../../elements/Field";
import { IconCheck } from "@tabler/icons-react";
import { OptionHeader } from "../../elements/OptionHeader";
import { Section } from "../../elements/Section";
import { useUser } from "@/data/hooks";

interface ChangeThemeProps {
    setterToClose: () => void;
}

export const ChangeThemeDropdown = ({ setterToClose }: ChangeThemeProps) => {

    const { store: { isDarkModeUser }, setStore } = useUser();

    return (
        <>
            <OptionHeader title="Aparência" onClick={setterToClose} />
            <Section>
                <Field.Button text='Tema escuro' onClick={() => setStore({ isDarkModeUser: true })}>
                    <IconCheck className={`${isDarkModeUser ? '' : 'invisible'}`} />
                </Field.Button>
                <Field.Button text='Tema claro' onClick={() => setStore({ isDarkModeUser: false })}>
                    <IconCheck className={`${isDarkModeUser ? 'invisible' : ''}`} />
                </Field.Button>
            </Section>
        </>
    )

}