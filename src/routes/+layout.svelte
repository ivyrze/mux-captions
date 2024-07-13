<script lang="ts">
    import Navigation from "@/components/Navigation.svelte";
    import AuthorizationInfo from "@/components/AuthorizationInfo.svelte";
    import "@/global.css";
</script>

<svelte:head>
    <title>Mux Captions</title>
</svelte:head>
<header>
    <Navigation />
</header>
<main>
    <AuthorizationInfo>
        <slot />
    </AuthorizationInfo>
</main>