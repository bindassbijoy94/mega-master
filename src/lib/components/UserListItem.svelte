<script>
    import { removeUser } from "$lib/users";
  import SingleUserItem from "./SingleUserItem.svelte";
  import CreateUser from "./CreateUser.svelte";
    import { allUsersList } from "$lib/stores/user-store";




  async function deleteUser(uid) {
    await removeUser(uid)
    $allUsersList=$allUsersList.filter((u)=>u.uid!==uid)
  }
  async function addUser(user) {
    $allUsersList=[...$allUsersList,user]
  }
</script>

<div class="parent">
  <CreateUser {addUser}/>
  <div class="demo-list" twoLine avatarList>
    {#each $allUsersList as user}
      <SingleUserItem {user} {deleteUser}/>
    {/each}
  </div>
</div>

<style>
  * :global(.demo-list) {
    max-width: 90vw;
    min-width: 65vw;
    border: 1px solid
      var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
  }

  .demo-list{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    background-color: #003362;
        color:white;
    border-radius: 6px;
    padding-top: 8px;
    padding-right: 4px;
    padding-left: 4px;
    margin-bottom: 20px;
  }

  .parent{
    display: grid;
    place-items: center;

  }
</style>
