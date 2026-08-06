# Angry Review Rescue

> Turn bad reviews into trust-building replies.

A polished MVP landing page and interactive demo that helps local businesses
(restaurants, cafés, salons, barbers, dentists, hotels, home-service crews)
respond to bad customer reviews with calm, human, specific replies — instead
of defensive or generic ones.

## What this MVP is (and isn't)

- ✅ **Copy-assist tool only.** Paste a review, get reply variants, copy them
  out, paste them back into your review platform manually.
- ✅ **Runs entirely in the browser.** No backend, no database, no AI API
  required. Reply generation is rule-based and deterministic.
- ❌ **No Google Business / Yelp / Tripadvisor integration.**
- ❌ **No auto-posting of replies anywhere.**
- ❌ **No authentication.**

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS v3
- lucide-react icons
- Local state only — easy to swap in Supabase and Stripe later

## Getting started

```bash
cd angry-review-rescue
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Project structure

```
angry-review-rescue/
├── app/
│   ├── layout.tsx              # Root layout, SEO + OG metadata
│   ├── page.tsx                # Landing page (composes all sections)
│   ├── globals.css             # Tailwind base + custom utilities
│   ├── thank-you/page.tsx      # Post-purchase welcome + founder promise
│   └── checkout/
│       ├── founder/page.tsx    # Env-driven Stripe/Gumroad redirect
│       └── agency/page.tsx     # Env-driven Stripe/Gumroad redirect
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx                # Sharpened positioning
│   ├── TrustStrip.tsx          # No-auto-posting / no-fake-reviews bar
│   ├── DemoGenerator.tsx       # The interactive rescue tool
│   ├── RiskScoreCard.tsx
│   ├── ReplyCard.tsx
│   ├── BeforeAfter.tsx
│   ├── WhyItMatters.tsx
│   ├── BuiltFor.tsx            # Audience cards (no fake testimonials)
│   ├── FreeRescue.tsx          # mailto: lead CTA
│   ├── Pricing.tsx
│   ├── FAQ.tsx
│   ├── CheckoutCard.tsx        # Shared placeholder/redirect card
│   ├── Footer.tsx              # Disclaimers + non-affiliation note
│   └── ui/                     # Button, Card, Badge, Field primitives
├── lib/
│   ├── types.ts                # Shared TypeScript types
│   ├── reviewLogic.ts          # Rule-based reply + risk-score generator
│   ├── checkout.ts             # Env-var loader for payment URLs
│   └── utils.ts                # cn() helper
├── LAUNCH_CHECKLIST.md         # Pre-launch + first-customers todo list
└── ...config files
```

## How the demo works

1. The user pastes a review and selects star rating, business type, optional
   owner context, and a desired tone.
2. `lib/reviewLogic.ts` runs heuristics:
   - **Issue detection** — keyword rules across wait time, staff behavior,
     cleanliness, pricing, quality, communication, food/order.
   - **Defensive risk** — driven by star rating + count of heat words
     (`rude`, `terrible`, `worst`, `never again`, etc.).
   - **Generic-reply risk** — high when no owner context is provided.
   - **Future-customer trust** — driven by how many of the trust-checklist
     items our generated reply satisfies.
3. Three reply variants (Calm, Warm, Firm) plus a private Recovery DM are
   composed from sentence-level templates that reference the detected issues
   and the owner's context.
4. A "Future Customer Lens" checklist is evaluated against the generated
   reply (apology without defensiveness, specific issue named, accountability,
   next step, moves heat off the public page, no blaming the customer).

A simulated 700 ms loading state is used so the analysis feels considered.

## Customizing the rule-based generator

All the logic lives in `lib/reviewLogic.ts`. To improve outputs:

- Add or refine entries in `ISSUE_RULES` (keyword → human label).
- Add words to `HEAT_WORDS` to make defensive-risk detection more sensitive.
- Edit `makeCalmReply`, `makeWarmReply`, `makeFirmReply`, `makeShortReply`,
  and `makeRecoveryDM` to change the templates.
- Adjust score weights in `calcScores`.

Because everything is deterministic, the same input always produces the same
output — useful for testing copy.

## Wiring up payments

The two pricing CTAs route through `/checkout/founder` and `/checkout/agency`.
Each page reads a public environment variable and, if set, shows a
"Continue to secure checkout" button that links to the external payment
provider (Stripe Payment Link, Gumroad, Lemon Squeezy, Paddle — anything
hosted). If the variable is empty, the page shows a friendly placeholder
explaining how to wire it up.

Create `.env.local` (and the same vars in your hosting provider):

```bash
NEXT_PUBLIC_FOUNDER_CHECKOUT_URL=https://buy.stripe.com/your-founder-link
NEXT_PUBLIC_AGENCY_CHECKOUT_URL=https://buy.stripe.com/your-agency-link
NEXT_PUBLIC_SITE_URL=https://angryreviewrescue.com
```

Set the **success redirect URL** on both Stripe/Gumroad checkouts to:

```
https://yourdomain.com/thank-you
```

That page contains the "founder promise" copy and support email — paying
customers see it the instant the payment clears. No Stripe API code is
required from us; the payment provider handles the entire transaction.

If you ever want to redirect from `/checkout/*` straight to the provider
(skipping the in-app confirmation card), edit `components/CheckoutCard.tsx`
to call `redirect(url)` from `next/navigation` when `config.url` exists.

## Adding analytics later

We deliberately do not install any analytics in the MVP — every script is
overhead, every cookie is a banner, and we don't need it to get the first
10 paying users. When you do want analytics, add one of the following:

- **Vercel Analytics** — `npm install @vercel/analytics`, then drop
  `<Analytics />` into `app/layout.tsx` inside `<body>`. Zero config on
  Vercel deployments, no cookie banner required.
- **Plausible** — privacy-friendly, hosted EU. Add the script tag in
  `app/layout.tsx` via `<Script src="https://plausible.io/js/script.js"
  data-domain="yourdomain.com" strategy="afterInteractive" />`.
- **Google Analytics (GA4)** — use `next/script` to load
  `https://www.googletagmanager.com/gtag/js?id=G-XXX` in `app/layout.tsx`.
  You'll need a cookie banner in the EU/UK.
- **Cloudflare Web Analytics** — paste the beacon script into
  `app/layout.tsx`. Cookieless, free, lightweight.

Track at minimum: landing → demo run → pricing → checkout click →
thank-you. The `id` attributes (`#demo`, `#pricing`, `#free-rescue`,
etc.) are stable anchors you can use for funnel events.

## Adding Supabase later

The codebase is intentionally backend-free for the MVP, but it's structured
to add Supabase cleanly:

- All form state lives in `DemoGenerator.tsx` — persist `RescueInput` /
  `RescueResult` rows to a `rescues` table when a user is signed in.
- The pricing tiers map cleanly to a Supabase `profiles.plan` column
  (`free` / `founder` / `agency`).
- The "10 client profiles" and "bulk paste" Agency features are sketched in
  the pricing card and not yet implemented — they'd live behind auth.

## License

Private MVP. Do not ship to production without replacing the placeholder
checkout links and reviewing the legal disclaimer in the footer.
