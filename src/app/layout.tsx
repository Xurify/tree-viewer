import type { Metadata, Viewport } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Tree Viewer",
  description: "Interactive tree visualization for zip files",
  keywords: ["tree viewer", "zip file", "file structure", "visualization"],
  authors: [{ name: "Xurify", url: "https://xurify.com" }],
  creator: "Xurify",
  publisher: "Xurify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://your-website-url.com"),
  openGraph: {
    title: "Tree Viewer - Zip File Visualization",
    description: "Explore zip file contents with our interactive tree viewer",
    url: "https://your-website-url.com",
    siteName: "Tree Viewer",
    images: [
      {
        url: "https://your-website-url.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tree Viewer Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tree Viewer - Zip File Visualization",
    description: "Explore zip file contents with our interactive tree viewer",
    //creator: "@yourtwitterhandle",
    images: ["https://your-website-url.com/twitter-image.jpg"],
  },
  category: "Technology",
  // icons: {
  //   icon: [
  //     { url: '/icons//icon.svg', type: 'image/svg+xml' },
  //     { url: '/icons/icon-192x192.png', type: 'image/png', sizes: '192x192' },
  //     { url: '/icons//icon-512x512.png', type: 'image/png', sizes: '512x512' },
  //   ],
  //   shortcut: "/icons/favicon.svg",
  //   apple: "/icons/favicon.svg",
  // },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#2b2b2b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="moderna" lang="en">
      <body className={`antialiased max-w-3xl mx-auto`}>{children}</body>
    </html>
  );
}
