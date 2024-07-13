<script lang="ts">
    import { tokenId, tokenSecret } from "@/lib/stores";
    import Info from "phosphor-svelte/lib/Info";
    import Gear from "phosphor-svelte/lib/Gear";
</script>

{ #if !$tokenId || !$tokenSecret }
    <div class="authorization-info">
        <Info />    
        <p>It looks like your API credentials are missing. Click <Gear /> in the navigation bar to update them.</p>
    </div>
{ :else }
    <slot />
{ /if }

<style>
    .authorization-info {
        max-width: 40ch;
        text-align: center;
        margin-inline: auto;
    }

    :global(.authorization-info > svg) {
        display: inline;
        font-size: 2rem;
        margin-bottom: 0.75rem;
    }

    :global(.authorization-info p > svg) {
        display: inline;
        vertical-align: -2.5px;
    }
</style>