import type { RequestHandler } from "@sveltejs/kit";
import { fetchMux } from "@/lib/api.server";

export const GET : RequestHandler = async event => {
    const params = event.url.searchParams;
    params.set('limit', '20');

    return await fetchMux(
        `/assets?${ params }`,
        event.request.headers
    );
};