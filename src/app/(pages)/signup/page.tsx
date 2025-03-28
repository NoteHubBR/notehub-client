'use client';

import { Component } from "@/components";
import { Form } from "@/components/forms";
import { Template } from "@/components/templates";

const Page = () => {
    return (
        <Template.Container className="flex items-center justify-center p-2">
            <Component.TsParticles />
            <Form.Register />
        </Template.Container>
    );
}

export default Page;