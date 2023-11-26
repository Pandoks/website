import type { SvelteComponent } from "svelte";
import type { PageLoad } from "../$types";
import type { EssayHeader } from "$lib/types";
import { redirect } from "@sveltejs/kit";

export const load: PageLoad = async ({ params }: any) => {
  const paths = import.meta.glob("$lib/essays/**/*.md", { eager: true });

  for (const path in paths) {
    const file: any = await paths[path]; // TODO: do asyncly
    const essay = path.split("/").at(-1)?.replace(".md", "");

    if (essay === params!.essay) {
      const meta = file!.metadata as Omit<EssayHeader, "slug">;
      const essay_header = { ...meta, slug: essay };
      if (!essay_header.published) break;
      return {
        header: essay_header,
        content: file!.default as typeof SvelteComponent,
      };
    }
  }

  throw redirect(307, "/essays");
};
