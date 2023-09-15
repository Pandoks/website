<script lang="ts">
  import { page } from "$app/stores";
  import TimelineItem from "$lib/components/timeline/timeline-item.svelte";
  import Timeline from "$lib/components/timeline/timeline.svelte";
  import type { Post } from "$lib/types.js";

  export let data;
  let journal: Post[] = data.journal;

  let opened: string[] = [];
  let openedSize: number = opened.length;
  console.log("page.url: " + $page.url);
  console.log("page.route: " + JSON.stringify($page.route));
  $: {
    console.log("start: " + typeof opened);
    if (typeof window !== "undefined") {
      let basepath: string = window.location.pathname.split("/")[1];
      let slug: string = window.location.pathname.split("/").slice(-1)[0];
      console.log(opened);
      console.log("basepath: ", basepath);
      console.log("slug: ", slug);
      if (opened.length && slug === basepath) {
        console.log("adding");
        window.history.pushState({}, "", `${basepath}/${opened.slice(-1)[0]}`);
      } else if (opened.length > openedSize) {
        console.log("changing");
        window.history.pushState({}, "", `${basepath}/${opened.slice(-1)[0]}`);
      } else if (opened.length < openedSize) {
        console.log("removing");
        window.history.pushState({}, "", `${basepath}`);
      }
      openedSize = opened.length;
    }
    console.log("after: " + typeof opened);
  }
</script>

<Timeline mode="multiple" bind:opened>
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
