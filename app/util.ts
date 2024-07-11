import { NextRequest } from "next/server";

export const fetchMux = async (
    endpoint: string,
    request: NextRequest,
    options: RequestInit = {}
) => {
    const authorization = request.headers.get('Authorization');
    if (!authorization) {
        return new Response('Missing authorization header', { status: 403 });
    }

    return await fetch(
        `https://api.mux.com/video/v1${ endpoint }`,
        {
            headers: {
                'Authorization': authorization,
                'Content-Type': 'application/json'
            },
            ...options
        }
    );
};

export const fetchAuthorized = (url: string | URL, options: RequestInit = {}) => {
    const tokenId = localStorage.getItem('tokenId');
    const tokenSecret = localStorage.getItem('tokenSecret');

    return fetch(url, {
        headers: {
            'Authorization': 'Basic ' + btoa(tokenId + ":" + tokenSecret)
        },
        ...options
    });
};

export const swrFetcher = (url: string | URL) =>
    fetchAuthorized(url).then(res => res.json());