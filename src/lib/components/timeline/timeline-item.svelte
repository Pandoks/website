<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import type Timeline from "./timeline.svelte";

  export let id: string;
  let timeline: Writable<Timeline> = getContext("timeline");
</script>

<div class="flex">
  <button on:click={$timeline.handleClick(id)}>
    <slot name="title" />
  </button>

  {#if $timeline.isSelected(id)}
    <div class="pl-10">
      <slot name="content" />
    </div>
  {/if}
</div>
