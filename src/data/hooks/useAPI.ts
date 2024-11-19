import { useCallback } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const useAPI = () => {

    const httpPost = useCallback(async function (endpoint: string, body: any) {
        endpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        const uri = `${baseUrl}${endpoint}`;
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

    }, []);

    return { httpPost };

};