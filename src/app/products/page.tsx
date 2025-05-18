import { ProductCard } from "@/components/product/ProductCard";
import { productApi } from "@/services/api";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/Input";
import Link from "next/link"; // ✅ Next.js Link

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    category?: string;
    sort?: string;
    search?: string;
  }>;
}) {
  try {
    const { page = "1", category, sort, search } = await searchParams;
    const pageNum = parseInt(page) || 1;
    const limit = 12;

    const { data: products, total } = await productApi.getProducts(pageNum, limit, {
      category,
      sort,
      search,
    });

    if (!products || !Array.isArray(products)) {
      return (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products</h1>
            <p className="mt-6 text-gray-500">Unable to load products. Please try again later.</p>
          </div>
        </div>
      );
    }

    const totalPages = Math.ceil(total / limit);

    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products</h1>

          {/* Bộ lọc & tìm kiếm */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex gap-4">
              <select
                name="category"
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue={category || ""}
              >
                <option value="">All Categories</option>
                <option value="prescription">Prescription Drugs</option>
                <option value="otc">OTC Medicines</option>
                <option value="supplements">Supplements</option>
                <option value="devices">Medical Devices</option>
              </select>
              <select
                name="sort"
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue={sort || ""}
              >
                <option value="">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
            <form action="/products" method="GET" className="max-w-xs">
              <Input
                type="text"
                name="search"
                placeholder="Search products..."
                defaultValue={search || ""}
                className="w-full"
              />
            </form>
          </div>

          {/* Danh sách sản phẩm */}
          {products.length === 0 ? (
            <p className="mt-6 text-gray-500">No products available.</p>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-4">
              <Link
                href={`/products?page=${pageNum - 1}${
                  category ? `&category=${category}` : ""
                }${sort ? `&sort=${sort}` : ""}${search ? `&search=${search}` : ""}`}
              >
                <Button variant="outline" size="sm" disabled={pageNum === 1}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
              </Link>

              <Link
                href={`/products?page=${pageNum + 1}${
                  category ? `&category=${category}` : ""
                }${sort ? `&sort=${sort}` : ""}${search ? `&search=${search}` : ""}`}
              >
                <Button variant="outline" size="sm" disabled={pageNum === totalPages}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products</h1>
          <p className="mt-6 text-gray-500">Unable to load products. Please try again later.</p>
        </div>
      </div>
    );
  }
}
