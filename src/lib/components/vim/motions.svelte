<script lang="ts">
  import { activeVimElement } from "$lib/stores";
  import { findClosestElementOnLine, getElementsFromLine } from "$lib/utils";
  import { onMount } from "svelte";

  export let element: string;

  const handleKey = (event: KeyboardEvent) => {
    const key = event.key;
    if (key === "Escape") {
      activeVimElement.set({
        selected: null,
        left: null,
        down: null,
        up: null,
        right: null,
      });
      return;
    }
    if (
      !$activeVimElement.selected &&
      (key === "h" || key === "j" || key === "k" || key === "l")
    ) {
      const selected = document.getElementById("nav-jason-kwok")!;
      // horizontal line to the right of selected element
      const { top, left, right, bottom } = selected.getBoundingClientRect();
      const startingPoint = { x: right, y: (top + bottom) / 2 };
      const endingPoint = { x: window.innerWidth, y: (top + bottom) / 2 };

      $activeVimElement.selected = selected;
      $activeVimElement.down = document.getElementById("nav-socials")!;
      switch (window.location.pathname) {
        case "socials":
          $activeVimElement.right = findClosestElementOnLine({
            startingPoint,
            endingPoint,
            lookup: { classes: new Set(["social-link"]) },
          }) as HTMLElement;
          break;

        case "essays":
          $activeVimElement.right = findClosestElementOnLine({
            startingPoint,
            endingPoint,
            lookup: { classes: new Set(["essay-link"]) },
          }) as HTMLElement;
          break;

        case "journal":
          $activeVimElement.right = findClosestElementOnLine({
            startingPoint,
            endingPoint,
            lookup: { classes: new Set(["timeline-item"]) },
          }) as HTMLElement;
          break;
      }

      return;
    }

    switch (window.location.pathname) {
      case "socials":
        if (key === "h") {
          const left = $activeVimElement.left;
        }
        $activeVimElement.right = findClosestElementOnLine({
          startingPoint,
          endingPoint,
          lookup: { classes: new Set(["social-link"]) },
        }) as HTMLElement;
        break;

      case "essays":
        $activeVimElement.right = findClosestElementOnLine({
          startingPoint,
          endingPoint,
          lookup: { classes: new Set(["essay-link"]) },
        }) as HTMLElement;
        break;

      case "journal":
        $activeVimElement.right = findClosestElementOnLine({
          startingPoint,
          endingPoint,
          lookup: { classes: new Set(["timeline-item"]) },
        }) as HTMLElement;
        break;
    }

    switch (key) {
      case "h":
        const left = $activeVimElement.left;
        if (!left) return;
        $activeVimElement.selected = left;
        break;
      case "j":
      case "k":
      case "l":
    }
  };

  onMount(() => {
    document.addEventListener("keydown", handleKey);
  });
</script>

<slot />
