import type { SvelteComponent } from "svelte";

export type PostHeader = {
  title: string;
  tldr: string;
  date: string;
  hash: string;
  published: boolean;
};

export type Post = {
  header: PostHeader;
  content: typeof SvelteComponent;
};

export type EssayHeader = {
  title: string;
  tldr: string;
  date: string;
  slug: string;
  published: boolean;
};

export type Essay = {
  header: EssayHeader;
  content: typeof SvelteComponent;
};

export type Link = {
  href: string;
  text: string;
};

export type VimNavigationElement = {
  selected: HTMLElement | null;
  left: HTMLElement | null;
  down: HTMLElement | null;
  up: HTMLElement | null;
  right: HTMLElement | null;
};
