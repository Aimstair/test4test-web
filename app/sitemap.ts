import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const home = GUIDES.reduce((latest, g) => (g.dateModified > latest ? g.dateModified : latest), "2026-10-24");
  return [
    { url: absoluteUrl("/"), lastModified: home, changeFrequency: "weekly", priority: 1 },
    ...GUIDES.map((g) => ({
      url: absoluteUrl(`/${g.slug}`),
      lastModified: g.dateModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: absoluteUrl("/privacy"), lastModified: "2026-10-24", changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/terms"), lastModified: "2026-10-24", changeFrequency: "yearly", priority: 0.2 },
  ];
}
