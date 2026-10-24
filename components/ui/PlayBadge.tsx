"use client";

import { motion } from "motion/react";
import { playHref } from "@/lib/content";

export function PlayLogo({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#00A0FF" d="M3.6 1.8C3.2 2.1 3 2.6 3 3.3v17.4c0 .7.2 1.2.6 1.5l.1.1 9.7-9.7v-.2L3.7 1.7l-.1.1z" />
      <path fill="#FFBC00" d="M16.6 15.8l-3.2-3.3v-.2l3.2-3.3.1.1 3.9 2.2c1.1.6 1.1 1.6 0 2.3l-3.9 2.2h-.1z" />
      <path fill="#FF3A44" d="M16.7 15.7l-3.3-3.3-9.8 9.8c.4.4 1 .4 1.7.1l11.4-6.6" />
      <path fill="#00D26E" d="M16.7 9.1L5.3 2.6c-.7-.4-1.3-.3-1.7.1l9.8 9.7 3.3-3.3z" />
    </svg>
  );
}

type Props = {
  placement: string;
  size?: "md" | "lg";
  className?: string;
};

/** "Get it on Google Play" button with UTM-tagged link. */
export function PlayBadge({ placement, size = "md", className = "" }: Props) {
  const lg = size === "lg";
  return (
    <motion.a
      href={playHref(placement)}
      target="_blank"
      rel="noopener"
      aria-label="Get Test4Test on Google Play"
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`group relative inline-flex shrink-0 items-center gap-3 whitespace-nowrap rounded-2xl bg-black text-white shadow-[0_10px_24px_-12px_rgba(0,0,0,0.45)] ring-1 ring-white/15 dark:bg-white dark:text-black ${
        lg ? "px-7 py-4" : "px-5 py-3"
      } ${className}`}
    >
      <PlayLogo className={lg ? "size-9" : "size-7"} />
      <span className="flex flex-col items-start leading-none">
        <span className={`font-mono uppercase tracking-[0.18em] opacity-75 ${lg ? "text-[11px]" : "text-[10px]"}`}>
          Get it on
        </span>
        <span className={`font-semibold tracking-tight ${lg ? "text-2xl" : "text-xl"}`}>Google Play</span>
      </span>
    </motion.a>
  );
}
