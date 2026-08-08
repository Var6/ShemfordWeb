import { REGISTRY } from "./registry";
import type { Field, PageContent, SiteContent } from "./types";

function clone<T>(value: T): T {
  return typeof structuredClone === "function"
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));
}

export function allFields(page: string): Field[] {
  const def = REGISTRY[page];

  if (!def) return [];

  return def.groups.flatMap((g) => g.fields);
}

/** Registry defaults for a page, as a flat key -> value map. */
export function defaultsFor(page: string): PageContent {
  const out: PageContent = {};

  for (const field of allFields(page)) out[field.key] = clone(field.default);

  return out;
}

/**
 * Merge stored admin overrides over registry defaults. A key is only
 * overridden when it is actually present — `undefined`/`null` means "never
 * edited", so the default wins. An empty string or empty array is a
 * deliberate edit and is respected.
 */
export function resolvePage(
  page: string,
  stored?: Record<string, unknown> | null
): PageContent {
  const out = defaultsFor(page);

  if (!stored) return out;

  for (const field of allFields(page)) {
    const value = stored[field.key];

    if (value === undefined || value === null) continue;

    // Guard against a stored value whose shape no longer matches the registry
    // (e.g. a field's type changed after content was saved).
    const wantsArray = field.type === "list" || field.type === "imageList";

    if (wantsArray !== Array.isArray(value)) continue;

    out[field.key] = value;
  }

  return out;
}

export function resolveAll(
  storedByPage: Record<string, Record<string, unknown>> = {}
): SiteContent {
  const out: SiteContent = {};

  for (const page of Object.keys(REGISTRY)) {
    out[page] = resolvePage(page, storedByPage[page]);
  }

  return out;
}

/** Read a single value out of resolved page content, with a typed fallback. */
export function pick<T>(content: PageContent | undefined, key: string, fallback: T): T {
  const value = content?.[key];

  return value === undefined || value === null ? fallback : (value as T);
}
