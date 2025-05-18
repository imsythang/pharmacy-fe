import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const navigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "News", href: "/news" },
    { name: "Contact", href: "/contact" },
    { name: "Locations", href: "/locations" },
  ],
  categories: [
    { name: "Prescription Drugs", href: "/products?category=prescription" },
    { name: "OTC Medicines", href: "/products?category=otc" },
    { name: "Supplements", href: "/products?category=supplements" },
    { name: "Medical Devices", href: "/products?category=devices" },
  ],
  social: [
    { name: "Facebook", href: "https://facebook.com/pharmacy", icon: Facebook },
    { name: "Twitter", href: "https://twitter.com/pharmacy", icon: Twitter },
    { name: "Instagram", href: "https://instagram.com/pharmacy", icon: Instagram },
    { name: "YouTube", href: "https://youtube.com/pharmacy", icon: Youtube },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Pharmacy</h3>
            <p className="mt-4 text-sm text-gray-600">
              Your trusted online pharmacy for quality healthcare products.
            </p>
            <p className="mt-4 text-sm text-gray-600">
              Email: support@pharmacy.com
              <br />
              Phone: +84 123 456 789
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Navigation</h3>
            <ul className="mt-4 space-y-4">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Categories</h3>
            <ul className="mt-4 space-y-4">
              {navigation.categories.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Follow Us</h3>
            <div className="mt-4 flex space-x-6">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-blue-600"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Pharmacy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
