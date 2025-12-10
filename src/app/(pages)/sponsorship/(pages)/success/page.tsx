'use client';

import { Card, Countdown, Detail, Details, GoHome, Icon, Navigator, Paragraph, Section, Title } from "./elements";
import { IconCheck, IconCurrencyDollar } from "@tabler/icons-react";
import { SVG } from "@/components/svgs";
import { useEffect, useState, useCallback } from "react";
import { usePref } from "@/data/hooks";
import { useRouter } from "next/navigation";

const Page = () => {

    const { pref: { useDarkTheme } } = usePref();
    const router = useRouter();

    const [isPending, setIsPending] = useState<boolean>(true);
    const [hasSucceeded, setHasSucceeded] = useState<boolean>(false);
    const [hasFailed, setHasFailed] = useState<boolean>(false);
    const [successfulCountdown, setSuccessfulCountdown] = useState<number>(12);
    const [failCountdown, setFailCountdown] = useState<number>(60);

    const sendRequest = useCallback(() => {
        setHasFailed(false);
        setHasSucceeded(false);
        setSuccessfulCountdown(12);
        setFailCountdown(60);
        setTimeout(() => setIsPending(true), 666);
        setTimeout(() => setIsPending(false), 1332);
        setTimeout(() => setHasSucceeded(true), 1998);
    }, []);

    const prolongsFail = useCallback(() => {
        setIsPending(false);
        setTimeout(() => setHasFailed(true), 666);
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            prolongsFail();
        }, 2000)
        return () => clearTimeout(timeout);
    }, [prolongsFail])

    useEffect(() => {
        if (!hasSucceeded || successfulCountdown <= 0) return;
        const timer = setInterval(() => {
            setSuccessfulCountdown((prev) => prev - 1);
        }, 1000)
        return () => clearInterval(timer);
    }, [hasSucceeded, successfulCountdown])

    useEffect(() => {
        if (hasSucceeded && successfulCountdown === 0) router.push('/');
    }, [hasSucceeded, successfulCountdown, router])

    useEffect(() => {
        if (!hasFailed || failCountdown <= 0) return;
        const timer = setInterval(() => {
            setFailCountdown((prev) => Math.max(0, prev - 1));
        }, 1000)
        return () => clearInterval(timer);
    }, [hasFailed, failCountdown])

    return (
        <main className="w-full h-full dark:bg-darker bg-lighter flex items-center justify-center">
            <SVG.Flare flip className="z-20 absolute opacity-25 pointer-events-none" />
            <GoHome href='/' />
            <Section useDarkTheme={useDarkTheme}>
                <Card>
                    <Icon isPending={isPending} hasSucceeded={hasSucceeded} hasFailed={hasFailed} />
                    <Title isPending={isPending} hasSucceeded={hasSucceeded} hasFailed={hasFailed} />
                    <Paragraph isPending={isPending} hasSucceeded={hasSucceeded} hasFailed={hasFailed} />
                    <Details>
                        <Detail
                            hasSucceeded={hasSucceeded}
                            hasFailed={hasFailed}
                            icon={IconCheck}
                            label="Status"
                            value="Pago"
                        />
                        <Detail
                            hasSucceeded={hasSucceeded}
                            hasFailed={hasFailed}
                            icon={IconCurrencyDollar}
                            label="Quantia"
                            value="11,11"
                        />
                    </Details>
                    <Navigator
                        href='/'
                        isPending={isPending}
                        hasSucceeded={hasSucceeded}
                        hasFailed={hasFailed}
                        failCountdown={failCountdown}
                        sendRequest={sendRequest}
                    />
                    <Countdown
                        isPending={isPending}
                        hasSucceeded={hasSucceeded}
                        hasFailed={hasFailed}
                        successfulCountdown={successfulCountdown}
                        failCountdown={failCountdown}
                    />
                </Card>
            </Section>
        </main>
    )

}

export default Page;