<script>
    // import Userdata from "./Userdata.svelte";

    import { clicksList, hacksList, user } from "$lib/stores/user-store.js";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { db } from "$lib/firebase";
    import { logout } from "$lib/users";
    import audioUrl from "$lib/resource/mixkit-sound.wav"
    import {
        collection,
        query,
        where,
        onSnapshot,
        orderBy,
        limit,
        getDocs,
    } from "firebase/firestore";
    import Homepage from "./Homepage.svelte";

    let isLoaded = false;

    function playSound(url) {
        const audio = new Audio(url);
        audio.play();
    }
    onMount(() => {
        var userStr = localStorage.getItem("user");
        if (!userStr) {
            goto("/login");
        } else {
            $user = JSON.parse(userStr);
            loadHacks();
            loadClicks();
        }
    });

    async function loadHacks() {
        console.log('user ref',$user.ref)
        const q = query(
            collection(db, "hacks"),
            where("archived", "==", false),
            where("timestamp", ">", Date.now()-(24 * 60 * 60 * 1000)),
            where("ref", "==", $user.ref),
            orderBy("timestamp", "desc"),
            limit(25),
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    let newList = [change.doc.data(), ...$hacksList];
                    const sortedDocs = newList.sort(
                        (a, b) => b.timestamp - a.timestamp,
                    );
                    if (isLoaded && sortedDocs.length >= $hacksList.length) {
                        playSound(audioUrl);
                    }
                    $hacksList = sortedDocs;
                    console.log("New Hack: ", change.doc.data());
                }
                if (change.type === "modified") {
                    let data = change.doc.data();
                    let filteredItems = $hacksList.filter(
                        (h) => h.id !== data.id,
                    );

                    $hacksList = [change.doc.data(), ...filteredItems];
                    console.log("Modified Hack: ", change.doc.data());
                    if (isLoaded) {playSound(audioUrl)};
                }
                console.log("new list Hacks", $hacksList);
            });
        });
    }

    async function loadClicks() {
        const q = query(
            collection(db, "clicks"),
            where("ref", "==", $user.ref),
            where("timestamp", ">", Date.now()-(24 * 60 * 60 * 1000)),
            orderBy("timestamp", "desc"),
            limit(25),
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    $clicksList = [change.doc.data(), ...$clicksList];
                    console.log("New Hack: ", change.doc.data());
                }
                if (change.type === "modified") {
                    let data = change.doc.data();
                    let filteredItems = $clicksList.filter(
                        (h) => h.id !== data.id,
                    );
                    $clicksList = [change.doc.data(), ...filteredItems];
                    console.log("Modified Hack: ", change.doc.data());
                }
                console.log("new list Clicks", $clicksList);
            });
        });
    }

    function showadminpanel() {
        window.open("/master");
    }
</script>

{#if $user}
    <section class="home">
        <div>
            <div class="logdata">
                <strong>{$user.email}</strong>
                <span style="display: flex;align-items: center;gap:8px">
                    {#if $user.isAdmin}
                    <button on:click={showadminpanel}>
                        <span>Admin</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><path fill="currentColor" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"/></svg>
                    </button>
                    {/if}
                    <button on:click={logout}>
                        <span>Logout</span>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.1111 0H8.88889V11.1111H11.1111V0ZM16.4778 2.41111L14.9 3.98889C16.6556 5.4 17.7778 7.56667 17.7778 10C17.7778 14.3 14.3 17.7778 10 17.7778C5.7 17.7778 2.22222 14.3 2.22222 10C2.22222 7.56667 3.34444 5.4 5.08889 3.97778L3.52222 2.41111C1.36667 4.24444 0 6.95556 0 10C0 15.5222 4.47778 20 10 20C15.5222 20 20 15.5222 20 10C20 6.95556 18.6333 4.24444 16.4778 2.41111Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                
                </span>
            </div>
            <div style="margin-top: 8px;">

                <!-- <Userdata uid={$user.uid} /> -->
                <Homepage />
            </div>
        </div>
    </section>
{/if}

<style>
    :global(body) {
        padding: 0;
        margin: 0;
    }

    .logdata {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1ch;
        background-color: #0b3d6b;
        color: white;
    }

 
    button {
        all: unset;
        padding: 1ch;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 12px;
        background-color: #362bbb;
        border-radius: 4px;
        font-size: 14px;
    }
</style>
