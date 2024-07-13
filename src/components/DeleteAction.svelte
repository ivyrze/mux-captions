<script lang="ts">
    import { fetchAuthorized } from "@/lib/api";
    import { invalidate } from '$app/navigation';
    import { Button } from "flowbite-svelte";
    import Trash from "phosphor-svelte/lib/Trash";

    export let assetId: string;
    export let trackId: string;

    let isDeleted = false;

    const deleteTrack = async () => {
        isDeleted = true;

        await fetchAuthorized(
            `/api/assets/${ assetId }/tracks/${ trackId }`,
            {
                method: 'DELETE'
            }
        );
        await invalidate(
            `/api/assets/${ assetId }`
        );
    };
</script>

<Button
    on:click={ deleteTrack }
    disabled={ isDeleted }
    color="red"
>
    { #if !isDeleted }
        Delete
    { :else }
        Deleted
    { /if }
    <Trash />
</Button>