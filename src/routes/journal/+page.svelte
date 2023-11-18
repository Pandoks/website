<script lang="ts">
  import TimelineItem from "$lib/components/timeline/timeline-item.svelte";
  import Timeline from "$lib/components/timeline/timeline.svelte";
  import type { Post } from "$lib/types.js";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let load = false; // partial component flicker replaced with entire component flicker

  export let data;
  let journal: Post[] = data.journal;
  let opened: string[] = [];
  let mode = "multiple";

  const handleClick = (hash: string) => {
    if (opened.includes(hash)) {
      opened = opened.filter((entry) => entry !== hash);
      setTimeout(() => {
        // run after DOM changes
        updateURL();
      }, 0);
    } else {
      opened = [...opened, hash];
      goto("/journal#" + hash, {
        replaceState: true,
        noScroll: true,
        keepFocus: true,
      });
    }
    if (mode === "single" && opened.length) opened = opened.slice(-1);
  };

  const updateURL = () => {
    const x = window.innerWidth / 2;
    const y = (window.innerHeight * 30) / 100;

    let viewing_element: Element | null = null;
    const elements = document.elementsFromPoint(x, y);
    for (const element of elements) {
      if (element.classList.contains("timeline-item")) {
        viewing_element = element;
        break;
      }
    }

    const hash = viewing_element?.classList.item(
      viewing_element?.classList.length - 1,
    );
    if (hash && !opened.includes(hash)) {
      goto("/journal", { replaceState: true, noScroll: true, keepFocus: true });
      return;
    }
    goto("/journal#" + hash, {
      replaceState: true,
      noScroll: true,
      keepFocus: true,
    });
  };

  onMount(() => {
    let hash = window.location.hash.slice(1);
    const matching_hash = journal.filter((entry) => entry.header.hash === hash);
    if (matching_hash.length) {
      opened = [hash];
    } else if (hash) {
      goto("/journal", {
        replaceState: true,
        noScroll: true,
        keepFocus: true,
      });
    }
    load = true;

    window.addEventListener("scroll", updateURL);
    window.addEventListener("resize", updateURL);
  });
</script>

{#if load}
  <Timeline {mode} bind:opened {handleClick}>
    {#each journal as entry}
      <TimelineItem date={entry.header.date} hash={entry.header.hash}>
        <p slot="title">{entry.header.title}</p>
        <p slot="tldr">{entry.header.tldr}</p>
        <svelte:component this={entry.content} slot="content" />
      </TimelineItem>
    {/each}
  </Timeline>
{/if}

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
