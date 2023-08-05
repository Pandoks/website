<script lang="ts">
  const socials = [
    { text: "Instagram", href: "https://www.instagram.com/pandoks_/" },
  ];
</script>

<div class="text-[#2b2b2b] ml-3 sm:ml-5 md:ml-7 lg:ml-9 xl:ml-10">
  {#each socials as social}
    <a href={social.href} target="_blank">
      <div class="flex transition hover:scale-110">
        <span>{social.text}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          focusable="false"
          class="block ml-1 w-6 h-6 text-gray-500"
        >
          <g class="text-gray-500">
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
