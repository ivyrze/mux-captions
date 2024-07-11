import type { NextRequest } from "next/server";
import { fetchMux } from "@/app/util";

interface Props {
    params: {
        assetId: string
    }
}

export const GET = async (request: NextRequest, props: Props) => {
    const { assetId } = props.params;
    return await fetchMux(`/assets/${ assetId }`, request);
};