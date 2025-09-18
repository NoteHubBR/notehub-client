'use client';

import { Element } from "./elements";
import { Form } from "@/components/forms";
import { Header } from "../../../Header";
import { useUser } from "@/data/hooks";

const Page = () => {

    const { user } = useUser();

    const { UserTitle, OAuthUserTitle, Warnings, Card } = Element;

    if (user) return (
        <section>
            <Header goBack="/settings/account" title="Deletar conta" />
            <section className="flex flex-col gap-3">
                {user.host === 'NoteHub' ? <UserTitle /> : <OAuthUserTitle></OAuthUserTitle>}
                <Form.User.Delete />
                <Warnings />
                <Card />
            </section>
        </section>
    )

}

export default Page;