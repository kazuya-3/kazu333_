/**
 * Public checkout URLs are wired in via environment variables so the
 * codebase contains no hard-coded payment links. Set these in `.env.local`
 * (for local development) and in your Vercel / hosting project settings
 * (for production).
 *
 *   NEXT_PUBLIC_FOUNDER_CHECKOUT_URL=https://buy.stripe.com/your-link
 *   NEXT_PUBLIC_AGENCY_CHECKOUT_URL=https://gumroad.com/l/your-product
 *
 * They can be Stripe Payment Links, Gumroad URLs, Lemon Squeezy links,
 * Paddle, or anything else that lets a customer pay without us touching
 * the Stripe API directly. If a variable is empty, the matching
 * /checkout/* page shows a friendly placeholder instead of a broken link.
 *
 * NEXT_PUBLIC_* env vars are inlined into the client bundle at build time,
 * so they must NOT contain anything secret. A Stripe / Gumroad checkout
 * URL is public by design and safe to expose.
 */
export type CheckoutPlan = "founder" | "agency";

export interface CheckoutConfig {
  plan: CheckoutPlan;
  name: string;
  price: string;
  url: string | undefined;
}

export function getCheckoutConfig(plan: CheckoutPlan): CheckoutConfig {
  if (plan === "founder") {
    return {
      plan,
      name: "Founder Lifetime",
      price: "$19 one-time",
      url: process.env.NEXT_PUBLIC_FOUNDER_CHECKOUT_URL || undefined,
    };
  }
  return {
    plan,
    name: "Agency Lifetime",
    price: "$49 one-time",
    url: process.env.NEXT_PUBLIC_AGENCY_CHECKOUT_URL || undefined,
  };
}
