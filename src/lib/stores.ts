import { writable } from "svelte/store";
import type { VimNavigationElement } from "./types";

export const activeVimElement = writable<VimNavigationElement>({
  selected: document.getElementById("nav-jason-kwok")!,
  left: null,
  down: document.getElementById("nav-socials")!,
  up: null,
  right: null,
});
