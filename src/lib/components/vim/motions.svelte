<script lang="ts">
  import { afterNavigate, goto } from "$app/navigation";
  import { activeVimElement } from "$lib/stores";
  import {
    getClosestElementFromLine,
    getElementSurroundings,
  } from "$lib/utils";
  import { onMount } from "svelte";

  const backgroundColor = "black";

  $: {
    if ($activeVimElement.selected) {
      $activeVimElement.selected.style.backgroundColor = backgroundColor;
    }
  }

  onMount(() => {
    document.addEventListener("keydown", handleKey);
    document.addEventListener("click", resetVim);
    document.addEventListener("scroll", handleScroll);
  });

  afterNavigate(() => {
    // selected element is deleted because of new page render so need to redo
    if ($activeVimElement.selected) {
      const newId = $activeVimElement.selected.id;
      $activeVimElement.selected = document.getElementById(newId);
      const { leftElement, downElement, upElement, rightElement } =
        getElementSurroundings($activeVimElement.selected!);
      $activeVimElement.left = leftElement;
      $activeVimElement.down = downElement;
      $activeVimElement.up = upElement;
      $activeVimElement.right = rightElement;
      return;
    }
  });

  const handleScroll = () => {
    const { leftElement, downElement, upElement, rightElement } =
      getElementSurroundings($activeVimElement.selected!);
    $activeVimElement.left = leftElement;
    $activeVimElement.down = downElement;
    $activeVimElement.up = upElement;
    $activeVimElement.right = rightElement;
  };

  const resetVim = () => {
    if ($activeVimElement.selected) {
      $activeVimElement.selected.style.backgroundColor = "";
      activeVimElement.set({
        selected: null,
        left: null,
        down: null,
        up: null,
        right: null,
      });
    }
  };

  const handleKey = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === "Escape" && $activeVimElement.selected) {
      resetVim();
      return;
    }

    if (
      key === "Enter" &&
      $activeVimElement.selected &&
      $activeVimElement.selected.getAttribute("href")
    ) {
      const href = $activeVimElement.selected.getAttribute("href")!;
      goto(href);
      return;
    } else if (
      key === "Enter" &&
      $activeVimElement.selected &&
      $activeVimElement.selected.querySelector("button") &&
      window.location.pathname === "/journal"
    ) {
      const savedActiveElementId = $activeVimElement.selected.id;
      $activeVimElement.selected.querySelector("button")!.click();
      const activeElement = document.getElementById(savedActiveElementId)!;
      $activeVimElement.selected = activeElement;
      const { leftElement, downElement, upElement, rightElement } =
        getElementSurroundings($activeVimElement.selected!);
      $activeVimElement.left = leftElement;
      $activeVimElement.down = downElement;
      $activeVimElement.up = upElement;
      $activeVimElement.right = rightElement;

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
        case "/socials":
          $activeVimElement.right = getClosestElementFromLine({
            startingPoint,
            endingPoint,
          }) as HTMLElement;
          break;

        case "/essays":
          $activeVimElement.right = getClosestElementFromLine({
            startingPoint,
            endingPoint,
          }) as HTMLElement;
          break;

        case "/journal":
          $activeVimElement.right = getClosestElementFromLine({
            startingPoint,
            endingPoint,
          }) as HTMLElement;
          break;
      }

      return;
    }

    switch (key) {
      case "h":
        const left = $activeVimElement.left;
        if (!left) return;
        $activeVimElement.selected!.style.backgroundColor = "";
        $activeVimElement.selected = left;
        break;

      case "j":
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

      default:
        return;
    }
    const { leftElement, downElement, upElement, rightElement } =
      getElementSurroundings($activeVimElement.selected!);
    $activeVimElement.left = leftElement;
    $activeVimElement.down = downElement;
    $activeVimElement.up = upElement;
    $activeVimElement.right = rightElement;
  };
</script>

<slot />
