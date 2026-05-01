import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { getStore } from "@netlify/blobs";

const STORE_NAME = "media";

function isNetlify() {
  return Boolean(process.env.NETLIFY || process.env.NETLIFY_SITE_ID);
}

function extFromMime(mime: string, fallback = "bin") {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/svg+xml": "svg",
  };
  return map[mime] ?? fallback;
}

export async function saveImage(file: {
  buffer: Buffer;
  mime: string;
  originalName?: string;
}): Promise<{ url: string; key: string }> {
  const ext = extFromMime(file.mime, "bin");
  const key = `${Date.now()}-${randomUUID()}.${ext}`;

  if (isNetlify()) {
    const store = getStore({ name: STORE_NAME, consistency: "strong" });
    await store.set(key, file.buffer, {
      metadata: { mime: file.mime, originalName: file.originalName ?? "" },
    });
    return { url: `/api/media/${key}`, key };
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, key), file.buffer);
  return { url: `/uploads/${key}`, key };
}

export async function readImage(
  key: string
): Promise<{ data: Buffer; mime: string } | null> {
  if (isNetlify()) {
    const store = getStore({ name: STORE_NAME, consistency: "strong" });
    const blob = await store.getWithMetadata(key, { type: "arrayBuffer" });
    if (!blob) return null;
    const mime =
      (blob.metadata?.mime as string | undefined) ?? "application/octet-stream";
    return { data: Buffer.from(blob.data), mime };
  }

  const file = path.join(process.cwd(), "public", "uploads", key);
  try {
    const data = await fs.readFile(file);
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
              : ext === "svg"
                ? "image/svg+xml"
                : "application/octet-stream";
    return { data, mime };
  } catch {
    return null;
  }
}

export async function deleteImageByUrl(url: string): Promise<void> {
  if (!url) return;
  // Netlify-served URL: /api/media/<key>
  // Local-served URL: /uploads/<key>
  const m = url.match(/\/(api\/media|uploads)\/([^?#]+)$/);
  if (!m) return;
  const key = m[2];

  if (isNetlify()) {
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
