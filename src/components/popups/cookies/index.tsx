'use client';

import { Button, Dialog, Icon, Link, Text } from './elements';
import { IconCookieFilled } from '@tabler/icons-react';
import { useStore, useUser } from '@/data/hooks';

export const CookieConsent = () => {

    const { isStoreReady, isCookieConsentGiven, setActions } = useStore();
    const { isMounted, user } = useUser();

    if (isStoreReady && isMounted) {
        const giveConsent = () => setActions({ isCookieConsentGiven: true }, user?.username);
        if (isCookieConsentGiven(user)) return null;
        return (
            <Dialog>
                <header className='mx-auto inmd:mx-0 flex gap-3'>
                    <Icon icon={IconCookieFilled} />
                    <Text>
                        Usamos cookies estritamente necessários para manter sua sessão.
                        <br className='inmd:hidden' />
                        Eles não são utilizados para publicidade ou rastreamento.
                    </Text>
                </header>
                <footer className='mx-auto insm:mx-0 insm:self-end flex flex-col inmd:flex-row gap-1'>
                    <Link href='/cookies'>Política</Link>
                    <Button onClick={giveConsent}>Entendi</Button>
                </footer>
            </Dialog>
        )
    }

    return null;

}