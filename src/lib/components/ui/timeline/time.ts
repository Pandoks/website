import { writable } from "svelte/store";

// Store the ID of the currently opened time
export const selectedTime = writable(null);
