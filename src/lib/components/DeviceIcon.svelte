<script>
  import DesktopIcon from "./icons/DesktopIcon.svelte";
  import MobileIcon from "./icons/MobileIcon.svelte";
  import TabletIcon from "./icons/TabletIcon.svelte";

  export let device;
</script>

{#if device === "Desktop" || device === "Other"}
  <DesktopIcon />
{/if}
{#if device === "Tablet" || device === "Ipad"}
  <TabletIcon />
{/if}
{#if device === "Mobile"}
  <MobileIcon />
{/if}
