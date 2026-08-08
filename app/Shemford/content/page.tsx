"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ExternalLink, RotateCcw, Save, Trash2, Plus } from "lucide-react";

import { REGISTRY } from "@/lib/content/registry";
import type { Field, ItemField } from "@/lib/content/types";
import { ImageUploader, MultiImageUploader } from "@/components/admin/ImageUploader";

type PageData = Record<string, unknown>;
type SiteData = Record<string, PageData>;

const inputCls =
  "w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white";

/* ── One row of a repeating list ── */
function ListRow({
  fields,
  value,
  onChange,
  onRemove,
  onMove,
  index,
  total,
}: {
  fields: ItemField[];
  value: Record<string, string>;
  onChange: (next: Record<string, string>) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
  index: number;
  total: number;
}) {
  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/60">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Item {index + 1}
        </span>
        <div className="flex items-center gap-1">
          <button
            className="px-2 py-1 text-xs rounded-sm bg-gray-200 dark:bg-gray-700 disabled:opacity-30"
            disabled={index === 0}
            title="Move up"
            type="button"
            onClick={() => onMove(-1)}
          >
            ↑
          </button>
          <button
            className="px-2 py-1 text-xs rounded-sm bg-gray-200 dark:bg-gray-700 disabled:opacity-30"
            disabled={index === total - 1}
            title="Move down"
            type="button"
            onClick={() => onMove(1)}
          >
            ↓
          </button>
          <button
            className="px-2 py-1 text-xs rounded-sm bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/40"
            title="Remove item"
            type="button"
            onClick={onRemove}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {fields.map((f) => (
          <div key={f.key} className={f.type === "textarea" || f.type === "image" ? "md:col-span-2" : ""}>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
              {f.label}
            </label>
            {f.type === "textarea" ? (
              <textarea
                className={inputCls}
                rows={2}
                value={value[f.key] ?? ""}
                onChange={(e) => onChange({ ...value, [f.key]: e.target.value })}
              />
            ) : f.type === "image" ? (
              <ImageUploader
                value={value[f.key] ?? ""}
                onChange={(url) => onChange({ ...value, [f.key]: url })}
              />
            ) : f.type === "select" ? (
              <select
                className={inputCls}
                value={value[f.key] ?? ""}
                onChange={(e) => onChange({ ...value, [f.key]: e.target.value })}
              >
                <option value="">—</option>
                {(f.options ?? []).map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className={inputCls}
                type="text"
                value={value[f.key] ?? ""}
                onChange={(e) => onChange({ ...value, [f.key]: e.target.value })}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── One registry field ── */
function FieldEditor({
  field,
  value,
  onChange,
  onReset,
}: {
  field: Field;
  value: unknown;
  onChange: (next: unknown) => void;
  onReset: () => void;
}) {
  return (
    <div className="py-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100">
            {field.label}
          </label>
          {field.help && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{field.help}</p>
          )}
        </div>
        <button
          className="text-xs text-gray-400 hover:text-blue-600 flex items-center gap-1 shrink-0"
          title="Restore the original text"
          type="button"
          onClick={onReset}
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {field.type === "textarea" && (
        <textarea
          className={inputCls}
          rows={5}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {(field.type === "text" || field.type === "link") && (
        <input
          className={inputCls}
          type="text"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "select" && (
        <select
          className={inputCls}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        >
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}

      {field.type === "image" && (
        <ImageUploader value={(value as string) ?? ""} onChange={onChange} />
      )}

      {field.type === "imageList" && (
        <MultiImageUploader values={(value as string[]) ?? []} onChange={onChange} />
      )}

      {field.type === "list" && (
        <ListEditor
          fields={field.fields}
          values={(value as Record<string, string>[]) ?? []}
          onChange={onChange}
        />
      )}
    </div>
  );
}

function ListEditor({
  fields,
  values,
  onChange,
}: {
  fields: ItemField[];
  values: Record<string, string>[];
  onChange: (next: Record<string, string>[]) => void;
}) {
  function move(index: number, dir: -1 | 1) {
    const to = index + dir;

    if (to < 0 || to >= values.length) return;
    const next = [...values];
    const [item] = next.splice(index, 1);

    next.splice(to, 0, item);
    onChange(next);
  }

  return (
    <div className="space-y-3">
      {values.map((row, i) => (
        <ListRow
          key={i}
          fields={fields}
          index={i}
          total={values.length}
          value={row}
          onChange={(next) => onChange(values.map((r, idx) => (idx === i ? next : r)))}
          onMove={(dir) => move(i, dir)}
          onRemove={() => onChange(values.filter((_, idx) => idx !== i))}
        />
      ))}
      <button
        className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 hover:border-blue-500 hover:text-blue-500 transition"
        type="button"
        onClick={() =>
          onChange([...values, Object.fromEntries(fields.map((f) => [f.key, ""]))])
        }
      >
        <Plus className="w-4 h-4" /> Add item
      </button>
    </div>
  );
}

/* ── Page ── */
export default function ContentAdminPage() {
  const pageKeys = useMemo(() => Object.keys(REGISTRY), []);
  const [active, setActive] = useState(pageKeys[0]);
  const [data, setData] = useState<SiteData>({});
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [dirty, setDirty] = useState<Record<string, boolean>>({});
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/content", { cache: "no-store" });

      if (!res.ok) throw new Error("load failed");
      setData(await res.json());
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const def = REGISTRY[active];
  const pageData = data[active] ?? {};

  function setValue(key: string, value: unknown) {
    setData((prev) => ({ ...prev, [active]: { ...(prev[active] ?? {}), [key]: value } }));
    setDirty((prev) => ({ ...prev, [active]: true }));
    setMessage("");
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: active, data: pageData }),
      });

      if (res.status === 401) throw new Error("Session expired — please sign in again.");
      if (!res.ok) throw new Error("Save failed");

      setDirty((prev) => ({ ...prev, [active]: false }));
      setMessage("Saved. Your changes are live on the website.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function resetPage() {
    if (!confirm(`Restore every field on "${def.label}" to its original text?`)) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/content?page=${encodeURIComponent(active)}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Reset failed");
      await load();
      setDirty((prev) => ({ ...prev, [active]: false }));
      setMessage("Page restored to its original content.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Reset failed");
    } finally {
      setSaving(false);
    }
  }

  function resetField(field: Field) {
    setValue(field.key, structuredClone(field.default));
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 shrink-0"
              href="/Shemford"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </Link>
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                Website Content
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                Edit any text or image on the public site
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {def && (
              <a
                className="hidden sm:flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 px-3 py-2"
                href={def.path}
                rel="noreferrer"
                target="_blank"
              >
                View <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              className="text-sm px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              disabled={saving}
              type="button"
              onClick={resetPage}
            >
              Reset page
            </button>
            <button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition"
              disabled={saving || status !== "ready"}
              type="button"
              onClick={save}
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving…" : dirty[active] ? "Save changes" : "Save"}
            </button>
          </div>
        </div>
        {message && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3">
            <p
              className={`text-sm ${message.startsWith("Saved") || message.startsWith("Page restored") ? "text-green-600" : "text-red-600"}`}
            >
              {message}
            </p>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {status === "loading" && (
          <p className="text-gray-500 dark:text-gray-400">Loading content…</p>
        )}
        {status === "error" && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-700 dark:text-red-300 text-sm">
              Could not load content. Check the database connection and reload.
            </p>
          </div>
        )}

        {status === "ready" && def && (
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
            {/* Page list */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                Pages
              </p>
              <nav className="space-y-1">
                {pageKeys.map((key) => (
                  <button
                    key={key}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition flex items-center gap-2 ${
                      key === active
                        ? "bg-blue-600 text-white font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    type="button"
                    onClick={() => setActive(key)}
                  >
                    <span>{REGISTRY[key].icon ?? "📄"}</span>
                    <span className="flex-1 truncate">{REGISTRY[key].label}</span>
                    {dirty[key] && (
                      <span
                        className="w-2 h-2 rounded-full bg-amber-400 shrink-0"
                        title="Unsaved changes"
                      />
                    )}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Fields */}
            <main className="space-y-6 min-w-0">
              {def.groups.map((group) => {
                const groupId = `${active}:${group.label}`;
                const collapsed = openGroups[groupId] === false;

                return (
                  <section
                    key={group.label}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-xs border border-gray-200 dark:border-gray-700"
                  >
                    <button
                      className="w-full flex items-center justify-between px-6 py-4 text-left"
                      type="button"
                      onClick={() =>
                        setOpenGroups((prev) => ({ ...prev, [groupId]: collapsed }))
                      }
                    >
                      <h2 className="font-bold text-gray-900 dark:text-white">{group.label}</h2>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${collapsed ? "-rotate-90" : ""}`}
                      />
                    </button>
                    {!collapsed && (
                      <div className="px-6 pb-4">
                        {group.fields.map((field) => (
                          <FieldEditor
                            key={field.key}
                            field={field}
                            value={pageData[field.key]}
                            onChange={(next) => setValue(field.key, next)}
                            onReset={() => resetField(field)}
                          />
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}
