<script lang="ts">
    import type Mux from "@mux/mux-node";
    import { formatDuration } from "@/lib/util";
    import { Button } from "flowbite-svelte";
    import VideoThumbnail from "@/components/VideoThumbnail.svelte";
    import Clock from "phosphor-svelte/lib/Clock";
    import Calendar from "phosphor-svelte/lib/Calendar";
    import Pencil from "phosphor-svelte/lib/Pencil";

    export let video: Mux.Video.Asset;

    const durationFormatted = formatDuration(video.duration);
    const createdAt = new Date(parseInt(video.created_at) * 1000);
    const createdAtFormatted = createdAt.toISOString().substring(0, 10);
</script>

<div
    class="video-preview"
    role="group"
    aria-labelledby={ `video-preview-${ video.id }__name` }
>
    <VideoThumbnail playbackId={ video.playback_ids?.[0].id } />
    <div
        class="video-preview__name"
        id={ `video-preview-${ video.id }__name` }
    >
        { video.id }
    </div>
    <div class="video-preview__metadata">
        <span class="with-icon">
            <Clock />{ durationFormatted }
        </span>
        <span class="with-icon">
            <Calendar />{ createdAtFormatted }
        </span>
    </div>
    <div>
        <Button
            href={ `/assets/${ video.id }` }
            class="with-icon"
            color="alternative"
            role="link"
        >
            Details
            <Pencil />
        </Button>
    </div>
</div>
<style lang="postcss">
    .video-preview {
        border: 1px solid light-dark(theme(colors.gray.200), theme(colors.primary.700));
        border-radius: 0.75rem;
        padding: 0.5rem;
    }

    :global(.video-preview img) {
        margin-bottom: 0.75rem;
    }

    .video-preview__name {
        font-weight: 500;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .video-preview__metadata {
        display: flex;
        gap: 0.75em;
        margin-block: 0.25rem;
    }

    :global(.video-preview a) {
        width: 100%;
        margin-top: 0.75rem;
    }
</style>