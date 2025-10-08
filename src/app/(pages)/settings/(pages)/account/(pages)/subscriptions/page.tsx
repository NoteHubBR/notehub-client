'use client';

import { Header } from "../../../Header";
import { scrollTo } from "@/core";
import { Subscription } from "./elements";
import { useUser } from "@/data/hooks";
import Link from "next/link";

const Page = () => {

    const { user } = useUser();

    if (user) return (
        <section>
            <Header goBack="/settings/account" title="Inscrições" />
            <section className="mt-6 flex flex-col gap-6">
                <ul>
                    <Subscription sub="Maintenance" name="Manutenção" />
                    <Subscription sub="Release" name="Atualizações" />
                </ul>
                <p className="font-medium text-sm dark:text-midlight/60 text-middark/60">
                    Ao estar inscrito em um tópico, você passará a receber atualizações por e-mail sobre o que é mais relevante para você.
                    <span className="ml-1 text-secondary hover:underline">
                        <Link href="/help" onClickCapture={scrollTo('subscriptions')}>Saiba mais</Link>
                    </span>
                </p>
            </section>
        </section>
    )

}

export default Page;