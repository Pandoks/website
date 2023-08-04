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

<div class="mx-auto mt-[27vh] w-[70vw] sm:w-[40vw]">
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

  <div class="pl-10">
    <slot />
  </div>
</div>
