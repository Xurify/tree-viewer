import type { Metadata, Viewport } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Tree Viewer",
  description: "Interactive tree visualization for ZIP files",
  keywords: ["tree viewer", "ZIP file", "file structure", "visualization"],
  authors: [{ name: "Xurify", url: "https://xurify.com" }],
  creator: "Xurify",
  publisher: "Xurify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ziptreeviewer.vercel.app"),
  openGraph: {
    title: "Tree Viewer - ZIP File Visualization",
    description: "Explore ZIP file contents with our interactive tree viewer",
    url: "https://ziptreeviewer.vercel.app",
    siteName: "Tree Viewer",
    images: [
      {
        url: "https://ziptreeviewer.vercel.app/og-image.jpg",
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
    description: "Explore ZIP file contents with our interactive tree viewer",
    //creator: "@yourtwitterhandle",
    images: ["https://ziptreeviewer.vercel.app/twitter-image.jpg"],
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
      <body className={`antialiased min-h-screen`}>{children}</body>
    </html>
  );
}
