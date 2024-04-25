<script lang="ts">
  import type { Essay } from "$lib/types.js";

  export let data;
  let essays: Essay[] = data.essays;
</script>

<div class="flex flex-col space-y-3">
  {#each essays as essay}
    <a
      href="/essays/{essay.header.slug}"
      class="essay-link transition w-fit hover:scale-[1.11] hover:text-gray-500"
    >
      {essay.header.title}
    </a>
  {/each}
</div>
