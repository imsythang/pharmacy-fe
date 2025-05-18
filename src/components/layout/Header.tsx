"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Menu, X, ShoppingCart, User, Search } from "lucide-react";
import { orderApi } from "@/services/api";
import { CartItem } from "@/types";
const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "News", href: "/news" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Locations", href: "/locations" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await orderApi.getOrders(); // Cần API getCart
        const items: CartItem[] = response.data[0]?.items || [];
        const count = items.reduce(
          (sum: number, item: CartItem) => sum + item.quantity,
          0
        );
        setCartCount(count);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }
    fetchCart();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center w-full">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Pharmacy
            </Link>
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:ml-10">
              <div className="flex space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-base font-medium ${
                      pathname === item.href
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-blue-600 transition-colors"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <form onSubmit={handleSearch} className="ml-8 flex-1 max-w-md">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <Search className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-xs text-white flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/account">
              <Button variant="ghost" size="icon">
                <User className="h-6 w-6" />
              </Button>
            </Link>
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="space-y-1 pb-3 pt-2">
              <form onSubmit={handleSearch} className="px-3 py-2">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <Search className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </form>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium ${
                    pathname === item.href
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
