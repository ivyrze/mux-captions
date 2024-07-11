import type { NextRequest } from "next/server";
import { fetchMux } from "@/app/util";
import { put, list, del } from "@vercel/blob";
import type { ListBlobResult } from "@vercel/blob";
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

    const response = await fetchMux(`/assets/${ assetId }/tracks`, request, {
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

    await cleanupBlobs();
    return response;
};

const cleanupBlobs = async () => {
    let hasMore = true;
    let cursor;

    const cutoffTime = new Date();
    cutoffTime.setMinutes(cutoffTime.getMinutes() - 2);
    
    while (hasMore) {
        const listResult: ListBlobResult = await list({
            cursor,
            limit: 50
        });
        hasMore = listResult.hasMore;
        cursor = listResult.cursor;

        const deleteBlobs = listResult.blobs.filter(blob => {
            return blob.uploadedAt <= cutoffTime;
        });

        await Promise.all(
            deleteBlobs.map(blob => del(blob.url))
        );
    }
};