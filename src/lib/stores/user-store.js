import { writable } from "svelte/store";

export let user=writable(null)

export let hacksList=writable([])
export let clicksList=writable([])

export let allUsersList=writable([])
export let allHacksList=writable([])
export let allClicksList=writable([])
