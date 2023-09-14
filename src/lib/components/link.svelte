<script lang="ts">
  import type { Link } from "$lib/types";

  export let link: Link;
</script>

<a href={link.href} target="_blank" class="flex scale-group">
  <span>{link.text}</span>
  <img
    src="/icons/link-icon.svg"
    alt="test"
    class="transition block pl-1 w-6 h-6 scale-target scale-90"
  />
</a>

<style>
  .scale-group:hover .scale-target {
    transform: scale(1.11);
  }
</style>
