<script lang="ts">
    import { Button, Modal, Fileupload, Select } from "flowbite-svelte";
    import Upload from "phosphor-svelte/lib/Upload";
    import { fetchAuthorized } from "@/lib/api";
    import { invalidate } from '$app/navigation';
    import iso6391 from 'iso-639-1';

    export let assetId: string;

    let isOpen = false;
    let files: FileList;
    let locale = "en";

    const uploadFile = async () => {
        if (files.length != 1 || !locale) {
            return;
        }

        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("locale", locale);

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

    const locales = iso6391.getAllNames().map(name => {
        return {
            name, value: iso6391.getCode(name)
        };
    });
</script>

<Button
    class="with-icon"
    on:click={ () => { isOpen = true } }
>
    Upload
    <Upload />
</Button>
<Modal
    title="Upload"
    bind:open={ isOpen }
    autoclose
>
    <label for="file-upload">
        File
    </label>
    <Fileupload
        id="file-upload"
        accept=".vtt,.srt"
        bind:files
        required
    />
    <p>Allowed file types: .vtt, .srt</p>

    <label for="file-locale">
        Locale
    </label>
    <Select
        id="file-locale"
        bind:value={ locale }
        required
    >
        { #each locales as locale }
            <option value={ locale.value }>
                { locale.name }
            </option>
        { /each }
    </Select>
    <svelte:fragment slot="footer">
        <Button on:click={ uploadFile }>
            Upload
        </Button>
    </svelte:fragment>
</Modal>
