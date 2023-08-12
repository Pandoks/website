<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  export let id: string; // date
  let activeId = getContext<Writable<string>>("activeId");
  $: active = $activeId === id;

  export let handleClick = () => {
    if (active) {
      activeId.set("");
      return;
    }

    activeId.set(id);
  };
</script>

<slot name="title" {handleClick} />

{#if active}
  <slot name="content" />
{/if}
