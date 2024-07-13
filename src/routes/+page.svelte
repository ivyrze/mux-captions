<script lang="ts">
    import Mux from '@mux/mux-node';
    import { Spinner } from 'flowbite-svelte';
    import { fetchAuthorized } from '@/lib/api';
    import VideoPicker from "@/components/VideoPicker.svelte";
    import Pagination from '@/components/Pagination.svelte';

    let page: number;
    
    const fetcher = async (page: number) => {
        const params = new URLSearchParams();
        params.set('page', page.toString());

        return await fetchAuthorized<Mux.BasePage<Mux.Video.Asset>>(
            `/api/assets?${ params }`
        );
    };
    $: responsePromise = fetcher(page);
</script>

{ #await responsePromise }
    <Spinner />
{ :then response }
    <VideoPicker videos={ response.data } />
{ /await }
<Pagination bind:page />