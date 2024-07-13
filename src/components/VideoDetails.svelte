<script lang="ts">
    export const ssr = false;
    import type Mux from "@mux/mux-node";
    import VideoThumbnail from "@/components/VideoThumbnail.svelte";
    import TrackDetails from "@/components/TrackDetails.svelte";
    import UploadAction from "@/components/UploadAction.svelte";
    import { Accordion } from "flowbite-svelte";
    import { DurationFormat } from "@formatjs/intl-durationformat";
    import File from "phosphor-svelte/lib/File";
    import FileVideo from "phosphor-svelte/lib/FileVideo";
    import Clock from "phosphor-svelte/lib/Clock";
    import Resize from "phosphor-svelte/lib/Resize";
    import Timer from "phosphor-svelte/lib/Timer";
    import Crop from "phosphor-svelte/lib/Crop";
    import Calendar from "phosphor-svelte/lib/Calendar";
    import "@mux/mux-player";

    export let video : Mux.Video.Asset;
    const playbackId = video.playback_ids?.[0].id ?? '';

    const durationFormatter = new DurationFormat('en-US', {
        style: 'digital'
    });
    const durationFormatted = durationFormatter.format({
        seconds: Math.floor(video.duration ?? 0)
    });
    const createdAt = new Date(parseInt(video.created_at ?? '0') * 1000);
    const createdAtFormatted = createdAt.toLocaleString();
</script>

<div>
    <mux-player { playbackId }></mux-player>

    <h2 class="video-details__heading">
        Metadata
    </h2>
    <ul class="video-details__metadata">
        <li>
            <File />
            <span class="video-details__metadata-label">
                Asset ID:
            </span>
            { video.id }
        </li>
        <li>
            <FileVideo />
            <span class="video-details__metadata-label">
                Playback ID:
            </span>
            { playbackId }
        </li>
        <li>
            <Clock />
            <span class="video-details__metadata-label">
                Duration:
            </span>
            { durationFormatted }
        </li>
        <li>
            <Resize />
            <span class="video-details__metadata-label">
                Max Resolution:
            </span>
            { video.max_resolution_tier }
        </li>
        <li>
            <Timer />
            <span class="video-details__metadata-label">
                Frame Rate:
            </span>
            { video.max_stored_frame_rate }
        </li>
        <li>
            <Crop />
            <span class="video-details__metadata-label">
                Aspect Ratio:
            </span>
            { video.aspect_ratio }
        </li>
        <li>
            <Calendar />
            <span class="video-details__metadata-label">
                Uploaded On:
            </span>
            { createdAtFormatted }
        </li>
    </ul>

    <h2 class="video-details__heading">
        Tracks
    </h2>
    <div class="video-details__tracks">
        <Accordion multiple={ true }>
            { #if video.tracks?.length }
                { #each video.tracks as track }
                    <TrackDetails
                        assetId={ video.id }
                        playbackId={ playbackId }
                        track={ track }
                    />
                { /each }
            { /if }
        </Accordion>
    </div>
    <UploadAction assetId={ video.id } />
</div>
<style>
    :global(mux-player) {
        border-radius: 0.5rem;
        overflow: hidden;
    }

    .video-details__heading {
        font-size: 1.25rem;
        font-weight: bold;
        margin-block: 1.75rem 0.75rem;
    }

    .video-details__metadata {
        list-style: none;
    }

    .video-details__metadata > li {
        display: flex;
        align-items: center;
        gap: 0.25em;
    }

    .video-details__metadata-label {
        font-weight: 500;
        margin-left: 0.25em;
    }

    .video-details__tracks {
        margin-bottom: 1.5rem;
    }
</style>