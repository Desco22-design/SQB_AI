import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

const STORE_NAME = "media";

function isVercel() {
  return Boolean(process.env.VERCEL || process.env.BLOB_READ_WRITE_TOKEN);
}
function isNetlify() {
  return Boolean(process.env.NETLIFY || process.env.NETLIFY_SITE_ID);
}

function extFromMime(mime: string, fallback = "bin") {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };
  return map[mime] ?? fallback;
}

// Matches the exact key format produced by saveImage():
//   `${Date.now()}-${randomUUID()}.${ext}`
// where ext is one of the allowed raster image extensions (no svg).
const KEY_RE = /^\d+-[0-9a-f-]{36}\.(jpg|jpeg|png|webp|gif)$/;

export async function saveImage(file: {
  buffer: Buffer;
  mime: string;
  originalName?: string;
}): Promise<{ url: string; key: string }> {
  const ext = extFromMime(file.mime, "bin");
  const key = `${Date.now()}-${randomUUID()}.${ext}`;

  // Vercel Blob — used when deployed on Vercel
  if (isVercel()) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`${STORE_NAME}/${key}`, file.buffer, {
      access: "public",
      contentType: file.mime,
      addRandomSuffix: false,
    });
    return { url: blob.url, key };
  }

  // Netlify Blobs — used when deployed on Netlify
  if (isNetlify()) {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore({ name: STORE_NAME, consistency: "strong" });
    await store.set(key, file.buffer, {
      metadata: { mime: file.mime, originalName: file.originalName ?? "" },
    });
    return { url: `/api/media/${key}`, key };
  }

  // Local dev — write to public/uploads
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, key), file.buffer);
  return { url: `/uploads/${key}`, key };
}

export async function readImage(
  key: string
): Promise<{ data: Buffer; mime: string } | null> {
  // Reject any key that does not match the exact format saveImage() generates.
  // This blocks path traversal (../) and any unexpected characters before any
  // storage access happens.
  if (typeof key !== "string" || !KEY_RE.test(key)) {
    return null;
  }

  // Vercel Blob — direct CDN URLs, no local serving needed.
  // This handler is used only by Netlify (legacy) and local dev.

  if (isNetlify()) {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore({ name: STORE_NAME, consistency: "strong" });
    const blob = await store.getWithMetadata(key, { type: "arrayBuffer" });
    if (!blob) return null;
    const mime =
      (blob.metadata?.mime as string | undefined) ?? "application/octet-stream";
    return { data: Buffer.from(blob.data), mime };
  }

  // Defense-in-depth: ensure the resolved path stays inside the uploads dir.
  const UPLOADS_DIR = path.resolve(process.cwd(), "public", "uploads");
  const resolved = path.resolve(UPLOADS_DIR, key);
  if (!resolved.startsWith(UPLOADS_DIR + path.sep)) {
    return null;
  }

  try {
    const data = await fs.readFile(resolved);
    const ext = path.extname(key).slice(1).toLowerCase();
    const mime =
      ext === "jpg" || ext === "jpeg"
        ? "image/jpeg"
        : ext === "png"
          ? "image/png"
          : ext === "webp"
            ? "image/webp"
            : ext === "gif"
              ? "image/gif"
              : "application/octet-stream";
    return { data, mime };
  } catch {
    return null;
  }
}

export async function deleteImageByUrl(url: string): Promise<void> {
  if (!url) return;

  // Vercel Blob URLs look like https://<id>.public.blob.vercel-storage.com/...
  if (url.includes(".blob.vercel-storage.com")) {
    try {
      const { del } = await import("@vercel/blob");
      await del(url);
    } catch {
      /* ignore */
    }
    return;
  }

  // Netlify Blob: served via /api/media/<key>
  // Local dev: served via /uploads/<key>
  const m = url.match(/\/(api\/media|uploads)\/([^?#]+)$/);
  if (!m) return;
  const key = m[2];

  if (isNetlify()) {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore({ name: STORE_NAME, consistency: "strong" });
    try {
      await store.delete(key);
    } catch {
      /* ignore */
    }
    return;
  }

  const file = path.join(process.cwd(), "public", "uploads", key);
  try {
    await fs.unlink(file);
  } catch {
    /* ignore */
  }
}
