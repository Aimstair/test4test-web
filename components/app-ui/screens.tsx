"use client";

// Full-screen replicas of the four main tabs, in dp (see PhoneFrame).
import { Check, ChevronLeft, ChevronRight, Flame, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Card, CatalogCard, ContractCard, MetricCard, ProofCard, SectionTitle, StudioAppCard, UtcCard, type CellStatus, type ProofState } from "./cards";
import { AppHeader, Content, GiftFab, MOCK_APPS, TabBar } from "./chrome";

/** Catalog tab. When `live`, a newly boosted app lands at the top every few seconds. */
export function CatalogScreen({ live = true }: { live?: boolean }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setTick((s) => s + 1), 3200);
    return () => clearInterval(id);
  }, [live]);
  const n = MOCK_APPS.length;
  const apps = Array.from({ length: 5 }, (_, i) => MOCK_APPS[(tick + n * 10 - i) % n]);

  return (
    <>
      <AppHeader />
      <Content>
        <div className="mb-[12px] flex h-[44px] items-center rounded-[12px] border border-line bg-card px-[12px]">
          <Search className="mr-[8px] size-[20px] text-ink-2" />
          <span className="text-[16px] text-ink-2">Search apps</span>
        </div>
        <div className="mb-[16px] flex rounded-[8px] border border-line bg-card p-[4px]">
          <span className="flex-1 rounded-[6px] bg-bg py-[8px] text-center text-[14px] font-semibold shadow-[0_1px_1px_rgba(0,0,0,0.1)]">Boosted 🔥</span>
          <span className="flex-1 py-[8px] text-center text-[14px] font-semibold text-ink-2">All Apps</span>
        </div>
        <div className="mb-[12px] flex justify-between px-[4px] text-[11px] font-bold tracking-[0.5px] text-ink-2">
          <span>PROMOTED APPS</span>
          <span>{n} APPS</span>
        </div>
        <div className="flex flex-col gap-[12px]">
          <AnimatePresence initial mode="popLayout">
            {apps.map((app, i) => (
              <motion.div
                key={app.name}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 260, damping: 26, delay: tick === 0 ? 0.5 + i * 0.12 : 0 }}
              >
                <CatalogCard app={app} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Content>
      <GiftFab />
      <TabBar active="catalog" />
    </>
  );
}

const cellsFor = (day: number, today: CellStatus = "future"): CellStatus[] =>
  Array.from({ length: 14 }, (_, i) => (i < day - 1 ? "done" : i === day - 1 ? today : "future"));

export function TodayScreen({
  day = 9,
  proof = "ready",
  timer,
  karma = 118.5,
  tokens = 980,
}: {
  day?: number;
  proof?: ProofState;
  timer?: number;
  karma?: number;
  tokens?: number;
}) {
  const todayCell: CellStatus = proof === "waiting" ? "pending" : proof === "done" ? "done" : "future";
  return (
    <>
      <AppHeader karma={karma} tokens={tokens} />
      <Content>
        <UtcCard />
        <div className="mb-[12px] flex gap-[8px]">
          <MetricCard label="ACTIVE" value={1} />
          <MetricCard label="DONE TODAY" value={proof === "done" ? 1 : 0} />
          <MetricCard label="PENDING" value={proof === "waiting" ? 1 : 0} />
        </div>
        <p className="mb-[12px] text-[13px] font-extrabold tracking-[1px]">YOUR 14-DAY CONTRACTS</p>
        <ContractCard app={MOCK_APPS[3]} day={day} cells={cellsFor(day, todayCell)} proof={proof} timer={timer} />
        <div className="mt-[12px] flex items-center justify-center rounded-[12px] bg-primary py-[16px]">
          <span className="text-[14px] font-extrabold text-white">FIND ANOTHER APP TO TEST</span>
        </div>
      </Content>
      <GiftFab />
      <TabBar active="today" />
    </>
  );
}

