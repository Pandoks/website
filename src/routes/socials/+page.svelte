<script lang="ts">
  const socials = [
    { text: "Instagram", href: "https://www.instagram.com/pandoks_/" },
  ];
</script>

<div class="text-[#2b2b2b]">
  {#each socials as social}
    <a href={social.href} target="_blank" class="flex scale-group">
      <span>{social.text}</span>
      <div class="transition hover:scale-110">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          focusable="false"
          class="block pl-1 w-6 h-6 text-gray-500 scale-target"
        >
          <g class="text-gray-500" transform="scale(0.8) translate(32 32)">
            <line
              x1="64"
              y1="192"
              x2="192"
              y2="64"
              fill="none"
              stroke="rgb(143, 143, 143)"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="24"
            ></line>
            <polyline
              points="88 64 192 64 192 168"
              fill="none"
              stroke="rgb(143, 143, 143)"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="24"
            ></polyline>
          </g>
        </svg>
      </div>
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
    transform: scale(1.5);
  }
</style>
