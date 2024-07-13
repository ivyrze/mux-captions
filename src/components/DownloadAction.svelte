<script lang="ts">
    import { Button } from "flowbite-svelte";
    import Download from "phosphor-svelte/lib/Download";

    export let playbackId: string;
    export let trackId: string;

    const trackUrl = 
        `https://stream.mux.com/${ playbackId }/text/${ trackId }.vtt`;
</script>

<Button
    class="with-icon"
    href={ trackUrl }
    role="link"
>
    Download
    <Download />
</Button>