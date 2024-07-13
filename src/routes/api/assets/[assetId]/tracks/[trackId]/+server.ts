import type { RequestHandler } from "@sveltejs/kit";
import { fetchMux } from "@/lib/api.server";

export const DELETE : RequestHandler = async event => {
    const { assetId, trackId } = event.params;

    return await fetchMux(
        `/assets/${ assetId }/tracks/${ trackId }`,
        event.request.headers,
        {
            method: 'DELETE'
        }
    );
};