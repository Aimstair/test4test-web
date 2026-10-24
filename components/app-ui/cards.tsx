"use client";

// Card-level replicas of the app's components. Sizes are dp (see PhoneFrame).
import { Activity, AlertTriangle, Camera, Check, Clock, Coins, Flag, Flame, Globe, Rocket, Smartphone, Star, TrendingUp, Users, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { AppIcon, Avatar, TESTER_NAMES, type MockApp } from "./chrome";

/** Standard card: radius 12, padding 12, 1px border, soft shadow (light mode only). */
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[12px] border border-line bg-card p-[12px] shadow-[0_4px_10px_rgba(0,0,0,0.05)] dark:shadow-none ${className}`}>
      {children}
    </div>
  );
}

export function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`mb-[12px] ml-[8px] text-[11px] font-extrabold tracking-[1px] text-ink-2 ${className}`}>{children}</p>;
}

// ---------- Catalog ----------

export function CatalogCard({ app, bounty = 20 }: { app: MockApp; bounty?: number }) {
  const isNew = app.rating === "New";
  return (
    <Card className="flex items-center">
      <span className="mr-[16px] grid size-[56px] shrink-0 place-items-center rounded-[14px] border border-line bg-bg">
        <AppIcon app={app} size={48} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="mb-[4px] flex items-center justify-between">
          <p className="mr-[8px] truncate text-[18px] font-bold">{app.name}</p>
          <span className="flex shrink-0 items-center gap-[6px]">
            {app.boosted && <span className="rounded-[4px] bg-warning/10 px-[6px] py-[2px] text-[9px]">🔥</span>}
            {app.production && <span className="rounded-[4px] bg-success/10 px-[6px] py-[2px] text-[9px]">⭐</span>}
          </span>
        </div>
        <p className="mb-[10px] truncate text-[13px] text-ink-2">{app.blurb}</p>
        <div className="flex items-center gap-[8px]">
          <span className="mr-[8px] flex items-center gap-[12px] text-[16px] font-extrabold">
            <span className="flex items-center gap-[4px]">
              <Coins className="size-[16px] text-token" />+{bounty}
            </span>
            <span className="flex items-center gap-[4px]">
              <Flame className="size-[16px] text-karma" />+1
            </span>
          </span>
          <span className={`flex items-center gap-[4px] rounded-[12px] border border-line px-[8px] py-[4px] text-[11px] font-bold ${isNew ? "text-ink-2" : ""}`}>
            <Star className={`size-[12px] ${isNew ? "" : "fill-ink"}`} />
            {app.rating ?? "0"}
          </span>
          <Globe className="ml-[4px] size-[14px] text-primary" />
        </div>
      </div>
    </Card>
  );
}

// ---------- Today ----------

export type CellStatus = "done" | "pending" | "missed" | "future";
const CELL_BG: Record<CellStatus, string> = {
  done: "var(--primary)",
  pending: "var(--warning)",
  missed: "var(--danger)",
  future: "var(--soft-blue)",
};

/** The 14-day heatmap row from the Today tab (dashboard.tsx heatmapRow). */
export function Heatmap({ cells }: { cells: CellStatus[] }) {
  return (
    <div className="mb-[12px] flex justify-between border-b-2 border-ink pb-[16px]">
      {cells.map((s, i) => (
        <motion.span
          key={i}
          initial={false}
          animate={{ backgroundColor: CELL_BG[s], scale: s === "pending" ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.4 }}
          className={`mx-[2px] h-[24px] flex-1 rounded-[4px] ${s === "future" ? "border border-soft-blue-border" : ""}`}
        />
      ))}
    </div>
  );
}

/** Site-level streak bar using the same cell colours (done / today / upcoming). */
export function StreakBar({
  done,
  total = 14,
  pulseCurrent = true,
  className = "",
}: {
  done: number;
  total?: number;
  pulseCurrent?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex gap-[3px] ${className}`}>
      {Array.from({ length: total }, (_, i) => {
        const filled = i < done;
        const current = i === done && pulseCurrent;
        return (
          <motion.span
            key={i}
            className={`relative h-4 flex-1 rounded-[4px] ${!filled && !current ? "border border-soft-blue-border" : ""}`}
            initial={false}
            animate={{
              backgroundColor: filled ? "var(--primary)" : current ? "var(--warning)" : "var(--soft-blue)",
              scale: filled ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.35 }}
          >
            {current && (
              <motion.span
                className="absolute inset-0 rounded-[4px] bg-warning"
                animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.5, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            )}
          </motion.span>
        );
      })}
    </div>
  );
}

