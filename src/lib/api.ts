import { get } from "svelte/store";
import { tokenId, tokenSecret } from "@/lib/stores";

interface FetchOptions extends RequestInit {
    fetch?: typeof fetch
}

export const fetchAuthorized = async <T>(
    url: string | URL,
    options: FetchOptions = {}
) => {
    const fetch = options.fetch ?? globalThis.fetch;
    const response = await fetch(url, {
        headers: {
            'Authorization': 'Basic ' + btoa(
                get(tokenId) + ":" + get(tokenSecret)
            )
        },
        ...options
    });
    const data: T = await response.json();

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return data;
};