<script lang="ts">
    export let playbackId;

    const animatedSrc =
        `https://image.mux.com/${ playbackId }/animated.gif`;
</script>

<img src={ animatedSrc } alt="" />