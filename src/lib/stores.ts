import { writable } from "svelte/store";
import type { VimNavigationElement } from "./types";

export const activeVimElement = writable<VimNavigationElement>({
  selected: null,
  left: null,
  down: null,
  up: null,
  right: null,
});
