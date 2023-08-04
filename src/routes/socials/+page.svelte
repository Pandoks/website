<script lang="ts">
  const socials = [
    { text: "Instagram", href: "https://www.instagram.com/pandoks_/" },
  ];
</script>

<div class="text-xs text-[#2b2b2b] ml-3 sm:ml-5 md:ml-7 lg:ml-9 xl:ml-10">
  {#each socials as social}
    <a href={social.href} target="_blank">{social.text}</a>
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
