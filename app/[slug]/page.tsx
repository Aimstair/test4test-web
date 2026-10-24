import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/seo/GuideArticle";
import { GUIDES, getGuide } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

// Only the guides in lib/guides.ts exist; everything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.metaTitle,
    description: guide.description,
    path: `/${guide.slug}`,
    keywords: guide.keywords,
    type: "article",
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  return <GuideArticle guide={guide} />;
}
