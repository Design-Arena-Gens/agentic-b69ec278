import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Driver Helper - Your Driving Companion",
  description: "Offline-first app for Indian drivers with income tracking, SOS help, community, and AI assistant",
  manifest: "/manifest.json",
  themeColor: "#FF6B35",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
