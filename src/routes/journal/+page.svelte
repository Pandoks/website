<script lang="ts">
  import TimelineItem from "$lib/components/timeline/timeline-item.svelte";
  import Timeline from "$lib/components/timeline/timeline.svelte";
</script>

<Timeline mode="single">
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

<svelte:head>
  <title>Jason Kwok Journal</title>
  <meta
    name="Jason Kwok's Journal"
    content="A journal for Jason Kwok that talks about his day to day thoughts"
  />
  <meta property="og:title" content="Jason Kwok's (Pandoks_) Journal" />
  <meta
    property="og:description"
    content="A journal for Jason Kwok or Pandoks_ that talks about his day to day thoughts"
  />
</svelte:head>
