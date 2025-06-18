'use client';

import { Form } from "@/components/forms";
import { useSearchParams } from "next/navigation";

const Page = () => {

    const token = useSearchParams().get("token");

    if (token) return (
        <section className="w-full h-full px-4 insm:px-0 flex items-center justify-center dark:bg-darker bg-lighter">
            <div className="max-w-[999px] w-full min-h-[75%] insm:h-full flex ">
                <aside className="w-1/2 insm:hidden p-4 flex-none">
                    <header className="pl-2 border-l-4 border-primary">
                        <h1 className="px-2 py-3 font-semibold text-xl dark:bg-middark/30 bg-midlight/30">
                            Trocar senha
                        </h1>
                    </header>
                </aside>
                <main className="w-1/2 inlg:w-full p-4 border-l insm:border-none dark:border-middark border-midlight">
                    <header className="w-fit insm:mx-auto">
                        <h2 className="px-2 py-3 font-semibold text-xl">Nova senha</h2>
                    </header>
                    <Form.User.PasswordUpdate token={token} />
                </main>
            </div>
        </section>
    )

}

export default Page;