<script lang="ts">
  import { activeVimElement } from "$lib/stores";
  import { getElementsFromHorizontalLine } from "$lib/utils";
  import { onMount } from "svelte";

  export let element: string;

  const findClosestRightElement = ({
    element,
    lookup,
  }: {
    element: HTMLElement;
    lookup?: {
      ids?: Set<string>;
      classes?: Set<string>;
    };
  }) => {
    const { top, left, right, bottom } = element.getBoundingClientRect();
    const horizontalDetectionLineYCoordinate = (top + bottom) / 2;

    if (!lookup) {
      const detectedLines = getElementsFromHorizontalLine({
        startx: right,
        endx: window.innerWidth,
        y: horizontalDetectionLineYCoordinate,
      });

      return detectedLines[0];
    }

    const detectedLines = getElementsFromHorizontalLine({
      startx: right,
      endx: window.innerWidth,
      y: horizontalDetectionLineYCoordinate,
      lookup: lookup,
    });

    return detectedLines[0];
  };

  const handleKey = (event: KeyboardEvent) => {
    const key = event.key;
    if (
      !$activeVimElement.selected &&
      (key === "h" || key === "j" || key === "k" || key === "l")
    ) {
      const selected = document.getElementById("nav-jason-kwok")!;
      $activeVimElement.selected = selected;
      $activeVimElement.down = document.getElementById("nav-socials")!;
      switch (window.location.pathname) {
        case "socials":
          $activeVimElement.right = findClosestRightElement({
            element: selected,
            lookup: { classes: new Set(["social-link"]) },
          }) as HTMLElement;
          break;

        case "essays":
          $activeVimElement.right = findClosestRightElement({
            element: selected,
            lookup: { classes: new Set(["essay-link"]) },
          }) as HTMLElement;
          break;

        case "journal":
          $activeVimElement.right = findClosestRightElement({
            element: selected,
            lookup: { classes: new Set(["timeline-item"]) },
          }) as HTMLElement;
          break;
      }

      return;
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
      case "Escape":
        activeVimElement.set({
          selected: null,
          left: null,
          down: null,
          up: null,
          right: null,
        });
        break;
    }
  };

  onMount(() => {
    document.addEventListener("keydown", handleKey);
  });
</script>

<slot />
