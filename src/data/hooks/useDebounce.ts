'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export const useDebounce = <T>(value: T, delay = 500) => {

    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timeout);

    }, [value, delay])

    return debouncedValue;
}

export function useDebouncedCallback<T extends (...args: any[]) => void>(
    callback: T,
    delay = 500
): (...args: Parameters<T>) => void {

    const callbackRef = useRef(callback);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback])

    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, [])

    return useCallback((...args: Parameters<T>) => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => callbackRef.current(...args), delay);
    }, [delay])

}