"use client";

import { Check, Coins, Flag, Lock, Mail, ShieldCheck, Star } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { StreakBar } from "@/components/app-ui/cards";
import { AppIcon, Avatar, MOCK_APPS, TESTER_NAMES } from "@/components/app-ui/chrome";
import { IconText } from "@/components/ui/Reward";
import { CountUp, SectionHeader } from "@/components/ui/primitives";
import { GOOGLE_GROUP_EMAIL } from "@/lib/content";

function Tile({ title, body, children, className = "", delay = 0 }: { title: string; body: ReactNode; children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={`group flex flex-col overflow-hidden rounded-[28px] border border-line bg-card p-6 transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(10,40,90,0.3)] ${className}`}
    >
      <div className="relative flex min-h-[150px] flex-1 items-center justify-center">{children}</div>
      <h3 className="mt-6 text-xl font-bold">{title}</h3>
      <p className="mt-1.5 text-ink-2">{body}</p>
    </motion.div>
  );
}

function useLoop(length: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setI((v) => (v + 1) % length), ms);
    return () => clearInterval(id);
  }, [inView, length, ms]);
  return [ref, i] as const;
}

function RetentionVisual() {
  const [ref, d] = useLoop(16, 380);
  return (
    <div ref={ref} className="w-full max-w-xs">
      <div className="mb-2 flex justify-between font-mono text-xs text-ink-2">
        <span>DAILY PROOF</span>
        <span className="tabular-nums">{Math.min(d, 14)}/14</span>
      </div>
      <StreakBar done={Math.min(d, 14)} className="[&>span]:h-7 [&>span]:rounded-md" />
      <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-success">
        <ShieldCheck className="size-4" /> Photo date verified every day
      </div>
    </div>
  );
}

function GroupVisual() {
  return (
    <div className="relative flex w-full flex-col items-center gap-3">
      <div className="flex -space-x-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.08, type: "spring" }}
            className="block rounded-full ring-2 ring-card"
          >
            <Avatar i={i + 12} size={36} />
          </motion.span>
        ))}
      </div>
      <motion.svg width="2" height="28" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }} className="origin-top">
        <line x1="1" y1="0" x2="1" y2="28" stroke="var(--primary)" strokeWidth="2" strokeDasharray="4 3" />
      </motion.svg>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, type: "spring" }}
        className="flex max-w-full items-center gap-2 rounded-full border border-primary/30 bg-primary-soft px-3 py-2 font-mono text-[11px] text-primary"
      >
        <Mail className="size-3.5 shrink-0" />
        <span className="truncate">{GOOGLE_GROUP_EMAIL}</span>
        <Lock className="size-3.5 shrink-0" />
      </motion.div>
    </div>
  );
}

function StudioVisual() {
  return (
    <div className="grid w-full grid-cols-3 gap-2">
      {[
        { v: 24, s: "/25", l: "Locked" },
        { v: 23, s: "", l: "Active 24h" },
        { v: 4, s: "%", l: "Churn" },
      ].map((m) => (
        <div key={m.l} className="rounded-2xl bg-tag p-3">
          <p className="text-2xl font-bold">
            <CountUp to={m.v} />
            <span className="text-sm text-ink-2">{m.s}</span>
          </p>
          <p className="mono-label text-[9px] text-ink-2">{m.l}</p>
        </div>
      ))}
      <div className="col-span-3 flex h-16 items-end gap-1.5 rounded-2xl bg-tag p-3">
        {[40, 55, 62, 70, 74, 80, 86, 90, 92, 95, 96, 96, 98, 100].map((h, i) => (
          <motion.span
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.04, type: "spring", stiffness: 120 }}
            className="flex-1 rounded-sm bg-primary"
          />
        ))}
      </div>
    </div>
  );
}

