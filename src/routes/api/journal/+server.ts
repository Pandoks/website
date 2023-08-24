import type { Post } from "$lib/types";
import { json } from "@sveltejs/kit";

const getEntries = async () => {
  let journal_entries: Post[] = [];

  const paths = import.meta.glob("/src/lib/journal/**/*.md", { eager: true });

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split("/").at(-1)?.replace(".md", "");

    if (file && typeof file === "object" && "metadata" in file && slug) {
      const meta = file.metadata as Omit<Post, "slug">;
      const post = { ...meta, slug } satisfies Post;
      post.published && journal_entries.push(post);
    }
  }

  journal_entries = journal_entries.sort(
    (first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime(),
  );

  return journal_entries;
};

export const GET = async () => {
  const journal_entries = await getEntries();
  return json(journal_entries);
};
