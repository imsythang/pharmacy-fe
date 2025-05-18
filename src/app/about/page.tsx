import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              About Our Pharmacy
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We are committed to providing high-quality healthcare products and
              services to our community. Our team of experienced pharmacists and
              healthcare professionals is dedicated to helping you maintain your
              health and wellness.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Mission
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            To provide accessible, high-quality healthcare products and services
            that improve the health and well-being of our community. We strive
            to be a trusted partner in your healthcare journey.
          </p>
        </div>
        <div className="relative lg:order-last lg:col-span-5">
          <figure className="border-l border-primary-600 pl-8">
            <Image
              src="/images/doctor_care.jpg"
              alt="Pharmacy"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </figure>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
          <div className="relative lg:order-last lg:col-span-5">
            <figure className="border-l border-primary-600 pl-8">
              <blockquote className="text-xl font-semibold leading-8 tracking-tight text-gray-900">
                <p>
                  &quot;We believe that everyone deserves access to quality
                  healthcare products and services. Our commitment to excellence
                  and customer care sets us apart.&quot;
                </p>
              </blockquote>
              <figcaption className="mt-8 flex gap-x-4">
                <div className="text-sm leading-6">
                  <div className="font-semibold text-gray-900">
                    Dr. John Smith
                  </div>
                  <div className="text-gray-600">Chief Pharmacist</div>
                </div>
              </figcaption>
            </figure>
          </div>
          <div className="max-w-xl text-base leading-7 text-gray-700 lg:col-span-7">
            <p>
              Founded in 2010, our pharmacy has been serving the community with
              dedication and care. We offer a wide range of healthcare products,
              from prescription medications to over-the-counter remedies, health
              supplements, and personal care items.
            </p>
            <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <span className="mt-1 h-5 w-5 flex-none text-primary-600">
                  •
                </span>
                <span>
                  <strong className="font-semibold text-gray-900">
                    Expert Care.
                  </strong>{" "}
                  Our team of licensed pharmacists and healthcare professionals
                  provides expert advice and personalized care.
                </span>
              </li>
              <li className="flex gap-x-3">
                <span className="mt-1 h-5 w-5 flex-none text-primary-600">
                  •
                </span>
                <span>
                  <strong className="font-semibold text-gray-900">
                    Quality Products.
                  </strong>{" "}
                  We carefully select our products to ensure they meet the
                  highest standards of quality and safety.
                </span>
              </li>
              <li className="flex gap-x-3">
                <span className="mt-1 h-5 w-5 flex-none text-primary-600">
                  •
                </span>
                <span>
                  <strong className="font-semibold text-gray-900">
                    Convenient Service.
                  </strong>{" "}
                  With our online platform, you can easily browse products,
                  place orders, and have them delivered to your doorstep.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
