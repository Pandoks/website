<script lang="ts">
  import { activeVimElement } from "$lib/stores";
  import {
    getClosestElementFromLine,
    getElementSurroundings,
  } from "$lib/utils";
  import { onMount } from "svelte";

  $: {
    if ($activeVimElement.selected) {
      console.log("changing colors");
      $activeVimElement.selected.style.backgroundColor = "black";
    }
  }

  const handleKey = (event: KeyboardEvent) => {
    const key = event.key;
    if (key === "Escape" && $activeVimElement.selected) {
      $activeVimElement.selected.style.backgroundColor = "";
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
      console.log("initializing");
      const selected = document.getElementById("nav-jason-kwok")!;
      // horizontal line to the right of selected element
      const { top, left, right, bottom } = selected.getBoundingClientRect();
      const startingPoint = { x: right, y: (top + bottom) / 2 };
      const endingPoint = { x: window.innerWidth, y: (top + bottom) / 2 };

      $activeVimElement.selected = selected;
      $activeVimElement.down = document.getElementById("nav-socials")!;
      switch (window.location.pathname) {
        case "socials":
          $activeVimElement.right = getClosestElementFromLine({
            startingPoint,
            endingPoint,
            lookup: { classes: new Set(["social-link"]) },
          }) as HTMLElement;
          break;

        case "essays":
          $activeVimElement.right = getClosestElementFromLine({
            startingPoint,
            endingPoint,
            lookup: { classes: new Set(["essay-link"]) },
          }) as HTMLElement;
          break;

        case "journal":
          $activeVimElement.right = getClosestElementFromLine({
            startingPoint,
            endingPoint,
            lookup: { classes: new Set(["timeline-item"]) },
          }) as HTMLElement;
          break;
      }

      return;
    }

    console.log("changing");
    switch (key) {
      case "h":
        const left = $activeVimElement.left;
        if (!left) return;
        $activeVimElement.selected!.style.backgroundColor = "";
        $activeVimElement.selected = left;
        break;

      case "j":
        console.log("j");
        const down = $activeVimElement.down;
        if (!down) return;
        $activeVimElement.selected!.style.backgroundColor = "";
        $activeVimElement.selected = down;
        break;

      case "k":
        const up = $activeVimElement.up;
        if (!up) return;
        $activeVimElement.selected!.style.backgroundColor = "";
        $activeVimElement.selected = up;
        break;

      case "l":
        const right = $activeVimElement.right;
        if (!right) return;
        $activeVimElement.selected!.style.backgroundColor = "";
        $activeVimElement.selected = right;
        break;
    }
    const { leftElement, downElement, upElement, rightElement } =
      getElementSurroundings($activeVimElement.selected!);
    $activeVimElement.left = leftElement;
    $activeVimElement.down = downElement;
    $activeVimElement.up = upElement;
    $activeVimElement.right = rightElement;
  };

  onMount(() => {
    document.addEventListener("keydown", handleKey);
  });
</script>

<slot />
