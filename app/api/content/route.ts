import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Content from "@/models/Content";
import { REGISTRY } from "@/lib/content/registry";
import { allFields, resolvePage } from "@/lib/content/resolve";
import { revalidateSiteContent } from "@/lib/content/server";

/**
 * GET  /api/content            -> resolved content for every page
 * GET  /api/content?page=home  -> resolved content for one page
 *
 * Writes are admin-only; the guard lives in proxy.ts so every /api namespace
 * is protected in one place.
 */
export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page");

  try {
    await connectDB();

    if (page) {
      if (!REGISTRY[page]) {
        return NextResponse.json({ error: "Unknown page" }, { status: 404 });
      }

      const doc = await Content.findOne({ page }).lean<{ data: Record<string, unknown> }>();

      return NextResponse.json(resolvePage(page, doc?.data));
    }

    const docs = await Content.find().lean<{ page: string; data: Record<string, unknown> }[]>();
    const stored = new Map(docs.map((d) => [d.page, d.data || {}]));
    const out: Record<string, unknown> = {};

    for (const key of Object.keys(REGISTRY)) out[key] = resolvePage(key, stored.get(key));

    return NextResponse.json(out);
  } catch (error) {
    console.error("[content] GET failed:", error);

    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
}

/** PUT /api/content  body: { page, data } — saves overrides for one page. */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const { page, data } = body as { page?: unknown; data?: unknown };

    if (typeof page !== "string" || !REGISTRY[page]) {
      return NextResponse.json({ error: "Unknown page" }, { status: 400 });
    }

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Only persist keys the registry knows about, so a stale or hand-crafted
    // payload cannot stuff arbitrary documents into the collection.
    const known = new Set(allFields(page).map((f) => f.key));
    const clean: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
      if (known.has(key)) clean[key] = value;
    }

    await connectDB();
    await Content.findOneAndUpdate(
      { page },
      { page, data: clean },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    revalidateSiteContent();

    return NextResponse.json({ success: true, page, saved: Object.keys(clean).length });
  } catch (error) {
    console.error("[content] PUT failed:", error);

    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}

/**
 * DELETE /api/content?page=home          -> reset the whole page to defaults
 * DELETE /api/content?page=home&key=x    -> reset one field to its default
 */
export async function DELETE(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page");
  const key = request.nextUrl.searchParams.get("key");

  if (!page || !REGISTRY[page]) {
    return NextResponse.json({ error: "Unknown page" }, { status: 400 });
  }

  try {
    await connectDB();

    if (key) {
      await Content.updateOne({ page }, { $unset: { [`data.${key}`]: "" } });
    } else {
      await Content.deleteOne({ page });
    }

    revalidateSiteContent();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[content] DELETE failed:", error);

    return NextResponse.json({ error: "Failed to reset content" }, { status: 500 });
  }
}
