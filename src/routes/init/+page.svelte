<script>
    import { addClick, addHack } from "$lib/actions";

    import {
        createUser,
        disableUser,
        getUser,
        login,
        removeUser,
        updateCheckpoint,
    } from "$lib/users";

    let isInitAdmin = false;

    async function initAdmin() {
        const newUser = {
            email: "master@email.com",
            password: "master1234",
            displayName: "Master Admin",
            disabled: false,
            uid: "masteradmin",
            isAdmin: true,
            lastChecked: 0,
            ref: Date.now().toString(),
        };

        try {
            await createUser(newUser, "masteradmin");
            isInitAdmin = true;
        } catch (error) {
            console.error("Error adding user: ", error);
        }
    }
    async function addCommonUser() {
        var uid=Date.now().toString()
        const newUser = {
            email: "email@has.das",
            password: "master1234",
            displayName: "General User",
            disabled: false,
            uid:uid ,
            isAdmin: false,
            lastChecked: 0,
            ref: Date.now().toString(),
        };

        try {
            await createUser(newUser, uid);
  
        } catch (error) {
            console.error("Error adding user: ", error);
        }
    }
</script>

{#if isInitAdmin}
    <div>init Admin complete</div>
{:else}
    <button on:click={initAdmin}>init admin</button>
    {/if}
    <button on:click={addCommonUser}>add common user</button>
<button on:click={() => addClick("1703856723874")}>add click</button>
<button on:click={() => addHack("1703856723874")}>add hack</button>
<button on:click={() => updateCheckpoint("masteradmin")}>update Checked</button>
