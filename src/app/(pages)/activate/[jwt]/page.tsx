'use client';

import { Container } from "@/components/template/Container";
import { SVG } from "@/components/SVG";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useServices } from "@/data/hooks";
import Image from "next/image";
import Link from "next/link";

const Page = () => {

    const { userService: { activateUser } } = useServices();

    const params = useParams<{ jwt: string }>();

    const [isActive, setIsActive] = useState<boolean>(false);

    const [isFinished, setIsFinished] = useState<boolean>(false);

    const handleActivateUser = async (token: string) => {
        try {
            await activateUser(token);
            setIsActive(true);
        } catch {
            setIsActive(false);
        } finally {
            setIsFinished(true);
        }
    };

    useEffect(() => { handleActivateUser(params.jwt) }, []);

    return (
        <Container className="flex insm:flex-col items-center justify-center gap-4">
            <SVG className="absolute -z-10" />
            {isFinished && (
                <>
                    <Link href={'/'} className="pr-4 border-e dark:border-neutral-50/25 border-neutral-900/25">
                        <Image src={'/imgs/logo.png'} alt="Logo" width={100} height={0} priority />
                    </Link>
                    {isActive
                        ?
                        <h1 className="font-faculty font-light text-lg">
                            Conta ativada,{" "}
                            <span className="dark:text-neutral-50 text-neutral-900">
                                <Link href={'/signin'} className="underline
                                    p-1 rounded-lg
                                    font-normal
                                    transition-colors duration-300
                                    hover:bg-violet-600 hover:text-neutral-50"
                                >
                                    acesse
                                </Link>.
                            </span>
                        </h1>
                        :
                        <h1 className="font-faculty font-light text-lg">Token inválido.</h1>
                    }
                </>
            )}
        </Container>
    );

};

export default Page;