'use client';

import { clsx } from "clsx";
import { Header } from "../../../Header";
import { Icon } from "@/components/icons";
import { scrollTo } from "@/core";
import { useServices, useUser } from "@/data/hooks";
import { useTransition } from "react";
import Link from "next/link";

const Page = () => {

    const { userService: { updateUserVisibility } } = useServices();

    const [isPending, startTransition] = useTransition();

    const { token, user, updateUser } = useUser();

    const handleClick = () => startTransition(async () => {
        if (token && user) {
            updateUser({ profile_private: !user.profile_private });
            return await updateUserVisibility(token.access_token);
        }
    })

    if (user) return (
        <section>
            <Header goBack="/settings/account" title="Visibilidade" />
            <section className="mt-6 flex flex-col gap-6">
                <header className="relative px-4 py-3 flex items-center justify-between">
                    {isPending &&
                        <div
                            role="status"
                            className="cursor-wait
                            z-10 absolute inset-0 rounded-full
                            flex items-center justify-center
                            dark:bg-middark/75 bg-midlight/75"
                        >
                            <Icon.Dots />
                        </div>
                    }
                    <h3>Conta privada</h3>
                    <button
                        onClick={handleClick}
                        className={clsx(
                            'relative w-[48px] h-[24px] rounded-full border-2',
                            'after:absolute after:top-0 after:left-0 after:w-[50%] after:h-full after:rounded-full after:dark:bg-darker after:bg-lighter',
                            user.profile_private ? 'after:translate-x-full' : 'after:translate-x-0',
                            user.profile_private
                                ? 'dark:border-lighter border-darker dark:bg-lighter bg-darker'
                                : 'dark:border-middark border-midlight dark:bg-middark bg-midlight',
                            'transition-all duration-300 after:transition-all after:duration-300',
                        )}
                    />
                </header>
                <p className="font-medium text-sm dark:text-midlight/60 text-middark/60">
                    Quando sua conta está pública, todos podem visualizar suas notas, suas chamas, seus seguidores e quem você segue
                    — salvo notas ocultas —
                    mesmo aqueles que não possuem uma conta.
                </p>
                <p className="font-medium text-sm dark:text-midlight/60 text-middark/60">
                    Quando sua conta está privada, apenas mútuos podem visualizar suas notas, suas chamas, seus seguidores e quem você segue
                    — salvo notas ocultas.
                    <span className="ml-1 text-secondary hover:underline">
                        <Link href="/help" onClickCapture={scrollTo('mutuals')}>Saiba mais</Link>
                    </span>
                </p>
            </section>
        </section>
    )

}

export default Page;