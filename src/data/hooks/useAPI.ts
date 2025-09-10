import { useCallback } from "react";
import { useProgress } from "./useProgress";
import { useStore } from "./useStore";
import { UUID } from "crypto";

interface HttpOptions {
    useProgress?: boolean;
    useRefreshToken?: string;
    useToken?: string | null;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const createHeaders = (
    useDeviceId: UUID | string,
    useRefreshToken?: string,
    useToken?: string | null
): HeadersInit => {
    const headers: HeadersInit = { 'X-Device-Id': useDeviceId, 'Content-Type': 'application/json' };
    if (useRefreshToken) headers['X-Refresh-Token'] = `${useRefreshToken}`;
    if (useToken) headers['Authorization'] = `Bearer ${useToken}`;
    return headers;
}

const handleResponse = async (response: Response) => {
    if (response.status === 204) return null;

    const text = await response.text();
    let data;
    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = text;
    }
    if (!response.ok) {
        if (response.status === 404) {
            throw data || new Error();
        }
        throw data;
    }

    return data;
}

export const useAPI = () => {

    const { store: { device } } = useStore();
    const { setOnProgress } = useProgress();

    const request = useCallback(async (method: string, endpoint: string, body?: any, options?: HttpOptions) => {

        const { useProgress: showProgress, useRefreshToken, useToken } = options || {};

        const uri = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

        const headers = createHeaders(device, useRefreshToken, useToken);

        if (showProgress) setOnProgress(true);

        const config: RequestInit = {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        }

        try {
            const response = await fetch(uri, config);
            return await handleResponse(response);
        } finally {
            if (showProgress) setOnProgress(false);
        }

    }, [device, setOnProgress]);

    const httpPost = useCallback((endpoint: string, body: any, options?: HttpOptions) => {
        return request('POST', endpoint, body, options);
    }, [request])

    const httpPut = useCallback((endpoint: string, body: any, options?: HttpOptions) => {
        return request('PUT', endpoint, body, options);
    }, [request])

    const httpPatch = useCallback((endpoint: string, body: any, options?: HttpOptions) => {
        return request('PATCH', endpoint, body, options);
    }, [request])

    const httpGet = useCallback((endpoint: string, options?: HttpOptions) => {
        return request('GET', endpoint, undefined, options);
    }, [request])

    const httpDelete = useCallback((endpoint: string, body: any, options?: HttpOptions) => {
        return request('DELETE', endpoint, body, options);
    }, [request])

    return { httpPost, httpPut, httpPatch, httpGet, httpDelete };

}