<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  export let id: string; // date
  let open = getContext("open");
  let activeId: Writable<string> = getContext("activeId");
  $: active = $activeId === id;
  let handleClick: () => void;

  switch (open) {
    case "single": {
      active = false;
      handleClick = () => {
        if (active) {
          activeId.set("");
          return;
        }
        activeId.set(id);
      };
      break;
    }
    case "multiple": {
      active = false;
      handleClick = () => {
        active = !active;
      };
      break;
    }
    default: {
      throw new Error(`Cannot handle open type: {open}`);
    }
  }
</script>

<div class="flex">
  <button on:click={handleClick}>
    <slot name="title" />
  </button>

  {#if active}
    <div class="pl-10">
      <slot name="content" />
    </div>
  {/if}
</div>
