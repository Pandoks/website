<script lang="ts">
  import { afterNavigate, goto } from "$app/navigation";
  import { activeVimElement } from "$lib/stores";
  import {
    getClosestElementForElement,
    getElementSurroundings,
  } from "$lib/components/vim/motions";
  import { onMount } from "svelte";
  import { scrollToView } from "$lib/journal/utils";

  const selectVimStyle = (element: HTMLElement) => {
    if (!element) {
      return;
    }
    element.style.backgroundColor = "#e8e8e8";
  };

  const resetVimStyle = (element: HTMLElement) => {
    if (!element) {
      return;
    }
    element.style.backgroundColor = "";
  };

  $: {
    if ($activeVimElement.selected) {
      selectVimStyle($activeVimElement.selected);
    }
  }

  onMount(() => {
    document.addEventListener("keydown", handleKey);
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
    document.removeEventListener("click", resetVim);
    document.removeEventListener("scroll", handleScroll);
    if ($activeVimElement.selected) {
      resetVimStyle($activeVimElement.selected!);
      activeVimElement.set({
        selected: null,
        left: null,
        down: null,
        up: null,
        right: null,
      });
    }
  };

  const initializeVim = () => {
    document.addEventListener("click", resetVim);
    document.addEventListener("scroll", handleScroll);

    const selected = document.getElementById("nav-jason-kwok")!;

    $activeVimElement.selected = selected;
    $activeVimElement.down = document.getElementById("nav-socials")!;
    const INTERVAL = 10;
    if (window.location.pathname !== "/") {
      $activeVimElement.right = getClosestElementForElement({
        element: selected,
        interval: INTERVAL,
        direction: "right",
      });
    }
  };

  const handleKey = async (event: KeyboardEvent) => {
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

    if (key === "y") {
      navigator.clipboard.writeText(window.location.href);
      return;
    }

    if (
      !$activeVimElement.selected &&
      (key === "h" || key === "j" || key === "k" || key === "l")
    ) {
      initializeVim();
      return;
    }

    switch (key) {
      case "h":
        const left = $activeVimElement.left;
        if (!left) return;
        resetVimStyle($activeVimElement.selected!);
        $activeVimElement.selected = left;
        break;

      case "j":
        const down = $activeVimElement.down;
        if (!down) return;
        resetVimStyle($activeVimElement.selected!);
        $activeVimElement.selected = down;
        break;

      case "k":
        const up = $activeVimElement.up;
        if (!up) return;
        resetVimStyle($activeVimElement.selected!);
        $activeVimElement.selected = up;
        break;

      case "l":
        const right = $activeVimElement.right;
        if (!right) return;
        resetVimStyle($activeVimElement.selected!);
        $activeVimElement.selected = right;
        break;

      default:
        return;
    }

    if (
      window.location.pathname === "/journal" &&
      $activeVimElement.selected.className.includes("timeline-item")
    ) {
      scrollToView($activeVimElement.selected);
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
