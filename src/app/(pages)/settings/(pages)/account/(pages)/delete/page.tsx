'use client';

import { Element } from "./elements";
import { Form } from "@/components/forms";
import { Header } from "../../../Header";
import { useIdentities, useUser } from "@/data/hooks";

const Page = () => {

    const { user } = useUser();
    const { identities } = useIdentities();

    const { UserTitle, OAuthUserTitle, Warnings, Card } = Element;

    if (user) return (
        <section>
            <Header goBack="/settings/account" title="Deletar conta" />
            <section className="flex flex-col gap-3">
                {identities.length < 1 ? <UserTitle /> : <OAuthUserTitle />}
                <Form.User.Delete />
                <Warnings />
                <Card />
            </section>
        </section>
    )

}

export default Page;