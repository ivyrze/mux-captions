import type Mux from "@mux/mux-node";
import type { PageLoad } from "./$types";
import { fetchAuthorized } from "@/lib/api";

export const load : PageLoad = async event => {
    const { assetId } = event.params;
    
    return await fetchAuthorized<{ data: Mux.Video.Asset }>(
        `/api/assets/${ assetId }`,
        {
            fetch: event.fetch
        }
    );
};