export function StudioScreen({ locked = 18 }: { locked?: number }) {
  return (
    <>
      <AppHeader />
      <Content>
        <div className="mb-[12px] flex gap-[8px]">
          <Card className="flex min-h-[100px] flex-1 flex-col items-start justify-end">
            <p className="mb-[4px] text-[26px] font-extrabold">2/5</p>
            <p className="text-[11px] font-extrabold tracking-[1px] text-ink-2">LIVE APPS</p>
          </Card>
          <div className="flex min-h-[100px] flex-1 flex-col items-start justify-end rounded-[12px] bg-primary p-[12px]">
            <p className="-mt-[8px] mb-[4px] text-[26px] font-extrabold text-white">+</p>
            <p className="text-[12px] font-extrabold tracking-[0.5px] text-white">NEW APP</p>
          </div>
        </div>
        <SectionTitle>YOUR APPS</SectionTitle>
        <StudioAppCard app={MOCK_APPS[0]} locked={locked} total={25} active={Math.max(0, locked - 2)} sub="Expires in 19d" tier="Pro" button="BOOSTING (6D LEFT)" />
        <StudioAppCard app={MOCK_APPS[4]} locked={50} total={50} active={47} churn={2} />
        <StudioAppCard app={MOCK_APPS[6]} tier="Basic" locked={0} total={12} active={0} status="offline" />
      </Content>
      <GiftFab />
      <TabBar active="build" />
    </>
  );
}

/** Verify tab with one pending proof. `approve` animates the developer approving it. */
export function VerifyScreen({ approve = "idle" }: { approve?: "idle" | "pressed" | "approved" }) {
  const approved = approve === "approved";
  return (
    <>
      <AppHeader karma={approved ? 119 : 118.5} />
      <Content>
        <div className="mb-[12px] rounded-[12px] border border-line bg-card p-[12px]">
          <div className="mb-[12px] flex items-center justify-between">
            <ChevronLeft className="m-[8px] size-[24px]" />
            <div className="text-center">
              <p className="text-[18px] font-extrabold">All Listings</p>
              <p className="text-[12px] text-ink-2">Overview</p>
            </div>
            <ChevronRight className="m-[8px] size-[24px]" />
          </div>
          <div className="mb-[12px] flex">
            <div className="flex-1 text-center">
              <motion.p key={String(approved)} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-[18px] font-extrabold">
                {approved ? 0 : 1}
              </motion.p>
              <p className="text-[10px] font-extrabold tracking-[0.5px] text-ink-2">PENDING</p>
            </div>
            <span className="w-px bg-line" />
            <div className="flex-1 text-center">
              <p className="text-[18px] font-extrabold">{approved ? 598 : 597}</p>
              <p className="text-[10px] font-extrabold tracking-[0.5px] text-ink-2">APPROVED</p>
            </div>
          </div>
          <div className="rounded-[12px] bg-primary py-[12px] text-center">
            <span className="rn-mono text-[12px] font-extrabold tracking-[0.5px] text-white">AUTO-APPROVE BY END OF DAY: OFF</span>
          </div>
        </div>
        <SectionTitle>PROOF QUEUE</SectionTitle>
        <AnimatePresence>
          {!approved && (
            <motion.div exit={{ x: 420, opacity: 0, transition: { duration: 0.4 } }}>
              <ProofCard tester={2} app={MOCK_APPS[3]} day={9} state={approve} />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {approved && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-[100px] left-1/2 flex -translate-x-1/2 items-center gap-[8px] whitespace-nowrap rounded-[24px] bg-success px-[16px] py-[12px]"
            >
              <Check className="size-[16px] text-white" />
              <span className="text-[14px] font-bold text-white">Proof approved</span>
              <Flame className="size-[16px] text-white" />
              <span className="text-[14px] font-bold text-white">+0.5</span>
            </motion.div>
          )}
        </AnimatePresence>
      </Content>
      <GiftFab />
      <TabBar active="verify" />
    </>
  );
}
