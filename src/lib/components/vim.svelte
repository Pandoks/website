<script lang="ts">
  import { onMount } from "svelte";

  export let active: boolean = false;
  export let left = null;
  export let down = null;
  export let up = null;
  export let right = null;

  const handleKey = (event: KeyboardEvent) => {
    const key = event.key;

    switch (key) {
      case "h":
        break;
      case "j":
        break;
      case "k":
        break;
      case "l":
        break;
      default:
        break;
    }
  };

  onMount(() => {
    window.addEventListener("keydown", handleKey);
  });
</script>

<slot />
