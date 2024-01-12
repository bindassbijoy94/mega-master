<script>
    // import Userdata from "./Userdata.svelte";

    import { allHacksList, user, allUsersList } from "$lib/stores/user-store.js";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { db } from "$lib/firebase";
    import { getAllUsers, logout } from "$lib/users";
    import audioUrl from "$lib/resource/mixkit-sound.wav";
    import {
        collection,
        query,
        where,
        onSnapshot,
        orderBy,
        limit,
    } from "firebase/firestore";
    import AdminPanel from "./AdminPanel.svelte";
    import AdminHomeBtn from "$lib/components/atoms/AdminHomeBtn.svelte";

    let isLoaded = false;

    async function playSound(url) {
        const audio = new Audio(url);
        try {
            await audio.play();
            
        } catch (error) {
            console.log('need user interaction to play audio')
        }
    }


    onMount(() => {
        var userStr = localStorage.getItem("user");
        if (!userStr) {
            goto("/login");
        } else {
            $user = JSON.parse(userStr);
            getAllUsers().then((u) => ($allUsersList = u));
            loadAllHacks();
            setTimeout(() => {
                isLoaded = true;
            }, 5000);
        }
    });

    async function loadAllHacks() {
        const q = query(
            collection(db, "hacks"),
            where("archived", "==", false),
            where("timestamp", ">", Date.now() - 3 * 24 * 60 * 60 * 1000),
            orderBy("timestamp", "desc"),
            limit(30),
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    console.log("item added \n");
                    let newList = [change.doc.data(), ...$allHacksList];
                    const sortedDocs = newList.sort(
                        (a, b) => b.timestamp - a.timestamp,
                    );
                    if (isLoaded && sortedDocs.length >= $allHacksList.length) {
                       
                        playSound(audioUrl);
                    }
                    $allHacksList = sortedDocs;
                    console.log("New Hack: ", change.doc.data());
                }
                if (change.type === "modified") {
                    let data = change.doc.data();
                    let filteredItems = $allHacksList.filter(
                        (h) => h.id !== data.id,
                    );

                    $allHacksList = [change.doc.data(), ...filteredItems];
                    console.log("Modified Hack: ", change.doc.data());
                    if (isLoaded && !change.doc.data().archived) {
                        playSound(audioUrl);
                    }
                }

                console.log("new list Hacks", $allHacksList);
            });
        });
    }
</script>

{#if $user}
    <section class="home">
        <div>
            <div class="logdata">
                <span style="display: flex;; gap:12px; align-items: center;">
                    <strong>{$user.email}</strong>

                    {#if $user.isAdmin}
                        <AdminHomeBtn />
                    {/if}
                </span>
                <button on:click={logout}>
                    <span>Logout</span>
                    <svg
                        width="15"
                        height="15"
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
            </div>
            <div>
                <!-- <Userdata uid={$user.uid} /> -->
                <AdminPanel />
            </div>
        </div>
    </section>
{/if}

<style>
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
        padding: 6px 16px;
        background-color: #362bbb;
        border-radius: 4px;
        font-size: 14px;
    }
</style>
