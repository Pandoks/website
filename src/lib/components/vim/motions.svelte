<script lang="ts">
  import { afterNavigate, goto } from "$app/navigation";
  import { activeVimElement } from "$lib/stores";
  import {
    getClosestElementForElement,
    getElementSurroundings,
  } from "$lib/components/vim/motions";
  import { onMount } from "svelte";
  import { scrollToView } from "$lib/journal/utils";
  import { links } from "$lib/components/layout/links";

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

      if (
        $activeVimElement.selected &&
        $activeVimElement.selected.className.includes("timeline-item") &&
        (window.location.pathname === "/journal" ||
          window.location.pathname === "/journal/")
      ) {
        const navigationElement = document.getElementsByTagName("nav")[0];
        const { top: navigationTop, bottom: navigationBottom } =
          navigationElement.getBoundingClientRect();
        const { top: activeElementTop, bottom: activeElementBottom } =
          $activeVimElement.selected.getBoundingClientRect();
        const activeElementMiddleY =
          (activeElementTop + activeElementBottom) / 2;

        if (activeElementMiddleY > navigationBottom) {
          const lastNavigationItemId = links.slice(-1)[0]["id"];
          $activeVimElement.left =
            document.getElementById(lastNavigationItemId);
        } else if (activeElementMiddleY < navigationTop) {
          const firstNavigationItemId = links[0]["id"];
          $activeVimElement.left = document.getElementById(
            firstNavigationItemId,
          );
        } else {
          $activeVimElement.left = getClosestElementForElement({
            element: $activeVimElement.selected,
            interval: 10,
            direction: "left",
            range: 15,
          });
        }
        $activeVimElement.right = null;

        $activeVimElement.up = $activeVimElement.selected
          .previousElementSibling as HTMLElement;
        $activeVimElement.down = $activeVimElement.selected
          .nextElementSibling as HTMLElement;

        return;
      }

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
    if (
      $activeVimElement.selected &&
      $activeVimElement.selected.className.includes("timeline-item") &&
      (window.location.pathname === "/journal" ||
        window.location.pathname === "/journal/")
    ) {
      const navigationElement = document.getElementsByTagName("nav")[0];
      const { top: navigationTop, bottom: navigationBottom } =
        navigationElement.getBoundingClientRect();
      const { top: activeElementTop, bottom: activeElementBottom } =
        $activeVimElement.selected.getBoundingClientRect();
      const activeElementMiddleY = (activeElementTop + activeElementBottom) / 2;

      if (activeElementMiddleY > navigationBottom) {
        const lastNavigationItemId = links.slice(-1)[0]["id"];
        $activeVimElement.left = document.getElementById(lastNavigationItemId);
      } else if (activeElementMiddleY < navigationTop) {
        const firstNavigationItemId = links[0]["id"];
        $activeVimElement.left = document.getElementById(firstNavigationItemId);
      } else {
        $activeVimElement.left = getClosestElementForElement({
          element: $activeVimElement.selected,
          interval: 10,
          direction: "left",
          range: 15,
        });
      }
      $activeVimElement.right = null;

      $activeVimElement.up = $activeVimElement.selected
        .previousElementSibling as HTMLElement;
      $activeVimElement.down = $activeVimElement.selected
        .nextElementSibling as HTMLElement;
      return;
    }

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
        range: 15,
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
      $activeVimElement.selected.className.includes("timeline-item") &&
      (window.location.pathname === "/journal" ||
        window.location.pathname === "/journal/")
    ) {
      const savedActiveElementId = $activeVimElement.selected.id;

      document.removeEventListener("scroll", handleScroll);
      $activeVimElement.selected.querySelector("button")!.click();
      document.addEventListener("scroll", handleScroll);

      const activeElement = document.getElementById(savedActiveElementId)!;
      $activeVimElement.selected = activeElement;

      const navigationElement = document.getElementsByTagName("nav")[0];
      const { top: navigationTop, bottom: navigationBottom } =
        navigationElement.getBoundingClientRect();
      const { top: activeElementTop, bottom: activeElementBottom } =
        $activeVimElement.selected.getBoundingClientRect();
      const activeElementMiddleY = (activeElementTop + activeElementBottom) / 2;

      if (activeElementMiddleY > navigationBottom) {
        const lastNavigationItemId = links.slice(-1)[0]["id"];
        $activeVimElement.left = document.getElementById(lastNavigationItemId);
      } else if (activeElementMiddleY < navigationTop) {
        const firstNavigationItemId = links[0]["id"];
        $activeVimElement.left = document.getElementById(firstNavigationItemId);
      } else {
        $activeVimElement.left = getClosestElementForElement({
          element: $activeVimElement.selected,
          interval: 10,
          direction: "left",
          range: 15,
        });
      }
      $activeVimElement.right = null;

      $activeVimElement.up = $activeVimElement.selected
        .previousElementSibling as HTMLElement;
      $activeVimElement.down = $activeVimElement.selected
        .nextElementSibling as HTMLElement;

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
      (window.location.pathname === "/journal" ||
        window.location.pathname === "/journal/") &&
      $activeVimElement.selected.className.includes("timeline-item")
    ) {
      document.removeEventListener("scroll", handleScroll);
      scrollToView($activeVimElement.selected);
      document.addEventListener("scroll", handleScroll);

      const navigationElement = document.getElementsByTagName("nav")[0];
      const { top: navigationTop, bottom: navigationBottom } =
        navigationElement.getBoundingClientRect();
      const { top: activeElementTop, bottom: activeElementBottom } =
        $activeVimElement.selected.getBoundingClientRect();
      const activeElementMiddleY = (activeElementTop + activeElementBottom) / 2;

      if (activeElementMiddleY > navigationBottom) {
        const lastNavigationItemId = links.slice(-1)[0]["id"];
        $activeVimElement.left = document.getElementById(lastNavigationItemId);
      } else if (activeElementMiddleY < navigationTop) {
        const firstNavigationItemId = links[0]["id"];
        $activeVimElement.left = document.getElementById(firstNavigationItemId);
      } else {
        $activeVimElement.left = getClosestElementForElement({
          element: $activeVimElement.selected,
          interval: 10,
          direction: "left",
          range: 15,
        });
      }
      $activeVimElement.right = null;

      $activeVimElement.up = $activeVimElement.selected
        .previousElementSibling as HTMLElement;
      $activeVimElement.down = $activeVimElement.selected
        .nextElementSibling as HTMLElement;
    } else {
      const { leftElement, downElement, upElement, rightElement } =
        getElementSurroundings($activeVimElement.selected!);
      $activeVimElement.left = leftElement;
      $activeVimElement.down = downElement;
      $activeVimElement.up = upElement;
      $activeVimElement.right = rightElement;
    }
  };
</script>

<slot />
