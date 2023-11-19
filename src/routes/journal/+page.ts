import type { Post, PostHeader } from "$lib/types";
import type { Load } from "@sveltejs/kit";
import type { SvelteComponent } from "svelte";

const loadJournal = async () => {
  let journal: Post[] = [];
  const paths = import.meta.glob("$lib/journal/**/*.md", { eager: true });

  for (const path in paths) {
    const file = await paths[path];
    const hash = path.split("/").at(-1)?.replace(".md", "");
    if (
      file &&
      typeof file === "object" &&
      "metadata" in file &&
      "default" in file &&
      hash
    ) {
      const meta = file.metadata as Omit<PostHeader, "hash">;
      const post_header = { ...meta, hash };
      post_header.published &&
        journal.push({
          header: post_header,
          content: file.default as typeof SvelteComponent,
        });
    }
  }

  journal = journal.sort((first, second) => {
    // sort by most recent
    let [first_month, first_day, first_year] = first.header.date.split("-");
    let [second_month, second_day, second_year] = second.header.date.split("-");
    const first_date = `${first_year}-${first_month.padStart(
      2,
      "0",
    )}-${first_day.padStart(2, "0")}`;
    const second_date = `${second_year}-${second_month.padStart(
      2,
      "0",
    )}-${second_day.padStart(2, "0")}`;
    return new Date(second_date).getTime() - new Date(first_date).getTime();
  });

  return journal;
};

export const load: Load = async ({ params }) => {
  const journal: Post[] = await loadJournal();
  return { journal };
};
