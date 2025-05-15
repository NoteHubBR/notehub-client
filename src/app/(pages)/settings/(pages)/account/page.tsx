'use client';

import { Header } from "../Header";
import { IconCancel, IconEye, IconKey, IconMail, IconUser } from "@tabler/icons-react";
import { Link } from "./Link";

const Page = () => {

    return (
        <section>
            <Header goBack="/settings" title="Conta" />
            <section>
                <ul className="mt-6">
                    <Link href={"/settings/account/info"} icon={IconUser}>Informações</Link>
                    <Link href={"/settings/account/visibility"} icon={IconEye}>Alterar visibilidade</Link>
                    <Link href={"/settings/account/email"} icon={IconMail}>Alterar email</Link>
                    <Link href={"/settings/account/password"} icon={IconKey}>Alterar senha</Link>
                    <Link href={"/settings/account/delete"} icon={IconCancel}>Deletar conta</Link>
                </ul>
            </section>
        </section>
    )

}

export default Page;