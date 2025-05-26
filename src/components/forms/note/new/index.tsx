import { Element } from "./elements";
import { IconEyeClosed, IconInfoCircle, IconMessage, IconMessageOff, IconWorld } from "@tabler/icons-react";

export const Form = () => {

    const { Section, Fieldset, Legend, Label, InputText, InputRadio, InputFile, Error, Submit } = Element;

    return (
        <form className="w-full h-full flex flex-col">
            <Section>
                <h2 className="pl-1 text-sm dark:text-midlight/65 text-middark/65">
                    Campos obrigatórios estão marcados com *
                </h2>
            </Section>
            <Section className="gap-3">
                <Fieldset>
                    <Label htmlFor="title" tip="*" className="block">Título</Label>
                    <InputText id="title" className="w-1/2 insm:w-full my-2" />
                    <Error>Error</Error>
                </Fieldset>
                <Fieldset>
                    <Label htmlFor="desc" tip="(opcional)" className="block">Descrição</Label>
                    <InputText id="desc" className="w-full my-2" />
                    <Error>Error</Error>
                </Fieldset>
            </Section>
            <Section className="gap-6">
                <Fieldset className="p-2 pb-4 rounded-md border dark:border-middark border-midlight">
                    <Legend tip="*">Visiblidade</Legend>
                    <InputRadio id="profilePrivateTrue" name="profilePrivate" />
                    <Label htmlFor="profilePrivateTrue" icon={IconWorld} className="cursor-pointer mr-3">Pública</Label>
                    <InputRadio id="profilePrivateFalse" name="profilePrivate" />
                    <Label htmlFor="profilePrivateFalse" icon={IconEyeClosed} className="cursor-pointer">Oculta</Label>
                </Fieldset>
                <Fieldset className="p-2 pb-4 rounded-md border dark:border-middark border-midlight">
                    <Legend tip="*">Comentários</Legend>
                    <InputRadio id="closedTrue" name="closed" />
                    <Label htmlFor="closedTrue" icon={IconMessage} className="cursor-pointer mr-3">Abertos</Label>
                    <InputRadio id="closedFalse" name="closed" />
                    <Label htmlFor="closedFalse" icon={IconMessageOff} className="cursor-pointer">Fechados</Label>
                </Fieldset>
            </Section>
            <Section className="flex-1">
                <Fieldset
                    className="w-full h-full pb-3
                    border-2 border-dashed dark:border-middark border-midlight
                    flex items-center justify-center
                    [&:has(input:hover)]:border-primary [&:has(input:focus)]:border-primary
                    transition-colors duration-300"
                >
                    <Legend tip="(opcional)">Carregar nota</Legend>
                    <InputFile />
                </Fieldset>
            </Section>
            <Section className="!pb-0 !flex-row justify-between">
                <h3 className="flex items-center gap-1 text-sm dark:text-midlight/65 text-middark/65">
                    <IconInfoCircle /> Você está criando uma nota pública
                </h3>
                <Submit>Criar nota</Submit>
            </Section>
        </form>
    )

}