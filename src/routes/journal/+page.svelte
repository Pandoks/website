<script lang="ts">
  import TimelineItem from "$lib/components/timeline/timeline-item.svelte";
  import Timeline from "$lib/components/timeline/timeline.svelte";
  import type { Post } from "$lib/types.js";

  export let data;
  let journal: Post[] = data.journal;
</script>

<Timeline mode="multiple">
  {#each journal as entry}
    <TimelineItem id={entry.header.date}>
      <div slot="title">{entry.header.title}</div>
      <svelte:component this={entry.content} slot="content" />
    </TimelineItem>
  {/each}
</Timeline>

<svelte:head>
  <title>Jason Kwok Journal</title>
  <meta
    name="Jason Kwok's Journal"
    content="A journal for Jason Kwok that talks about his day to day thoughts"
  />
  <meta property="og:title" content="Jason Kwok's (Pandoks_) Journal" />
  <meta
    property="og:description"
    content="A journal for Jason Kwok or Pandoks_ that talks about his day to day thoughts"
  />
</svelte:head>
