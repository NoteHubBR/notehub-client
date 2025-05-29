'use client';

import { Form } from "@/components/forms";
import { Skeleton } from "./skeleton";
import { Unauthorized } from "./unauthorized";
import { useUser } from "@/data/hooks";

const Page = () => {

    const { isMounted, token, user } = useUser();

    if (!isMounted) return <Skeleton />;

    if (!token || !user) return <Unauthorized />;

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
                    <h1 className="w-fit font-semibold text-xl">Criar nova nota</h1>
                </header>
                <Form.Note.New token={token.access_token} username={user.username} />
            </div>
        </section>
    )

}

export default Page;