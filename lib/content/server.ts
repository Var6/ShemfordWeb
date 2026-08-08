import { unstable_cache, revalidateTag } from "next/cache";

import { connectDB } from "@/lib/mongodb";
import Content from "@/models/Content";
import { resolveAll } from "./resolve";
import type { SiteContent } from "./types";

export const CONTENT_TAG = "site-content";

async function loadStored(): Promise<Record<string, Record<string, unknown>>> {
  await connectDB();

  const docs = await Content.find().lean<{ page: string; data: Record<string, unknown> }[]>();
  const byPage: Record<string, Record<string, unknown>> = {};

  for (const doc of docs) byPage[doc.page] = doc.data || {};

  return byPage;
}

/**
 * Cached so pages keep their static-render performance. The admin save
 * handler calls `revalidateSiteContent()`, so edits appear immediately.
 */
const cachedStored = unstable_cache(loadStored, ["site-content-v1"], {
  tags: [CONTENT_TAG],
});

/**
 * Resolved content for every registered page. Never throws — if the database
 * is unreachable the site still renders with the registry defaults, which are
 * the original hard-coded texts.
 */
export async function getSiteContent(): Promise<SiteContent> {
  try {
    return resolveAll(await cachedStored());
  } catch (error) {
    console.error("[content] falling back to defaults:", error);

    return resolveAll({});
  }
}

/**
 * Server-component equivalent of `usePageContent` — same `t`/`list` shape, so
 * pages that must stay server-rendered (they export `metadata`) read content
 * the same way client pages do.
 */
export async function getPageContent(page: string) {
  const site = await getSiteContent();
  const content = site[page] ?? {};

  return {
    raw: content,
    t: (key: string, fallback = "") => {
      const value = content[key];

      return typeof value === "string" ? value : fallback;
    },
    list: <T = Record<string, string>>(key: string, fallback: T[] = []): T[] => {
      const value = content[key];

      return Array.isArray(value) ? (value as T[]) : fallback;
    },
  };
}

export function revalidateSiteContent() {
  // `{ expire: 0 }` drops the cached entry immediately, so an admin save is
  // visible on the public site on the very next request.
  revalidateTag(CONTENT_TAG, { expire: 0 });
}