function ProofQueueVisual() {
  const [ref, i] = useLoop(MOCK_APPS.length, 1600);
  const app = MOCK_APPS[i];
  const approve = i % 4 !== 2;
  return (
    <div ref={ref} className="relative h-[150px] w-full max-w-[260px]">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={i}
          initial={{ y: 30, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ x: approve ? 220 : -220, rotate: approve ? 14 : -14, opacity: 0, transition: { duration: 0.35 } }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-line bg-card p-3 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <Avatar i={i + 2} size={30} />
            <div className="text-xs">
              <p className="font-bold">{TESTER_NAMES[(i + 2) % 24]}</p>
              <p className="text-ink-2">{app.name} · Day {(i % 13) + 1}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className={`flex flex-1 items-center justify-center gap-1 rounded-xl py-2 text-xs font-bold ${approve ? "bg-success text-white" : "bg-tag text-ink-2"}`}>
              <Check className="size-3.5" /> Approve
            </span>
            <span className={`flex flex-1 items-center justify-center gap-1 rounded-xl py-2 text-xs font-bold ${!approve ? "bg-danger text-white" : "bg-tag text-ink-2"}`}>
              <Flag className="size-3.5" /> Flag
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute -bottom-2 left-3 right-3 -z-10 h-full rounded-2xl border border-line bg-card/60" />
    </div>
  );
}

function BoostVisual() {
  const [ref, i] = useLoop(3, 1800);
  const order = [MOCK_APPS[3], MOCK_APPS[4], MOCK_APPS[0]];
  // the boosted app (Pocket Budget) jumps to the top every other beat
  const list = i === 0 ? order : [order[2], order[0], order[1]];
  return (
    <div ref={ref} className="flex w-full max-w-[260px] flex-col gap-2">
      {list.map((a) => {
        const boosted = a === MOCK_APPS[0] && i !== 0;
        return (
          <motion.div
            layout
            key={a.name}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className={`flex items-center gap-2 rounded-xl border bg-card p-2 text-xs ${boosted ? "border-cta shadow-[0_8px_20px_-8px_rgba(240,153,58,0.7)]" : "border-line"}`}
          >
            <AppIcon app={a} size={26} />
            <span className="flex-1 font-semibold">{a.name}</span>
            {boosted && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="rounded bg-cta px-1.5 py-0.5 font-mono text-[9px] font-bold text-white">
                🔥 PROMOTED
              </motion.span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function InviteVisual() {
  return (
    <div className="flex items-center gap-4">
      {["You", "Friend"].map((who, i) => (
        <motion.div
          key={who}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          className="flex flex-col items-center gap-2"
        >
          <motion.span
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.4, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-1 rounded-full bg-token/15 px-3 py-1.5 font-bold text-token"
          >
            <Coins className="size-4" />
            +50
          </motion.span>
          <Avatar i={i ? 20 : 0} size={56} />
          <span className="text-sm font-semibold text-ink-2">{who}</span>
        </motion.div>
      ))}
    </div>
  );
}

function ReviewsVisual() {
  return (
    <div className="w-full max-w-[260px] rounded-2xl border border-line bg-card p-3 text-xs shadow-sm">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <motion.span key={i} initial={{ scale: 0, rotate: -90 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1, type: "spring" }}>
            <Star className="size-4 fill-token text-token" />
          </motion.span>
        ))}
      </div>
      <p className="mt-2 text-ink">&ldquo;Onboarding is smooth, but the export button crashes on Android 14. Love the charts!&rdquo;</p>
      <p className="mt-2 flex items-center gap-2 text-ink-2">
        <Avatar i={6} size={20} /> {TESTER_NAMES[6]} · Day 14
      </p>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader
          label="Features"
          title="Everything you need to clear the 14-day test."
          sub="Built around Google Play's closed-testing rules, from the first install to production."
        />
        <div className="mt-16 grid gap-5 md:grid-cols-6">
          <Tile className="md:col-span-4" title="Verified 14-day retention" body="Testers upload a dated screenshot every day. Fake or stale proofs are rejected automatically.">
            <RetentionVisual />
          </Tile>
          <Tile className="md:col-span-2" delay={0.08} title="One Google Group" body="Add a single email to Play Console. Nobody's personal address is shared.">
            <GroupVisual />
          </Tile>
          <Tile className="md:col-span-2" title="Developer Studio" body="Locked testers, daily activity and churn, live for every app.">
            <StudioVisual />
          </Tile>
          <Tile className="md:col-span-2" delay={0.08} title="Proof queue" body="Approve or flag each daily proof, or let auto-approve handle it on Pro.">
            <ProofQueueVisual />
          </Tile>
          <Tile className="md:col-span-2" delay={0.16} title="Boosted listings" body="Pin your app to the top of the Catalog with a Promoted badge.">
            <BoostVisual />
          </Tile>
          <Tile className="md:col-span-3" title="Honest feedback" body="Testers rate your app and report bugs at the end of every contract, before real users ever see it.">
            <ReviewsVisual />
          </Tile>
          <Tile className="md:col-span-3" delay={0.08} title="Invite & earn" body={<IconText text="When a friend finishes their first test, you both get +50 :token:" />}>
            <InviteVisual />
          </Tile>
        </div>
      </div>
    </section>
  );
}

