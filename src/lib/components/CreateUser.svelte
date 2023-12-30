<script>
    import { createUser } from "$lib/users";

  // import { db } from "./firebase.js";
  const apiUrl = "/api/admin";

  export let addUser
  var newlyCreatedUser = null;
  var succesMessage = null;
  var user = null;
  var newuser = {
    email: "",
    password: "",
    displayName: "",
  };

  var inputValid = null;
  var creating = false;

  async function addNewUser() {
        var uid=Date.now().toString()
        const userData = {
            email: newuser.email,
            password: newuser.password,
            displayName: newuser.displayName,
            disabled: false,
            uid:uid ,
            isAdmin: false,
            lastChecked: 0,
            ref: Date.now().toString(),
        };

        try {
            await createUser(userData, uid);
            addUser(userData)
  
        } catch (error) {
            console.error("Error adding user: ", error);
        }
    }
</script>

<div class="form-wrapper">
  <form on:submit|preventDefault={addNewUser}>
    <input
      class="sized-item"
      name="DisplayName"
      placeholder="Name"
      bind:value={newuser.displayName}
    />
    <input
      class="sized-item"
      name="Email"
      type="email"
      placeholder="@Email"
      bind:value={newuser.email}
    />
    <input
      class="sized-item"
      name="Password"
      type="text"
      placeholder="Password"
      bind:value={newuser.password}
    />
    {#if creating == false}
      <button class="sized-item" type="submit">add new user</button>
    {:else}
      <button disabled>createing user...</button>
    {/if}
    <!-- <button on:click={()=>updateuser(changeNameJson("23UwQShmbVdp6DUatu4Mj9GzKSs1",name))}>update name</button> -->
  </form>
</div>

{#if inputValid == false}
  <span>
    Invalid Input: name should be more than 3 letters, password 6 letters
  </span>
  <button on:click={() => (inputValid = null)}>OK</button>
{/if}

<section>
  {#if newlyCreatedUser !== null}
    <div>
      {newlyCreatedUser.email} / {newlyCreatedUser.displayName} /{newlyCreatedUser.uid}
      {#if succesMessage === null}
        <div>making data...</div>
      {/if}
    </div>
  {/if}
  {#if succesMessage !== null}
    {succesMessage}
  {/if}
</section>

<section>
  {#if user !== null}
    <!-- content here -->
    <div>
      {user.email} / {user.displayName}
    </div>
  {/if}
</section>

<style>
  .form-wrapper{
    background-color: rgb(96 95 94);
    padding: 0 14px;
    border-radius: 4px;
    margin: 0 14px 14px 14px;
  }
  .sized-item {
    width: 154px;
    padding:4px;
    border-radius: 4px;

  
  }
  button.sized-item {
    width: 164px;
    background-color: rgba(112, 26, 79, 1);
    color: white;
    border-color: rgba(112, 26, 79, 1);

  }

  form{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 16px 0;
  }
</style>
