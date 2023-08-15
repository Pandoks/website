<script lang="ts">
  import Navigation from "$lib/navigation/navigation.svelte";
</script>

<div
  class="mr-auto ml-auto mt-[27vh] w-[85vw] sm:w-[75vw] md:w-[65vw] lg:ml-[27vw] lg:w-[50vw] xl:w-[40vw]"
>
  <Navigation />

  <div class="ml-[89.88px]">
    <slot />
  </div>
</div>