function msToNextUtcMidnight() {
  const now = new Date();
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1) - now.getTime();
}

/** components/UtcCountdown.tsx: live time until the UTC reset. */
export function UtcCountdown() {
  const [ms, setMs] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setMs(msToNextUtcMidnight());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const parts =
    ms === null
      ? ["--", "--", "--"]
      : [ms / 3.6e6, (ms / 6e4) % 60, (ms / 1e3) % 60].map((n) => String(Math.floor(n)).padStart(2, "0"));
  return (
    <div className="mb-[4px] flex items-center">
      {parts.map((p, i) => (
        <span key={i} className="flex items-center">
          {i > 0 && <span className="rn-mono mx-[4px] -translate-y-[4px] text-[32px] font-extrabold text-ink-2">:</span>}
          <span className="rn-mono text-[48px] font-extrabold leading-[1.15] tracking-[-1px]">{p}</span>
        </span>
      ))}
    </div>
  );
}

export function UtcCard() {
  return (
    <Card className="mb-[12px]">
      <div className="mb-[12px] flex items-center justify-between">
        <span className="rn-mono text-[12px] font-semibold tracking-[1px] text-ink-2">UTC RESET</span>
        <span className="size-[8px] rounded-full bg-primary" />
      </div>
      <UtcCountdown />
      <p className="mt-[8px] text-[14px] text-ink-2">Miss the window → -1 karma. No exceptions.</p>
    </Card>
  );
}

export function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="flex-1">
      <p className="mb-[8px] text-[11px] font-extrabold tracking-[0.5px]">{label}</p>
      <motion.p key={value} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-[26px] font-extrabold leading-[1.2]">
        {value}
      </motion.p>
    </Card>
  );
}

/** Contract card from the Today tab: header, heatmap and the day's action row. */
export type ProofState = "ready" | "launching" | "unlocked" | "uploading" | "waiting" | "done";

export function ContractCard({
  app,
  day,
  cells,
  proof = "ready",
  timer = 60,
}: {
  app: MockApp;
  day: number;
  cells: CellStatus[];
  proof?: ProofState;
  timer?: number;
}) {
  const proofEnabled = proof === "unlocked" || proof === "uploading";
  return (
    <Card className="mb-[12px]">
      <div className="mb-[12px] flex items-center">
        <span className="mr-[16px] grid size-[40px] place-items-center">
          <AppIcon app={app} size={40} />
        </span>
        <div>
          <p className="mb-[4px] text-[18px] font-extrabold leading-tight">{app.name}</p>
          <p className="text-[12px] uppercase text-ink-2">
            DAY {day}/{cells.length}
          </p>
        </div>
      </div>
      <Heatmap cells={cells} />
      {proof === "waiting" || proof === "done" ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center rounded-[8px] border border-line bg-bg p-[16px]"
        >
          <span className="text-[14px] font-semibold text-ink-2">
            {proof === "waiting" ? "WAITING FOR DEVELOPER CONFIRMATION" : "DONE FOR TODAY"}
          </span>
        </motion.div>
      ) : (
        <div className="flex gap-[8px]">
          <span className="flex flex-1 items-center justify-center gap-[8px] rounded-[8px] border-2 border-warning bg-warning p-[14px]">
            <Rocket className="size-[16px] text-black" />
            <span className="rn-mono text-[12px] font-extrabold tracking-[0.5px] text-black">
              {proof === "launching" ? `APP OPEN... ${timer}s` : "LAUNCH"}
            </span>
          </span>
          <div className="flex flex-col items-center">
            <motion.span
              animate={{
                backgroundColor: proofEnabled ? "var(--primary)" : "var(--border)",
                borderColor: proofEnabled ? "var(--primary)" : "var(--border)",
              }}
              className="flex items-center justify-center gap-[8px] rounded-[8px] border-2 px-[22px] py-[14px]"
            >
              <Camera className={`size-[16px] ${proofEnabled ? "text-white" : "text-ink-2"}`} />
              <span className={`text-[12px] font-extrabold tracking-[0.5px] ${proofEnabled ? "rn-mono text-white" : "text-ink-2"}`}>
                {proof === "uploading" ? "..." : "PROOF"}
              </span>
            </motion.span>
            <span className="mt-[4px] text-[9px] font-bold text-primary">+1 Karma ⭐</span>
          </div>
        </div>
      )}
    </Card>
  );
}

// ---------- Build ----------

