import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SCHED//GEN — Cyberpunk Schedule Generator",
  description:
    "配信者・クリエイター向け、SNS告知用の週間スケジュール画像を一瞬で生成するサイバーパンクUIツール。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
