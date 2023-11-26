<script lang="ts">
  import type { Link } from "$lib/types";

  export let link: Link;
</script>

<a href={link.href} target="_blank" class="flex scale-group">
  <img
    src="/icons/socials/{link.text.toLowerCase()}.svg"
    alt="{link.text} icon"
    class="transition block pr-1 w-6 h-6 scale-target scale-90"
  />
  <span class="text-black hover:text-gray-500 pl-1">{link.text}</span>
</a>

<style>
  .scale-group:hover .scale-target {
    transform: scale(1.11);
  }
</style>
