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
      const down = document.getElementById("nav-socials")!;
      let right = null;
      switch (window.location.pathname) {
        case "socials":
          right = findClosestRightElement({
            element: selected,
            lookup: { classes: new Set(["social-link"]) },
          });
          break;

        case "essays":
          right = findClosestRightElement({
            element: selected,
            lookup: { classes: new Set(["essay-link"]) },
          });
          break;

        case "journal":
          right = findClosestRightElement({
            element: selected,
            lookup: { classes: new Set(["essay-link"]) },
          });
          break;
      }

      activeVimElement.set({
        selected: selected,
        left: null,
        down: down,
        up: null,
        right: right as HTMLElement | null,
      });
    }
  };

  onMount(() => {
    document.addEventListener("keydown", handleKey);
  });
</script>

<slot />
