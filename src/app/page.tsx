import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { productApi, newsApi } from "@/services/api";

export default async function Home() {
  const { data: products } = await productApi.getProducts(1, 8);
  const { data: articles } = await newsApi.getNews(1, 3);

  return (
    <div className="bg-gray-50">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Your Health, Our Priority
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Discover a wide range of healthcare products and services. We&apos;re here to support your wellness journey with quality products and expert advice.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link href="/products">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/about" className="text-sm font-semibold text-gray-900 hover:text-blue-600">
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0">
            <Image
              src="/hero-image.jpg"
              alt="Healthcare products"
              width={600}
              height={600}
              className="rounded-3xl shadow-xl"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Featured products section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Products</h2>
          <Link href="/products" className="text-sm font-semibold text-blue-600 hover:text-blue-500">
            Browse all products <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Latest news section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Latest Health News</h2>
            <Link href="/news" className="text-sm font-semibold text-blue-600 hover:text-blue-500">
              Read all news <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link key={article.id} href={`/news/${article.id}`} className="group">
                <div className="aspect-[16/9] overflow-hidden rounded-lg">
                  <Image
                    src={article.image || "/placeholder-news.jpg"}
                    alt={article.title}
                    width={400}
                    height={225}
                    className="h-full w-full object-cover group-hover:opacity-75"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{article.content}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Promotion banner */}
      <div className="bg-blue-600 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white">Special Offer</h2>
          <p className="mt-4 text-lg text-white/80">Get 20% off your first order with code WELCOME20</p>
          <Link href="/products">
            <Button size="lg" variant="secondary" className="mt-6 bg-white text-blue-600 hover:bg-gray-100">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
