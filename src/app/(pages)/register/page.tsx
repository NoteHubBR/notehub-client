'use client';

import { IconMail, IconAt, IconSignature } from "@tabler/icons-react";

import TsParticles from "@/components/TsParticles";
import { Form } from "@/components/form";

const page = () => {

    return (
        <>
            <TsParticles />
            <div className="w-screen max-w-full min-h-screen insm:min-h-svh p-2 flex items-center justify-center">
                <form
                    action=""
                    onSubmit={(event: React.FormEvent) => event.preventDefault()}
                    className="
                        w-[444px] insm:w-full
                        p-4
                        flex flex-col gap-5
                        rounded-md
                        backdrop-blur-sm
                        dark:bg-violet-600/20 bg-indigo-600/10
                    ">
                    <Form.Header />

                    <Form.Field>
                        <Form.Label htmlFor="email" tooltip="O email deve ser válido e de sua autoria.">Email</Form.Label>
                        <Form.Input id="email" type="email" required icon={<IconMail title="Email" />} />
                        <Form.Error></Form.Error>
                    </Form.Field>

                    <Form.Field>
                        <Form.Label htmlFor="user" tooltip="O tamanho deve estar entre 4 e 12 caracteres, apenas letras, números, _ e .">Usuário</Form.Label>
                        <Form.Input id="user" type="text" required icon={<IconAt title="@" />} />
                        <Form.Error></Form.Error>
                    </Form.Field>

                    <Form.Field>
                        <Form.Label htmlFor="name" tooltip="O tamanho deve estar entre 4 e 24 caracteres.">Nome</Form.Label>
                        <Form.Input id="name" type="text" required icon={<IconSignature title="Nome" />} />
                        <Form.Error></Form.Error>
                    </Form.Field>

                    <Form.Field>
                        <Form.Label htmlFor="password" tooltip="O tamanho deve estar entre 4 e 8 caracteres.">Senha</Form.Label>
                        <Form.Input id="password" type="password" required />
                        <Form.Error></Form.Error>
                    </Form.Field>

                    <Form.Field>
                        <Form.Label htmlFor="repeatPassword">Repetir senha</Form.Label>
                        <Form.Input id="repeatPassword" type="password" required />
                        <Form.Error></Form.Error>
                    </Form.Field>

                    <Form.Button>Cadastrar</Form.Button>
                </form>
            </div >
        </>
    );

};

export default page;