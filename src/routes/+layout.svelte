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

<div>
  <nav class="fixed p-6 w-64 h-screen">
    <div class="flex flex-col space-y-4 text-right text-gray-500 no-underline">
      {#each links as link}
        {#if link.href === $page.url.pathname}
          <span class="text-black">{link.text}</span>
        {:else}
          <a class="hover:text-gray-400" href={link.href}>{link.text}</a>
        {/if}
      {/each}
    </div>
  </nav>

  <slot />
</div>
