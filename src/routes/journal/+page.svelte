<script lang="ts">
  import TimelineItem from "$lib/components/timeline/timeline-item.svelte";
  import Timeline from "$lib/components/timeline/timeline.svelte";
  import type { Post } from "$lib/types.js";
  import { onMount, tick } from "svelte";
  import { goto } from "$app/navigation";

  let loaded = false; // partial component flicker replaced with entire component flicker

  export let data;
  let journal: Post[] = data.journal;
  let opened: string[] = [];
  let mode = "multiple";

  const handleClick = async (hash: string) => {
    if (opened.includes(hash)) {
      opened = opened.filter((entry) => entry !== hash);
      setTimeout(() => {
        updateURL();
      });
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
    const y = (window.innerHeight * 27) / 100;

    let viewing_element: Element | null = null;
    const elements = document.elementsFromPoint(x, y);
    for (const element of elements) {
      if (element.classList.contains("timeline-item")) {
        viewing_element = element;
        break;
      }
    }

    const hash = viewing_element?.getAttribute("id");
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

  const scrollToView = (element: Element) => {
    // TODO: Move element align with nav
    let { left, top } = element.getBoundingClientRect();
    setTimeout(() => {
      ({ left, top } = element.getBoundingClientRect());
      window.scrollTo(left, top);
    });
  };

  onMount(async () => {
    let hash = window.location.hash.slice(1);
    const matching_hash = journal.filter((entry) => entry.header.hash === hash);
    if (matching_hash.length) {
      opened = [hash, "muncho"];
      loaded = true;
    } else if (hash) {
      goto("/journal");
    }
    loaded = true;
    await tick();
    let element = document.getElementById("art1");
    scrollToView(element!);

    window.addEventListener("scroll", updateURL);
    window.addEventListener("resize", updateURL);
  });
</script>

<!-- <a href="#art1">test</a> -->

{#if loaded}
  <div class="pb-60">
    <!-- TODO: Padding so that it scrolls to nav -->
    <Timeline {mode} bind:opened {handleClick}>
      {#each journal as entry}
        <TimelineItem date={entry.header.date} hash={entry.header.hash}>
          <p slot="title">{entry.header.title}</p>
          <p slot="tldr">{entry.header.tldr}</p>
          <svelte:component this={entry.content} slot="content" />
        </TimelineItem>
      {/each}
    </Timeline>
  </div>
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
