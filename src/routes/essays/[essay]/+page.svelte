<script lang="ts">
  export let data;
</script>

<p class="text-sm">{data.header.date}</p>
<p class="text-lg">{data.header.title}</p>

<div class="text-xs leading-8">
  <svelte:component this={data.content} />
</div>
