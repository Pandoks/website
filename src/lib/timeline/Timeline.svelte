<script lang="ts">
  import { setContext } from "svelte";
  import { writable, type Writable } from "svelte/store";

  // reactive context
  let activeId: Writable<string> = writable<string>("");
  setContext<Writable<string>>("activeId", activeId);
</script>

<div class="flex flex-col p-4">
  <slot />
</div>
