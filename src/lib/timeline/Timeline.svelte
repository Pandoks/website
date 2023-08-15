<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  export let open: string;
  setContext("open", open);

  switch (open) {
    case "single": {
      setContext("activeId", writable("test")); // reactive context
      break;
    }
    case "multiple": {
      break;
    }
    default: {
      throw new Error("Invalid timeline mode");
    }
  }
</script>

<div class="flex overflow-y-auto flex-col p-4">
  <slot />
</div>
