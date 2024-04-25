<script lang="ts">
  import type { Link } from "$lib/types";

  export let link: Link;
</script>

<a
  id={link.text.toLowerCase()}
  href={link.href}
  target="_blank"
  class="transition flex hover:scale-[1.11] text-black hover:text-gray-500"
>
  <img
    src="/icons/socials/{link.text.toLowerCase()}.svg"
    alt="{link.text} icon"
    class="block pr-1 w-6 h-6"
  />

  <span class="pl-1">{link.text}</span>
</a>
