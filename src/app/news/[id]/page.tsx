import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { newsApi } from "@/services/api";
import { Facebook, Twitter } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NewsArticlePage({ params }: Props) {
  try {
    const { id } = await params;
    const { data: article } = await newsApi.getNewsArticle(id);
    const { data: relatedArticles } = await newsApi.getNews(1, 3);

    if (!article) notFound();

    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="flex space-x-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/news" className="hover:text-blue-600">
                  News
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900">{article.title}</li>
            </ol>
          </nav>
          <article className="relative isolate">
            <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-[3/2]">
              {article.image ? (
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="absolute inset-0 h-full w-full object-cover rounded-lg"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-200 rounded-lg" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 rounded-lg" />
              <div className="absolute inset-0 ring-1 ring-inset ring-gray-900/10 rounded-lg" />
            </div>
            <div className="mt-8">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={article.createdAt} className="text-gray-500">
                  {new Date(article.createdAt).toLocaleDateString()}
                </time>
                <span className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                  Health
                </span>
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {article.title}
              </h1>
              <div className="mt-6 flex items-center gap-x-4">
                <p className="text-sm font-semibold text-gray-900">
                  {article.author}
                </p>
              </div>
              <div className="mt-8 text-lg leading-8 text-gray-700">
                {article.content}
              </div>
              <div className="mt-6 flex gap-4">
                <a
                  href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    window.location.href
                  )}`}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    window.location.href
                  )}&text=${encodeURIComponent(article.title)}`}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>
          </article>
          {relatedArticles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900">
                Related Articles
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/news/${related.id}`}
                    className="group"
                  >
                    <div className="aspect-[16/9] overflow-hidden rounded-lg">
                      <Image
                        src={related.image || "/placeholder-news.jpg"}
                        alt={related.title}
                        width={400}
                        height={225}
                        className="h-full w-full object-cover group-hover:opacity-75"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                      {related.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {related.content}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching article:", error);
    notFound();
  }
}
