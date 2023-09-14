<script lang="ts">
  import Navigation from "$lib/components/layout/navigation.svelte";
  import Content from "$lib/components/layout/content.svelte";
</script>

<div
  class="mr-auto ml-auto mt-[27vh] w-[85vw] sm:w-[75vw] md:w-[65vw] lg:ml-[27vw] lg:w-[50vw] xl:w-[40vw]"
>
  <Navigation />

  <div class="pl-[89.88px]">
    <Content>
      <slot />
    </Content>
  </div>
</div>
