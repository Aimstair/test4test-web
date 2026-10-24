"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { PlayBadge } from "@/components/ui/PlayBadge";

export function FinalCtaClient({ qrSvg }: { qrSvg: string }) {
  return (
    <section className="px-5 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-line bg-card px-6 py-16 text-center sm:px-16 sm:py-20"
      >
        <div className="relative flex flex-col items-center">
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative size-24 overflow-hidden rounded-[26px] bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.35)] ring-1 ring-black/5"
          >
            <Image src="/icon.jpg" alt="Test4Test app icon" fill sizes="96px" className="scale-[1.55] object-cover" />
          </motion.div>
          <h2 className="mt-8 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            Your app deserves to <span className="text-primary">ship.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg text-ink-2">
            Join the developers clearing Google Play&apos;s closed test together. Get your first testers today.
          </p>

          <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row">
            <PlayBadge placement="final" size="lg" />
            <div className="hidden items-center gap-3 rounded-2xl border border-line bg-card p-2.5 pr-4 text-left sm:flex">
              <div className="size-20 rounded-lg bg-white p-1.5 [&>svg]:size-full" dangerouslySetInnerHTML={{ __html: qrSvg }} />
              <p className="max-w-[12ch] text-sm font-medium leading-snug text-ink-2">
                Scan with your <span className="text-ink">Android phone</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
