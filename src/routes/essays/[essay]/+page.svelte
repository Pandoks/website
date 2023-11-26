<script lang="ts">
  export let data;
</script>

<p>{data.header.date}</p>
<p>{data.header.title}</p>

<div class="text-xs">
  <svelte:component this={data.content} />
</div>
