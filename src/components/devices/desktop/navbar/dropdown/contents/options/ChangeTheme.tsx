import { Field } from "../../elements/Field";
import { IconCheck } from "@tabler/icons-react";
import { OptionHeader } from "../../elements/OptionHeader";
import { Section } from "../../elements/Section";
import { usePref } from "@/data/hooks";

interface ChangeThemeProps {
    setterToClose: () => void;
}

export const ChangeThemeDropdown = ({ setterToClose }: ChangeThemeProps) => {

    const { pref: { useDarkTheme }, setTheme } = usePref();

    return (
        <div className="w-[300px]">
            <OptionHeader title="Aparência" onClick={setterToClose} />
            <Section>
                <Field.Button text='Tema escuro' onClick={() => setTheme('dark')}>
                    <IconCheck className={`${useDarkTheme ? '' : 'invisible'}`} />
                </Field.Button>
                <Field.Button text='Tema claro' onClick={() => setTheme('light')}>
                    <IconCheck className={`${useDarkTheme ? 'invisible' : ''}`} />
                </Field.Button>
            </Section>
        </div>
    )

}