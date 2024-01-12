<script>
  import { removeUser, updateUser } from "$lib/users";

  // import { db } from "./firebase.js";
  import Delete from "svelte-material-icons/Delete.svelte";

  export let user;
  export let deleteUser;

  const apiUrl = "/api/admin";

  let isdeleting = false;
  let isdisabling = false;
  let isenabling = false;

  var removed = false;

  async function disableUser() {
    isdisabling = true;
    await updateUser(user.uid, { disabled: true });
    user.disabled = true;
    isdisabling = false;
  }
  async function enableUser() {
    isenabling = true;
    await updateUser(user.uid, { disabled: false });
    user.disabled = false;
    isenabling = false;
  }
</script>

<div class="item">
  <!-- Make non-interactive -->
  <div class="row">
    <div
      class="graphic"
      style="background-image: url(https://place-hold.it/40x40?text={user.displayName.split(
        '',
      )[0]}&fontsize=16);"
    >
      <!-- Graphic content -->
    </div>
    <div class="text">
      <h3 style="font-size: 18px;">{user.displayName}</h3>
      <p style="font-size: 14px;">{user.email}</p>
    </div>
  </div>
  <div class="meta">
    <span style="display: flex; align-items: center;">
      {#if user.disabled}
        <span on:click={enableUser} style="opacity: 0.9;">
          {#if !isenabling}
            <button class="enable">Enable</button>
          {:else}
            <span>Enabling...</span>
          {/if}
        </span>
      {:else}
        <span on:click={disableUser} style="opacity: 0.9;">
          {#if !isdisabling}
            <button class="disable">Disable</button>
          {:else}
            <span>Disabling...</span>
          {/if}
        </span>
      {/if}
      <span
        on:click={() => deleteUser(user.uid)}
        style="opacity: 0.9"
        class="delete"
      >
        {#if isdeleting == false}
          <button class="disable" disabled={user.isAdmin}>Remove</button>
        {:else}
          <span>deleting..</span>
        {/if}
      </span>
    </span>
  </div>
</div>

<style>
  h3,
  p {
    margin: 3px;
  }

  .row {
    display: flex;
    align-items: center;
    gap:6px
  }
  .item {
    padding-bottom: 8px;
    padding-left: 6px;
    width: 320px;
  }
  .delete {
    padding-left: 6px;
  }
  .delete:hover {
    color: red;
    opacity: 80%;
  }
  .disable {
    opacity: 80%;
  }
  .disable:hover {
    cursor: pointer;
    background-color: orange;
    opacity: 100%;
  }
  .enable {
    opacity: 80%;
  }
  .enable:hover {
    cursor: pointer;
    background-color: blue;
    color: white;
    opacity: 100%;
  }

  .graphic {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
  .meta{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 4px;
  }
</style>