export function StudioAppCard({
  app,
  tier = "Pro+",
  locked,
  total,
  active,
  churn = 0,
  sub,
  status = "live",
  button,
}: {
  app: MockApp;
  tier?: string;
  locked: number;
  total: number;
  active: number;
  churn?: number;
  sub?: string;
  status?: "live" | "offline";
  button?: string;
}) {
  const live = status === "live";
  return (
    <Card className="mb-[12px]">
      <div className="mb-[12px] flex items-center">
        <span className="mr-[12px] grid size-[40px] place-items-center rounded-[12px] bg-bg">
          <AppIcon app={app} size={40} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="mb-[2px] truncate text-[18px] font-extrabold">{app.name}</p>
          <p className="truncate text-[12px] text-ink-2">
            {tier} • {total} Testers • {sub ?? "Unlimited"}
          </p>
        </div>
        <span className={`flex items-center gap-[4px] rounded-[12px] px-[8px] py-[4px] ${live ? "bg-success/12" : "bg-line"}`}>
          {live && <span className="size-[6px] rounded-full bg-success" />}
          <span className={`text-[10px] font-extrabold ${live ? "text-success" : "text-ink-2"}`}>{live ? "LIVE" : "OFFLINE"}</span>
        </span>
      </div>
      <div className="mb-[12px] flex items-center">
        <div className="flex-1">
          <p className="text-[18px] font-extrabold">
            {locked}
            <span className="text-[14px] text-ink-2">/{total}</span>
          </p>
          <p className="text-[10px] font-bold tracking-[0.5px] text-ink-2">LOCKED</p>
        </div>
        <span className="mx-[16px] h-[24px] w-px bg-line" />
        <div className="flex-1">
          <p className="text-[18px] font-extrabold">{active}</p>
          <p className="text-[10px] font-bold tracking-[0.5px] text-ink-2">ACTIVE TODAY</p>
        </div>
        <span className="mx-[16px] h-[24px] w-px bg-line" />
        <div className="flex-1">
          <p className="text-[18px] font-extrabold">{churn}%</p>
          <p className="text-[10px] font-bold tracking-[0.5px] text-ink-2">CHURN</p>
        </div>
      </div>
      <div className={`rounded-[12px] py-[12px] text-center ${live ? "bg-warning" : "bg-primary"}`}>
        <span className="rn-mono text-[14px] font-extrabold text-white">{button ?? (live ? "BOOST LISTING" : "ACTIVATE APP")}</span>
      </div>
    </Card>
  );
}

// ---------- Catalog detail ----------

export function CapacityCard({ locked, total }: { locked: number; total: number }) {
  const pct = Math.min(100, Math.round((locked / total) * 100));
  return (
    <Card>
      <div className="mb-[12px] flex items-baseline justify-between">
        <p className="text-[26px] font-extrabold tabular-nums">
          {locked}
          <span className="text-[18px] text-ink-2">/{total}</span>
        </p>
        <span className="text-[10px] font-bold tracking-[1px] text-ink-2">TESTERS LOCKED</span>
      </div>
      <div className="mb-[12px] h-[6px] rounded-[3px] bg-line">
        <motion.div className="h-[6px] rounded-[3px] bg-primary" animate={{ width: `${pct}%` }} transition={{ type: "spring", stiffness: 90, damping: 18 }} />
      </div>
      <div className="flex justify-between text-[12px] text-ink-2">
        <span>{locked} active right now</span>
        <span>{pct}% full</span>
      </div>
    </Card>
  );
}

export function RequirementsCard() {
  const rows = [
    { icon: Globe, label: "Regions", value: "Global" },
    { icon: Clock, label: "Duration", value: "14 Days" },
    { icon: Smartphone, label: "Platform", value: "Android" },
  ];
  return (
    <Card className="!p-0">
      {rows.map((r, i) => (
        <div key={r.label} className={`flex items-center p-[12px] ${i ? "border-t border-line" : ""}`}>
          <r.icon className="size-[20px] text-ink-2" />
          <span className="ml-[12px] flex-1 text-[14px] text-ink-2">{r.label}</span>
          <span className="text-[14px] font-semibold">{r.value}</span>
        </div>
      ))}
    </Card>
  );
}

// ---------- Verify ----------

