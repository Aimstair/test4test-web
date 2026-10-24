import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Test4Test: Get Google Play Testers",
    short_name: "Test4Test",
    description: "Get 20+ active testers for your Android app's Google Play closed test.",
    start_url: "/",
    display: "standalone",
    background_color: "#F3F4F6",
    theme_color: "#0A84FF",
    icons: [{ src: "/icon.jpg", sizes: "1024x1024", type: "image/jpeg" }],
    related_applications: [{ platform: "play", id: "com.aimteralabs.test4test", url: "https://play.google.com/store/apps/details?id=com.aimteralabs.test4test" }],
    prefer_related_applications: false,
  };
}
