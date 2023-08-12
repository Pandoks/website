<script lang="ts">
  import TimelineItem from "$lib/timeline/timeline-item.svelte";
  import Timeline from "$lib/timeline/timeline.svelte";
</script>

<Timeline>
  <TimelineItem id="01-20-2006">
    <svelte:fragment slot="title" let:handleClick>
      <button slot="title" on:click={handleClick}>Title</button>
    </svelte:fragment>
    <div slot="content">Content</div>
  </TimelineItem>
</Timeline>
