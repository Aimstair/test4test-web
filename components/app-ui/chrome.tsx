"use client";

// Shared pieces of the app's chrome, sized in dp (see PhoneFrame).
import {
  BadgeCheck,
  Bell,
  ChevronLeft,
  Coins,
  Flame,
  Footprints,
  Gift,
  Hammer,
  House,
  Leaf,
  NotebookPen,
  PiggyBank,
  Plus,
  Repeat,
  ShieldCheck,
  Sparkles,
  Store,
  User,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { AnimatedNumber } from "@/components/ui/primitives";

export type MockApp = {
  name: string;
  blurb: string;
  icon: LucideIcon | "t4t";
  color: string;
  boosted?: boolean;
  production?: boolean;
  rating?: string;
};

// Fictional listings used in the replicas (plus Test4Test itself).
export const MOCK_APPS: MockApp[] = [
  { name: "Pocket Budget", blurb: "Track spending in two taps.", icon: PiggyBank, color: "#34C759", boosted: true, rating: "New" },
  { name: "Test4Test", blurb: "Get free 20 testers for free.", icon: "t4t", color: "#fff", boosted: true, production: true, rating: "4.9" },
  { name: "Habit Loop", blurb: "Tiny habits, big streaks.", icon: Repeat, color: "#FF9500", boosted: true, rating: "5.0" },
  { name: "Snap Notes", blurb: "Notes that organize themselves.", icon: NotebookPen, color: "#FF3B30", rating: "0" },
  { name: "Trail Mate", blurb: "Offline hiking maps for every trail.", icon: Footprints, color: "#0A84FF", rating: "4.8" },
  { name: "Echo AI", blurb: "Your pocket writing assistant.", icon: Sparkles, color: "#1C1C1E", rating: "0" },
  { name: "Plant Pal", blurb: "Never forget to water again.", icon: Leaf, color: "#248A3D", rating: "New" },
];

export const TESTER_NAMES = [
  "Maya", "Leo", "Aria", "Noah", "Zoe", "Kai", "Iris", "Omar", "Luna", "Ezra", "Nina", "Ravi",
  "Sofia", "Theo", "Hana", "Milo", "Yara", "Jonas", "Elif", "Diego", "Amara", "Felix", "Priya", "Sam",
];

/** Generated tester portrait (public/avatars/1..24.svg). */
export function Avatar({ i, size = 40, radius, className = "" }: { i: number; size?: number; radius?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/avatars/${(i % 24) + 1}.svg`}
      alt={TESTER_NAMES[i % 24]}
      width={size}
      height={size}
      draggable={false}
      className={`shrink-0 select-none ${className}`}
      style={{ width: size, height: size, borderRadius: radius ?? size / 2 }}
    />
  );
}

/** Mirrors components/AppIcon.tsx: square image with radius = size × 0.2. */
export function AppIcon({ app, size = 48 }: { app: MockApp; size?: number }) {
  const radius = size * 0.2;
  if (app.icon === "t4t") {
    return (
      <span className="relative block shrink-0 overflow-hidden bg-white" style={{ width: size, height: size, borderRadius: radius }}>
        <Image src="/icon.jpg" alt="" fill sizes="96px" className="scale-[1.55] object-cover" />
      </span>
    );
  }
  const Icon = app.icon;
  return (
    <span className="grid shrink-0 place-items-center text-white" style={{ width: size, height: size, borderRadius: radius, background: app.color }}>
      <Icon style={{ width: size * 0.52, height: size * 0.52 }} strokeWidth={2.2} />
    </span>
  );
}

export function StatusBar({ className = "bg-card" }: { className?: string }) {
  return (
    <div className={`relative z-20 flex h-[34px] shrink-0 items-center justify-between px-[22px] text-[14px] font-medium ${className}`}>
      <span className="tabular-nums">9:41</span>
      <span className="flex items-center gap-[5px]">
        <svg viewBox="0 0 16 12" className="h-[11px] w-[15px] fill-current" aria-hidden>
          <path d="M0 11h3v1H0zM4 8h3v4H4zM8 5h3v7H8zM12 1h3v11h-3z" />
        </svg>
        <span className="relative inline-flex h-[12px] w-[22px] items-center rounded-[3px] border-[1.5px] border-current p-[1.5px]">
          <span className="h-full w-[70%] rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  );
}

function Pill({ icon, value, decimals }: { icon: React.ReactNode; value: number; decimals?: number }) {
  return (
    <span className="flex min-w-[100px] items-center justify-between rounded-[20px] bg-pill p-[2px] pl-[10px]">
      <span className="flex items-center gap-[6px]">
        {icon}
        <AnimatedNumber value={value} decimals={decimals} className="rn-mono text-[14px] font-extrabold" />
      </span>
      <span className="ml-[8px] grid size-[24px] place-items-center rounded-[8px] bg-pill-btn">
        <Plus className="size-[14px] text-pill-btn-fg" strokeWidth={3} />
      </span>
    </span>
  );
}

/** components/AppHeader.tsx: status bar + tier, karma and token pills + bell. */
export function AppHeader({ karma = 118.5, tokens = 980, tier = "PRO+" }: { karma?: number; tokens?: number; tier?: string }) {
  return (
    <div className="relative z-10 shrink-0 border-b border-line bg-card/80 backdrop-blur">
      <StatusBar className="" />
      <div className="flex items-center justify-between px-[16px] py-[12px]">
        <div className="flex items-center">
          <span className="mr-[8px] flex items-center rounded-[20px] bg-pill py-[2px] pl-[10px] pr-[10px]">
            <BadgeCheck className="size-[22px] fill-token text-card" />
            <span className="rn-mono ml-[6px] text-[14px] font-extrabold text-karma">{tier}</span>
          </span>
          <Pill icon={<Flame className="size-[16px] text-karma" />} value={karma} decimals={1} />
          <span className="ml-[8px]">
            <Pill icon={<Coins className="size-[16px] text-token" />} value={tokens} />
          </span>
        </div>
        <span className="relative ml-[12px]">
          <Bell className="size-[24px] text-[#8A92A6]" />
          <span className="absolute -top-[2px] right-0 size-[8px] rounded-full bg-danger" />
        </span>
      </div>
    </div>
  );
}

/** Back-button header used on pushed screens (Catalog detail, Build forms). */
export function NavHeader({ label, card = false }: { label: string; card?: boolean }) {
  return (
    <div className={`relative z-10 shrink-0 ${card ? "border-b border-line bg-card" : "bg-bg"}`}>
      <StatusBar className="" />
      <div className="flex items-center px-[12px] pb-[16px] pt-[14px]">
        <ChevronLeft className="size-[24px]" />
        <span className="ml-[4px] text-[18px] font-semibold">{label}</span>
      </div>
    </div>
  );
}

export type Tab = "today" | "catalog" | "build" | "verify" | "me";
const TABS: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: "today", label: "Today", icon: House },
  { id: "catalog", label: "Catalog", icon: Store },
  { id: "build", label: "Build", icon: Hammer },
  { id: "verify", label: "Verify", icon: ShieldCheck },
  { id: "me", label: "Me", icon: User },
];

export function TabBar({ active }: { active: Tab }) {
  return (
    <div className="relative z-10 grid h-[64px] shrink-0 grid-cols-5 border-t border-line bg-card pb-[6px] pt-[8px]">
      {TABS.map((t) => {
        const on = t.id === active;
        return (
          <span key={t.id} className={`flex flex-col items-center gap-[3px] ${on ? "text-primary" : "text-ink-2"}`}>
            <t.icon className="size-[24px]" strokeWidth={2} />
            <span className="rn-mono text-[10px] uppercase">{t.label}</span>
          </span>
        );
      })}
    </div>
  );
}

/** components/EventFloatingIcon.tsx */
export function GiftFab() {
  return (
    <motion.span
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[88px] right-[24px] z-20 grid size-[56px] place-items-center rounded-full bg-warning shadow-[0_4px_8px_rgba(255,149,0,0.3)]"
    >
      <Gift className="size-[28px] text-white" />
    </motion.span>
  );
}

/** Scrollable content area between header and tab bar (padding 12 like every tab). */
export function Content({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`relative flex min-h-0 flex-1 flex-col overflow-hidden p-[12px] ${className}`}>{children}</div>;
}
