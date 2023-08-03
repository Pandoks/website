<script lang="ts">
  import { page } from "$app/stores";
  import "../app.css";

  const links = [
    { text: "Jason Kwok", href: "/" },
    { text: "Socials", href: "/socials" },
    { text: "Journal", href: "/journal" },
    { text: "Essays", href: "/essays" },
  ];
</script>

<div class="flex items-center h-screen">
  <nav
    class="flex flex-col space-y-3 w-1/3 text-right text-gray-500 no-underline"
  >
    {#each links as link}
      {#if link.href === $page.url.pathname}
        <span class="text-black">{link.text}</span>
      {:else}
        <a class="hover:text-gray-400" href={link.href}>{link.text}</a>
      {/if}
    {/each}
  </nav>
  <div class="pl-10 w-[45%]">
    <slot />
  </div>
</div>
