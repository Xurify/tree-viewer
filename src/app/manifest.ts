import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tree Viewer",
    short_name: "Tree Viewer",
    description: "Interactive tree visualization for ZIP files",
    start_url: "/",
    display: "standalone",
    background_color: "#23262f",
    theme_color: "#8fbffa",
    orientation: "any",
    icons: [
      {
        src: "/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png"
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/icons/maskable_icon_192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      }
    ],
    shortcuts: [
      {
        name: "Analyze ZIP",
        short_name: "Upload",
        description: "Upload a new ZIP file for visualization",
        url: "/",
        icons: [{ src: "/icons/icon-96x96.png", sizes: "96x96" }]
      }
    ],
    categories: ["productivity", "utilities"],
    // screenshots: [
    //   {
    //     src: "/screenshots/screenshot_1.png",
    //     sizes: "1280x619",
    //     type: "image/png",
    //   },
    //   {
    //     src: "/screenshots/screenshot_1.png",
    //     sizes: "1280x619",
    //     type: "image/png",
    //     form_factor: "wide"
    //   },
    // ],
    related_applications: [],
    prefer_related_applications: false,
    lang: "en-US",
    dir: "ltr"
  }
}