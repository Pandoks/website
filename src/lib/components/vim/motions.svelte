<script lang="ts">
  import { activeVimElement } from "$lib/stores";
  import { onMount } from "svelte";

  export let element: string;

  const findClosestRight = (element: HTMLElement) => {
    const { top, left, right, bottom } = element.getBoundingClientRect();
    const horizontalDetectionLine = (top + bottom) / 2;
    let closestElement = null;
    const elements = document.;
  };

  const handleKey = (event: KeyboardEvent) => {
    const key = event.key;
    if (
      !$activeVimElement.selected &&
      (key === "h" || key === "j" || key === "k" || key === "l")
    ) {
      switch (window.location.pathname) {
        case "socials":
          activeVimElement.set({
            selected: document.getElementById("nav-jason-kwok"),
            left: null,
            down: document.getElementById("nav-socials"),
            up: null,
            right: document.getElementById("youtube"),
          });
          break;

        case "essays":
          activeVimElement.set({
            selected: document.getElementById("nav-jason-kwok"),
            left: null,
            down: document.getElementById("nav-socials"),
            up: null,
            right: null,
          });
          break;

        case "journal":
          activeVimElement.set({
            selected: document.getElementById("nav-jason-kwok"),
            left: null,
            down: document.getElementById("nav-socials"),
            up: null,
            right: null,
          });
          break;

        default:
          activeVimElement.set({
            selected: document.getElementById("nav-jason-kwok"),
            left: null,
            down: document.getElementById("nav-socials"),
            up: null,
            right: null,
          });
      }
      if (window.location.pathname === "essays") {
      }
    }
  };

  onMount(() => {
    document.addEventListener("keydown", handleKey);
  });
</script>

<slot />
