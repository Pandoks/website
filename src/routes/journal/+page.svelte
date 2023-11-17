<script lang="ts">
  import TimelineItem from "$lib/components/timeline/timeline-item.svelte";
  import Timeline from "$lib/components/timeline/timeline.svelte";
  import type { Post } from "$lib/types.js";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  export let data;
  let journal: Post[] = data.journal;
  let opened: string[] = [];

  const updateMiddleElement = () => {
    const x = window.innerWidth / 2;
    const y = (window.innerHeight * 30) / 100; // Adjust for the margin-top

    const elements = document.elementsFromPoint(x, y);

    let viewing_element: any;
    for (const element of elements) {
      if (element.classList.contains("timeline-item")) {
        viewing_element = element;
        break;
      }
    }
    const id = viewing_element.querySelector(".id").textContent;
    console.log(opened);
    console.log(id);
  };

  let query = new URLSearchParams($page.url.searchParams.toString());
  console.log(query);
  query.set("word", "test");
  goto(`?${query.toString()}`);

  onMount(() => {
    window.addEventListener("scroll", updateMiddleElement);
    window.addEventListener("resize", updateMiddleElement);
    updateMiddleElement();
  });
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
