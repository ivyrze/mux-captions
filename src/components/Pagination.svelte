<script lang="ts">
    import { Pagination } from "flowbite-svelte";
    import CaretLeft from "phosphor-svelte/lib/CaretLeft";
    import CaretRight from "phosphor-svelte/lib/CaretRight";

    export let page = 1;

    const previousPage = () => { page = Math.min(1, page + 1); };
    const nextPage = () => { page++; };

    $: pages = Array(page).fill(0).map((_, index) => ({
        name: (++index).toString(), active: index == page
    }));
</script>

<div class="pagination">
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
</div>
<style>
    .pagination {
        text-align: center;
        margin-top: 3rem;
    }
</style>