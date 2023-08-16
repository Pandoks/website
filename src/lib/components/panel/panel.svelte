<script lang="ts">
  export let selected = "";
</script>

{#if { selected }}
  <div>selected</div>
{:else}
  <div>menu item</div>
{/if}
