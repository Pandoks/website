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
      window.removeEventListener("scroll", updateURL);
      await scrollToView(document.getElementById(hash)!);
      window.addEventListener("scroll", updateURL);
    }
    if (mode === "single" && opened.length) opened = opened.slice(-1);
  };

  const updateURL = () => {
    const x = window.innerWidth / 2;
    const y = (window.innerHeight * 28) / 100;

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

  const scrollToView = (element: Element): Promise<void> => {
    return new Promise((resolve) => {
      const top_gap = (window.innerHeight * 27) / 100;
      let { left, top } = element.getBoundingClientRect();

      setTimeout(() => {
        ({ left, top } = element.getBoundingClientRect());
        window.scrollBy(left, top - top_gap);
        resolve();
      });
    });
  };

  const updatePadding = () => {
    const padding_element = document.querySelector(
      ".bottom-padding",
    ) as HTMLElement;
    const padding_size =
      window.innerHeight -
      document.getElementsByTagName("nav")[0].getBoundingClientRect().bottom;
    padding_element!.style.paddingBottom = `${padding_size}px`;
  };

  onMount(() => {
    let hash = window.location.hash.slice(1);
    const matching_hash = journal.filter((entry) => entry.header.hash === hash);
    if (matching_hash.length) {
      opened = [hash];
      tick().then(() => {
        scrollToView(document.getElementById(hash)!);
      });
    } else if (hash) {
      goto("/journal");
    }
    loaded = true;

    tick().then(() => {
      updatePadding();
    });

    window.addEventListener("scroll", updateURL);
    window.addEventListener("resize", updateURL);
    window.addEventListener("resize", updatePadding);
  });
</script>

{#if loaded}
  <div class="bottom-padding">
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
