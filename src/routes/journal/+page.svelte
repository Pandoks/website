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
  <TimelineItem id="01-20-2005">
    <svelte:fragment slot="title" let:handleClick>
      <button slot="title" on:click={handleClick}>Title</button>
    </svelte:fragment>
    <p slot="content">
      Aliquip enim labore pariatur anim. Commodo officia commodo in proident
      nostrud ipsum et exercitation incididunt proident esse ipsum sit elit.
      Enim enim incididunt qui id commodo ut labore quis. Pariatur mollit
      proident aliqua proident. Labore esse amet exercitation aute non irure
      deserunt elit labore cupidatat eu qui et ipsum. Ad quis ex consectetur
      amet sint voluptate magna consectetur Lorem tempor sint eiusmod nostrud
      commodo qui. Pariatur voluptate labore elit ea do dolor eiusmod aute
      laboris exercitation magna. Qui sint id ea reprehenderit eiusmod duis
      veniam incididunt adipisicing sunt in exercitation. Veniam sit enim do
      consequat voluptate culpa Lorem aliqua ipsum excepteur magna.
      Reprehenderit sunt culpa tempor consequat amet quis aliqua voluptate id
      officia adipisicing Lorem. Laborum duis mollit esse officia officia
      ullamco eu consectetur ex amet ut. Excepteur officia exercitation dolor
      fugiat occaecat do fugiat fugiat laboris minim occaecat incididunt
      occaecat ea. Pariatur veniam ad aute Lorem eiusmod cillum voluptate
      adipisicing cillum pariatur reprehenderit duis. Non ex commodo officia
      exercitation sint ipsum ut in. Laboris occaecat cillum velit et officia
      laboris exercitation ipsum aliquip mollit mollit veniam laborum. Duis
      nostrud irure esse fugiat aliqua non mollit magna. Ex amet nostrud culpa
      nisi dolor consectetur Lorem tempor duis aliqua cupidatat eiusmod est
      commodo nulla. Tempor magna ad enim commodo aute sunt dolor nostrud duis
      ipsum quis adipisicing amet pariatur. Cupidatat adipisicing sunt cillum
      officia irure velit dolor exercitation. Nostrud enim culpa excepteur.
      Proident nisi dolor quis laborum qui officia excepteur. Esse qui et ad
      laborum consectetur consequat cillum Lorem labore nulla aliquip quis
      commodo. Dolore sunt sint irure consectetur eiusmod dolore magna cillum eu
      eu id labore ex non duis. Ex deserunt in cillum sit officia qui tempor
      nulla sunt ipsum dolor. Fugiat consectetur qui dolore ipsum aliqua. Ad
      aute reprehenderit esse. Occaecat magna dolor reprehenderit deserunt
      cillum pariatur commodo Lorem dolor. Non non veniam laboris eiusmod irure
      sunt ex laboris nostrud nostrud proident ut. Labore proident veniam est
      fugiat labore irure sunt cillum culpa officia elit quis irure esse. Dolor
      nulla excepteur amet ad deserunt cillum irure occaecat deserunt mollit
      voluptate amet cupidatat anim dolore. Velit incididunt nostrud fugiat
      nostrud Lorem deserunt minim aliqua nulla. Deserunt non in est. Anim qui
      pariatur ipsum mollit culpa consectetur elit consectetur consectetur
      dolore ullamco laboris. Adipisicing sit magna fugiat eu dolore quis. Ea
      eiusmod sunt aute aliqua laboris ullamco deserunt commodo ut. Occaecat
      cillum aliqua amet reprehenderit magna eiusmod mollit nostrud nostrud
      proident. Consequat adipisicing ullamco eiusmod officia sunt. Id commodo
      non mollit eu dolor. Culpa ad ad consectetur officia et duis incididunt.
      Voluptate officia nostrud consequat sunt ullamco cillum non reprehenderit
      eiusmod exercitation ipsum tempor minim excepteur. Aute reprehenderit amet
      fugiat duis sunt reprehenderit enim ut officia. Sint culpa minim velit ex
      ipsum culpa elit. Anim non do voluptate anim qui laboris nostrud elit id.
      Dolor laborum anim esse dolor reprehenderit Lorem enim. In labore
      exercitation voluptate aliquip consequat. Cillum anim do est sint est
      officia cillum adipisicing eiusmod sit sint irure. Lorem elit enim tempor
      cupidatat qui ex eu sint labore laborum consequat dolor. Enim exercitation
      ad incididunt amet in laboris duis commodo ad duis in sint non ipsum
      culpa. Irure est aliqua dolore magna dolore tempor est veniam irure
      voluptate. Aute nisi mollit Lorem culpa ipsum veniam. Pariatur tempor in
      nostrud velit. Do veniam culpa laborum sit consequat ad nisi. Sit nulla
      consequat dolore cillum est proident proident occaecat nostrud est non
      cupidatat elit laborum. Officia non mollit dolore labore. Qui qui
      reprehenderit ut dolor occaecat nostrud est pariatur. Ullamco ex sit
      pariatur. Dolore adipisicing consequat mollit occaecat fugiat sint sint
      ea. Non fugiat veniam Lorem.
    </p>
  </TimelineItem>
</Timeline>
