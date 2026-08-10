"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { collectI18n, pickLang } from "@/lib/i18n-utils";
import { logAudit } from "@/lib/audit";

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}
const s = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const n = (f: FormData, k: string) => {
  const v = Number(f.get(k));
  return Number.isFinite(v) ? v : 0;
};
const csv = (f: FormData, k: string) =>
  s(f, k)
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

function parseImpact(form: FormData): { label: string; value: string }[] {
  const raw = s(form, "impact");
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((p: { label?: string; value?: string }) => ({
        label: String(p.label ?? "").trim(),
        value: String(p.value ?? "").trim(),
      }))
      .filter((p) => p.label && p.value);
  } catch {
    return [];
  }
}

function teamIds(form: FormData): string[] {
  return form
    .getAll("team")
    .map((v) => String(v).trim())
    .filter(Boolean);
}

const isEmptyTri = (v: unknown) =>
  !v ||
  (typeof v === "object" &&
    ["uz", "ru", "en"].every(
      (k) => !String((v as Record<string, unknown>)[k] ?? "").trim()
    ));

/** Parse a hidden JSON field; blank/empty content becomes DB null. */
function detailFields(form: FormData) {
  const parse = (k: string): unknown => {
    const raw = s(form, k);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };
  const tagline = parse("tagline");
  const heroImage = parse("heroImage");
  const metricsRaw = parse("metrics");
  const sectionsRaw = parse("detailSections");

  const metrics = Array.isArray(metricsRaw)
    ? metricsRaw.filter((m) => !isEmptyTri(m?.value) || !isEmptyTri(m?.label))
    : [];
  const sections = Array.isArray(sectionsRaw) ? sectionsRaw : [];

  const N = Prisma.JsonNull;
  return {
    tagline: isEmptyTri(tagline) ? N : (tagline as Prisma.InputJsonValue),
    heroImage:
      heroImage && typeof heroImage === "object" && (heroImage as { src?: string }).src
        ? (heroImage as Prisma.InputJsonValue)
        : N,
    metrics: metrics.length ? (metrics as Prisma.InputJsonValue) : N,
    detailSections: sections.length ? (sections as Prisma.InputJsonValue) : N,
  };
}

export async function createProject(form: FormData) {
  await requireAuth();
  const name = collectI18n(form, "name");
  const id =
    s(form, "id") ||
    slugify(pickLang(name, "en") || pickLang(name, "ru")) ||
    "project";
  const team = teamIds(form);
  await prisma.project.create({
    data: {
      id,
      name,
      short: collectI18n(form, "short"),
      problem: collectI18n(form, "problem"),
      solution: collectI18n(form, "solution"),
      technologies: csv(form, "technologies"),
      impact: parseImpact(form),
      direction: s(form, "direction"),
      status: s(form, "status"),
      order: n(form, "order"),
      ...detailFields(form),
      team: { connect: team.map((id) => ({ id })) },
    },
  });
  await logAudit({
    action: "create",
    entity: "projects",
    entityId: id,
    summary: pickLang(name, "ru") || id,
  });
  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(id: string, form: FormData) {
  await requireAuth();
  const team = teamIds(form);
  const name = collectI18n(form, "name");
  await prisma.project.update({
    where: { id },
    data: {
      name,
      short: collectI18n(form, "short"),
      problem: collectI18n(form, "problem"),
      solution: collectI18n(form, "solution"),
      technologies: csv(form, "technologies"),
      impact: parseImpact(form),
      direction: s(form, "direction"),
      status: s(form, "status"),
      order: n(form, "order"),
      ...detailFields(form),
      team: { set: team.map((id) => ({ id })) },
    },
  });
  await logAudit({
    action: "update",
    entity: "projects",
    entityId: id,
    summary: pickLang(name, "ru") || id,
  });
  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAuth();
  const existing = await prisma.project.findUnique({ where: { id } });
  await prisma.project.delete({ where: { id } });
  await logAudit({
    action: "delete",
    entity: "projects",
    entityId: id,
    summary: pickLang(existing?.name, "ru") || id,
  });
  revalidatePath("/admin/projects");
  revalidatePath("/");
}
