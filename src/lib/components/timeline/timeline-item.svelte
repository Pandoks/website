<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import type Timeline from "./timeline.svelte";

  export let hash: string;
  export let date: string;
  let timeline: Writable<Timeline> = getContext("timeline");
</script>

<div class="flex flex-row group timeline-item" id={hash}>
  <button
    on:click={$timeline.handleClick(hash)}
    class="px-[8px] relative overflow-hidden

    before:absolute before:w-[2px] before:h-full before:bg-slate-500 before:-translate-x-[1px]
    before:top-0 group-first:before:translate-y-[10px]

    after:absolute after:w-[8px] after:h-[8px] after:bg-slate-500 after:rounded-full
    after:-translate-x-[4px] after:top-0 after:translate-y-[8px]

    after:transition hover:after:scale-[1.11]"
  />

  <div class="pl-[10px] pb-2">
    <button
      on:click={$timeline.handleClick(hash)}
      class="transition hover:scale-[1.11]"
    >
      <p class="text-sm">{date}</p>
      <span class="text-lg text-left">
        <slot name="title" />
      </span>
    </button>

    {#if $timeline.isSelected(hash)}
      <div class="text-xs leading-8">
        <slot name="content" />
      </div>
    {:else}
      <p class="text-xs pt-1 leading-3">
        <slot name="tldr" />
      </p>
    {/if}
  </div>
</div>
