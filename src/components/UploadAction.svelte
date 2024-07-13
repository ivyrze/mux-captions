<script lang="ts">
    import { Button, Modal, Fileupload } from "flowbite-svelte";
    import Upload from "phosphor-svelte/lib/Upload";
    import { fetchAuthorized } from "@/lib/api";
    import { invalidate } from '$app/navigation';

    export let assetId: string;

    let isOpen = false;
    let files: FileList;

    const uploadFile = async () => {
        if (files.length != 1) {
            return;
        }

        const formData = new FormData();
        formData.append("file", files[0]);

        await fetchAuthorized(
            `/api/assets/${ assetId }/tracks`,
            {
                method: 'POST',
                body: formData
            }
        );
        await invalidate(
            `/api/assets/${ assetId }`
        );
    };
</script>

<Button on:click={ () => { isOpen = true } }>
    Upload <Upload />
</Button>
<Modal
    title="Upload"
    bind:open={ isOpen }
    autoclose
>
    <Fileupload
        id="file-upload"
        accept=".vtt,.srt"
        bind:files
        required
    />
    <p>Allowed file types: .vtt, .srt</p>
    <svelte:fragment slot="footer">
        <Button on:click={ uploadFile }>
            Upload
        </Button>
    </svelte:fragment>
</Modal>
