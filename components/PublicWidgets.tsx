"use client";

import { usePathname } from "next/navigation";

import AIChat from "./AIChat";
import AdmissionModal from "./AdmissionModal";

/** Route prefixes that are the admin panel, not the public site. */
const ADMIN_ROUTES = ["/admin", "/Shemford"];

/**
 * Visitor-facing widgets (chatbot, admissions popup).
 *
 * These are marketing tools for prospective parents and must not render over
 * the admin panel — the admissions popup opens automatically one second after
 * any page load, and its full-screen container swallowed every click in the
 * admin UI.
 */
export default function PublicWidgets() {
  const pathname = usePathname() ?? "";

  if (ADMIN_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))) {
    return null;
  }

  return (
    <>
      <AIChat />
      <AdmissionModal />
    </>
  );
}
