<script>
  import { clicksList, user } from "$lib/stores/user-store";
  import ClickDetails from "./ClickDetails.svelte";

  import HackDetails from "./HackDetails.svelte";

  export let hostUrl;



  $: linkclicks = $clicksList;

  $: console.log("linkclicks", linkclicks);
</script>

<div class="col-list">
  <HackDetails {hostUrl} suffix="users/auth/login" />
  <div class="separator"></div>
  <ClickDetails clicks={linkclicks} />
</div>

<style>
  .separator {
    width: 100%;
    height: 1px;
  }
  .col-list {
    display: flex;
    flex-direction: column;
  }
</style>
