'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { orderApi } from "@/services/api";
import { CartItem } from "@/types";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "Vietnam",
    region: "",
    postalCode: "",
    phone: "",
    paymentType: "credit-card",
    cardNumber: "",
    nameOnCard: "",
    expirationDate: "",
    cvc: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await orderApi.getOrders(); // Cần API getCart
        setCartItems(response.data[0]?.items || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
        toast.error("Failed to load cart");
      }
    }
    fetchCart();
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (formData.paymentType === "credit-card") {
      if (!formData.cardNumber) newErrors.cardNumber = "Card number is required";
      if (!formData.nameOnCard) newErrors.nameOnCard = "Name on card is required";
      if (!formData.expirationDate) newErrors.expirationDate = "Expiration date is required";
      if (!formData.cvc) newErrors.cvc = "CVC is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const items = cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));
      await orderApi.createOrder(items);
      toast.success("Order placed successfully!");
      router.push("/orders");
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = 5.0;
  const total = subtotal + shipping;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Checkout</h1>
        <form onSubmit={handleSubmit} className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">Checkout information</h2>

            {/* Shipping information */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>
              <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <div className="mt-1">
                    <Input
                      type="text"
                      id="first-name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      error={errors.firstName}
                      autoComplete="given-name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <div className="mt-1">
                    <Input
                      type="text"
                      id="last-name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      error={errors.lastName}
                      autoComplete="family-name"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <div className="mt-1">
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      error={errors.address}
                      autoComplete="street-address"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <div className="mt-1">
                    <Input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      error={errors.city}
                      autoComplete="address-level2"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <div className="mt-1">
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option>Vietnam</option>
                      <option>United States</option>
                      <option>Canada</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                    State / Province
                  </label>
                  <div className="mt-1">
                    <Input
                      type="text"
                      id="region"
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      autoComplete="address-level1"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                    Postal code
                  </label>
                  <div className="mt-1">
                    <Input
                      type="text"
                      id="postal-code"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      autoComplete="postal-code"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <div className="mt-1">
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={errors.phone}
                      autoComplete="tel"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Payment</h2>
              <div className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="cod"
                      name="paymentType"
                      type="radio"
                      value="cod"
                      checked={formData.paymentType === "cod"}
                      onChange={handleInputChange}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                      Cash on Delivery
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="credit-card"
                      name="paymentType"
                      type="radio"
                      value="credit-card"
                      checked={formData.paymentType === "credit-card"}
                      onChange={handleInputChange}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                      Credit card
                    </label>
                  </div>
                </div>
                {formData.paymentType === "credit-card" && (
                  <div className="mt-6 grid grid-cols-4 gap-x-4">
                    <div className="col-span-4">
                      <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                        Card number
                      </label>
                      <div className="mt-1">
                        <Input
                          type="text"
                          id="card-number"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          error={errors.cardNumber}
                          autoComplete="cc-number"
                        />
                      </div>
                    </div>
                    <div className="col-span-4">
                      <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                        Name on card
                      </label>
                      <div className="mt-1">
                        <Input
                          type="text"
                          id="name-on-card"
                          name="nameOnCard"
                          value={formData.nameOnCard}
                          onChange={handleInputChange}
                          error={errors.nameOnCard}
                          autoComplete="cc-name"
                        />
                      </div>
                    </div>
                    <div className="col-span-3">
                      <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                        Expiration date (MM/YY)
                      </label>
                      <div className="mt-1">
                        <Input
                          type="text"
                          id="expiration-date"
                          name="expirationDate"
                          value={formData.expirationDate}
                          onChange={handleInputChange}
                          error={errors.expirationDate}
                          autoComplete="cc-exp"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                        CVC
                      </label>
                      <div className="mt-1">
                        <Input
                          type="text"
                          id="cvc"
                          name="cvc"
                          value={formData.cvc}
                          onChange={handleInputChange}
                          error={errors.cvc}
                          autoComplete="cc-csc"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">Order summary</h2>
            <ul className="mt-6 divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.product.id} className="flex py-4">
                  <Image
                    src={item.product.image || "/placeholder-product.jpg"}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-sm text-gray-600">Shipping estimate</dt>
                <dd className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
              </div>
            </dl>
            <div className="mt-6">
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" isLoading={isLoading}>
                Place order
              </Button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
