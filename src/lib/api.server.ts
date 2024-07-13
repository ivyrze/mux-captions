export const fetchMux = async (
    endpoint: string,
    headers: Headers,
    options: RequestInit = {}
) => {
    const authorization = headers.get('Authorization');
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