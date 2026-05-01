import { NextRequest, NextResponse } from "next/server";
import { readImage } from "@/lib/storage";

export async function GET(
  _req: NextRequest,
  { params }: { params: { key: string } }
) {
  const result = await readImage(params.key);
  if (!result) {
    return new NextResponse("Not found", { status: 404 });
  }
  return new NextResponse(new Uint8Array(result.data), {
    status: 200,
    headers: {
      "Content-Type": result.mime,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
