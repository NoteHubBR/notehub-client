'use client';

import { clsx } from "clsx";
import { Header } from "../../../Header";
import { IconSend } from "@tabler/icons-react";
import { useServices, useUser } from "@/data/hooks";
import { useState, useTransition } from "react";

const Page = () => {

    const { authService: { sendPasswordChangeRequest } } = useServices();
    const { user } = useUser();

    const [sent, setSent] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();

    const handleClick = () => startTransition(async () => {
        if (user) {
            setSent(true);
            return await sendPasswordChangeRequest({ email: user.email });
        }
    })

    if (user) return (
        <section>
            <Header goBack="/settings/account" title="Alterar senha" />
            <section className="mt-6 flex flex-col gap-6">
                <header className="relative px-2 py-3 flex items-center justify-between">
                    <h3>Solicitar troca</h3>
                    <button
                        disabled={sent || isPending}
                        onClick={handleClick}
                        className={clsx(
                            'select-none',
                            'absolute top-1/2 -translate-y-1/2 right-2',
                            'px-4 py-2 rounded-full',
                            'text-sm text-white',
                            'dark:bg-midlight/50 bg-middark/50',
                            'hover:!bg-primary',
                            'active:top-[calc(50%+3px)]',
                            'disabled:cursor-not-allowed disabled:active:top-1/2 disabled:!bg-primary/50',
                            'transition-all'
                        )}
                    >
                        <IconSend className="inline-block align-top" size={20} /> Enviar
                    </button>
                </header>
                <p className="font-medium text-sm dark:text-midlight/60 text-middark/60">
                    Será enviada para o email cadastrado uma mensagem contendo um botão que o levará à página de alteração de senha.
                    Você terá até 30 minutos para concluir a troca; após esse prazo o token gravado no botão se tornará inválido.
                </p>
                <p className={clsx(
                    'relative',
                    sent ? 'visible top-0' : 'invisible -top-5',
                    'p-2 rounded-lg',
                    'border-l-8 dark:border-middark border-midlight',
                    'text-sm dark:text-midlight text-middark',
                    'dark:bg-middark/50 bg-midlight/50',
                    'transition-all duration-300')}
                >
                    Email enviado
                </p>
            </section>
        </section>
    )

}

export default Page;