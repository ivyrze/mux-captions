<script lang="ts">
    export let playbackId;

    const animatedSrc =
        `https://image.mux.com/${ playbackId }/animated.gif`;
</script>

<img src={ animatedSrc } alt="" />
<style>
    img {
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border-radius: 0.5rem;
    }
</style>