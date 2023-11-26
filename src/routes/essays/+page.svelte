<script lang="ts">
  import type { Essay } from "$lib/types.js";

  export let data;
  let essays: Essay[] = data.essays;
  console.log(essays);
</script>

<div class="flex flex-col">
  {#each essays as essay}
    <a href="/essays/{essay.header.slug}">{essay.header.slug}</a>
  {/each}
</div>
