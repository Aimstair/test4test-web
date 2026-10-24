"use client";

import { ArrowDown, Check } from "lucide-react";
import { Avatar } from "@/components/app-ui/chrome";
import { Reward } from "@/components/ui/Reward";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { CatalogScreen } from "@/components/app-ui/screens";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { PlayBadge } from "@/components/ui/PlayBadge";
import { ease } from "@/lib/motion";

const HEADLINE: { w: string; hl?: boolean }[] = [
  { w: "Get" },
  { w: "20+", hl: true },
  { w: "active", hl: true },
  { w: "testers", hl: true },
  { w: "for" },
  { w: "your" },
  { w: "Android" },
  { w: "app" },
  { w: "in" },
  { w: "24" },
  { w: "hours." },
];

function FloatChip({
  children,
  className,
  y,
  delay,
  float = 8,
}: {
  children: ReactNode;
  className: string;
  y: MotionValue<number>;
  delay: number;
  float?: number;
}) {
  return (
    <motion.div style={{ y }} className={`absolute z-20 ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, y: [0, -float, 0] }}
        transition={{
          opacity: { delay, duration: 0.4 },
          scale: { delay, type: "spring", stiffness: 300, damping: 18 },
          y: { delay: delay + 0.4, duration: 4 + delay, repeat: Infinity, ease: "easeInOut" },
        }}
        className="flex items-center gap-2 whitespace-nowrap rounded-2xl border border-line bg-card/95 px-3.5 py-2.5 text-sm font-semibold shadow-[0_12px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const chipFast = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const chipSlow = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // pointer tilt on the phone
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 16 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 16 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pb-20 pt-28 sm:pt-36 lg:pb-28"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <motion.div style={{ opacity: fade }} className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.a
            href="#how"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-card py-1.5 pl-2 pr-3.5 text-xs font-medium text-ink-2 shadow-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            <span className="mono-label text-[10px] text-ink">Live on Google Play</span>
            <span className="text-ink-3">·</span>
            Built for Android devs
          </motion.a>

          <h1 className="mt-6 text-balance text-[42px] font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-[68px]">
            {HEADLINE.map(({ w, hl }, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span
                  className={`inline-block ${hl ? "text-primary" : ""}`}
                  initial={{ y: "110%", rotate: 4 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ delay: 0.15 + i * 0.055, duration: 0.8, ease }}
                >
                  {w}
                </motion.span>
                {i < HEADLINE.length - 1 && " "}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease }}
            className="mt-6 max-w-xl text-pretty text-lg text-ink-2 sm:text-xl"
          >
            Google Play won&apos;t let new developer accounts ship until{" "}
            <Link
              href="/google-play-closed-testing"
              className="font-semibold text-ink underline decoration-primary/40 decoration-2 underline-offset-4 hover:decoration-primary"
            >
              at least 12 testers use the app for 14 days in a row
            </Link>
            . Test4Test is the test-for-test community that gets you there: test their apps, they test yours, and every check-in is
            verified.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.7, ease }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
          >
            <PlayBadge placement="hero" size="lg" />
            <a href="#how" className="group inline-flex items-center gap-2 px-3 py-2 font-semibold text-ink-2 transition-colors hover:text-ink">
              See how it works
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 1.15 } } }}
            className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-ink-2 lg:justify-start"
          >
            {["Free to start", "Daily screenshot proof", "One Google Group, zero emails shared"].map((t) => (
              <motion.li
                key={t}
                variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0 } }}
                className="flex items-center gap-1.5"
              >
                <Check className="size-4 text-success" strokeWidth={3} /> {t}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* phone */}
        <div className="relative mx-auto [perspective:1200px]">
          <motion.div
            style={{ y: phoneY, rotateX: rotX, rotateY: rotY }}
            initial={{ opacity: 0, y: 60, rotateZ: -4 }}
            animate={{ opacity: 1, y: 0, rotateZ: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="relative [zoom:0.86] sm:[zoom:1]"
          >
            <PhoneFrame label="Test4Test Catalog screen listing Android apps that need testers, each paying +20 tokens and +1 karma">
              <CatalogScreen />
            </PhoneFrame>
          </motion.div>

          <FloatChip y={chipFast} delay={1.2} className="-left-16 top-24 sm:-left-28">
            <Reward value="+20" kind="token" iconClassName="size-4" />
          </FloatChip>
          <FloatChip y={chipSlow} delay={1.45} className="-right-10 top-44 sm:-right-24" float={10}>
            <Reward value="+1" kind="karma" iconClassName="size-4" /> daily
          </FloatChip>
          <FloatChip y={chipFast} delay={1.7} className="-left-10 bottom-36 sm:-left-24" float={6}>
            <span className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <Avatar key={i} i={i + 4} size={28} className="ring-2 ring-card" />
              ))}
            </span>
            <span className="flex flex-col gap-1">
              <span className="flex items-center justify-between gap-6 text-xs">
                <span className="mono-label text-[9px] text-ink-2">Testers locked</span>
                <span className="tabular-nums">20/25</span>
              </span>
              <span className="h-1.5 w-32 overflow-hidden rounded-full bg-tag">
                <motion.span
                  className="block h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  transition={{ delay: 2, duration: 1.4, ease }}
                />
              </span>
            </span>
          </FloatChip>
          <FloatChip y={chipSlow} delay={1.95} className="-right-6 bottom-20 sm:-right-16">
            <span className="flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">
              <span className="size-1.5 rounded-full bg-success" />
              LIVE
            </span>
            Day 14/14 ✓
          </FloatChip>
        </div>
      </div>
    </section>
  );
}
