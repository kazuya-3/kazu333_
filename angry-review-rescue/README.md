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
│   ├── layout.tsx            # Root layout, fonts, metadata
│   ├── page.tsx              # Landing page (composes all sections)
│   ├── globals.css           # Tailwind base + custom utilities
│   └── checkout/
│       ├── founder/page.tsx  # Placeholder — wire to Stripe/Gumroad
│       └── agency/page.tsx   # Placeholder — wire to Stripe/Gumroad
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── DemoGenerator.tsx     # The interactive rescue tool
│   ├── RiskScoreCard.tsx
│   ├── ReplyCard.tsx
│   ├── BeforeAfter.tsx
│   ├── WhyItMatters.tsx
│   ├── Pricing.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   └── ui/                   # Small primitives (Button, Card, Badge, Field)
├── lib/
│   ├── types.ts              # Shared TypeScript types
│   ├── reviewLogic.ts        # Rule-based reply + risk-score generator
│   └── utils.ts              # cn() helper
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

## Wiring up payments later

The two pricing CTAs link to `/checkout/founder` and `/checkout/agency`, which
are placeholder pages. Replace them with redirects to your Stripe Payment
Link or Gumroad checkout:

```ts
// app/checkout/founder/page.tsx
import { redirect } from "next/navigation";
export default function Page() {
  redirect("https://buy.stripe.com/your-link-here");
}
```

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
