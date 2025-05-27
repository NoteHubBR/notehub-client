'use client';

import { Form } from "@/components/forms";
import { useUser } from "@/data/hooks";

const Page = () => {

    const { token, user } = useUser();

    if (!token || !user) return null;

    return (
        <section className="w-full h-full p-8 inmd:p-0 flex items-center justify-center dark:bg-dark bg-light">
            <div
                className="max-w-[666px] w-full h-[90%] p-8 rounded
                inmd:max-w-full inmd:h-full inmd:p-4 inmd:border-0
                border dark:border-middark border-midlight
                flex flex-col
                dark:bg-darker bg-lighter"
            >
                <header>
                    <h1 className="font-semibold text-xl">Criar nova nota</h1>
                </header>
                <Form.Note.New token={token.access_token} username={user.username} />
            </div>
        </section>
    )

}

export default Page;