import { getNewsById } from "@/lib/queries";
import NewsArticle from "./NewsArticle";

export const dynamic = "force-dynamic";

export default async function NewsArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const article = await getNewsById(params.id);
  return <NewsArticle article={article} />;
}
