import type { ReactNode } from "react";
import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <Nav home={false} />
      <main className="px-5 pb-20 pt-32">
        <article className="mx-auto max-w-3xl rounded-[32px] border border-line bg-card p-6 sm:p-12 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_li]:mt-1.5 [&_p]:mt-3 [&_p]:text-ink-2 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-ink-2">
          <span className="mono-label text-[11px] text-primary">[ Legal ]</span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">{title}</h1>
          <p className="!mt-2 text-sm">Last updated: {updated}</p>
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}
