<script lang="ts">
  export let data;
</script>

<a href="/essays">back</a>

<p>{data.header.date}</p>
<p>{data.header.title}</p>

<svelte:component this={data.content} />
