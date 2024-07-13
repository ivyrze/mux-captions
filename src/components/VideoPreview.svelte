<script lang="ts">
    import type Mux from "@mux/mux-node";
    import { DurationFormat } from '@formatjs/intl-durationformat';
    import { Button } from "flowbite-svelte";
    import VideoThumbnail from "@/components/VideoThumbnail.svelte";
    import Clock from "phosphor-svelte/lib/Clock";
    import Calendar from "phosphor-svelte/lib/Calendar";
    import Pencil from "phosphor-svelte/lib/Pencil";

    export let video: Mux.Video.Asset;

    const durationFormatter = new DurationFormat('en-US', {
        style: 'digital'
    });
    const durationFormatted = durationFormatter.format({
        seconds: Math.floor(video.duration ?? 0)
    });
    const createdAt = new Date(parseInt(video.created_at) * 1000);
    const createdAtFormatted = createdAt.toISOString().substring(0, 10);
</script>

<div>
    <VideoThumbnail playbackId={ video.playback_ids?.[0].id } />
    <div>
        { video.id }
    </div>
    <div>
        <span><Clock /> { durationFormatted }</span>
        <span><Calendar /> { createdAtFormatted }</span>
    </div>
    <div>
        <Button href={ `/assets/${ video.id }` }>
            Details <Pencil />
        </Button>
    </div>
</div>