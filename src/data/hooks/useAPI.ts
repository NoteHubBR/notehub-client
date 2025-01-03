import { useCallback } from "react";
import { useProgress } from "./useProgress";
import { useLoading } from "./useLoading";

interface HttpOptions {
    useLoading?: boolean;
    useProgress?: boolean;
    useToken?: string;
    useCredentials?: boolean;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const createHeaders = (useToken?: string): HeadersInit => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (useToken) headers['Authorization'] = `Bearer ${useToken}`;
    return headers;
};

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const errors = await response.json();
        throw errors;
    }
    if (response.headers.get('Content-Length') === '0') {
        return null;
    }
    return response.json();
};

export const useAPI = () => {

    const { setIsLoaded } = useLoading();

    const { setOnProgress } = useProgress();

    const request = useCallback(async (method: string, endpoint: string, body?: any, options?: HttpOptions) => {

        const { useLoading: showLoading, useProgress: showProgress, useToken, useCredentials } = options || {};

        const uri = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

        const headers = createHeaders(useToken);

        if (showLoading) setIsLoaded(false);
        
        if (showProgress) setOnProgress(true);

        const config: RequestInit = {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
            ...(useCredentials && { credentials: 'include' })
        };

        try {
            const response = await fetch(uri, config);
            return await handleResponse(response);
        } finally {
            if (showLoading) setIsLoaded(true);
            if (showProgress) setOnProgress(false);
        }

    }, []);

    const httpPost = useCallback((endpoint: string, body: any, options?: HttpOptions) => {
        return request('POST', endpoint, body, options);
    }, []);

    const httpGet = useCallback((endpoint: string, options?: HttpOptions) => {
        return request('GET', endpoint, undefined, options);
    }, []);

    return { httpPost, httpGet };

};