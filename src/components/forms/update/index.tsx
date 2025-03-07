import { Element } from "./elements";
import { forwardRef } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { useUser } from "@/data/hooks";
import Link from "next/link";

export const Form = forwardRef<HTMLFormElement, React.HTMLAttributes<HTMLFormElement>>(({ ...props }, ref) => {
    const { user } = useUser();
    if (user) return (
        <form
            ref={ref}
            {...props}
            className="overflow-y-auto
            max-w-[555px] h-[666px] inmd:h-svh m-auto
            pb-9 rounded-xl inmd:rounded-none
            dark:bg-black bg-white"
        >
            <Element.Header />
            <Element.Main>
                <Element.Banner user={user}>
                    <Element.Avatar user={user} />
                </Element.Banner>
                <Element.Select />
                <Element.Field>
                    <Element.Input id="username" />
                    <Element.Label>Usuário</Element.Label>
                    <Element.Counter>666/999</Element.Counter>
                    <Element.Error >Error</Element.Error>
                </Element.Field>
                <Element.Field>
                    <Element.Input />
                    <Element.Label>Nome</Element.Label>
                    <Element.Counter>666/999</Element.Counter>
                    <Element.Error >Error</Element.Error>
                </Element.Field>
                <Element.Field>
                    <Element.Textarea />
                    <Element.Label className="top-6">Mensagem</Element.Label>
                    <Element.Counter>666/999</Element.Counter>
                    <Element.Error className="!top-[95%]">Error</Element.Error>
                </Element.Field>
                <Link
                    href={'/settings'}
                    className="px-4 py-2 -mt-5 flex items-center gap-3
                    hover:dark:bg-neutral-50/10 hover:bg-neutral-950/10
                    transition-colors"
                >
                    <span className="flex-1">Configurações</span>
                    <IconChevronRight />
                </Link>
            </Element.Main>
        </form>
    )
})

Form.displayName = 'Form';