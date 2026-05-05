"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { collectI18n } from "@/lib/i18n-content";
import { logAudit } from "@/lib/audit";
import { SECTION_KEYS, type SectionKey } from "@/lib/section-headings";

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}

function isI18nEmpty(value: { uz?: string; ru?: string; en?: string }) {
  return !value.uz?.trim() && !value.ru?.trim() && !value.en?.trim();
}

function nullableJson(value: { uz?: string; ru?: string; en?: string }) {
  return isI18nEmpty(value) ? Prisma.JsonNull : value;
}

export async function updateSectionHeading(
  section: SectionKey,
  adminPath: string,
  form: FormData
) {
  await requireAuth();
  if (!(SECTION_KEYS as readonly string[]).includes(section)) {
    throw new Error(`Unknown section: ${section}`);
  }
  const eyebrow = collectI18n(form, "eyebrow");
  const titlePrefix = collectI18n(form, "titlePrefix");
  const titleHighlight = collectI18n(form, "titleHighlight");
  const titleSuffix = collectI18n(form, "titleSuffix");
  const subheading = collectI18n(form, "subheading");

  await prisma.sectionHeading.upsert({
    where: { section },
    create: {
      section,
      eyebrow: nullableJson(eyebrow),
      titlePrefix: nullableJson(titlePrefix),
      titleHighlight: nullableJson(titleHighlight),
      titleSuffix: nullableJson(titleSuffix),
      subheading: nullableJson(subheading),
    },
    update: {
      eyebrow: nullableJson(eyebrow),
      titlePrefix: nullableJson(titlePrefix),
      titleHighlight: nullableJson(titleHighlight),
      titleSuffix: nullableJson(titleSuffix),
      subheading: nullableJson(subheading),
    },
  });

  await logAudit({
    action: "update",
    entity: section,
    entityId: "heading",
    summary: `heading: ${titlePrefix.ru ?? ""} ${titleHighlight.ru ?? ""}`.trim() || "heading",
  });

  revalidatePath(adminPath);
  revalidatePath("/");
}