export function ProofCard({ tester, app, day, state = "idle" }: { tester: number; app: MockApp; day: number; state?: "idle" | "pressed" | "approved" }) {
  return (
    <Card className="mb-[12px]">
      <div className="mb-[12px] flex items-center">
        <Avatar i={tester} size={40} className="mr-[12px]" />
        <div className="flex-1">
          <p className="text-[16px] font-extrabold">{TESTER_NAMES[tester % 24]}</p>
          <p className="text-[12px] text-ink-2">{app.name}</p>
        </div>
      </div>
      <div className="mb-[12px] flex h-[200px] items-center justify-center overflow-hidden rounded-[12px] border border-line bg-bg">
        <ProofScreenshot app={app} />
      </div>
      <div className="mb-[8px] flex gap-[8px]">
        <div className="flex-1 rounded-[8px] bg-bg p-[12px]">
          <p className="mb-[2px] text-[10px] font-extrabold tracking-[0.5px] text-ink-2">DAY</p>
          <p className="text-[14px] font-bold">{day}/14</p>
        </div>
        <div className="flex-1 rounded-[8px] bg-bg p-[12px]">
          <p className="mb-[2px] text-[10px] font-extrabold tracking-[0.5px] text-ink-2">TIME</p>
          <p className="text-[14px] font-bold">9:41:07 AM</p>
        </div>
      </div>
      <div className="mt-[8px] flex gap-[8px]">
        <span className="grid w-[56px] place-items-center rounded-[12px] border border-line py-[12px]">
          <X className="size-[20px] text-danger" />
        </span>
        <span className="grid w-[56px] place-items-center rounded-[12px] border border-line py-[12px]">
          <Flag className="size-[20px] text-warning" />
        </span>
        <motion.span
          animate={{ scale: state === "pressed" ? 0.95 : 1, backgroundColor: state === "approved" ? "var(--success)" : "var(--primary)" }}
          className="flex flex-1 items-center justify-center gap-[8px] rounded-[12px] border border-ink py-[12px]"
        >
          <Check className="size-[20px] text-white" />
          <span className="rn-mono text-[14px] font-extrabold text-white">{state === "approved" ? "APPROVED" : "APPROVE"}</span>
          <span className="ml-[4px] flex items-center gap-[4px]">
            <Flame className="size-[18px] text-karma" />
            <span className="text-[16px] font-extrabold text-white">+0.5</span>
          </span>
        </motion.span>
      </div>
    </Card>
  );
}

/** A believable screenshot of a tester's app, used as the daily proof image. */
export function ProofScreenshot({ app, compact = false }: { app: MockApp; compact?: boolean }) {
  return (
    <div className={`flex h-full w-full flex-col bg-card ${compact ? "p-[10px]" : "p-[14px]"}`}>
      <div className="flex justify-between text-[10px] font-semibold text-ink-2">
        <span>9:41 · Today</span>
        <span>▮▮▮</span>
      </div>
      <div className="mt-[8px] flex items-center gap-[8px]">
        <AppIcon app={app} size={22} />
        <span className="text-[13px] font-bold">{app.name}</span>
      </div>
      <p className="mt-[8px] text-[10px] text-ink-2">This month</p>
      <p className="text-[24px] font-extrabold leading-tight">$1,284.50</p>
      <div className="mt-auto flex h-[60px] items-end gap-[6px]">
        {[38, 60, 30, 72, 48, 84, 56, 66].map((h, i) => (
          <span key={i} className="flex-1 rounded-[3px]" style={{ height: `${h}%`, background: i === 5 ? app.color : "var(--soft-blue)" }} />
        ))}
      </div>
    </div>
  );
}

// ---------- Studio detail ----------

export function KeyMetricCard({
  kind,
  value,
  total,
  sub,
}: {
  kind: "locked" | "active" | "churn" | "rating";
  value: ReactNode;
  total?: number;
  sub: string;
}) {
  const meta = {
    locked: { icon: Users, label: "TESTERS LOCKED" },
    active: { icon: Activity, label: "ACTIVE 24H" },
    churn: { icon: AlertTriangle, label: "CHURN RATE" },
    rating: { icon: TrendingUp, label: "AVG RATING" },
  }[kind];
  return (
    <div className="w-[calc(50%-6px)] rounded-[16px] border border-line bg-card p-[16px]">
      <div className="mb-[8px] flex items-center gap-[6px]">
        <meta.icon className="size-[14px] text-ink-2" />
        <span className="text-[11px] font-bold tracking-[0.5px] text-ink-2">{meta.label}</span>
      </div>
      <p className="mb-[2px] text-[24px] font-medium tabular-nums">
        {value}
        {total !== undefined && <span className="text-[16px] text-ink-2">/{total}</span>}
      </p>
      <p className="text-[12px] text-ink-2">{sub}</p>
    </div>
  );
}
