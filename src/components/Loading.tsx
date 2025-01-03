'use client';

import { Container } from "./template/Container";
import { useLoading } from "@/data/hooks";
import Image from "next/image";

export const Loading = () => {

    const { isLoaded } = useLoading();

    return (
        <>
            {!isLoaded &&
                <Container className="dark:bg-neutral-900 bg-neutral-50 flex items-center justify-center">
                    <Image
                        src={'/imgs/logo.png'}
                        alt="Logo"
                        width={180}
                        height={0}
                        priority
                        className="animate-pulse"
                    />
                </Container>
            }
        </>
    )

}