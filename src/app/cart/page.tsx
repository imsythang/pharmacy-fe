import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {/* Sample cart item - will be replaced with actual data */}
              <li className="flex py-6 sm:py-10">
                <div className="flex-shrink-0">
                  <Image
                    src="/placeholder-product.jpg"
                    alt="Product image"
                    width={200}
                    height={200}
                    className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm">
                          <Link
                            href="/products/1"
                            className="font-medium text-gray-700 hover:text-gray-800"
                          >
                            Product Name
                          </Link>
                        </h3>
                      </div>
                      <div className="mt-1 flex text-sm">
                        <p className="text-gray-500">Category</p>
                      </div>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        $99.99
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                      <label htmlFor="quantity-0" className="sr-only">
                        Quantity, Product Name
                      </label>
                      <select
                        id="quantity-0"
                        name="quantity-0"
                        className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>

                      <div className="absolute right-0 top-0">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Remove</span>
                          <Trash2 className="h-5 w-5" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">$99.99</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">$5.00</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-base font-medium text-gray-900">
                  <span>Order total</span>
                </dt>
                <dd className="text-base font-medium text-gray-900">$104.99</dd>
              </div>
            </dl>

            <div className="mt-6">
              <Link href="/checkout">
                <Button className="w-full">Checkout</Button>
              </Link>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
