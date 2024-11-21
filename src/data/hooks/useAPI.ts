import { useCallback } from "react";
import { useProgress } from "./useProgress";

interface HttpOptions {
    useProgress?: boolean;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const useAPI = () => {

    const { setOnProgress } = useProgress();

    const httpPost = useCallback(async function (endpoint: string, body: any, options?: HttpOptions) {

        endpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        const uri = `${baseUrl}${endpoint}`;

        const { useProgress } = options || {}
        useProgress && setOnProgress(true);

        try {

            const response = await fetch(uri, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errors = await response.json();
                throw errors;
            }

            return await response.json();

        } finally {
            useProgress && setOnProgress(false);
        }

    }, []);

    return { httpPost };

};