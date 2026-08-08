"use client";

import * as React from "react";

import type { PageContent, SiteContent } from "./types";

const ContentContext = React.createContext<SiteContent>({});

export function ContentProvider({
  value,
  children,
}: {
  value: SiteContent;
  children: React.ReactNode;
}) {
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useSiteContent(): SiteContent {
  return React.useContext(ContentContext);
}

export interface PageContentApi {
  /** a text/image/link value */
  t: (key: string, fallback?: string) => string;
  /** a list ("repeater") or image-list value */
  list: <T = Record<string, string>>(key: string, fallback?: T[]) => T[];
  raw: PageContent;
}

/**
 * Content for one page, already merged with registry defaults on the server.
 * The `fallback` arguments only matter if a key is missing from the registry,
 * so a typo degrades to the literal instead of rendering blank.
 */
export function usePageContent(page: string): PageContentApi {
  const site = useSiteContent();
  const content = site[page];

  return React.useMemo<PageContentApi>(
    () => ({
      raw: content ?? {},
      t: (key, fallback = "") => {
        const value = content?.[key];

        return typeof value === "string" ? value : fallback;
      },
      list: <T,>(key: string, fallback: T[] = []) => {
        const value = content?.[key];

        return Array.isArray(value) ? (value as T[]) : fallback;
      },
    }),
    [content]
  );
}
