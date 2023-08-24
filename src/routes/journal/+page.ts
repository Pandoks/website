import type { Post } from "$lib/types";
import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ fetch }) => {
  const response = await fetch("api/journal");
  const entries: Post[] = await response.json();
  return { entries };
};
