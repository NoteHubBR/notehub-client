'use client';

import { Form } from "@/components/forms";
import { Template } from "@/components/templates";
import { TsParticles } from "@/components";

const Page = () => {
    return (
        <Template.Container className="flex items-center justify-center p-2">
            <TsParticles />
            <Form.Auth.SignUp />
        </Template.Container>
    );
}

export default Page;