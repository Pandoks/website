<script lang="ts">
  import TimelineItem from "$lib/timeline/timeline-item.svelte";
  import Timeline from "$lib/timeline/timeline.svelte";
</script>

<Timeline open="single">
  <TimelineItem id="01-20-2006">
    <div slot="title">Title</div>
    <div slot="content">Content</div>
  </TimelineItem>

  <TimelineItem id="01-20-2005">
    <div slot="title">Title</div>
    <div slot="content">Content</div>
  </TimelineItem>

  <TimelineItem id="01-20-2004">
    <div slot="title">Title</div>
    <div slot="content">Content</div>
  </TimelineItem>
</Timeline>
