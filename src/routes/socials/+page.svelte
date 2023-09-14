<script lang="ts">
  const socials = [
    { text: "Instagram", href: "https://www.instagram.com/pandoks_/" },
  ];
</script>

<div class="text-[#2b2b2b]">
  {#each socials as social}
    <a href={social.href} target="_blank" class="flex scale-group">
      <span>{social.text}</span>
      <img
        src="/icons/link-icon.svg"
        alt="test"
        class="transition block pl-1 w-6 h-6 scale-target scale-90"
      />
    </a>
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

<style>
  .scale-group:hover .scale-target {
    transform: scale(1.11);
  }
</style>
