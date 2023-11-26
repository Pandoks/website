<script lang="ts">
  import type { Essay } from "$lib/types.js";

  export let data;
  let essays: Essay[] = data.essays;
  console.log(essays);
</script>

{#each essays as essay}
  {essay.header.title}
{/each}
