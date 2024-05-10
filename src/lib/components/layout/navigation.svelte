<script lang="ts">
  import { page } from "$app/stores";

  export let links = [
    { text: "Jason Kwok", href: "/", id: "nav-jason-kwok" },
    { text: "Socials", href: "/socials", id: "nav-socials" },
    // { text: "Essays", href: "/essays", id: "nav-essays" },
    { text: "Journal", href: "/journal", id: "nav-journal" },
  ];
</script>

<nav
  class="flex fixed flex-col space-y-3 text-base font-medium text-right text-gray-500 no-underline"
>
  {#each links as link}
    {#if link.href.slice(1) === $page.url.pathname.split("/")[1]}
      <a
        id={link.id}
        class="text-black hover:text-gray-600"
        data-sveltekit-preload-code="eager"
        href={link.href}>{link.text}</a
      >
    {:else}
      <a
        id={link.id}
        class="hover:text-gray-400"
        data-sveltekit-preload-code="eager"
        href={link.href}>{link.text}</a
      >
    {/if}
  {/each}
</nav>
