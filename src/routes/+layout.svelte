<script lang="ts">
    import SettingsDialog from "@/components/SettingsDialog.svelte";
    import "@/global.css";
</script>

<svelte:head>
    <title>Mux Captions</title>
</svelte:head>
<header>
    <SettingsDialog />
</header>
<main>
    <slot />
</main>