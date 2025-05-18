import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import HomePage from "../page";
import ProductsPage from "../products/page";
import NewsPage from "../news/page";
import AboutPage from "../about/page";
import ContactPage from "../contact/page";
import CartPage from "../cart/page";
import CheckoutPage from "../checkout/page";
import LoginPage from "../auth/login/page";
import RegisterPage from "../auth/register/page";
import LocationsPage from "../locations/page";

expect.extend(toHaveNoViolations);

describe("Accessibility", () => {
  it("Home page should be accessible", async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Products page should be accessible", async () => {
    const { container } = render(<ProductsPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("News page should be accessible", async () => {
    const { container } = render(<NewsPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("About page should be accessible", async () => {
    const { container } = render(<AboutPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Contact page should be accessible", async () => {
    const { container } = render(<ContactPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Cart page should be accessible", async () => {
    const { container } = render(<CartPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Checkout page should be accessible", async () => {
    const { container } = render(<CheckoutPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Login page should be accessible", async () => {
    const { container } = render(<LoginPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Register page should be accessible", async () => {
    const { container } = render(<RegisterPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Locations page should be accessible", async () => {
    const { container } = render(<LocationsPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
