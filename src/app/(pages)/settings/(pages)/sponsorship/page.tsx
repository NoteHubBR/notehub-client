'use client';

import { Header } from "../Header";
import { useUser } from "@/data/hooks";

const Page = () => {

    const { user } = useUser();

    if (user) return (
        <section>
            <Header goBack="/settings" title="Patrocínio" />
            <section className="mt-6">
                <p className="font-medium text-sm dark:text-midlight/60 text-middark/60">
                    Ainda estamos preparando essa funcionalidade.
                    Em breve você poderá apoiar o projeto e desbloquear benefícios exclusivos!
                </p>
            </section>
        </section>
    )

}

export default Page;