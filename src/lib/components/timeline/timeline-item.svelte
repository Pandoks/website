<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import type Timeline from "./timeline.svelte";

  export let id: string;
  let timeline: Writable<Timeline> = getContext("timeline");
</script>

<div class="flex flex-row group timeline-item">
  <button
    on:click={$timeline.handleClick(id)}
    class="px-[8px] relative overflow-hidden

    before:absolute before:w-[2px] before:h-full before:bg-slate-500 before:-translate-x-[1px]
    before:top-0 group-first:before:translate-y-[10px]

    after:absolute after:w-[8px] after:h-[8px] after:bg-slate-500 after:rounded-full
    after:-translate-x-[4px] after:top-0 after:translate-y-[8px]"
  />

  <div>
    <button on:click={$timeline.handleClick(id)}>
      <p class="id">{id}</p>
      <slot name="title" />
    </button>

    {#if $timeline.isSelected(id)}
      <div class="pl-10">
        <slot name="content" />
      </div>
    {:else}
      <slot name="tldr" />
    {/if}
  </div>
</div>
