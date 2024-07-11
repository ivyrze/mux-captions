import type { NextRequest } from "next/server";
import { fetchMux } from "@/app/util";

interface Props {
    params: {
        assetId: string,
        trackId: string
    }
}

export const DELETE = async (request: NextRequest, props: Props) => {
    const { assetId, trackId } = props.params;
    return await fetchMux(`/assets/${ assetId }/tracks/${ trackId }`, request, {
        method: 'DELETE'
    });
};