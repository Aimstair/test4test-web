"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { PlayLogo } from "@/components/ui/PlayBadge";
import { NAV_LINKS, playHref } from "@/lib/content";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-mono text-[15px] font-bold tracking-[0.18em] ${className}`}>
      <span className="text-primary">[</span> TEST4TEST <span className="text-primary">]</span>
    </span>
  );
}

function subscribeTheme(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribeTheme,
    () => document.documentElement.dataset.theme === "dark",
    () => false,
  );
  const toggle = () => {
    const next = !dark;
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="grid size-9 place-items-center rounded-full border border-line bg-card text-ink-2 transition-colors hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Nav({ home = true }: { home?: boolean }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3">
      <motion.nav
        animate={{
          maxWidth: scrolled ? 920 : 1200,
          paddingTop: scrolled ? 8 : 12,
          paddingBottom: scrolled ? 8 : 12,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className={`flex w-full items-center justify-between rounded-full px-4 transition-[background-color,box-shadow,border-color] duration-300 sm:px-5 ${
          scrolled || open
            ? "border border-line bg-card/80 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            : "border border-transparent"
        }`}
      >
        <Link href="/" aria-label="Test4Test home">
          <Wordmark />
        </Link>

        {home && (
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rounded-full px-3 py-1.5 text-sm text-ink-2 transition-colors hover:bg-tag hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <motion.a
            href={playHref("nav")}
            target="_blank"
            rel="noopener"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="hidden items-center gap-2 rounded-full bg-ink py-2 pl-2.5 pr-4 text-sm font-semibold text-card sm:flex"
          >
            <PlayLogo className="size-4" /> Get the app
          </motion.a>
          {home && (
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={open}
              className="grid size-9 place-items-center rounded-full border border-line bg-card lg:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          )}
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="absolute inset-x-3 top-[72px] rounded-3xl border border-line bg-card/95 p-3 shadow-xl backdrop-blur-xl lg:hidden"
          >
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0, transition: { delay: i * 0.04 } }}
                className="block rounded-2xl px-4 py-3 text-base font-medium hover:bg-tag"
              >
                {l.label}
              </motion.a>
            ))}
            <a
              href={playHref("nav-mobile")}
              target="_blank"
              rel="noopener"
              className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-ink py-3 font-semibold text-card"
            >
              <PlayLogo className="size-5" /> Get it on Google Play
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
