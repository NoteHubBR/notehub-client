const baseUrl = process.env.NEXT_PUBLIC_API_URL;

interface RequestOptions {
    token?: string | null;
    refreshToken?: string;
    deviceId: string;
}

const createHeaders = (options: RequestOptions): HeadersInit => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'X-Device-Id': options.deviceId,
    }
    if (options.refreshToken) headers['X-Refresh-Token'] = options.refreshToken;
    if (options.token) headers['Authorization'] = `Bearer ${options.token}`;
    return headers;
}

const handleResponse = async (response: Response) => {
    if (response.status === 204) return null;
    const text = await response.text();
    let data;
    try { data = text ? JSON.parse(text) : null; }
    catch { data = text; }
    if (response.ok) return data;
    throw { response, data };
}

const buildUrl = (endpoint: string) => `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

export const createApiClient = (requestOptions: RequestOptions) => {

    const request = async (method: string, endpoint: string, body?: unknown, overrides?: Partial<RequestOptions>) => {
        const mergedOptions = overrides ? { ...requestOptions, ...overrides } : requestOptions;
        const response = await fetch(buildUrl(endpoint), {
            method,
            headers: createHeaders(mergedOptions),
            body: body ? JSON.stringify(body) : undefined,
        })
        return handleResponse(response);
    }

    return {
        get: (endpoint: string, overrides?: Partial<RequestOptions>) => request('GET', endpoint, undefined, overrides),
        post: (endpoint: string, body: unknown, overrides?: Partial<RequestOptions>) => request('POST', endpoint, body, overrides),
        put: (endpoint: string, body: unknown, overrides?: Partial<RequestOptions>) => request('PUT', endpoint, body, overrides),
        patch: (endpoint: string, body: unknown, overrides?: Partial<RequestOptions>) => request('PATCH', endpoint, body, overrides),
        delete: (endpoint: string, body?: unknown, overrides?: Partial<RequestOptions>) => request('DELETE', endpoint, body, overrides),
    }

}

export type ApiClient = ReturnType<typeof createApiClient>;