<script lang="ts">
    import type Mux from '@mux/mux-node';
    import VideoPreview from '@/components/VideoPreview.svelte';

    export let videos: Mux.Video.Asset[] = [];
</script>

<div class="video-picker">
    { #each videos as video }
        <VideoPreview { video } />
    { /each }
</div>
<style>
    .video-picker {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.25rem 1rem;
    }
</style>