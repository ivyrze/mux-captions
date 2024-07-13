import type { RequestHandler } from "@sveltejs/kit";
import { fetchMux } from "@/lib/api.server";

export const GET : RequestHandler = async event => {
    const { assetId } = event.params;

    return await fetchMux(
        `/assets/${ assetId }`,
        event.request.headers
    );
};