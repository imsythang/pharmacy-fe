import Image from "next/image";
import Link from "next/link";
import { newsApi } from "@/services/api";

export default async function NewsPage() {
  try {
    const response = await newsApi.getNews();
    const articles = Array.isArray(response) ? response : response.data || [];

    if (!articles || !Array.isArray(articles)) {
      console.error("Invalid articles data: Expected an array");
      return (
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Health News & Articles
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Stay informed with the latest health news, tips, and expert
                advice.
              </p>
            </div>
            <p className="mt-16 text-center text-gray-500">
              Unable to load articles. Please try again later.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Health News & Articles
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Stay informed with the latest health news, tips, and expert
              advice.
            </p>
          </div>
          {articles.length === 0 ? (
            <p className="mt-16 text-center text-gray-500">
              No articles available.
            </p>
          ) : (
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {articles.map((article) => (
                <article key={article.id} className="flex flex-col items-start">
                  <div className="relative w-full">
                    {article.imageUrl ? (
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        width={500}
                        height={300}
                        className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                      />
                    ) : (
                      <div className="aspect-[16/9] w-full rounded-2xl bg-gray-100 sm:aspect-[2/1] lg:aspect-[3/2]" />
                    )}
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="max-w-xl">
                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                      <time
                        dateTime={article.createdAt}
                        className="text-gray-500"
                      >
                        {new Date(article.createdAt).toLocaleDateString()}
                      </time>
                      <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                        Health
                      </span>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <Link href={`/news/${article.id}`}>
                          <span className="absolute inset-0" />
                          {article.title}
                        </Link>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                        {article.content}
                      </p>
                    </div>
                    <div className="relative mt-8 flex items-center gap-x-4">
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <span className="absolute inset-0" />
                          {article.author}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching articles:", error);
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Health News & Articles
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Stay informed with the latest health news, tips, and expert
              advice.
            </p>
          </div>
          <p className="mt-16 text-center text-gray-500">
            Unable to load articles. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
