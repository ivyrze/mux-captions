<script lang="ts">
    import type Mux from '@mux/mux-node';
    import VideoPreview from '@/components/VideoPreview.svelte';

    export let videos: Mux.Video.Asset[] = [];
</script>

{ #each videos as video }
    <VideoPreview { video } />
{ /each }