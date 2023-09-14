<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  export let mode = "single";
  export let opened: string[] = [];

  // interface to children
  let timeline = writable();
  $: timeline.set({
    isSelected: (id: string) => {
      return opened.includes(id);
    },
    handleClick: (id: string) => {
      opened = opened.includes(id)
        ? opened.filter((entry) => entry !== id)
        : [...opened, id];
      if (mode == "single" && opened.length) opened = opened.slice(-1);
    },
  });
  setContext("timeline", timeline);
</script>

<div class="flex overflow-y-auto flex-col">
  <slot />
</div>
