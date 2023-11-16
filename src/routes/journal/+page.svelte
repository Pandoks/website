<script lang="ts">
  import TimelineItem from "$lib/components/timeline/timeline-item.svelte";
  import Timeline from "$lib/components/timeline/timeline.svelte";
  import type { Post } from "$lib/types.js";

  export let data;
  let journal: Post[] = data.journal;

  let opened: string[] = [];
  let openedSize: number = opened.length;
  // $: {
  //   if (typeof window !== "undefined") {
  //     let basepath: string = window.location.pathname.split("/")[1];
  //     let slug: string = window.location.pathname.split("/").slice(-1)[0];
  //     if (opened.length && slug === basepath) {
  //       window.history.replaceState(
  //         {},
  //         "",
  //         `${basepath}/${opened.slice(-1)[0]}`,
  //       );
  //       console.log(opened);
  //     } else if (opened.length < openedSize) {
  //       window.history.replaceState({}, "", "");
  //     }
  //     openedSize = opened.length;
  //   }
  // }
</script>

<Timeline mode="multiple" bind:opened>
  {#each journal as entry}
    <TimelineItem id={entry.header.date}>
      <p slot="title">{entry.header.title}</p>
      <p slot="tldr">{entry.header.tldr}</p>
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
