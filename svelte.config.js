import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/kit/vite";
import { escapeSvelte, mdsvex } from "mdsvex";
import shiki from "shiki";

/** Shiki code colorscheme for mdsvex */
const colorScheme = async (code, lang = "text") => {
  const highlighter = await shiki.getHighlighter({
    theme: "github-dark-dimmed",
  });
  const html = escapeSvelte(highlighter.codeToHtml(code, { lang }));
  return `{@html \`${html}\`}`;
};

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexConfig = {
  extensions: [".md"],
  layout: {
    _: "./src/lib/mdsvex/layout.svelte", // default
  },
  highlight: {
    highlighter: colorScheme,
  },
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
  extensions: [".svelte", ".md"],
  kit: {
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: "build",
      assets: "build",
      fallback: undefined,
      precompress: false,
      strict: true,
    }),
  },
};

export default config;
