import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Angry Review Rescue — Turn bad reviews into trust-building replies",
  description:
    "Paste a 1-star review and get calm, human replies that make future customers trust your business. No auto-posting. No fake reviews.",
  openGraph: {
    title: "Angry Review Rescue",
    description:
      "Turn bad reviews into calm, trust-building public replies. A copy-assist tool for local businesses.",
    type: "website",
  },
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
