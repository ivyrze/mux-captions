import { NextRequest } from "next/server";
import { fetchMux } from "@/app/util";

export const GET = async (request: NextRequest) => {
    const params = request.nextUrl.searchParams;
    params.set('limit', '20');

    return await fetchMux(`/assets?${ params }`, request);
};