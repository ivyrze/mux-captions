<script lang="ts">
    import VideoDetails from "@/components/VideoDetails.svelte";

    export let data;
</script>

<VideoDetails video={ data.data } />