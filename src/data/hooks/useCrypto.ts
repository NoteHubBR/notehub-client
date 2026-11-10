import { useCallback, useState } from 'react';
import { decrypt, encrypt } from '@/core';

const yieldToPaint = () => new Promise<void>((resolve) => {
    const fallback = setTimeout(resolve, 50);
    requestAnimationFrame(() => {
        clearTimeout(fallback);
        setTimeout(resolve, 0);
    })
})

export const useCrypto = () => {
    const [running, setRunning] = useState<number>(0);
    const run = useCallback(async <T,>(task: () => Promise<T>): Promise<T> => {
        setRunning((n) => n + 1);
        try {
            await yieldToPaint();
            return await task();
        } finally {
            setRunning((n) => n - 1);
        }
    }, [])
    return {
        isCrypting: running > 0,
        encrypt: (plaintext: string, passphrase: string) => run(() => encrypt(plaintext, passphrase)),
        decrypt: (armored: string, passphrase: string) => run(() => decrypt(armored, passphrase)),
    }
}