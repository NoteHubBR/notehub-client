import { Card, Countdown, Detail, Details, GoHome, Icon, Navigator, Paragraph, Section, Title } from "./elements";
import { IconCash, IconCheck } from "@tabler/icons-react";
import { SVG } from "@/components/svgs";
import { Token } from "@/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePref, useServices } from "@/data/hooks";
import { useRouter } from "next/navigation";

interface MainProps extends React.HTMLAttributes<HTMLElement> {
    token: Token;
    param: string;
}

export const Main = ({ token, param, ...rest }: MainProps) => {

    const { sponsorshipService: { verifyPaymentStatus } } = useServices();

    const { pref: { useDarkTheme } } = usePref();

    const router = useRouter();

    const hasVerified = useRef<boolean>(false);
    const [status, setStatus] = useState<'pending' | 'success' | 'failed' | 'none'>('pending');
    const [countdown, setCountdown] = useState({ success: 36, failed: 60 });
    const [amountTotal, setAmountTotal] = useState<string>('0');

    const setStatusWithDealy = (status: 'pending' | 'success' | 'failed') => {
        return setTimeout(() => setStatus(status), 666);
    }

    const setAmountTotalFormatted = (locale: string, currency: string, amountTotal: number): void => {
        const ZERO_DECIMAL_CURRENCIES = [
            'bif', 'clp', 'djf', 'gnf', 'jpy', 'kmf', 'krw',
            'mga', 'pyg', 'rwf', 'ugx', 'vnd', 'vuv', 'xaf',
            'xof', 'xpf'
        ]
        const finalAmount = ZERO_DECIMAL_CURRENCIES.includes(currency.toLowerCase())
            ? amountTotal
            : amountTotal / 100;
        return setAmountTotal(new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency.toUpperCase()
        }).format(finalAmount));
    }

    const verifyStatus = useCallback(async (token: string, param: string): Promise<NodeJS.Timeout> => {
        setStatus('none');
        setStatusWithDealy('pending');
        setCountdown({ success: 36, failed: 60 });
        try {
            const res = await verifyPaymentStatus(token, param);
            if (res.status === 'complete' && res.paymentStatus === 'paid') {
                setAmountTotalFormatted(res.locale, res.currency, res.amountTotal);
                return setStatusWithDealy('success');
            }
            else return setStatusWithDealy('pending');
        } catch {
            return setStatusWithDealy('failed');
        }
    }, [verifyPaymentStatus])

    const retryVerifyStatus = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (status === 'failed') {
            e.preventDefault();
            return verifyStatus(token.access_token, param);
        }
        return;
    }

    useEffect(() => {
        if (hasVerified.current) return;
        hasVerified.current = true;
        verifyStatus(token.access_token, param);
    }, [param, token, verifyStatus])

    useEffect(() => {
        if (status !== 'success' || countdown.success <= 0) return;
        const timer = setInterval(() => {
            setCountdown((prev) => ({ ...prev, success: prev.success - 1 }));
        }, 1000)
        return () => clearInterval(timer);
    }, [countdown.success, status])

    useEffect(() => {
        if (status !== 'failed' || countdown.failed <= 0) return;
        const timer = setInterval(() => {
            setCountdown((prev) => ({ ...prev, failed: Math.max(0, prev.failed - 1) }));
        }, 1000)
        return () => clearInterval(timer);
    }, [countdown.failed, status])

    useEffect(() => {
        if (status === 'success' && countdown.success === 0) return router.push('/');
    }, [countdown.success, router, status])

    return (
        <main
            className="w-full h-full dark:bg-darker bg-lighter flex items-center justify-center"
            {...rest}
        >
            <SVG.Flare flip className="z-20 absolute opacity-25 pointer-events-none" />
            <GoHome href='/' />
            <Section useDarkTheme={useDarkTheme}>
                <Card>
                    <Icon status={status} />
                    <Title status={status} />
                    <Paragraph status={status} />
                    <Details>
                        <Detail status={status} icon={IconCheck} label="Status" value="Pago" />
                        <Detail status={status} icon={IconCash} label="Quantia" value={amountTotal} />
                    </Details>
                    <Navigator href='/' onClick={retryVerifyStatus} status={status} countdown={countdown.failed} />
                    <Countdown status={status} countdown={countdown} />
                </Card>
            </Section>
        </main>
    )

}