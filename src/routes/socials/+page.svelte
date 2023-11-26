<script lang="ts">
  import Link from "$lib/components/link.svelte";

  const socials = [
    { text: "YouTube", href: "https://www.youtube.com/@pandoks_online/" },
    { text: "TikTok", href: "https://www.tiktok.com/@pandoks_/" },
    { text: "Twitter", href: "https://www.twitter.com/pandoks_/" },
    { text: "Instagram", href: "https://www.instagram.com/pandoks_/" },
    { text: "GitHub", href: "https://www.github.com/pandoks/" },
  ];
</script>

<div
  class="text-[#2b2b2b] grid grid-cols-1 gap-y-3 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4"
>
  {#each socials as social}
    <Link link={social} />
  {/each}
</div>

<svelte:head>
  <title>Jason Kwok's Socials</title>
  <meta
    name="description"
    content="Social media that are related to Jason Kwok"
  />
  <meta property="og:title" content="Jason Kwok's (Pandoks_) Socials" />
  <meta
    property="og:description"
    content="Social media that are related to Jason Kwok or Pandoks_"
  />
</svelte:head>
