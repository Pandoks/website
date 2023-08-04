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

<div
  class="flex mr-auto ml-[27vw] mt-[27vh] w-[85vw] sm:w-[75vw] md:w-[65vw] lg:w-[50vw] xl:w-[40vw]"
>
  <nav
    class="flex fixed flex-col space-y-3 text-base font-medium text-right text-gray-500 no-underline"
  >
    {#each links as link}
      {#if link.href === $page.url.pathname}
        <span class="text-black">{link.text}</span>
      {:else}
        <a class="hover:text-gray-400" href={link.href}>{link.text}</a>
      {/if}
    {/each}
  </nav>

  <div class="ml-[89.88px]">
    <slot />
  </div>
</div>
