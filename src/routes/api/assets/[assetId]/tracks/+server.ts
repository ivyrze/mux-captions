import type { RequestHandler } from "@sveltejs/kit";
import { fetchMux } from "@/lib/api.server";
import { put, list, del } from "@vercel/blob";
import type { ListBlobResult } from "@vercel/blob";
import { BLOB_READ_WRITE_TOKEN } from "$env/static/private";

export const POST : RequestHandler = async event => {
    const { assetId } = event.params;

    const formData = await event.request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
        return new Response('No file was uploaded', { status: 400 });
    }

    const blob = await put(crypto.randomUUID(), file, {
        access: 'public',
        addRandomSuffix: false,
        token: BLOB_READ_WRITE_TOKEN
    });

    const response = await fetchMux(
        `/assets/${ assetId }/tracks`,
        event.request.headers,
        {
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
        }
    );

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
            limit: 50,
            token: BLOB_READ_WRITE_TOKEN
        });
        hasMore = listResult.hasMore;
        cursor = listResult.cursor;

        const deleteBlobs = listResult.blobs.filter(blob => {
            return blob.uploadedAt <= cutoffTime;
        });

        await Promise.all(
            deleteBlobs.map(blob => {
                return del(blob.url, {
                    token: BLOB_READ_WRITE_TOKEN
                });
            })
        );
    }
};