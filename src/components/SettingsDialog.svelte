<script lang="ts">
    import { Modal, Input, Button } from 'flowbite-svelte';
    import { tokenId, tokenSecret } from '@/lib/stores';
    import Gear from 'phosphor-svelte/lib/Gear';

    let isOpen = false;
    let unsavedTokenId = $tokenId;
    let unsavedTokenSecret = $tokenSecret;

    const saveSettings = () => {
        tokenId.set(unsavedTokenId);
        tokenSecret.set(unsavedTokenSecret);
    };

    const resetSettings = () => {
        tokenId.set("");
        tokenSecret.set("");
        unsavedTokenId = "";
        unsavedTokenSecret = "";
    };
</script>
  
<Button
    on:click={ () => { isOpen = true } }
    color="none"
>
    <Gear />
</Button>
<Modal
    title="Settings"
    bind:open={ isOpen }
    autoclose
>
    <p>
        To create a new access token, visit the <a href="https://dashboard.mux.com/settings/access-tokens" target="_blank" rel="noopener noreferrer">Mux dashboard</a>. Your credentials will be stored locally across sessions.
    </p>
    <div class="settings-dialog__form">
        <label for="token-id">
            Token ID
        </label>
        <Input
            id="token-id"
            bind:value={ unsavedTokenId }
            required
        />
        <label for="token-secret">
            Token secret
        </label>
        <Input
            id="token-secret"
            bind:value={ unsavedTokenSecret }
            required
        />
    </div>
    <svelte:fragment slot="footer">
        <Button on:click={ saveSettings }>
            Save
        </Button>
        <Button on:click={ resetSettings } color="alternative">
            Reset
        </Button>
    </svelte:fragment>
</Modal>
<style>
    .settings-dialog__form {
        margin-block: 0.75rem !important;
    }

    .settings-dialog__form label {
        display: block;
        margin-block: 0.75rem 0.5rem;
    }
</style>