# Launch checklist

A pragmatic, ordered list of what to do before — and immediately after —
publishing Angry Review Rescue. Treat this as a working doc: tick items
off as you go, leave notes inline.

## 1. Payment links

- [ ] Create a **Gumroad** or **Stripe Payment Link** for the Founder Lifetime plan ($19 one-time).
- [ ] Create a **Gumroad** or **Stripe Payment Link** for the Agency Lifetime plan ($49 one-time).
- [ ] On both checkouts, set the **success redirect URL** to `https://yourdomain.com/thank-you`.
- [ ] If using Stripe, turn on "Collect customer email" so you can deliver the founder promise reply.
- [ ] Send yourself a $0.50 test purchase on each link to confirm the success redirect works.

## 2. Environment variables

In your hosting provider (Vercel project settings → Environment Variables), set:

- [ ] `NEXT_PUBLIC_FOUNDER_CHECKOUT_URL` — the Founder payment link URL
- [ ] `NEXT_PUBLIC_AGENCY_CHECKOUT_URL` — the Agency payment link URL
- [ ] `NEXT_PUBLIC_SITE_URL` — your production domain (e.g. `https://angryreviewrescue.com`)

Mirror the same vars locally in `.env.local` for testing.

## 3. Deploy

- [ ] Push the branch and create a Vercel project (or `vercel --prod` from CLI).
- [ ] Connect your custom domain.
- [ ] Verify HTTPS certificate is live.
- [ ] Set the Vercel project root to `angry-review-rescue/` (this MVP lives in a subdirectory of the repo).

## 4. Smoke-test the deployed site

- [ ] Landing page loads at the root domain.
- [ ] Demo generator: paste sample review → click "Rescue this review" → see 3 replies, Recovery DM, Future Customer Lens.
- [ ] Copy buttons actually copy text to clipboard.
- [ ] `Get Founder Deal` button → `/checkout/founder` → shows the **real "Continue to secure checkout" button** (not the placeholder copy).
- [ ] `Get Agency Deal` button → `/checkout/agency` → same.
- [ ] Run a real (tiny) checkout end-to-end. Confirm the `/thank-you` page renders after payment.
- [ ] `Request a free rescue` opens the email client with the right subject line.
- [ ] FAQ accordion expands/collapses.
- [ ] Footer support link opens an email.

## 5. Mobile

- [ ] iPhone Safari: hero, demo form, replies, pricing, FAQ all readable at 375 px width.
- [ ] Android Chrome: same.
- [ ] Demo generator textarea is comfortable to paste into on mobile.
- [ ] Copy buttons work on iOS Safari (the clipboard API has quirks — verify by hand).
- [ ] No horizontal scroll anywhere.

## 6. Polish before sharing

- [ ] Replace `support@example.com` in `components/FreeRescue.tsx`, `components/Footer.tsx`, and `app/thank-you/page.tsx` with your real support address.
- [ ] (Optional) Add an OG image at `/public/og.png` — 1200×630, dark background, the main headline, ember accent.
- [ ] (Optional) Add a favicon at `app/icon.png`.

## 7. First batch of distribution

Goal: get the first 10 paying users without spending on ads.

- [ ] Post a short launch thread on **X** with the before/after example. Pin it.
- [ ] Post the same on **LinkedIn**, framed for local SEO consultants.
- [ ] Post on **r/smallbusiness**, **r/restaurateur**, **r/SEO**, **r/Entrepreneur** — be honest about what it is and isn't. Lead with value (the demo link), not pricing.
- [ ] Submit to **Indie Hackers** Show IH and **Product Hunt** (Product Hunt is more useful later; IH is good day one).
- [ ] DM **30 local SEO consultants** on LinkedIn / X. Lead with the agency plan and the free-rescue offer — never pitch the product directly.

## 8. Free-rescue flywheel

- [ ] Collect the first **3 free rescue examples** from your inbox.
- [ ] Reply to each within 24 hours with a real handwritten rescue.
- [ ] Ask permission to anonymize and publish the before/after on the landing page later (this is how you replace the "we don't publish testimonials yet" copy with real ones).
- [ ] Of the 3, **convert at least 1 to the Founder deal** by offering a personal upgrade link.

## 9. After the first sale

- [ ] Send the customer a thank-you email manually (the `/thank-you` page is automated; a real reply is not).
- [ ] Ask them: "What almost made you NOT buy?" — that question rewrites the landing page.
- [ ] Add the first real number to the site (e.g. "Built with feedback from 12 local businesses") once it's true.

## 10. What is explicitly NOT in scope yet

We're keeping this list honest. The following are **not** day-one requirements:

- ❌ Auth / accounts
- ❌ A database
- ❌ Google / Yelp / Tripadvisor API integration
- ❌ Auto-posting replies
- ❌ AI API calls (the demo is rule-based on purpose)
- ❌ Analytics (add it later; see README)

Resist the urge to build any of these before the first 5 paying customers.
