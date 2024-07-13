<script lang="ts">
    import type Mux from "@mux/mux-node";
    import { AccordionItem } from "flowbite-svelte";
    import DownloadAction from "@/components/DownloadAction.svelte";
    import DeleteAction from "@/components/DeleteAction.svelte";
    import VideoCamera from "phosphor-svelte/lib/VideoCamera";
    import MusicNotes from "phosphor-svelte/lib/MusicNotes";
    import Subtitles from "phosphor-svelte/lib/Subtitles";

    export let assetId: string;
    export let playbackId: string;
    export let track: Mux.Video.Track;

    const isGenerated = track.type == "text" &&
        track.text_source?.startsWith("generated");
    const isDeletable = track.type == "text" ||
        (track.type == "audio" && !track.primary);
    const isDownloadable = track.type == "text" &&
        track.status == "ready";
</script>

<AccordionItem tag="div">
    <span class="track-details__disclosure" slot="header">
        { #if track.type == "video" }
            <VideoCamera />
        { :else if track.type == "audio" }
            <MusicNotes />
        { :else if track.type == "text" }
            <Subtitles />
        { /if }
        { track.type }
        { #if isGenerated }
            (autogen)
        { /if }
    </span>
    <code>
        <pre>{ JSON.stringify(track, null, 4) }</pre>
    </code>
    { #if isDownloadable && track.id }
        <DownloadAction
            playbackId={ playbackId }
            trackId={ track.id }
        />
    { /if }
    { #if isDeletable && track.id }
        <DeleteAction
            assetId={ assetId }
            trackId={ track.id }
        />
    { /if }
</AccordionItem>
<style>
    .track-details__disclosure {
        display: inline-flex;
        align-items: center;
        gap: 0.5em;
    }
</style>