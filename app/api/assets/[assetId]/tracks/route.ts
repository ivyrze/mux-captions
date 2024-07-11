import type { NextRequest } from "next/server";
import { fetchMux } from "@/app/util";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";

interface Props {
    params: {
        assetId: string
    }
}

export const POST = async (request: NextRequest, props: Props) => {
    const { assetId } = props.params;

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
        return new Response('No file was uploaded', { status: 400 });
    }

    const blob = await put(randomUUID(), file, {
        access: 'public',
        addRandomSuffix: false
    });

    return await fetchMux(`/assets/${ assetId }/tracks`, request, {
        method: 'POST',
        body: JSON.stringify({
            "url": blob.url,
            "type": "text",
            "text_type": "subtitles",
            "closed_captions": true,
            "language_code": "en-US",
            "name": "English",
            "passthrough": "English"
        })
    });
};