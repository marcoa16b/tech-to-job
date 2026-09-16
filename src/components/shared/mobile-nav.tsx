"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { IconMenu2, IconX, IconBrandDiscordFilled } from "@tabler/icons-react";

const NAV_SECTIONS = [
  "como-funciona",
  "talento",
  "empresas",
  "torneos",
  "networking",
] as const;

export function MobileNav() {
  const nav = useTranslations("Header.nav");
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 bg-background/70 text-foreground backdrop-blur transition hover:bg-background lg:hidden"
      >
        <IconMenu2 size={20} stroke={1.75} />
      </button>

      <AnimatePresence>
        {open && (
          <MobilePanel
            key={pathname}
            onClose={() => setOpen(false)}
            navItems={NAV_SECTIONS.map((s) => ({
              href: `/#${s}`,
              label: nav(s),
            }))}
            discordLabel={t("discord")}
          />
        )}
      </AnimatePresence>
    </>
  );
}

type PanelProps = {
  onClose: () => void;
  navItems: { href: string; label: string }[];
  discordLabel: string;
};

function MobilePanel({ onClose, navItems, discordLabel }: PanelProps) {
  return (
    <>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm lg:hidden"
      />
      <motion.aside
        key="panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 340, damping: 32 }}
        className="fixed right-0 top-0 z-50 flex h-dvh w-[min(20rem,85vw)] flex-col bg-background shadow-2xl lg:hidden"
      >
        <div className="flex items-center justify-between border-b border-foreground/10 px-5 py-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
            Menú
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground transition hover:bg-foreground/5"
          >
            <IconX size={20} stroke={1.75} />
          </button>
        </div>

        <nav
          aria-label="Principal móvil"
          className="flex-1 overflow-y-auto px-3 py-4"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item, i) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.04, duration: 0.25 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium text-foreground transition hover:bg-foreground/5"
                >
                  <span>{item.label}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-foreground/10 p-4">
          <a
            href="https://discord.gg/h9FFgKdkRd"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-background transition hover:brightness-110"
          >
            <IconBrandDiscordFilled size={18} stroke={0} fill="currentColor" />
            {discordLabel}
          </a>
        </div>
      </motion.aside>
    </>
  );
}
