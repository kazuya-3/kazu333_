import type { Metadata } from "next";
import { CheckoutCard } from "@/components/CheckoutCard";
import { getCheckoutConfig } from "@/lib/checkout";

// Wire NEXT_PUBLIC_FOUNDER_CHECKOUT_URL to a Stripe Payment Link or
// Gumroad checkout URL. While unset, this page renders a friendly
// placeholder instead of a broken button. See lib/checkout.ts.

export const metadata: Metadata = {
  title: "Founder Lifetime checkout — Angry Review Rescue",
  description: "Continue to secure checkout for the Founder Lifetime plan.",
  robots: { index: false, follow: false },
};

export default function FounderCheckoutPage() {
  return <CheckoutCard config={getCheckoutConfig("founder")} />;
}
