import type { Metadata, Viewport } from "next";
import "./globals.css";

// Update this once you have a real production domain.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://angryreviewrescue.com";

const TITLE =
  "Angry Review Rescue — Turn bad reviews into trust-building replies";

const DESCRIPTION =
  "A tiny review response assistant that helps local businesses turn 1-star reviews into calm, human, future-customer-safe replies. No auto-posting. No fake reviews.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s",
  },
  description: DESCRIPTION,
  applicationName: "Angry Review Rescue",
  keywords: [
    "review response generator",
    "bad review reply",
    "1-star review",
    "google review reply",
    "local business reputation",
    "local SEO",
    "small business",
  ],
  authors: [{ name: "Angry Review Rescue" }],
  creator: "Angry Review Rescue",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Angry Review Rescue",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#0b0a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
