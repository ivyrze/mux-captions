<script lang="ts">
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";
    import SettingsDialog from "@/components/SettingsDialog.svelte";
</script>

<Navbar class="navbar">
    <NavBrand href="/" class="navbar__title">
        Mux Captions
    </NavBrand>
    <SettingsDialog />
</Navbar>
<style lang="postcss">
    :global(.navbar) {
        position: fixed;
        border-bottom: 1px solid theme(colors.primary.200);
    }

    :global(.navbar__title) {
        font-weight: 600;
    }
</style>