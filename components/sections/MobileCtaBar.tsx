"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { PlayLogo } from "@/components/ui/PlayBadge";
import { playHref } from "@/lib/content";

/** Sticky install bar on small screens, shown once the hero is scrolled past. */
export function MobileCtaBar() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const nearEnd = y + window.innerHeight > document.body.scrollHeight - 700;
    // stay out of the way of the sticky phone in "How it works"
    const how = document.getElementById("how")?.getBoundingClientRect();
    const inHow = how ? how.top < window.innerHeight * 0.5 && how.bottom > window.innerHeight * 0.5 : false;
    setShow(y > 700 && !nearEnd && !inHow);
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-3 bottom-3 z-50 flex items-center gap-3 rounded-3xl border border-line bg-card/90 p-2.5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl md:hidden"
        >
          <span className="relative size-11 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-black/5">
            <Image src="/icon.jpg" alt="" fill sizes="44px" className="scale-[1.55] object-cover" />
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block text-sm font-bold">Test4Test</span>
            <span className="block truncate text-xs text-ink-2">Get 20+ testers · Free</span>
          </span>
          <a
            href={playHref("mobile-bar")}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-1.5 rounded-2xl bg-ink px-4 py-2.5 text-sm font-semibold text-card"
          >
            <PlayLogo className="size-4" /> Install
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
