import type { SvelteComponent } from "svelte";

export type PostHeader = {
  title: string;
  tldr: string;
  date: string;
  slug: string;
  published: boolean;
};

export type Post = {
  header: PostHeader;
  content: typeof SvelteComponent;
};

export type Link = {
  href: string;
  text: string;
};
