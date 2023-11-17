<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  export let mode = "single";
  export let opened: string[] = [];
  export let handleClick: (id: string) => void = (id: string) => {
    opened = opened.includes(id)
      ? opened.filter((entry) => entry !== id)
      : [...opened, id];
    if (mode == "single" && opened.length) opened = opened.slice(-1);
  };

  // interface to children
  let timeline = writable(); // only initializes state once, need $: when opened changes
  $: timeline.set({
    isSelected: (id: string) => {
      return opened.includes(id);
    },
    handleClick,
  });

  // context for children (data only flows downward)
  setContext("timeline", timeline);
</script>

<slot />
