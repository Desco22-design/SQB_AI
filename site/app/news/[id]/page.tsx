import { notFound } from "next/navigation";
import { getNewsById } from "@/lib/queries";
import NewsArticle from "./NewsArticle";

export const revalidate = 60;

export default async function NewsArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const article = await getNewsById(params.id);
  if (!article) notFound();
  return <NewsArticle article={article} />;
}
