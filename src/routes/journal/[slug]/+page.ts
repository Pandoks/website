import { error, type Load } from "@sveltejs/kit";

export const load: Load = async ({ params }) => {
  try {
    const entries = await import(`../../../lib/journal/${params.slug}.md`);
    return {
      content: entries.default,
      meta: entries.metadata,
    };
  } catch (e) {
    throw error(404, `Could not find ${params.slug}`);
  }
};
