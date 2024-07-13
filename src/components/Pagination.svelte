<script lang="ts">
    import { Pagination } from "flowbite-svelte";
    import CaretLeft from "phosphor-svelte/lib/CaretLeft";
    import CaretRight from "phosphor-svelte/lib/CaretRight";

    export let page = 1;

    const previousPage = () => { page = Math.min(1, page + 1); };
    const nextPage = () => { page++; };

    $: pages = [
        { name: page.toString() }
    ];
</script>

<Pagination
    pages={ pages }
    on:previous={ previousPage }
    on:next={ nextPage }
    icon
>
    <svelte:fragment slot="prev">
        <span class="sr-only">Previous</span>
        <CaretLeft />
    </svelte:fragment>
    <svelte:fragment slot="next">
        <span class="sr-only">Next</span>
        <CaretRight />
    </svelte:fragment>
</Pagination>