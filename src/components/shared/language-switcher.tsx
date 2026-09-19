"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "motion/react";
import { IconLanguage, IconCheck } from "@tabler/icons-react";

type Locale = "es" | "en";

const LOCALES: { value: Locale; flag: string }[] = [
  { value: "es", flag: "ES" },
  { value: "en", flag: "EN" },
];

export function LanguageSwitcher() {
  const t = useTranslations("Header.language");
  const current = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function selectLocale(next: Locale) {
    if (next === current) {
      setOpen(false);
      return;
    }
    router.replace(pathname, { locale: next });
    setOpen(false);
  }

  const active = LOCALES.find((l) => l.value === current) ?? LOCALES[0];

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("label")}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-2 rounded-full border border-foreground/15 bg-background/70 px-3 py-1.5 text-sm font-medium text-foreground backdrop-blur transition hover:border-foreground/30 hover:bg-background"
      >
        <IconLanguage size={16} stroke={1.75} />
        <span className="tracking-wide">{active.flag}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="absolute right-0 top-full mt-2 min-w-40 overflow-hidden rounded-2xl border border-foreground/10 bg-background/95 p-1 shadow-lg backdrop-blur"
          >
            {LOCALES.map((loc) => {
              const isActive = loc.value === current;
              return (
                <li key={loc.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => selectLocale(loc.value)}
                    className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm transition hover:bg-foreground/5"
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-semibold tracking-wide">
                        {loc.flag}
                      </span>
                      <span className="text-foreground/80">{t(loc.value)}</span>
                    </span>
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 25,
                        }}
                      >
                        <IconCheck
                          size={16}
                          stroke={2}
                          className="text-primary"
                        />
                      </motion.span>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
