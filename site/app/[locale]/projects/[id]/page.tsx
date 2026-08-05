import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/queries";
import { getProjectDetail } from "@/lib/project-details";
import { pickLang } from "@/lib/i18n-utils";
import { isLocale, type Locale } from "@/lib/locale";
import ProjectCase from "./ProjectCase";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
  const project = await getProjectById(params.id);
  if (!project) return { title: "SQB AI" };
  const locale: Locale = isLocale(params.locale) ? params.locale : "uz";
  const name = pickLang(project.name, locale);
  const short = pickLang(project.short, locale);
  return { title: `${name} - SQB AI`, description: short };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const project = await getProjectById(params.id);
  if (!project) notFound();
  const detail = getProjectDetail(params.id);
  return <ProjectCase project={project} detail={detail} />;
}
