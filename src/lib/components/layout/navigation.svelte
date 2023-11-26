<script lang="ts">
  import { page } from "$app/stores";

  export let links = [
    { text: "Jason Kwok", href: "/" },
    { text: "Socials", href: "/socials" },
    { text: "Essays", href: "/essays" },
    { text: "Journal", href: "/journal" },
  ];
</script>

<nav
  class="flex fixed flex-col space-y-3 text-base font-medium text-right text-gray-500 no-underline"
>
  {#each links as link}
    {#if link.href.slice(1) === $page.url.pathname.split("/")[1]}
      <span class="text-black">{link.text}</span>
    {:else}
      <a class="hover:text-gray-400" href={link.href}>{link.text}</a>
    {/if}
  {/each}
</nav>
