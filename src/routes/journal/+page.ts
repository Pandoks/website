import type { Post, PostHeader } from "$lib/types";
import type { Load } from "@sveltejs/kit";
import type { SvelteComponent } from "svelte";

const loadJournal = async () => {
  let journal: Post[] = [];
  const paths = import.meta.glob("$lib/journal/**/*.md", { eager: true });

  for (const path in paths) {
    const file = await paths[path];
    const slug = path.split("/").at(-1)?.replace(".md", "");
    if (
      file &&
      typeof file === "object" &&
      "metadata" in file &&
      "default" in file &&
      slug
    ) {
      const meta = file.metadata as Omit<PostHeader, "slug">;
      const post_header = { ...meta, slug };
      post_header.published &&
        journal.push({
          header: post_header,
          content: file.default as typeof SvelteComponent,
        });
    }
  }

  journal = journal.sort((first, second) => {
    // sort by most recent
    return (
      new Date(second.header.date).getTime() -
      new Date(first.header.date).getTime()
    );
  });

  return journal;
};

export const load: Load = async () => {
  const journal: Post[] = await loadJournal();
  return { journal };
};
