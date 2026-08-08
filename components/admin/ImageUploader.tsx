"use client";

import { useRef, useState } from "react";
import { ImageIcon, Plus, UploadCloud, X } from "lucide-react";

function upload(file: File, onProgress: (pct: number) => void): Promise<string> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();

    formData.append("files", file);

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "/api/upload");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status === 200) {
        try {
          resolve(JSON.parse(xhr.responseText).url);
        } catch {
          reject(new Error("Bad response from upload"));
        }
      } else if (xhr.status === 401) {
        reject(new Error("Session expired — sign in again"));
      } else {
        reject(new Error("Upload failed"));
      }
    };
    xhr.onerror = () => reject(new Error("Upload failed"));
    xhr.send(formData);
  });
}

export function ImageUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setError("");
    setUploading(true);
    setProgress(0);
    try {
      onChange(await upload(file, setProgress));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        accept="image/*"
        className="hidden"
        type="file"
        onChange={(e) => {
          const f = e.target.files?.[0];

          if (f) handleFile(f);
          e.target.value = "";
        }}
      />
      {value ? (
        <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="preview" className="w-full h-full object-contain" src={value} />
          <button
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
            title="Remove"
            type="button"
            onClick={() => onChange("")}
          >
            <X className="w-4 h-4" />
          </button>
          <button
            className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1"
            type="button"
            onClick={() => inputRef.current?.click()}
          >
            <UploadCloud className="w-3 h-3" /> Change
          </button>
        </div>
      ) : (
        <button
          className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition disabled:opacity-50"
          disabled={uploading}
          type="button"
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <UploadCloud className="w-7 h-7 animate-bounce" />
          ) : (
            <ImageIcon className="w-7 h-7" />
          )}
          <span className="text-sm font-medium">
            {uploading ? `Uploading… ${progress}%` : "Click to upload image"}
          </span>
        </button>
      )}
      <input
        className="w-full text-xs px-2 py-1.5 border border-gray-200 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200"
        placeholder="…or paste an image URL"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function MultiImageUploader({
  values,
  onChange,
}: {
  values: string[];
  onChange: (urls: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function handleFiles(files: File[]) {
    setError("");
    setUploading(true);
    setProgress(0);

    const added: string[] = [];

    try {
      for (const file of files) added.push(await upload(file, setProgress));
      onChange([...values, ...added]);
    } catch (e) {
      if (added.length) onChange([...values, ...added]);
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function move(from: number, to: number) {
    if (to < 0 || to >= values.length) return;
    const next = [...values];// eslint-disable-next-line no-param-reassign
    const [item] = next.splice(from, 1);

    next.splice(to, 0, item);
    onChange(next);
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        multiple
        accept="image/*"
        className="hidden"
        type="file"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);

          if (files.length) handleFiles(files);
          e.target.value = "";
        }}
      />
      {values.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {values.map((url, i) => (
            <div
              key={`${url}-${i}`}
              className="relative h-24 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="w-full h-full object-cover" src={url} />
              <button
                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5"
                title="Remove"
                type="button"
                onClick={() => onChange(values.filter((_, idx) => idx !== i))}
              >
                <X className="w-3 h-3" />
              </button>
              <div className="absolute bottom-1 left-1 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                <button
                  className="bg-black/60 text-white rounded px-1.5 text-xs"
                  title="Move left"
                  type="button"
                  onClick={() => move(i, i - 1)}
                >
                  ←
                </button>
                <button
                  className="bg-black/60 text-white rounded px-1.5 text-xs"
                  title="Move right"
                  type="button"
                  onClick={() => move(i, i + 1)}
                >
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition text-sm disabled:opacity-50"
        disabled={uploading}
        type="button"
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? <UploadCloud className="w-4 h-4 animate-bounce" /> : <Plus className="w-4 h-4" />}
        {uploading ? `Uploading… ${progress}%` : "Add image(s)"}
      </button>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
